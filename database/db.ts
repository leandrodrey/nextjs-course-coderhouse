import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0,
};

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log('Using existing connection');
        return mongoose.connection; // Return the existing connection
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            console.log('Using previous connection');
            return mongoose.connection; // Return the existing connection
        }
    }

    try {
        mongoose.set('strictQuery', false); // If you encounter 'strictQuery' errors
        const conn = await mongoose.connect(process.env.MONGO_URL || '');
        mongoConnection.isConnected = 1;
        console.log('Connected to MongoDB:', process.env.MONGO_URL || '');
        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Error connecting to MongoDB');
    }
};

export const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return; // Keep connection open in development
    if (mongoConnection.isConnected === 0) return;

    try {
        await mongoose.disconnect();
        mongoConnection.isConnected = 0;
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};
