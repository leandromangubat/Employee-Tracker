INSERT INTO department(name)
VALUES ("Sales"),
       ("Engineering"),
       ("Customer Service"),
       ("Finance");

INSERT INTO role(title, salary, department_id)
VALUES ("Web Developer", 80000, 1002),
       ("Sales Associate", 60000, 1003),
       ("Accountant", 75000, 1004),
       ("Customer Liason", 80000, 1003),
       ("Engineer", 90000, 1002),
       ("Sales Supervisor", 90000, 1003),
       ("Finance Manager", 95000, 1004),
       ("Engineering Manager", 100000, 1002);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Marcus", "Aurelius", 1, NULL),  
       ("Marc", "Antony", 7, NULL),       
       ("Julius", "Caesar", 6, NULL),
       ("Octavian", "Augustus", 5, NULL),
       ("Cleopatra", "Ptolemy", 3, 2),
       ("Pompeius", "Magnus", 3, 2),
       ("Marcus", "Crassus", 1, 4),
       ("Lucius", "Seneca", 1, 4),
       ("Antoninus", "Pius", 4, 1),
       ("Marcus", "Nerva", 4, 1),
       ("Trajanus", "Hadrianus", 2, 3),
       ("Augustus", "Germanicus", 2 ,3);