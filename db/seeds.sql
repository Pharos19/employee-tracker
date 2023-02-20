INSERT INTO department(name)
VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal");

INSERT INTO roles(title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
("Sales Manager", 1000000, 1),
("Regional Manager", 110000, 2),
("Account Manager", 130000, 2),
("Junior Developer", 135000, 3),
("Senior Developer", 165000, 3),
("Controller", 178000, 4),
("President", 250000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Hemsworth", 2, NULL),
("Dean", "Winchester", 1, 1),
("Sam", "Winchester", 4, NULL),
("Walter", "White", 3, 3),
("Jesse", "Pinkman", 6, NULL),
("Naruto", "Uzimaki", 5, 5),
("Sasuke", "Uchiha", 8, NULL),
("Mister", "Beast", 7, 7);