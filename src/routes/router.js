const express = require('express');
const router = express.Router();
const db  = require('../config/dbConnection');
const {loginValidation } = require('../Validation/validation');
//const { validationResult } = require('express-validator');
const Company=require("../Controller/CompanyController");
const staff=require("../Controller/staffControllers");
const Comman=require("../Controller/commanController");
const Credits=require("../Controller/CreditsController");
const Customer=require('../Controller/customerController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 
 
router.post('/login', loginValidation, (req, res, next) => {
  console.log(req.body.password)
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(req.body.password, salt, function(err, hash) {
    //               // Store hash in database here
    //               console.log(hash);
    //      });
    //   });
    if(!req.body.password && req.body.password==null){
        return res.status(400).send({
            success:'false',
          msg: 'password is empty!'
          });
    }
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
        // console.log(result)
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
            success:'false',
          msg: 'Invalid Credentials !'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
                success:'false',
              msg: 'Email or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect');
            return res.status(200).send({
              success:'true',
              msg: 'Login Successfully!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            success:'false',
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
});

router.post('/profile', loginValidation, (req, res) => {
  if(!req.body.id && req.body.id==null){
    return res.status(400).send({
      success:'false',
    msg: 'user_id  is empty!'
    });
  }
    db.query(`SELECT * FROM users WHERE id=${db.escape(req.body.id)};`,(err, result)=>{
      if (err) {
        return res.status(400).send({
          success:'false',
          msg:"some went worng"
        });
      }
      return res.status(200).send({
        success:'true',
        user: result[0]
      });
    });
});
// company
router.post("/companiesList", Company.List);
router.post('/singleCompaniesList',Company.singleCompaniesList);
router.post("/addCompany", Company.addCompany);
router.post('/updatecompanieslist',Company.updateCompaniesList);
router.post('/deleteCompany',Company.deleteCompany);

// Staff addStaff
router.post('/staffByCompany',staff.staffByCompany);
router.post('/addStaff',staff.addStaff);
router.post('/singleStaffList',staff.singleStaffList);
router.post('/updateStaffList',staff.updateStaffList);
router.post('/deleteStaff',staff.deleteStaff);
// CommongeoTimezone
router.post('/geoTimezone',Comman.geoTimezone);
router.post('/geocountry',Comman.geocountry);
router.post('/Tlanguage',Comman.Tlanguage);
router.post('/roleinCompany',Comman.roleinCompany);
router.post('/companyBranch',Comman.companyBranch);
router.post('/CURRENCY',Comman.CURRENCY);
router.post('/department',Comman.department);
//Credits
router.post('/customersPlans',Company.customersPlans);
router.post('/addCredits',Credits.Credits);
router.post('/singleCreditsDetail',Credits.singleCreditsDetail);
router.post('/updateCredits',Credits.updateCredits);
router.post('/deletecustomerPlan',Credits.deletecustomerPlan);
//PLan
router.post('/singlecustomerPlan',Credits.singlecustomerPlan);
router.post('/customerPlan',Credits.customerPlan);
router.post('/updatecustomerPlan',Credits.updatecustomerPlan);
// router.post('/updatecustomerPlan',Credits.updatecustomer);
// customer 
router.post('/customerList',Customer.customerList);
router.post('/EditcustomerList',Customer.EditcustomerList);
router.post('/CustomerAddedTable',Customer.CustomerAddedTable);
router.post('/customer_legal',Customer.customer_legal);
router.post('/companiesEmailList',Customer.companiesEmailList);

router.post('/EditcustomerDirectory',Customer.EditcustomerDirectory);
router.post('/customerDocument',Customer.customerDocument);
router.post('/customerDocumentAddEdit',Customer.customerDocumentAddEdit);
module.exports = router;