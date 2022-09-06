// @ts-nocheck
import http from 'http'
import bodyParser from 'body-parser'
import express from 'express'
import logging from './config/logging'
import config from './config/config'
import { errorHandler } from './utils';
import routes from './routes/stock.routes'
import cors from 'cors'

const NAMESPACE = 'Server'
/**
 * Create Express server.
 */
const app: express.Express = express();

app.use(cors())

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`)
    })

    next()
})

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next()
})

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb", parameterLimit: 10000000 }))
app.use(bodyParser.json({ limit: "50mb", extended: true }))


/** Routes go here */
app.use('/api', routes)

// Simple Root Message
app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.write("<html>")
    res.write("<head><title> Softo Assignment</title></head>")
    res.write("<body><h4>Use postman collection check required functionality</h4></body>")
    res.write("</html>")
    return res.end()
})

/**
* Error Handler.
*/
app.use(errorHandler);

/**
 * Route Not Found.
 */
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        error: 'Invalid route'
    })
})


const httpServer: http.Server = http.createServer(app);


httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`))