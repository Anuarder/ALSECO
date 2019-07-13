const database = require('./../modules/database');
const isArrayEmpty = (array) => array.length === 0 && array === undefined ? true : false;

module.exports = {
    async getStuff(req, res){
        try{
            let stuff = await database.query(`SELECT * FROM stuff`);
            if(!isArrayEmpty(stuff)){
                res.send({
                    stuff: stuff
                });
            }else{
                res.status(404).send({
                    error: "Not found"
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async addNewStuff(req, res){
        try{
            let response = await database.query(`
                INSERT INTO alseco.stuff (name, price)
                VALUES ("${req.body.name}",  ${req.body.price});
            `);
            res.send({
                message: "stuff was added",
                stuff_id: response.insertId,
                status: true
            });
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async deleteStuff(req, res){
        try{
            let response = await database.query(`
                DELETE FROM alseco.stuff
                WHERE id = '${req.params.id}';
            `);
            if(response.affectedRows === 0){
                res.status(404).send({
                    error: `Stuff ${req.params.id} not found`,
                    status: false
                })
            }else{
                res.send({
                    message: `Stuff ${req.params.id} was deleted`,
                    status: true
                });
            }
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    },
    async updateStuff(req, res){
        try{
            let { id, name, price, employee_id } = req.body;
            let response = await database.query(`
                UPDATE alseco.stuff
                SET 
                name = "${name}",
                price = ${price},
                employee_id = ${employee_id}
                WHERE id = ${id};
            `);
            if(response.affectedRows == 0){
                res.status(404).send({
                    error: `Stuff ${id} not found`,
                    status: false
                });
            }else{
                res.send({
                    message: `Stuff ${id} was updated`,
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
    async giveStuffToEmployee(req, res){
        try{
            let response = await database.query(`
                UPDATE alseco.stuff
                SET employee_id = ${req.body.employee_id}
                WHERE id = ${req.body.id}
            `);
            console.log(response);
            res.send({
                message: `Stuff given to an employee with ID ${req.body.id}`,
                status: true
            })
        }catch(err){
            console.log(err);
            res.status(400).send({
                error: err
            });
        }
    }
}
