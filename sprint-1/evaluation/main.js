const http = require("dns")
const fs = require("fs")
const cowsay = require("cowsay")
let write=(url)=>{
    http.lookup(url,(err,data,family)=>{
        if(err){ 
            console.log(err);
        }else{ 
            fs.appendFile('data.txt',`URL : ${url} | Address : ${data} | IPv${family} \n`,(err)=>{
                if(err) console.log(err);
                else console.log("done");
            })
        }
    })
}
let read=(file)=>{
    fs.readFile(`${file}`,'utf8',(err,dat)=>{
        if(err) console.log(err);
        else console.log(dat);
    })
}
let del =(file)=>{
    fs.unlink(`${file}`,(err)=>{
        if(err) console.log(err);
        else console.log("deleted");
    })
}
let cow = (file)=>{
    fs.readFile(`${file}`,'utf8',(err,dat)=>{
        if(err){console.log(err)}
        else {
            console.log(cowsay.say({
                text : dat,
                e : "oO",
                T : "U "
            }));
        }
    })
}
module.exports={
    write:write,
    read:read,
    cow:cow,
    delete:del
}