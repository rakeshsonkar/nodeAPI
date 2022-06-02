const sql = require('../config/dbConnection');
var uuid = require('uuid');


exports.staffByCompanys = (request, result) => {
  const resultrecord = [];
  //console.log("testing model");
  sql.query(`SELECT a.ACC_ID,a.STAFF_ID,a.CUSR_FNAME,a.CUSR_LNAME,a.CUSR_EMAIL FROM t_company_staff a  WHERE a.status=0 and a.ACC_ID = '${request.body.Uid}'`, (err, res) => { 
    if (err) {
      result(err, null);
      return;
    }
      res.forEach(e => {
        var arr = {};
        arr["ACC_ID"] = e.ACC_ID;
        arr["STAFF_ID"] = e.STAFF_ID;
        arr["CUSR_FNAME"] = e.CUSR_FNAME;
        arr["CUSR_LNAME"] = e.CUSR_LNAME;
        arr["CUSR_EMAIL"] = e.CUSR_EMAIL;
        arr["Password"] = null;
        sql.query(`SELECT * FROM t_record_security_staff WHERE STAFF_ID='${e.STAFF_ID}'`,(err1, resl) => {
         // console.log(resl)
          if (err1) {
            result(err, null);
            return;
          }
          arr['Alllogin'] = resl;
          //resultrecord.push(arr);
         })
        // console.log('out map')
    
        sql.query(`SELECT CROL_NAME FROM t_company_role WHERE CROL_ID IN (SELECT CROL_ID FROM t_company_staff_role WHERE STAFF_ID ='${e.STAFF_ID}');`,(error, resp) => {
          if (error) {
            result(err, null);
            return;
          }
          arr["role"] = resp;
          resultrecord.push(arr);
        });
      }); 
      setTimeout(() => {
        result(null, resultrecord);
      return;
        }, 200);
  });

} 
exports.addStaff=async(request,result) => {
  const date=new Date().toISOString().slice(0, 19).replace('T', ' ');
  const id =uuid.v4();
  
  sql.beginTransaction(function(err) {
    if (err) { throw err; }
    sql.query(`INSERT INTO t_company_staff (STAFF_ID,CUSR_FNAME,ACC_ID,CUSR_LNAME,CUSR_EMAIL,CUSR_PHONE,TMZ_ID,CUSR_STATE,CBR_ID,CDEPT_ID,CUSR_CDATE,CUSR_UDATE) 
    VALUE ('${id}','${request.body.FirstName}','${request.body.ACC_ID}','${request.body.LastName}','${request.body.email}','${request.body.PhoneNumber}','${request.body.timeZone}','${request.body.State}',
    '${request.body.CBR_ID}','${request.body.Depart}','${date}','${date}')`,(error, results, fields)=>{
      if (error) {
        return sql.rollback(function() {
          throw error;
        });
      }
      JSON.parse(request.body.role).forEach(element => {
        var rid =uuid.v4();
        sql.query(`INSERT INTO t_company_staff_role (CUT_ID,STAFF_ID,CROL_ID) VALUE('${rid}','${id}','${element.value}' )`, function (error, results, fields) {
            if (error) {
              return sql.rollback(function() {
                throw error;
              });
            }
            sql.commit(function(err) {
              if (err) {
                return sql.rollback(function() {
                  throw err;
                });
              }
            });  
      });
      });
      return result(null,results);
    });
    
  });
} 
exports.singleStaffList=(request,result)=>{
  const resultrecord = [];
  //console.log("testing model");
  sql.query(`SELECT a.ACC_ID,a.STAFF_ID,a.CUSR_FNAME,a.CUSR_LNAME,a.CUSR_EMAIL,a.TMZ_ID,a.CUSR_PHONE,a.CUSR_STATE,a.CBR_ID,a.CDEPT_ID FROM t_company_staff a  WHERE  a.STAFF_ID = '${request.body.STAFF_ID.id}'`, (err, res) => { 
    if (err) {
      result(err, null);
      return;
    }
      res.forEach(e => {
        var arr = {};
        arr["ACC_ID"] = e.ACC_ID;
        arr["STAFF_ID"] = e.STAFF_ID;
        arr["CUSR_FNAME"] = e.CUSR_FNAME;
        arr["CUSR_LNAME"] = e.CUSR_LNAME;
        arr["CUSR_EMAIL"] = e.CUSR_EMAIL;
        arr["Password"] = null;
        arr["TMZ_ID"] = e.TMZ_ID;
        arr["CUSR_PHONE"] = e.CUSR_PHONE;
        arr["CUSR_STATE"] = e.CUSR_STATE;
        arr["CBR_ID"] = e.CBR_ID;
        arr["CDEPT_ID"] = e.CDEPT_ID;
        //console.log("testing model");
        sql.query(`SELECT * FROM t_company_staff_role a JOIN t_company_role b ON a.CROL_ID = b.CROL_ID WHERE a.STAFF_ID='${e.STAFF_ID}'`,(error, resp) => {
         // console.log(resp)
          if (error) {
            result(err, null);
            return;
          }
          arr["role"] = resp;
          resultrecord.push(arr);
        });
      }); 
      setTimeout(() => {
        result(null, resultrecord);
      return;
        }, 200);
  });
}
exports.updateStaffList=async(request,result)=>{
  var newdata=JSON.parse(request.body.newdata);
  // console.log(newdata.length!=0);
  
  sql.beginTransaction(function(err) {
    if (err) { throw err; }
    sql.query(`UPDATE t_company_staff SET CUSR_FNAME='${request.body.FirstName}',CUSR_LNAME='${request.body.LastName}',CUSR_EMAIL='${request.body.email}',CUSR_PHONE='${request.body.PhoneNumber}',TMZ_ID='${request.body.timeZone}',CUSR_STATE='${request.body.State}',CBR_ID='${request.body.CBR_ID}',CDEPT_ID='${request.body.Depart}' where STAFF_ID='${request.body.STAFF_ID}' `,(error, results, fields)=>{
      if (error) {
        return sql.rollback(function() {
          throw error;
        });
      }
      if(newdata.length!=0){
      sql.query(`DELETE FROM t_company_staff_role WHERE STAFF_ID='${request.body.STAFF_ID}'`,(error, results, fields)=>{
        if (error) {
          return sql.rollback(function() {
            throw error;
          });
        }
          JSON.parse(request.body.newdata).forEach(element => {
            var rid =uuid.v4();
            sql.query(`INSERT INTO t_company_staff_role (CUT_ID,STAFF_ID,CROL_ID) VALUE('${rid}','${request.body.STAFF_ID}','${element.value}' )`, function (error, results, fields) {
                if (error) {
                  return sql.rollback(function() {
                    throw error;
                  });
                }    
          });
          });
        
      });
    }
      sql.commit(function(err) {
        if (err) {
          return sql.rollback(function() {
            throw err;
          });
        }
      });  
      return result(null,results);
    });
    
  });


}
exports.deleteStaff=(request,result)=>{
  sql.query(`UPDATE t_company_staff SET status = 1 where STAFF_ID='${request.body.ID}'`,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
    return;
  });
}