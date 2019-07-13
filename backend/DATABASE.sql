CREATE DATABASE alseco;

CREATE TABLE alseco.employees (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id)
);

CREATE TABLE alseco.stuff (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    employee_id INT UNSIGNED,
    price FLOAT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id),
    FOREIGN KEY (employee_id) 
    REFERENCES alseco.employees(id) 
    ON DELETE SET NULL
);

-- INSERT EMPLOYEE
INSERT INTO alseco.employees 
    (last_name, first_name, middle_name)
VALUES 
    ("Старков", "Антони", "Говардович");

-- INSERT STUFF
INSERT INTO alseco.stuff 
    (name, price)
VALUES 
    ("Костюм железного человека", 150000);

-- ALL
SELECT 
    alseco.employees.id,
    alseco.employees.first_name, 
    alseco.employees.last_name, 
    alseco.employees.middle_name, 
    alseco.stuff.id as stuff_id, 
    alseco.stuff.employee_id, 
    alseco.stuff.name as stuff_name, 
    alseco.stuff.price as stuff_price
FROM alseco.employees
JOIN alseco.stuff ON alseco.employees.id = alseco.stuff.employee_id

-- BY ID
SELECT 
    alseco.employees.id,
    alseco.employees.first_name, 
    alseco.employees.last_name, 
    alseco.employees.middle_name, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', alseco.stuff.name, 
            'price', alseco.stuff.price
            )
        ) AS 'stuff'
FROM alseco.employees
JOIN alseco.stuff 
ON alseco.employees.id = alseco.stuff.employees_id
WHERE alseco.employees.id = $id;
