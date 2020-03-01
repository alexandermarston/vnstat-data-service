const express = require('express');
const boom = require('express-boom');
const Boom = require('boom');
const morgan = require('morgan');
const mainRouter = require('./routes/main');

// By default, set the HTTP port to 3000
const port = process.env.PORT || 3000

// Initialise express
const app = express()

// Log requests
app.use(morgan('combined'))

// Use the main router to route requests
app.use('/', mainRouter)

// Handle any missing resources
app.use(function (req, res, next) {
    res.json(Boom.notFound('The specified resource was not found'));
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.json(Boom.badImplementation('Something went wrong'));
})

// Listen on specified port
app.listen(port, () => {
    console.log('Application started listening on port ' + port)
});
