const sql=require('../config/dbConnection');
exports.geoTimezone=(result)=>{
    sql.query(`SELECT * FROM t_geo_timezone ORDER BY  TMZ_DES ASC;`, (err, res) => {
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
exports.geocountry=(result)=>{
    sql.query(`SELECT * FROM t_geo_country ORDER BY COU_ISO_ALPHA  ASC;`, (err, res) => {
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

exports.Tlanguage=(result)=>{
    sql.query(`SELECT * FROM t_language  ORDER BY L_FULL_NAME  ASC;`, (err, res) => {
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
exports.roleinCompany=(result)=>{
  sql.query(`SELECT * FROM t_company_role`,(err,res)=>{
    if(err){
      result(err,null);
      return;
    }
    if(res.length){
      result(null,res);
      return;
    }
    return result({message: "not_found" }, null);
  })
  

}
exports.companyBranch=(result)=>{
  sql.query(`SELECT * FROM t_company_branch`,(err,res)=>{
    if(err){
      result(err,null);
      return;
    }
    if(res.length){
      result(null,res);
      return;
    }
    return result({message: "not_found" }, null);
  })
  
}
exports.CURRENCY=(result)=>{
 
sql.query(`SELECT * FROM t_currency `,(err,res)=>{
  //console.log(res)
  if(err){
    result(err,null);
    return;
  }
    result(null,res);
    return;
})

}
exports.department=(result)=>{
  sql.query(`SELECT * FROM t_company_dept`,(err,res)=>{
    if(err){
      result(err,null);
      return;
    }
    if(res.length){
      result(null,res);
      return;
    }
    return result({message: "not_found" }, null);
  })
}