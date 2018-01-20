import UserModel from '../mongodb/schemas/User'
import PostModel from '../mongodb/schemas/Post'
import CommentModel from '../mongodb/schemas/Comment'
const resolver = {
    Query: {
        user (root, params) {
            if (params && params.id) {
                return UserModel.findOne({
                    _id: params.id
                }).exec()
            } else {
                return UserModel.find().exec()
            }
        },
        allUsers (root, params) {
            return UserModel.find().exec()
        }
    },
    User: {
        posts (user) {
            return PostModel.find({
                authorId: user._id
            }).exec()
        }
    },
    Post: {
        comments (post) {
            return CommentModel.find({
                postId: post._id
            }).exec()
        }
    },
    Comment: {
        replier (comment) {
            return UserModel.findOne({
                _id: comment.replier
            }).exec()
        },
        belongsTo (comment) {
            return PostModel.findOne({
                _id: comment.post
            }).exec()
        }
    }
}

export default resolver