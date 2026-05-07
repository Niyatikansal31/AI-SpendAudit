const express=require("express")
const app=express();

app.get('/test',(req,res)=>{
    res.json({
        msg: "Backend Running!"
    })
})

app.listen(3000)