import mongoose from 'mongoose'
import IdGen from '../../utils/idGen'

const TokenSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true, default: () => IdGen(8) },
        refreshToken: { type: String, required: true },
        userId: { type: String, required: true }
    },
    { timestamps: true }
)

export default mongoose.model('Token', TokenSchema)
