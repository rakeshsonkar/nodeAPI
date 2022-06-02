
const staffModel=require('../models/staffModel');

exports.staffByCompany = (req,res)=>{
    
    if (!req.body.Uid && req.body.Uid==null) {
        
      return res.status(400).send({
          success:'false',
          message: "missing Uid"
        });
    }
    staffModel.staffByCompanys(req,(err, data) => {
            //console.log("testing")
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
exports.addStaff=(req,res)=>{
 // console.log(JSON.parse(req.body.role))
  if (!req.body.ACC_ID && req.body.ACC_ID =="") {       
  return  res.status(400).send({
      success:'false',
      message: "missing ACC_ID"
    });
}
//console.log(req.body.FirstName)
if (!req.body.FirstName && req.body.FirstName=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing FirstName"
    });
}
if (!req.body.LastName && req.body.LastName=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing LastName"
    });
}
if (!req.body.email && req.body.email=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing email"
    });
}
if (!req.body.PhoneNumber && req.body.PhoneNumber=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing PhoneNumber"
    });
}  if (!req.body.role && req.body.role=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing role"
    });
}
if (!req.body.timeZone && req.body.timeZone=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing timeZone"
    });
}
if (!req.body.CBR_ID && req.body.CBR_ID=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing CBR_ID"
    });
}
if (!req.body.Depart && req.body.Depart=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing Depart"
    });
}

if (!req.body.State && req.body.State=='') {
        
  return  res.status(400).send({
      success:'false',
      message: "missing State"
    });
}
staffModel.addStaff(req,(err, data) => {
  //console.log("testing")
  if (err)
  return res.status(500).send({
      success: 'false',
      message:
        err.message || "Some error occurred while creating the Fasttrack."
    });
  else return res.status(200).send({
    success: 'true',
    data:data,
    message:"Added company staff successfully"
  });
});
}
exports.singleStaffList=(req,res)=>{
  //console.log(req.body.STAFF_ID.id)
  if (!req.body.STAFF_ID.id && req.body.STAFF_ID.id=='') {
    return  res.status(400).send({
        success:'false',
        message: "missing STAFF_ID"
      });
  }
  staffModel.singleStaffList(req,(err,data)=>{
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
exports.updateStaffList=(req,res)=>{
  if (!req.body.STAFF_ID && req.body.STAFF_ID =="") { 
    return  res.status(400).send({
        success:'false',
        message: "missing STAFF_ID"
      });
  }

  staffModel.updateStaffList(req,(err,data)=>{
    if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:"Update company staff successfully"
    });
  });
}
exports.deleteStaff=(req,res)=>{
  if (!req.body.ID && req.body.ID =="") { 
    return  res.status(400).send({
        success:'false',
        message: "missing ID"
      });
  }
  staffModel.deleteStaff(req,(err,data)=>{
    if (err)
    return res.status(500).send({
        success: 'false',
        message:
          err.message || "Some error occurred while creating the Fasttrack."
      });
    else return res.status(200).send({
      success: 'true',
      data:data,
      message:"Deleted company staff successfully"
    });
  })
}