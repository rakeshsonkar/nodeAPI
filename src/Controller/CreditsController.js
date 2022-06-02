const CreditsModel=require('../models/CreditsModel');

exports.Credits = (req,res)=>{ 
    // console.log(req.body.ACC_ID)
    if (!req.body.ACC_ID && req.body.ACC_ID=="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing ACC_ID"
          });
      }
      if (!req.body.saleA && req.body.saleA =='') {       
        return  res.status(400).send({
            success:'false',
            message: "missing saleA"
          });
      }
      if (!req.body.saleB && req.body.saleB =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing saleB"
          });
      }
      if (!req.body.saleC && req.body.saleC =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing saleC"
          });
      }
      if (!req.body.saleD && req.body.saleD =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing saleD"
          });
      }
      if (!req.body.NumberA && req.body.NumberA =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing NumberA"
          });
      }

      if (!req.body.NumberB && req.body.NumberB =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing NumberB"
          });
      }
      if (!req.body.NumberC && req.body.NumberC =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing NumberC"
          });
      }

      if (!req.body.NumberD && req.body.NumberD =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing NumberD"
          });
      }
      if (!req.body.price && req.body.price =="") {  
          
        return  res.status(400).send({
            success:'false',
            message: "missing price"
          });
      }

      if (!req.body.currency && req.body.currency=="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing currency"
          });
      }

      if (!req.body.dateBegin && req.body.dateBegin =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing dateBegin"
          });
      }
      if (!req.body.dateend && req.body.dateend =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing dateend"
          });
      }

      if (!req.body.comment && req.body.comment =="") {       
        return  res.status(400).send({
            success:'false',
            message: "missing comment"
          });
      }
      CreditsModel.Credits(req,(err,data)=>{
        if (err)
        return res.status(500).send({
            success: 'false',
            message:
              err.message || "Some error occurred while creating the Fasttrack."
          });
        else return res.status(200).send({
          success: 'true',
          data:data,
          message:"Added purchase plan successfully"
        });
      })
}
exports.singleCreditsDetail=(req,res)=>{
  if(!req.body.ID.id && req.body.ID.id==''){
    return res.status(400).send({
      success:"false",
      message:"missing ID"
    })
  }
CreditsModel.singleCreditsDetail(req,(err,data)=>{
  if (err)
  return res.status(500).send({
      success: 'false',
      message:
        err.message || "Some error occurred while creating the Fasttrack."
    });
  else return res.status(200).send({
    success: 'true',
    data:data,
    
  });
})
}
exports.updateCredits=(req,res)=>{

  if (!req.body.ACC_ID && req.body.ACC_ID=="") {       
    return  res.status(400).send({
        success:'false',
        message: "missing ACC_ID"
      });
  }
  if (!req.body.ID_PLAN && req.body.ID_PLAN=="") {       
    return  res.status(400).send({
        success:'false',
        message: "missing ID_PLAN"
      });
  }
  CreditsModel.updateCredits(req,(err,data)=>{
    if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:"Updated purchase plan successfully"
    });
  })
}
exports.deletecustomerPlan=(req,res)=>{
  if (!req.body.ID && req.body.ID=="") {       
    return  res.status(400).send({
        success:'false',
        message: "missing ID"
      });
  }
  CreditsModel.deletecustomerPlan(req,(err,data)=>{

    if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:"Deleted staff successfully"
    });
  })
}
exports.singlecustomerPlan=(req,res)=>{
  if (!req.body.ID.id && req.body.ID.id=="") {       
    return  res.status(400).send({
        success:'false',
        message: "missing ID"
      });
  }
  CreditsModel.singlecustomerPlan(req,(err,data)=>{
    if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data
    });
  })
}
exports.customerPlan=(req,res)=>{

  if (!req.body.ondemand && req.body.ondemand=="") {       
    return  res.status(400).send({
        success:'false',
        message: "ondemand"
      });
  }
  if (!req.body.TYPE_A_SPENT && req.body.TYPE_A_SPENT=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_A_SPENT"
      });
  }
  if (!req.body.TYPE_B_SPENT && req.body.TYPE_B_SPENT=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_B_SPENT"
      });
  }
  if (!req.body.TYPE_C_SPENT && req.body.TYPE_C_SPENT=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_C_SPENT"
      });
  }
  if (!req.body.TYPE_D_SPENT && req.body.TYPE_D_SPENT=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_D_SPENT"
      });
  }
  if (!req.body.TYPE_A_TOTAL && req.body.TYPE_A_TOTAL=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_A_TOTAL"
      });
  }

  if (!req.body.TYPE_B_TOTAL && req.body.TYPE_B_TOTAL=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_B_TOTAL"
      });
  }
  if (!req.body.TYPE_C_TOTAL && req.body.TYPE_C_TOTAL=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_C_TOTAL"
      });
  }

  if (!req.body.TYPE_D_TOTAL && req.body.TYPE_D_TOTAL=="") {       
    return  res.status(400).send({
        success:'false',
        message: "TYPE_D_TOTAL"
      });
  }
  if (!req.body.ACC_ID && req.body.ACC_ID=="") {       
    return  res.status(400).send({
        success:'false',
        message: "ACC_ID"
      });
  }
  CreditsModel.customerPlan(req,(err,data)=>{
    if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:"Added customer plan successfully"
    });
  })

}
exports.updatecustomerPlan=(req,res)=>{
  if (!req.body.ID_PLAN_CUSTOMER && req.body.ID_PLAN_CUSTOMER=="") {       
    return  res.status(400).send({
        success:'false',
        message: "missing ID_PLAN_CUSTOMER"
      });
  }
CreditsModel.updatecustomerPlan(req,(err,data)=>{
  if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:"updated customer plan successfully"
    });
})
}
exports.updatecustomer=()=>{
  
}