import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    replierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: String
}, {
    collection: 'comment'
})

export default mongoose.model('comment', CommentSchema)