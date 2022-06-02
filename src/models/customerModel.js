
const sql=require("../config/dbConnection");
var uuid = require('uuid');
const { request } = require("express");
exports.customerList=(result)=>{
    const resultrecord = [];
sql.query(`select  a.* ,(select count(*) FROM t_company_directory b where b.ACC_ID_CUSTOMER =a.ACC_ID) as institution FROM t_customer a where a.ACC_TYPE="P"`,(err,res)=>{
    if (err) {
        //  console.log("testing")
          result(err, null);
          return;
        }
      
        res.forEach(e => {
            var arr = {};
            arr["ACC_ID"] = e.ACC_ID;
            arr["institution"]=e.institution;
            arr['PER_NAME']=e.PER_NAME;
            arr['PER_LASTNAME']=e.PER_LASTNAME;
            arr['PER_MAIL']=e.PER_MAIL;
            arr['PER_TMAIL']=e.PER_TMAIL;
            arr['PER_SMAIL']=e.PER_SMAIL;
            arr['PER_PHONE']=e.PER_PHONE;
            arr['PER_SPHONE']=e.PER_SPHONE;
            arr['PER_TPHONE']=e.PER_TPHONE;
            arr['CREATION_DATE']=e.CREATION_DATE;
            arr['UPDATE_DATE']=e.UPDATE_DATE;
            sql.query(`SELECT b.*,c.NAME,c.TYPE,d.COU_ISO_ALPHA FROM t_customer_legal_id b JOIN t_id_type c ON b.ID_ID=c.ID_ID JOIN t_geo_country d ON c.COU_ID=d.COU_ISO_ALPHA where b.ACC_ID='${e.ACC_ID}'`,(err1,ress)=>{
              // console.log(ress)
              if (err1) {
                    //  console.log("testing")
                      result(err1, null);
                      return;
                    }
                    arr['documentdata']=ress;
            })
            sql.query(`SELECT count(*) as dataset FROM t_record_certificate where CODE=(select COD_ROOT from t_code where ACC_ID="${e.ACC_ID}")`,(err2,rest)=>{
                if (err2) {
                    //  console.log("testing")
                      result(err2, null);
                      return;
                    }
                arr['CodRecord']=rest[0].dataset;
                // console.log(arr)
                resultrecord.push(arr);
            })
           

        });
      
       
})
setTimeout(() => {
  result(null, resultrecord);
  //console.log(resultrecord)
return;
  }, 200);

}

exports.CustomerAddedTable=(request,result)=>{
sql.query(`Select a.*,b.COM_NAME,c.NAME FROM t_company_directory a join t_customer b on a.ACC_ID_COMPANY=b.ACC_ID JOIN t_id_type c on c.ID_ID=a.ID_ID WHERE a.ACC_ID_CUSTOMER='${request.body.CusID}' AND a.ACC_ID_COMPANY IN (SELECT ACC_ID FROM t_customer WHERE ACC_TYPE="C")`,(err,res)=>{

  //console.log(res)
  if (err) {
    //console.log("testing")
   result(err, null);
   return;
 }
 result(null,res);
   return;
})

}

