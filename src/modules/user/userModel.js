import { model, Schema } from 'mongoose'
import IdGen from '../../utils/idGen'

const UserSchema = new Schema(
    {
        _id: { type: String, required: true, default: () => IdGen(8) },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
)

export default model('User', UserSchema)
