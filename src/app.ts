import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/products/product.route'
import { OrderRoute } from './app/modules/order/order.route'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// routes
app.use('/api', ProductRoutes)
app.use('/api', OrderRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})
// Not found route
app.get('/*', (req: Request, res: Response) => {
  res.status(200).json('Sorry, this Route not found!!')
})

export default app
