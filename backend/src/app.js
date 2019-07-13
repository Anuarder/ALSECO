const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/config");

const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
 })); 
app.use(bodyParser.json());


//Routes initialize
const employeesRouter = require('./routers/employees');
const stuffRouter = require('./routers/stuff');

//App routes
app.use(employeesRouter);
app.use(stuffRouter);
app.get('/', (req, res) => {
    res.send({
        message: "Server work"
    });
});


// Route not found
app.use((req, res, next) => res.status(404).send({ url: req.url, message: `route_not_found` }));

// Start server
app.listen(config.port, (err) =>{
    if(err){
        console.log(`Server error: ${err}`);
    }else{
        console.log(`Server running on port ${config.port}`);
    }
});