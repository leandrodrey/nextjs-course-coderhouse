import mongoose from 'mongoose';

/*
* 0 = disconnected
* 1 = connected
* 2 = connecting
* 3 = disconnecting
* */

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            console.log('Using existing database connection');
            return;
        }

        console.log('Disconnecting existing database connection');
        await mongoose.disconnect();
    }

    try {
        await mongoose.connect(process.env.MONGO_URL || '', {});
        mongoConnection.isConnected = 1;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        mongoConnection.isConnected = 0;
        throw error;
    }
}

export const disconnect = async () => {

    if (mongoConnection.isConnected === 0) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
}
