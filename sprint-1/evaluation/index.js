const fun=require("./main.js")
const process=require("process")

let inpu=process.argv;
let input=inpu.slice(2)
let func=input[0]
let arg=input[1]

console.log(func,arg)

if(func=="write"){
    console.log(fun.write(arg));

}else if(func=="read"){
    console.log(fun.read(arg))
}else if(func=="cow"){
    console.log(fun.cow(arg))
}else if(func=="delete"){
    console.log(fun.delete(arg))
}

