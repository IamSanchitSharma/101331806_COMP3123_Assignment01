// Calling in the required modules to achieve requirements
const mongoose = require('mongoose');
const float = require('mongoose-float').loadType(mongoose);

// Defining field names, types, and the constraints as per the assignment's requirements
const employeeSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true,
        unique:true,
        max:100,
    },
    last_name:{
        type:String,
        require:true,
        unique:true,
        max:50,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        max:50,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'WARNING: Please fill a valid email address.']
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        max:25,
    },

    salary:{
        type:float,
        require:true,
        unique:true,
    }

});

module.exports = mongoose.model('employee',employeeSchema);