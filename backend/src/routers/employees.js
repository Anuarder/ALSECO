const EmployeesController = require('../controllers/employees');
const express = require('express');
const router = express.Router();

//* All users
router.get('/getEmployees', EmployeesController.getEmployees);
router.get('/getEmployeeByID/:id', EmployeesController.getEmployeeByID);

router.put('/updateEmployee', EmployeesController.updateEmployee);
router.post('/addEmployee', EmployeesController.addEmployee);

router.delete("/deleteEmployee/:id", EmployeesController.deleteEmployee);

module.exports = router;