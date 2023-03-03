const http=require("http")
const fs = require("fs")
const fsPromise=require("fs/promise")

let hostname="localhost"
let port=4200

const server=http.createServer((req,res)=>{
    if(req.url=="/textSync"){
        const syncText=fs.readFileSync("text.txt","utf-8")
        res.end(syncText)
    }
    else if(req.url=="/textasync"){
        fs.readFile("text.txt","utf-8",(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.end(data)
            }
        })
    }
    else if(req.url=="/textstream"){
        const stream=fs.createReadStream("text.txt")
        stream.pipe(res)
    }
    else if(req.url="/textpromise"){
        fsPromise.readFile("text.txt","utf-8")
        .then(data=>res.end(data))
        .catch(err=>console.log(err))
    }
    else{
        res.end("Invalid route")
    }
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
  })