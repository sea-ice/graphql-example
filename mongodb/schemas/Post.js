import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

export default mongoose.model('post', PostSchema)