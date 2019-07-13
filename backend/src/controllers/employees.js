const database = require('./../modules/database');

const isArrayEmpty = (array) => array.length === 0 && array === undefined ? true : false;

module.exports = {
    async getEmployees(req, res){
        try{
            let employees = await database.query(`
                SELECT * FROM alseco.employees;
            `);
            let stuff_arr = await database.query(`
                SELECT * FROM alseco.stuff;
            `);
            if(!isArrayEmpty(employees) && !isArrayEmpty(stuff_arr)){
                let data = [];
                for(let employee of employees){
                    let employee_stuff = [];
                    for(let stuff of stuff_arr){
                        if(employee.id == stuff.employee_id){
                            employee_stuff.push(stuff);
                        }
                    }
                    data.push({
                        id: employee.id,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        middle_name: employee.middle_name,
                        stuff: employee_stuff
                    });
                }
                res.send(data);
            }else{
                res.status(404).send({
                    error: "Data not found",
                    status: false
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({error: err});
        }
    },
    async getEmployeeByID(req, res){
        try{
            let employees = await database.query(`
                SELECT * FROM alseco.employees WHERE id = ${req.params.id};
            `);
            let stuff_arr = await database.query(`
                SELECT * FROM alseco.stuff WHERE employee_id = ${req.params.id};
            `);
            if(!isArrayEmpty(employees) && !isArrayEmpty(stuff_arr)){
                let data = [];
                for(let employee of employees){
                    let employee_stuff = [];
                    for(let stuff of stuff_arr){
                        if(employee.id == stuff.employee_id){
                            employee_stuff.push(stuff);
                        }
                    }
                    data.push({
                        id: employee.id,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        middle_name: employee.middle_name,
                        stuff: employee_stuff
                    });
                }
                res.send(data[0]);
            }else{
                res.status(404).send({
                    error: "Data not found",
                    status: false
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async addEmployee(req, res){
        try{
            let employee = await database.query(`
                INSERT INTO alseco.employees 
                    (first_name, last_name, middle_name)
                VALUES 
                    ("${req.body.first_name}", "${req.body.last_name}", "${req.body.middle_name}");
            `);
            if(!isArrayEmpty(req.body.stuff)){ // Проверка на наличие stuff у нового сотрудника
                for(let item of req.body.stuff){
                    let stuff = await database.query(`
                        UPDATE alseco.stuff
                        SET employee_id = ${employee.insertId}
                        WHERE id = ${item.id};
                    `);
                    console.log(stuff);
                }
            }
            res.send({
                message: "Employee was added",
                employee_id: employee.insertId,
                status: true
            });
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async updateEmployee(req, res){
        try{
            let { id, first_name, last_name, middle_name } = req.body;
            let response = await database.query(`
                UPDATE alseco.employees
                SET 
                first_name = "${first_name}",
                last_name = "${last_name}",
                middle_name = "${middle_name}"
                WHERE id = ${id};
            `);
            if(response.affectedRows == 0){
                res.status(404).send({
                    error: `Employee ${id} not found`,
                    status: false
                });
            }else{
                res.send({
                    message: `Employee ${id} was updated`,
                    status: true
                })
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async deleteEmployee(req, res){
        try{
            let response = await database.query(`
                DELETE FROM alseco.employees
                WHERE id = ${req.params.id}
            `);
            if(response.affectedRows === 0){
                res.status(404).send({
                    error: `Employee ${req.params.id} not found`,
                    status: false
                })
            }else{
                res.send({
                    message: `Employee ${req.params.id} was deleted`,
                    status: true
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({error: err});
        }
    },
}