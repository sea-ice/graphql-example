import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    gender: String
}, {
    collection: 'user'
})

export default mongoose.model('user', UserSchema)