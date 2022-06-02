const customerModel=require('../models/customerModel');

exports.customerList=(req,res)=>{
    customerModel.customerList((err,data)=>{
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
exports.EditcustomerList=(req,res)=>{
customerModel.EditcustomerList(req,(err,data)=>{
  if (err)
  return res.status(500).send({
      success: 'false',
      message:
        err.message || "Some error occurred while creating the Fasttrack."
    });
  else return res.status(200).send({
    success: 'true',
    data:data,
    message:'update customer successfully'
  });
})
}
exports.CustomerAddedTable=(req,res)=>{
  customerModel.CustomerAddedTable(req,(err,data)=>{
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
exports.customer_legal=(req,res)=>{
 customerModel.customer_legal((err,data)=>{
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
exports.companiesEmailList=(req,res)=>{
customerModel.companiesEmailList(req,(err,data)=>{
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
exports.EditcustomerDirectory=(req,res)=>{
customerModel.EditcustomerDirectory(req,(err,data)=>{
  if (err)
  return res.status(500).send({
      success: 'false',
      message:
        err.message || "Some error occurred while creating the Fasttrack."
    });
  else return res.status(200).send({
    success: 'true',
    data:data,
    message:'Update Company Directory  successfully'
  });
})
}

exports.customerDocument=(req,res)=>{
  customerModel.customerDocument(req,(err,data)=>{
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

exports.customerDocumentAddEdit=(req,res)=>{
  customerModel.customerDocumentAddEdit(req,(err,data)=>{
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