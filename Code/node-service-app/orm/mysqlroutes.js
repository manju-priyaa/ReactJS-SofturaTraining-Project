const model=require('../orm/model')
const route=require("express").Router();
const sequelize = require('./connection');
const { QueryTypes } = require('sequelize');
const employees=model.employees;
const softlock=model.softlock;
const passport=require('passport')

route.get("/employees",async function(request,response){

    try{
      sequelize.query('select e.employee_id as EmployeeID,e.name as Name,group_concat(s.name) as Skills,e.lockstatus as Status,e.experience as Experince, e.manager as Manager, e.wfm_manager as WFMManager from employee e  join skillmap sk on e.employee_id=sk.employee_id join skills s on sk.skillid=s.skillid where e.lockstatus="not_requested" group by e.employee_id;',
      {model:employees ,mapToModel:true,type: sequelize.QueryTypes.SELECT}
      ).then(function(employees){
  
        response.json(employees)
    })
    }
    catch(e){
      console.log(e)
      response.status(500)
    }
  })

  //select s.employee_id as EmployeeID,s.manager as Name,s.reqdate as ReqDate,s.requestmessage as ReqMessage,s.status as Status from softlock s join employee e on e.employee_id=s.employee_id where e.wfm_manager like :managername and e.lockstatus='request_waiting' and s.status='waiting'
  route.get("/softlocktable",async function(request,response){

    try{
      sequelize.query("select s.employee_id as EmployeeID, s.manager as Requestee,s.reqdate as RequestDate,s.requestmessage as RequestMessage,s.status as Status,e.wfm_manager as WFMManager from softlock s join employee e on s.employee_id=e.employee_id where e.lockstatus='request_waiting' and s.status='waiting';",
      {model:softlock ,mapToModel:true,type: sequelize.QueryTypes.SELECT}
      ).then(function(softlock){
  
        response.json(softlock)
    })
    }
    catch(e){
      console.log(e)
      response.status(500)
    }
  })


  route.put("/updateemployee", async function (request, response) {
    try{
      let employeeid = request.body.employeeid;
      await sequelize.query("update employee set lockstatus='request_waiting' where employee_id=:employeeid;",
      {replacements: {employeeid: employeeid},model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
      ).then(function(employees){
          response.status(200).send("record updated");
      })
  }
  catch(e){
      console.log(e)
      response.status(500)
  }
 })


 route.post("/insertsoftlock",async function(request,response){
  try{
      let employeeid = request.body.employeeid;
      let manager = request.body.manager;
      let responsemessage = request.body.responsemessage;
      await sequelize.query("insert into softlock (employee_id,manager,reqdate,lastupdated,status,requestmessage) values(?,?,CurDate(),CurDate(),'waiting',?)",
      {replacements: [employeeid,manager,responsemessage],model:softlock,mapToModel: true,type:sequelize.QueryTypes.INSERT}
      ).then(function(){
          response.status(200).send("record inserted");
      })
  }
  catch(e){
      console.log(e)
      response.status(500);
  }
})

route.put("/updateSoftlock",async function(request,response){
  try{
      let employeeid = request.body.employeeid;
      let status=request.body.status;
      await sequelize.query("update softlock set status=:status ,lastupdated =CURDATE() where employee_id = :employeeid",
      {replacements: {employeeid: employeeid,status:status}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
      ).then(function(){
          response.status(200).json()
      })
      if(status=="Approved")
      {
        await sequelize.query("update employee set lockstatus = 'locked' where employee_id = :employeeid",
        {replacements: {employeeid: employeeid}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
        ).then(function(){
            response.status(200).json()
        })
      }
      else
      {
        await sequelize.query("update employee set lockstatus = 'not_requested' where employee_id = :employeeid",
        {replacements: {employeeid: employeeid}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
        ).then(function(){
            response.status(200).json()
        })
      }
  }
  catch(e){
      console.log(e)
      response.status(500);
  }
})



module.exports=route;