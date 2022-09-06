"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var utils_1 = require("./utils");
var stock_routes_1 = __importDefault(require("./routes/stock.routes"));
var cors_1 = __importDefault(require("cors"));
var NAMESPACE = 'Server';
/**
 * Create Express server.
 */
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
/** Log the request */
app.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [".concat(req.method, "] - URL: [").concat(req.url, "] - STATUS: [").concat(res.statusCode, "] - IP: [").concat(req.socket.remoteAddress, "]"));
    });
    next();
});
/** Rules of our API */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "100mb", parameterLimit: 10000000 }));
app.use(body_parser_1.default.json({ limit: "50mb", extended: true }));
/** Routes go here */
app.use('/api', stock_routes_1.default);
// Simple Root Message
app.get('/', function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> Softo Assignment</title></head>");
    res.write("<body><h4>Use postman collection check required functionality</h4></body>");
    res.write("</html>");
    return res.end();
});
/**
* Error Handler.
*/
app.use(utils_1.errorHandler);
/**
 * Route Not Found.
 */
app.use(function (req, res, next) {
    res.status(404).json({
        status: 404,
        error: 'Invalid route'
    });
});
var httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server is running ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port)); });
