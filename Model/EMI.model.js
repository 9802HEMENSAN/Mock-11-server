const mongoose= require("mongoose");

const EMISchema = mongoose.Schema({
    LoanAmount : { type: Number , required: true },
    Rate : { type: Number , required: true },
    Tenure : { type: Number , required: true },
  });
//   LoanAmount,Rate,Tenure
const EMIModel = mongoose.model("EMI", EMISchema);
  
  module.exports={
      EMIModel
  }
  