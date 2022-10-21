const corsOrigins = require('./corsOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if(corsOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'), false)
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions