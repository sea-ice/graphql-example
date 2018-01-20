import mongoose from 'mongoose'
import Router from 'koa-router'
import casual from 'casual'
import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa'
import UserModel from '../mongodb/schemas/User'
import PostModel from '../mongodb/schemas/Post'
import CommentModel from '../mongodb/schemas/Comment'
import graphqlSchema from '../graphql/schema'

const router = new Router()
let USER_ID, POST_ID

(async function () {
    let allUsers = (await UserModel.find().exec()) || []
    USER_ID = allUsers.map(user => user._id)
    let allPosts = (await PostModel.find().exec()) || []
    POST_ID = allPosts.map(post => post._id)
})()

casual.define('gender', () => {
    return Math.random() > 0.5 ? 'male' : 'female'
})

const addUser = async ctx => {
    let newId = new mongoose.Types.ObjectId()
    const newUser = new UserModel({
        _id: newId,
        name: casual.name,
        gender: casual.gender
    })
    const user = await newUser.save()
    console.log(user)
    if (user) {
        USER_ID.push(newId)
        ctx.body = JSON.stringify({
            code: '0',
            state: 'success'
        })
    }
}

const getUser = async ctx => {
    const users = await UserModel.find().exec()
    ctx.body = {
        code: '0',
        state: 'success',
        users
    }
}

const delUser = async ctx => {
    const users = await UserModel.remove()
    console.log('已清除用户数据表')
    ctx.body = JSON.stringify({
        code: '0',
        state: 'success'
    })
}

const addPost = async ctx => {
    let newId = new mongoose.Types.ObjectId()
    const newPost = new PostModel({
        _id: newId,
        title: casual.title,
        content: casual.text,
        authorId: USER_ID[rand(USER_ID.length)]
    })
    const post = await newPost.save()
    if (post) {
        POST_ID.push(newId)
        ctx.body = JSON.stringify({
            code: '0',
            state: 'success'
        })
    }
}

const delPost = async ctx => {
    const posts = await PostModel.remove()
    console.log('已清除文章数据表')
    ctx.body = JSON.stringify({
        code: '0',
        state: 'success'
    })
}

const getPost = async ctx => {
    const posts = await PostModel.find().exec()
    ctx.body = {
        code: '0',
        state: 'success',
        posts
    }
}

const addComment = async ctx => {
    const newComment = new CommentModel({
        _id: new mongoose.Types.ObjectId(),
        replierId: USER_ID[rand(USER_ID.length)],
        content: casual.sentences(),
        postId: POST_ID[rand(POST_ID.length)]
    })
    await newComment.save()
    console.log('文档新增成功')
    ctx.body = JSON.stringify({
        code: 0,
        state: 'success'
    })
}

const getComment = async ctx => {
    const comments = await CommentModel.find().exec()
    console.log(records)
    ctx.body = JSON.stringify({
        code: 0,
        state: 'success',
        comments
    })
}

const delComment = async ctx => {
    await CommentModel.remove()
    ctx.body = JSON.stringify({
        code: 0,
        state: 'success'
    })
}

function rand (max) {
    return Math.floor(Math.random() * max)
}
router.post('/user', addUser)
      .del('/user', delUser)
      .get('/user', getUser)
      .post('/post', addPost)
      .del('/post', delPost)
      .get('/post', getPost)
      .get('/comment', getComment)
      .post('/comment', addComment)
      .del('/comment', delComment)
      .get('/graphql', graphqlKoa({
          schema: graphqlSchema
      }))
      .post('/graphql', graphqlKoa({
        schema: graphqlSchema
      }))
      .get('/graphiql', graphiqlKoa({
        endpointURL: '/graphql'
      }))

export default router