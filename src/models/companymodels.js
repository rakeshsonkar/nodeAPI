
const sql=require('../config/dbConnection');
 const {uploadImage}=require('../helper/Imageconveter');
 var uuid = require('uuid');
 
exports.ListCom=(result)=>{
    sql.query(`SELECT a.ACC_ID,a.ACC_STATE,a.COM_NAME,a.ACC_TYPE,b.ON_DEMAND,((b.TYPE_B_TOTAL-b.TYPE_B_SPENT)+(b.TYPE_A_TOTAL-b.TYPE_A_SPENT)+(b.TYPE_C_TOTAL-b.TYPE_C_SPENT)+(b.TYPE_D_TOTAL-b.TYPE_D_SPENT)) AS credits_Available,(b.TYPE_A_SPENT+b.TYPE_B_SPENT+b.TYPE_C_SPENT+b.TYPE_D_SPENT)AS credits_consumed,(SELECT COUNT(ACC_ID_COMPANY)  FROM t_company_directory c WHERE c.ACC_ID_COMPANY=a.ACC_ID) AS people,(SELECT COUNT(ACC_ID)  FROM t_company_staff d WHERE d.ACC_ID=a.ACC_ID) AS staff FROM t_customer a LEFT JOIN t_plan_customer b ON a.ACC_ID=b.ACC_ID WHERE a.ACC_TYPE='C' AND a.status='0';`, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
    
        if (res.length) {
         // console.log(res);
          result(null,res);
          return;
        }
    
        // not found Tutorial with the id
        result({message: "not_found" }, null);
      });
}
exports.customersPlan=(request,result)=>{
   
  sql.query(`SELECT a.DATE AS Purchase_Date,a.COMMENTS,a.DATE_BEGIN,a.DATE_END,a.ID_PLAN_PURCHASE,a.ACC_ID,a.TYPE_A_PRICE AS A_Adquiridos,a.TYPE_A_USED AS A_Consumidos,(a.TYPE_A_PRICE-a.TYPE_A_USED)AS A_Disponibles,a.TYPE_B_PRICE AS B_Adquiridos,a.TYPE_B_USED AS B_Consumidos,(a.TYPE_B_PRICE-a.TYPE_B_USED)AS B_Disponibles,a.TYPE_C_PRICE AS C_Adquiridos,a.TYPE_C_USED AS C_Consumidos,(a.TYPE_C_PRICE-a.TYPE_C_USED)AS C_Disponibles ,a.TYPE_D_PRICE AS D_Adquiridos,a.TYPE_D_USED AS D_Consumidos,(a.TYPE_D_PRICE-a.TYPE_D_USED)AS D_Disponibles,(SELECT COUNT(ACC_ID) FROM t_plan_customer WHERE t_plan_customer.ACC_ID=a.ACC_ID)AS plan FROM t_plan_purchase a  WHERE a.deleted_at=0 and a.ACC_ID = '${request.body.Uid}'`,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }
    //console.log(res);
    if (res.length){
     // console.log(res);
      result(null,res);
      return;
    }
    
  });
}

exports.addCompany=(request,result)=>{
  const id =uuid.v4();
  const comImagepath='public/upload/Company/';
  const comBanner='public/upload/ComBanner/';
  const comImage =  uploadImage(request.body.comImage,comImagepath);
  const comBannerpath =  uploadImage(request.body.urlcombanner,comBanner);
  const savecomImage = comImage.substring(22,comImage.length)
   const savecomBanner  = comBannerpath.substring(24,comBannerpath.length)
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  //console.log(date)
  sql.query(`INSERT INTO t_customer (COM_NAME,ACC_ID,COM_URL,COM_IMG,COM_EMAIL,COM_PHONE,TMZ_ID,ACC_STATE,COU_ID,COM_BANNER,COM_STYLE,LAN_ID,ACC_TYPE,CREATION_DATE,UPDATE_DATE)
  VALUE ('${request.body.CompanyName}','${id}','${request.body.comUrl}','${savecomImage}','${request.body.mainMail}','${request.body.contactNumber}','${request.body.timeZone}','${request.body.State}','${request.body.country}','${savecomBanner}','${request.body.style}','${request.body.language}','${request.body.comType}','${date}','${date}');`,(err,res)=>{
    if (err) {
      console.log("testing")
      result(err, null);
      return;
    }
      result(null,res);
      return;
  });
}

exports.singleCompaniesList=(request,result)=>{
  sql.query(`SELECT * FROM t_customer WHERE ACC_ID='${request.body.Uid}'`,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }

    if (res.length){
     // console.log(res);
      result(null,res);
      return;
    }
    result({message: "not_found" }, null);
  })   
}
exports.updateCompaniesList=(request,result)=>{
  const comImagepath='public/upload/Company/';
  const comBanner='public/upload/ComBanner/';
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  let savecomImage;
  let savecomBanner;
  if (request.body.comImage != '') {
    const comImage = uploadImage(request.body.comImage,comImagepath);
    savecomImage = comImage.substring(22,comImage.length);
    
  } else {
    savecomImage =request.body.updateimage;
    
  }
  
  if (request.body.urlcombanner !='') {
    const comBannerpath =  uploadImage(request.body.urlcombanner,comBanner);
    savecomBanner = comBannerpath.substring(24,comBannerpath.length);
  } else {
    savecomBanner =request.body.updatecompanybanner;
  }
sql.query(`UPDATE t_customer SET COM_NAME = '${request.body.CompanyName}',COM_URL = '${request.body.comUrl}',COM_IMG = '${savecomImage}',COM_EMAIL = '${request.body.mainMail}',COM_PHONE = '${request.body.contactNumber}',TMZ_ID = '${request.body.timeZone}',ACC_STATE = '${request.body.State}',COU_ID = '${request.body.country}',COM_BANNER = '${savecomBanner}',COM_STYLE = '${request.body.style}',ACC_TYPE = '${request.body.comType}',CREATION_DATE = '${date}' WHERE ACC_ID ='${request.body.ACC_ID}'`,(err,res)=>{
  if (err) {
     //console.log("testing")
    result(err, null);
    return;
  }
    result(null,res);
    return;
});
}
exports.deleteCompany=(request,result)=>{
  sql.query(`UPDATE t_customer SET status = 1 WHERE ACC_ID ='${request.body.ID}'`,(err,res)=>{
    if (err) {
       console.log("testing")
      result(err, null);
      return;
    }
    result(null,res);
      return;
  });

}
