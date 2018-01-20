import {makeExecutableSchema} from 'graphql-tools'
import resolvers from './resolver'

const typeDefs = `
type Query {
    user(id: ID): User
    allUsers: [User]
}

type User {
    _id: ID
    name: String
    gender: String
    posts: [Post]
}

type Post {
    _id: ID
    title: String
    content: String
    comments: [Comment]
}

type Comment {
    _id: ID
    replier: User
    content: String
    belongsTo: Post
}
`

export default makeExecutableSchema({
    typeDefs,
    resolvers
})