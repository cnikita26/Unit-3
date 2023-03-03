const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const directories = fs.readdirSync(__dirname)
    let response = '<ul>'
    directories.forEach(directory => {
      response += `<li><a href="${req.url}${directory}">${directory}</a></li>`
    })
    response += '</ul>'
    // res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(response)
  } 
  else {
    const requestedPath = path.join(__dirname, req.url.replace('/', ''))
    if (fs.existsSync(requestedPath)) {
      if (fs.lstatSync(requestedPath).isDirectory()) {
        const directories = fs.readdirSync(requestedPath)
        let response = '<ul>'
        directories.forEach(directory => {
          response += `<li><a href="${req.url}/${directory}">${directory}</a></li>`
        })
        response += '</ul>'
        // res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(response)
      } else {
        // res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end(fs.readFileSync(requestedPath))
      }
    } else {
    //   res.statusCode = 404
      res.end('Not found')
    }
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})