exports.EditcustomerList=(Request,result)=>{
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(`UPDATE t_customer SET PER_NAME='${Request.body.PER_NAME}',PER_LASTNAME='${Request.body.PER_LASTNAME}',PER_MAIL='${Request.body.PER_MAIL}',PER_SMAIL='${Request.body.PER_SMAIL}',PER_TMAIL='${Request.body.PER_TMAIL}',PER_PHONE='${Request.body.PER_PHONE}',PER_SPHONE='${Request.body.PER_SPHONE}',PER_TPHONE='${Request.body.PER_TPHONE}',UPDATE_DATE='${date}' Where ACC_ID ='${Request.body.ACC_ID}'`,(err,res)=>{
    if (err) {
      //console.log("testing")
     result(err, null);
     return;
   }
   result(null,res);
     return;
  })
}
exports.customer_legal=(result)=>{
  sql.query(`SELECT a.*,b.NAME,b.TYPE,c.COU_ISO_ALPHA FROM t_customer_legal_id a JOIN t_id_type b ON a.ID_ID=b.ID_ID JOIN t_geo_country c ON b.COU_ID=c.COU_ISO_ALPHA`,(err,res)=>{
    if (err) {
      //console.log("testing")
     result(err, null);
     return;
   }
   result(null,res);
     return;
  })
}
exports.companiesEmailList=(request,result)=>{
sql.query(`SELECT * FROM t_customer WHERE ACC_ID='${request.body.CusID}'`,(err,res)=>{
  //console.log(res[0].PER_MAIL);
  if (err) {
   
   result(err, null);
   return;
 }
  const cars = [res[0].PER_MAIL,res[0].PER_SMAIL,res[0].PER_TMAIL];

 result(null,cars);
   return;
})
}
exports.EditcustomerDirectory=(Request,result)=>{
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(`UPDATE t_company_directory SET CV_PNAME='${Request.body.CV_PNAME}',CV_PLAST='${Request.body.CV_PLAST}',COU_ID='${Request.body.COU_ID}',CV_PER_NUMBER='${Request.body.CV_PER_NUMBER}',CV_SMAIL='${Request.body.CV_SMAIL}',CV_MMAIL='${Request.body.CV_MMAIL}',CV_TMAIL='${Request.body.CV_TMAIL}',CV_MPHONE='${Request.body.CV_MPHONE}',CV_SPHONE='${Request.body.CV_SPHONE}',CV_TPHONE='${Request.body.CV_TPHONE}',CV_PER_EXP='${Request.body.CV_PER_EXP}',CV_GENDER='${Request.body.CV_GENDER}',CV_DELETE='${Request.body.CV_DELETE}',CV_COMMENT='${Request.body.CV_COMMENT}',DATE_UPDATE='${date}' Where ACC_ID_COMPANY ='${Request.body.ACC_ID_COMPANY}' AND ACC_ID_CUSTOMER ='${Request.body.ACC_ID_CUSTOMER}'`,(err,res)=>{
    if (err) {
   
      result(err, null);
      return;
    }   
    result(null,res);
      return;
  })
}
exports.customerDocument=(request,result)=>{
  sql.query(`SELECT a.*,b.NAME,c.COU_ISO_ALPHA FROM t_customer_legal_id a JOIN t_id_type b ON a.ID_ID=b.ID_ID JOIN t_geo_country c ON b.COU_ID=c.COU_ISO_ALPHA WHERE a.ACC_ID='${request.body.CusID}'`,(err,res)=>{
    if (err) {
   
      result(err, null);
      return;
    }   
    result(null,res);
      return;
  })
}


exports.customerDocumentAddEdit=(request,result)=>{
  const id =uuid.v4();
  //console.log(request.body.DPER_ID)
  if(request.body.DPER_ID==""){
   sql.query(`INSERT INTO t_customer_legal_id (DPER_ID,DPER_NUMBER,ID_ID,ACC_ID,DPER_STATE,DPER_CITY,DPER_ISSUE_DATE,DPER_EXPIRED_DATE)
   VALUE ('${id}','${request.body.DPER_NUMBER}','${request.body.ID_ID}','${request.body.ACC_ID}','${request.body.DPER_STATE}','${request.body.DPER_CITY}','${request.body.DPER_ISSUE_DATE}','${request.body.DPER_EXPIRED_DATE}')`,(err,res)=>{
    if (err) {
   
      result(err, null);
      return;
    }   
    result(null,{message:"Added Customer Document  successfully"});
      return;
  
   })
  }else{
   sql.query(`UPDATE t_customer_legal_id SET ID_ID='${request.body.ID_ID}',DPER_NUMBER='${request.body.DPER_NUMBER}',DPER_STATE='${request.body.DPER_STATE}',DPER_CITY='${request.body.DPER_CITY}',DPER_ISSUE_DATE='${request.body.DPER_ISSUE_DATE}',DPER_EXPIRED_DATE='${request.body.DPER_EXPIRED_DATE}' Where ACC_ID ='${request.body.ACC_ID}' AND DPER_ID='${request.body.DPER_ID}'`,(err,res)=>{
    if (err) {
   
      result(err, null);
      return;
    }   
    result(null,{message:"Update Customer Document  successfully"});
    return;
  })
  }
}
