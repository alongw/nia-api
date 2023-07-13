import { Router } from 'express'
import { getMsg } from './../utils/getMsg'

const router = Router()

router.get('/sayHelloWorld', (request, response) => {
    response.send(getMsg())
})

export default router
