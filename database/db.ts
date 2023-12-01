import mongoose, { ConnectionStates } from 'mongoose';

/**
 * Enum for MongoDB connection states.
 */
enum ConnectionStatus {
    DISCONNECTED = 0,
    CONNECTED = 1,
    CONNECTING = 2,
    DISCONNECTING = 3
}

const mongoConnection = {
    isConnected: ConnectionStatus.DISCONNECTED
};

/**
 * Convierte el estado de conexión de Mongoose a ConnectionStatus.
 */
function mapMongooseStateToConnectionStatus(state: ConnectionStates): ConnectionStatus {
    switch (state) {
        case mongoose.ConnectionStates.disconnected:
            return ConnectionStatus.DISCONNECTED;
        case mongoose.ConnectionStates.connected:
            return ConnectionStatus.CONNECTED;
        case mongoose.ConnectionStates.connecting:
            return ConnectionStatus.CONNECTING;
        case mongoose.ConnectionStates.disconnecting:
            return ConnectionStatus.DISCONNECTING;
        default:
            return ConnectionStatus.DISCONNECTED;
    }
}

/**
 * Connects to MongoDB.
 */
export const connect = async (): Promise<void> => {
    if (mongoConnection.isConnected) {
        /*console.log('Already connected to MongoDB');*/
        return;
    }

    if (mongoose.connections.length > 0) {
        const currentState = mongoose.connections[0].readyState;
        mongoConnection.isConnected = mapMongooseStateToConnectionStatus(currentState);

        if (mongoConnection.isConnected === ConnectionStatus.CONNECTED) {
            /*console.log('Using existing database connection');*/
            return;
        }

        console.log('Disconnecting existing database connection');
        await mongoose.disconnect();
    }

    try {
        const mongoURL: string = process.env.MONGO_URL || 'mongodb://localhost:27017/myapp';
        await mongoose.connect(mongoURL);
        mongoConnection.isConnected = ConnectionStatus.CONNECTED;
        /*console.log('Connected to MongoDB');*/
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        mongoConnection.isConnected = ConnectionStatus.DISCONNECTED;
        throw error;
    }
};

/**
 * Disconnects from MongoDB.
 */
export const disconnect = async (): Promise<void> => {
    if (mongoConnection.isConnected === ConnectionStatus.DISCONNECTED) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = ConnectionStatus.DISCONNECTED;
};
