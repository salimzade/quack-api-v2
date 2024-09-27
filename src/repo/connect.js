import mongoose from 'mongoose'

async function Connect() {
    try {
        const dbUri = process.env.MONGODB_URI
        await mongoose.connect(dbUri)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.error('Failed to connect to MongoDB', e)
        process.exit(1)
    }
}

export default Connect
