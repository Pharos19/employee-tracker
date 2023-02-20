INSERT INTO department(name)
VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
("Sales Manager", 1000000, 1),
("Accountant", 110000, 2),
("Account Manager", 130000, 2),
("Software Engineer", 135000, 3),
("Lead Engineer", 165000, 3),
("Lawyer", 178000, 4),
("Legal Team Lead", 250000, 4);

INSERT INTO employees