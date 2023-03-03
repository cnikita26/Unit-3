
const input=require("process").argv.slice(2) //to take input from terminal as an array form
const operation=input[0]
const operant1=input[1]
const operant2=input[2]
console.log(input)

const fs=require("fs")
//create a file
if(operation =="create"){
    fs.writeFile(`${operant1}`, `${operant2}\n`,(err)=>{
        if(err){
            console.log("file can not be created ")
        }else {
            console.log("new file is created ")
        }
    })
}
// rename a file
if(operation=="rename"){
    fs.rename(`${operant1}`,`${operant2}\n`,(err)=>{
        if(err){
            console.log("error")
        }else{
            console.log("file renamed")
        }
    })
}

//read a file
if(operation=="read"){
    fs.readFile(`${operant1}`,"utf-8",(err,data)=>{
        if(err){
            console.log("error")
        }else{
            console.log(data)
        }
    })
}
//append to the file
if(operation=="update"){
    fs.appendFile(`${operant1}`,`${operant2}\n`,(err)=>{
        if(err){
            console.log("error")
        }else{
            console.log("new code appended ")
        }
    })
}
//delete the file
if(operation=="delete"){
    fs.unlink(`${operant1}`,(err)=>{
        if(err){
            console.log("error")
        }else{
            console.log("file deltedd  ")
        }
    })
}

//list the file


if(operation=="list"){
    fs.readdir(`${operant1}`,"utf-8",(err,data)=>{
        if(err){
            console.log("failed")
        }else {
            console.log(data)
        }
    })
}