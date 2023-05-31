const connection = require("./connection");

class DB {  
    constructor(connection){
        this.connection = connection;
    }
    viewAllEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee. role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }
    viewAllDepartments(){
        return this.connection.query(
            "SELECT * FROM department;"
        )
    }
    viewAllRoles(){
        return this.connection.query(
            "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;"
        )
    }
    addNewDepartment(newDept){
        return this.connection.query(
            "INSERT INTO department (name) VALUES (?)",
            newDept,(err, res) => {
                if (err){
                    throw err;
                } else{
                    console.log(`New department added ${newDept}`);
                    menu();
                }
            }
        );
    }
    addNewRole(roleInfo){
        return this.connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE name = ? ));",
            roleInfo, (err, res) => {
                if(err){
                    console.log(err);
                } else{
                    console.log(`New role added: ${roleInfo[0]}`);
                    menu();
                }
            }
        );
    }
    updateRole(updateInfo){
        return this.connection.query(
            "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE first_name = ? AND last_name = ?;",
            updateInfo, (err, res) => {
                if(err){
                    throw err;
                } else{
                    console.log(`Updated ${updateInfo[1]} ${updateInfo[2]}'s role id to ${updateInfo[0]}`);
                    menu();
                }
            }
        );
    }
    addNewEmployee(employeeInfo){
        return this.connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?), ?)",
            employeeInfo, (err, res) => {
                if(err){
                    console.log(err);
                } else{
                    console.log(`New employee added: ${employeeInfo[0]} ${employeeInfo[1]}`);
                    menu();
                }
            }
        )
    }
    employeeNames(){
        return this.connection.query(
            "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee_name FROM employee;"
        );
    }
    departmentNames(){
        return this.connection.query(
            "SELECT department.name AS departments FROM department;"
        );
    }
    roleNames(){
        return this.connection.query(
            "SELECT role.title AS roles FROM role;"
        );
    }
    delEmp(name){
        return this.connection.query(
            "DELETE FROM employee WHERE first_name = ? AND last_name = ?;",
            name, (err, res) => {
                if(err){
                    throw err;
                } else{
                    console.log(`Employee has been deleted: ${name[0]} ${name[1]}`);
                    menu();
                }
            }
        );
    }
    delDept(dept){
        return this.connection.query(
            "DELETE FROM department WHERE name = ?;",
            dept, (err, res) => {
                if(err){
                    throw err;
                } else{
                    console.log(`Deleted department: ${dept}`);
                    menu();
                }
            }
        );
    }
    delRole(role){
        return this.connection.query(
            "DELETE FROM role WHERE title = ?;",
            role, (err, res) => {
                if(err){
                    throw err;
                } else{
                    console.log(`Deleted roll: ${role}`);
                    menu();
                }
            }
        );
    }
}

module.exports = new DB(connection);