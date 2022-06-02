
const { imagechecker } = require('../helper/imagechecker');
const companymodel=require('../models/companymodels');

exports.List = (req, res) => {
    companymodel.ListCom((err, data) => {
      // console.log(data)
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
    });
  };

  exports.customersPlans=(req,res)=>{

    if (!req.body.Uid && req.body.Uid==null) {
      return res.status(400).send({
        success:'false',
        message: "missing Uid"
      });
    }
    companymodel.customersPlan(req,(err, data) => {
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
    });
  }


  exports.addCompany= async(req,res)=>{
   
    if (!req.body.CompanyName && req.body.CompanyName=='') {
      return  res.status(400).send({
        success:'false',
        message: "missing CompanyName"
      });
    
    }
    if (!req.body.comUrl && req.body.comUrl=='') {
      return res.status(400).send({
        success:'false',
        message: "missing comUrl"
      });
      
    }
    if (!req.body.mainMail && req.body.mainMail=='') {
      return res.status(400).send({
        success:'false',
        message: "missing mainMail"
      });
      
    }
    if (!req.body.timeZone && req.body.timeZone=='') {
      return res.status(400).send({
        success:'false',
        message: "missing timeZone"
      });
      
    }
    if (!req.body.State && req.body.State=='') {
      return res.status(400).send({
        success:'false',
        message: "missing State"
      });
      
    }
    if (!req.body.country && req.body.country=='') {
      return res.status(400).send({
        success:'false',
        message: "missing country"
      });
    }
    if (!req.body.language && req.body.language=='') {
      return res.status(400).send({
        success:'false',
        message: "missing language"
      });
   
    }
    if (!req.body.style && req.body.style=='') {
      return res.status(400).send({
        success:'false',
        message: "missing style"
      });
     
    }
    if (!req.body.comType && req.body.comType=='') {
      return res.status(400).send({
        success:'false',
        message: "missing comType"
      });
      
    }
    if (!req.body.contactNumber && req.body.contactNumber=='') {
      return res.status(400).send({
        success:'false',
        message: "missing contactNumber"
      });
    
    }
    if (!req.body.comImage && req.body.comImage =='') {
      return res.status(400).send({
        success:'false',
        message: "missing comImage"
      });
    
    }
    if (!req.body.urlcombanner && req.body.urlcombanner =='') {
      return res.status(400).send({
        success:'false',
        message: "missing urlcombanner"
      });
    
    }
   imagechecker(req.body.comImage);
   imagechecker(req.body.urlcombanner);

    await companymodel.addCompany(req,(err, data) => {
      if (err)
      return res.status(500).send({
          success: 'false',
          message:
            err.message || "Some error occurred while creating the Fasttrack."
        });
      else return res.status(200).send({
        success: 'true',
        data:data,
        message:'Added company successfully'
      });
    });
  }
exports.singleCompaniesList= async (req,res)=>{

  if (!req.body.Uid && req.body.Uid==null) {
    return res.status(400).send({
      success:'false',
      message: "missing Uid"
    });
    return
  }
  
  await companymodel.singleCompaniesList(req,(err,data)=>{
    if(err)
    return res.status(500).send({
      success:'false',
      message:
      err.message||"Some error occurred while creating the Fasttrack."
    });
    else return res.status(200).send({
      success:'true',
      data:data,
      message:''
    })
  });
    
}
exports.updateCompaniesList=async (req,res)=>{
  if (!req.body.ACC_ID && req.body.ACC_ID=='') {
    return res.status(400).send({
      success:'false',
      message: "missing ACC_ID"
    });
  }

  if (!req.body.comImage && req.body.comImage!='') {
    imagechecker(req.body.comImage);
  }
  if (!req.body.urlcombanner && req.body.urlcombanner!='') {
    imagechecker(req.body.urlcombanner);
  }
  await companymodel.updateCompaniesList(req,(err, data) => {
    if (err)
    return  res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:'update company successfully'
    });
  });


}
exports.deleteCompany=async (req,res)=>{
  if (!req.body.ID && req.body.ID==null) {
    return res.status(400).send({
      success:'false',
      message: "missing ACC_ID"
    });
  }
  await companymodel.deleteCompany(req,(err,data)=>{
    if (err)
    return  res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:'Delete companylist successfully'
    });
  })

}