const employee = require('../models/employee');
const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

// Following are all the defined end-points for the employee params
//------------------------------------------------------------------------------
routes.get('/employees',async(req, res) =>{
    const newEmployee = new employee(req.body);
    try{
        await newEmployee.save();
        res.status(200).json(newEmployee);
    }catch(error){
        res.status(400).json(newEmployee);
    }
});
//------------------------------------------------------------------------------
// Get: Getting employee through the employee Id
routes.get('/employees/:empID', async(req, res) =>{
    try{
        res.status(200).json(await employee.findById(req.params.empID, req.body));
    }catch(error){
        res.status(400).json(error);
    }
});
//------------------------------------------------------------------------------
// Post: Inserting new employee into the DB using POST request
routes.post('/employees', async(req, res) =>{
    const newEmployee = new employee(req.body);
    try{
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }catch(error){
        res.status(400).json(newEmployee);
    }
});
//------------------------------------------------------------------------------
// Put: Updating an employee using employee Id
routes.put("/employees/:empID", async (req, res) => {
    try {
        const updateEmployee = await employee.findByIdAndUpdate(req.params.empID, req.body);
        res.status(200).json(updateEmployee);
    } 
    catch (error) {
        // if employee was not found
        if (error.kind === "ObjectId") {
            res.status(400).json({ "message": `employee with id: ${req.params.empID} was not found` });
        }
        else {
            res.status(400).json({ "message": error.message })
        }
    }
});
//------------------------------------------------------------------------------
// Delete: Deleting an employee using the employee Id
routes.delete("/employees/:empID", async(req, res) =>{
    try{
        await employee.findByIdAndDelete(req.params.empID);
        res.json("SUCCESS: Employee deleted sucessfully");
        res.status(204);
    }
    catch(error){
        res.status(400).json("FAILURE: Employee not deleted.");
    }
});

module.exports = routes;