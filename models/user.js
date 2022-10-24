const mongoose = require('mongoose');

// Defining field names, types, and the constraints as per the assignment's requirements
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        primaryKey:true,
        max:100,
    },
    email:{
        type:String,
        trim: true,
        require:true,
        unique: true,
        max: 50,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'WARNING: Please fill a valid email address.']
    },
    password:{
        type:String,
        require:true,
        unique:true,
        max:50,
    }
});

module.exports = mongoose.model('user',userSchema);
