 const input=process.argv.slice(2)
 //argv terminal -input -array k form convert
//  console.log(nikita)

 const operation=input[0]
 const operant1=+input[1]
 const operant2=+input[2]

 if(operation =="sum"){
    console.log(operant1+operant2)
 }else if(operation =="sub"){
   console.log(operant1-operant2)
 }else if(operation =="mult"){
   console.log(operant1*operant2)
 }else if(operation =="divide"){
   console.log(operant1/operant2)
 }else if(operation =="sin"){
   console.log(Math.sin(operant1))
 }else if(operation =="cos"){
   console.log(Math.cos(operant1))
 }else if(operation =="tan"){
   console.log(Math.tan(operant1))
 }else if(operation =="random"){
   const cry=require("crypto")
   console.log(cry.randomInt(operant1,operant2))
 }

//  if(operation =="random"){
//     console.log(Math.floor(Math.random()*operant1))
//  }



// const isEven =require("is-even")
// console.log(isEven(21))


