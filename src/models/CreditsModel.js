const sql = require('../config/dbConnection');
var uuid = require('uuid');

exports.Credits=(request,result)=>{
    const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
    const id =uuid.v4();
    sql.query(`INSERT INTO t_plan_purchase (ID_PLAN_PURCHASE,ACC_ID,TYPE_A,TYPE_B,TYPE_C,TYPE_D,TYPE_A_PRICE,TYPE_B_PRICE,TYPE_C_PRICE,TYPE_D_PRICE,COMMENTS,DATE_BEGIN,DATE_END,CURRENCY,DATE,STATUS,PRICE) VALUE ('${id}','${request.body.ACC_ID}','${request.body.saleA}','${request.body.saleB}','${request.body.saleC}','${request.body.saleD}','${request.body.NumberA}', '${request.body.NumberB}','${request.body.NumberC}','${request.body.NumberD}','${request.body.comment}','${request.body.dateBegin}','${request.body.dateend}','${request.body.currency}','${date}',"A",'${request.body.price}')`,(err,res)=>{
    if (err) {
     // console.log("testing")
      result(err, null);
      return;
    }
      result(null,res);
      return;
  });
}
exports.singleCreditsDetail=(request,result)=>{
  sql.query(`Select * From t_plan_purchase where ID_PLAN_PURCHASE='${request.body.ID.id}'`,(err,res)=>{
    if (err) {
    //  console.log("testing")
      result(err, null);
      return;
    }
      result(null,res);
      return;
  });

}
exports.updateCredits=(Request,result)=>{
  var query = sql.query(`UPDATE t_plan_purchase SET ACC_ID='${Request.body.ACC_ID}',TYPE_A='${Request.body.saleA}',TYPE_B='${Request.body.saleB}',TYPE_C='${Request.body.saleC}',TYPE_D='${Request.body.saleD}',TYPE_A_PRICE='${Request.body.NumberA}',TYPE_B_PRICE='${Request.body.NumberB}',TYPE_C_PRICE='${Request.body.NumberC}',TYPE_D_PRICE='${Request.body.NumberD}',COMMENTS='${Request.body.comment}',DATE_BEGIN='${Request.body.dateBegin}',DATE_END='${Request.body.dateend}',CURRENCY='${Request.body.currency}',PRICE='${Request.body.price}' Where ID_PLAN_PURCHASE ='${Request.body.ID_PLAN}'`,(err,res)=>{
    if (err) {
     // console.log("testing")
      result(err, null);
      return;
    }
   // console.log("testing 1")
      result(null,res);
      return;
  })
 // console.log(query.sql);
}
exports.deletecustomerPlan=(request,result)=>{
sql.query(`update t_plan_purchase set deleted_at=1 where ID_PLAN_PURCHASE = '${request.body.ID}'`,(err,res)=>{

  if (err) {
     result(err, null);
     return;
   }
     result(null,res);
     return;
  })
}
exports.singlecustomerPlan=(request,result)=>{
  sql.query(`select * from t_plan_customer where ACC_ID='${request.body.ID.id}'`,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }
      result(null,res);
      return;
  })
}
exports.customerPlan=(request,result)=>{
  const id =uuid.v4();
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(request.body.ACC_ID);
  sql.query(`select count(ACC_ID) as countplan from t_plan_customer where ACC_ID='${request.body.ACC_ID}'`,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }
    //console.log(res);
    if(res[0].countplan==0){

     var dataprint= sql.query(`insert into t_plan_customer (ID_PLAN_CUSTOMER,ON_DEMAND,TYPE_A_SPENT,TYPE_B_SPENT,TYPE_C_SPENT,TYPE_D_SPENT,TYPE_A_TOTAL,TYPE_B_TOTAL,TYPE_C_TOTAL,TYPE_D_TOTAL,ACC_ID,LAST_CREDITS,LAST_CONSUMPTION) value ('${id}','${request.body.ondemand}','${request.body.TYPE_A_SPENT}','${request.body.TYPE_B_SPENT}','${request.body.TYPE_C_SPENT}','${request.body.TYPE_D_SPENT}','${request.body.TYPE_A_TOTAL}','${request.body.TYPE_B_TOTAL}','${request.body.TYPE_C_TOTAL}','${request.body.TYPE_D_TOTAL}','${request.body.ACC_ID}','${date}','${date}')`,(error,resadd)=>{

        if (error) {
          result(error, null);
          return;
        }
          result(null,resadd);
          return;
      })
     // console.log(dataprint.sql);
    }else{
      result({message: "Add customer plan only one time"},null);
      return;
    }
  })
}
exports.updatecustomerPlan=(request,result)=>{
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query(`update t_plan_customer set ON_DEMAND='${request.body.ondemand}',TYPE_A_SPENT='${request.body.TYPE_A_SPENT}',TYPE_B_SPENT='${request.body.TYPE_B_SPENT}',TYPE_C_SPENT='${request.body.TYPE_C_SPENT}',TYPE_D_SPENT='${request.body.TYPE_D_SPENT}',TYPE_A_TOTAL='${request.body.TYPE_A_TOTAL}',TYPE_B_TOTAL='${request.body.TYPE_B_TOTAL}',TYPE_C_TOTAL='${request.body.TYPE_C_TOTAL}',TYPE_D_TOTAL='${request.body.TYPE_D_TOTAL}',ACC_ID='${request.body.ACC_ID}',LAST_CONSUMPTION='${date}' where ID_PLAN_CUSTOMER='${request.body.ID_PLAN_CUSTOMER}'`,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }
      result(null,res);
      return;
  })
}