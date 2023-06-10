const express= require("express");

const {EMIModel} = require("../Model/EMI.model");

const EMIRouter = express.Router();

EMIRouter.get("/", async (req,res)=>{
     // get EMI here 
     try {
        res.send("Emi data ")
     } catch (error) {
        res.status(401).send(error.message)
     }
})

EMIRouter.post("/create", async (req,res)=>{
     //  post EMI here 
     const { LoanAmount,Rate,Tenure }=req.body;
     try {
         if(LoanAmount && Rate && Tenure){
            // EMI:E = P x r x ( 1 + r )n / ( ( 1 + r )n - 1 ) 
            // let newEMI = new EMIModel(req.body);
            // await newEMI.save(); 
            let P  = Number(LoanAmount);
            let  r =  Number( (Rate / 12 / 100 ) * 100 )  
            let n  = Number(Tenure);
            let mid=  (1 + r ) * n
            let E = P * r * ( mid / ( mid * n - 1 ));
            // E = 100000 * 0.011667* (1 + 0.011667) * 36 / ((1 + 0.011667)* 36 - 1)   
            let total= E * n ;
            res.send({
                "EMI" : E ,
                "LoanAmount" : LoanAmount,
                "Rate" : r ,
                "tenure" : n,
                "total" : total ,
                "interst" : total-P
            })
         }else{
            res.send("Please fill all the fields");
         }
     } catch (error) {
        res.send(error.message)
     }
})

EMIRouter.patch("/", async (req,res)=>{
     // get EMI here 
     try {
        
     } catch (error) {
        res.status(401).send(error.message)
     }
})

EMIRouter.delete("/", async (req,res)=>{
     // get EMI here 
     try {
        
     } catch (error) {
        res.status(401).send(error.message)
     }
})

module.exports =  { 
    EMIRouter
 }
/*
{
    "LoanAmount" : 100000,
    "Rate" : 14,
    "Tenure"  : 36
}
{
    "email" : "hemensan@gmail.com",
    "password" : "hemensan9820"
}
*/ 

