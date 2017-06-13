const express = require('express')
const path = require('path')
const port = process.env.PORT || 8181
const app = express()
const environment = process.env.NODE_ENV || 'development'
const morgan = require('morgan')
const fs = require('fs')
const requestProxy = require('express-request-proxy')

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack(webpackConfig)
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  )
  app.use(require('webpack-hot-middleware')(compiler))
}

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.static(`${__dirname}/public`))

if (process.env.API_KEY && process.env.USER) {
  app.all(
    '/api/*',
    requestProxy({
      url: 'http://127.0.0.1:8000/api/*'
    })
  )
}

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'dist', 'index.html'))
})

app.listen(port)
console.log(`Server started on port ${port} with ${environment} environment`)
