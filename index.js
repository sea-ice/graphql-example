import Koa from 'Koa'
import bodyparser from 'koa-bodyparser'
import connectDatabase from './mongodb'
import router from './controllers'

const server = new Koa()
const port = 3000

connectDatabase()

server.use(bodyparser())
server.use(router.routes())
server.use(router.allowedMethods())

server.listen(port)

console.log(`Server has been listening on port ${port}`)