
require('dotenv').config()
const express=require("express")
var cors = require('cors')
const app=express();
const axios=require("axios")
const PORT=process.env.PORT || 8080;
const fs=require("fs")

let url=`https://${process.env.apiKey}:${process.env.tokenPwd}@${process.env.storeName}admin/api/2023-01/customers.json`


let options={
    "method": "GET",
    "url":url,
    "headers":{
        "Content-Type":"application/json"
    }
}

app.use(cors());

app.get("/customers",(req,resp)=>{

    axios.get(url).then((res)=>{
        console.log("response: ",res.data);
        resp.send(res.data)
    })
})

app.get(`/customers/:id`,(req,resp)=>{
    let {id}= req.params
    console.log("param id:",id);
    axios.get(`https://${process.env.apiKey}:${process.env.tokenPwd}@${process.env.storeName}admin/api/2023-01/customers/${id}.json`).then((res)=>{
        console.log("response: ",res.data);
        resp.send(res.data)
    }).catch((err)=>{console.log(err);})
})

app.put(`/customers/:id`, async(req,resp)=>{
    let {id}= req.params;
    let body=req.body;
    console.log("put body:",body);
    fs.writeFile("./resp.json",body)
    await axios.put(`https://${process.env.apiKey}:${process.env.tokenPwd}@${process.env.storeName}admin/api/2023-01/customers/${id}.json`,body).then((res)=>{
        resp.send(res.data);
        // console.log("put res: ",res.body);
    })
})

app.listen(PORT,()=>{
    console.log("Server running at :",`http://localhost:${PORT}/`);
})