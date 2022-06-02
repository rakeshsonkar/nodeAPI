
const commanModel=require("../models/CommanModel");

exports.geoTimezone=(req,res)=>{
    commanModel.geoTimezone((err, data) => {
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
 exports.geocountry=(req,res)=>{
    commanModel.geocountry((err, data) => {
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
 exports.Tlanguage=(req,res)=>{
     commanModel.Tlanguage((err,data)=>{
        if(err)
       return res.status(500).send({
            success:'false',
            message:
            err.message || "Some error occurred while creating the Fasttrack."
        });
        else  return res.status(200).send({
            success: 'true',
          data:data
        });
     })
 }
 exports.roleinCompany=(req,res)=>{
  commanModel.roleinCompany((err,data)=>{
    if(err)
    return res.status(500).send({
      success:'false',
      message:
      err.message||"Some error occurred while creating the  fasttrack."
    })
    else return res.status(200).send({
      success:'true',
      data:data
    })
  })
 }
 exports.companyBranch=(req,res)=>{
   commanModel.companyBranch((err,data)=>{
    if(err)
    return res.status(500).send({
      success:'false',
      message:
      err.message||"Some error occurred while creating the  fasttrack."
    })
    else return res.status(200).send({
      success:'true',
      data:data
    })
   })
 }
 exports.CURRENCY=(req,res)=>{
  commanModel.CURRENCY((err,data)=>{
   
    if(err)
    return res.status(500).send({
      success:'false',
      message:
      err.message||"Some error occurred while creating the  fasttrack."
    })
    else return res.status(200).send({
      success:'true',
      data:data
    })
  })
 }
 exports.department=(req,res)=>{
  commanModel.department((err,data)=>{
    if(err)
    return res.status(500).send({
      success:'false',
      message:
      err.message||"Some error occurred while creating the  fasttrack."
    })
    else return res.status(200).send({
      success:'true',
      data:data
    })
  })
 }
