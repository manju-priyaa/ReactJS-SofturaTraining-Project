const Sequelize = require('sequelize');
var sequelize=require('./connection');

var user=sequelize.define('user',{
    username:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
},{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}

  );


  var employees=sequelize.define('employees',{

    employee_id:{
      type: Sequelize.NUMBER,
      primaryKey:true
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    skill:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    status:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    experience:{
      type: Sequelize.NUMBER,
      allowNull:false
    },
    manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    wfm_manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    lockstatus:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    profile_id:{
      type: Sequelize.INTEGER,
      allowNull:false
    }
  },
  {
        //don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false
  }
    );


   var softlock=sequelize.define('softlock',{

    employee_id:{
      type: Sequelize.NUMBER,
      primaryKey:true
    },
    manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    status:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    lastupdated:{
      type:Sequelize.DATEONLY,
      allowNull:false
    },
    lockid:{
      type:Sequelize.INTEGER,
      primaryKey:true
    },
    reqdate:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    requestmessage:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    wfm_manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    lockstatus:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    wfmremark:{
      type: Sequelize.TEXT,
      allowNull:true
    },
    managerstatus:{
      type:Sequelize.TEXT,
      allowNull:true
    },
    mgrstatuscomment:{
      type:Sequelize.TEXT,
      allowNull:true
    },
    mgrlastupdate:{
      type:Sequelize.DATEONLY,
      allowNull:true
    }
  },
  {
        //don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false
  }
    );



user.sync({force: false}).then(() => {
    
  console.log("User table Synched!!!");
});



employees.sync({force: false}).then(() => {
  console.log("employees table Synched!!!");

});


softlock.sync({force: false}).then(() => {
  console.log("softlock table Synched!!!");

});

 


    module.exports={user:user,employees:employees,softlock:softlock};
    //,employees:employees,softlock:softlock
    // module.exports={employees:employees};