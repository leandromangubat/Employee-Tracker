const inquirer = require("inquirer");
const db = require("./db/queries.js");

const init = () => {
    console.log("Welcome to Employee Tracker!");
    menu();
};

menu = () => {
    inquirer.prompt(menuQs)
    .then((answers) => {
        if (answers.menu == "View all departments") {
            viewDepartments();
        } else if(answers.menu == "View all roles"){
            viewRoles();
        } else if(answers.menu == "View all employees"){
            viewEmployees();
        } else if(answers.menu == "Add a department"){
            inquirer.prompt({
                type: "input",
                message: "Please type in the department you would like to add.",
                name: "dept"
            }).then((answer) => {
                addDepartment(answer.dept);
            });
        } else if(answers.menu == "Add a role"){
            inquirer.prompt(roleQs).then((answer) => {
                let roleInfo = [answer.role, answer.salary, answer.dept];
                addRole(roleInfo);
            });
        } else if(answers.menu == "Add an employee"){
            inquirer.prompt(newEmpQs).then((answer) => {
                let employeeInfo = [
                    answer.firstName,
                    answer.lastName,
                    answer.role,
                    answer.manager
                ];
                addEmployee(employeeInfo);
            });
        } else if(answers.menu == "Update employee role"){
            updateEmployee();
        } else if(answers.menu == "Delete an employee"){
            deleteEmp();
        } else if(answers.menu == "Delete a department"){
            deleteDept();
        } else if(answers.menu == "Delete a role"){
            deleteRole();
        } else{
            process.exit();
        }
    }).catch((err) => {
        console.log(err);
    });
};

const menuQs = [{
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Delete an employee",
        "Delete a department",
        "Delete a role",
        "Exit"
    ]
}];
const roleQs = [
    {
        type: "input",
        message: "Please type in the role you would like to add.",
        name: "role"
    },
    {
        type: "input",
        message: "Please type in the salary for this role.",
        name: "salary"
    },
    {
        type: "input",
        message: "Please type in a department id for this role",
        name: "dept",
        default: "1001"
    }
]
const newEmpQs = [
    {
        type: "input",
        message: "Please type in the employee's first name.",
        name: "firstName"
    },
    {
        type: "input",
        message: "Please type in the employee's last name",
        name: "lastName"
    },
    {
        type: "list",
        message: "Please select employee's role id",
        name: "role",
        choices: [
            "1.) Web Developer",
            "2.) Sales Associate",
            "3.) Accountant",
            "4.) Customer Liason",
            "5.) Engineer",
            "6.) Sales Supervisor",
            "7.) Finance Manager",
            "8.) Engineering Manager",
        ],
        filter: function(value) {
            return value.split(".")[0].trim();
        }
    },
    {
        type: "list",
        message: "Please select a manager",
        name: "manager",
        choices: [
            "1.) Marcus Aurelius",
            "2.) Marc Antony",
            "3.) Julius Caesar",
            "4.) Octavian Augustus",
        ],
        filter: function(value) {
            return value.split(".")[0].trim();
        },
    }
]


init();

async function viewEmployees(){
    let employees = await db.viewAllEmployees();
    console.table(employees);
    menu();
}

async function viewDepartments(){
    let departments = await db.viewAllDepartments();
    console.table(departments);
    menu();
}

async function viewRoles(){
    let roles = await db.viewAllRoles();
    console.table(roles);
    menu();
}

async function addDepartment(newDept){
    await db.addNewDepartment(newDept);
    viewDepartments();
}

async function addRole(newRole, salary, deptId) {
    await db.addNewRole(newRole, salary, deptId);
    viewRoles();
  }

async function addEmployee(employeeInfo){
    await db.addNewEmployee(employeeInfo);
    viewEmployees();
}

async function updateEmployee(){
    let empArr = await listEmployees();
    let roleArr = await listRoles();

    inquirer.prompt([
        {
            type: "list",
            message: "Please choose an employee to update",
            name: "employee",
            choices: empArr
        },
        {
        type: "list",
        message: "Please select employee's role id",
        name: "role",
        choices: roleArr
        }
    ]).then((answer) => {
        let empName = answer.employee.split(" ");
        let first_name = empName[0];
        let last_name = empName[1];
        let updateInfo = [answer.role, first_name, last_name];
        writeUpdate(updateInfo);
    });
}

async function writeUpdate(updateInfo){
    await db.updateRole(updateInfo);
}

async function deleteEmp(name) {
    let empArr = await listEmployees();
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose an employee to delete.",
            name: "employee",
            choices: empArr
        }
    ]).then((answer) => {
        let empName = answer.employee.split(" ");
        let first_name = empName[0];
        let last_name = empName[1];
        let deletedEmp = [first_name, last_name];
        db.delEmp(deletedEmp);
    });  
}

async function deleteDept() {
    let departments = await listDept();
    inquirer.prompt([
        {
            type: "list",
            message: "Please select the department you would like to delete.",
            name: "dept",
            choices: departments
        }
    ]).then((answer) => {
        db.delDept(answer.dept);
    });
}

async function deleteRole(){
    let roles = await listRoles();
    inquirer.prompt([
        {
            type: "list",
            message: "Please select a role you would like to delete.",
            name: "role",
            choices: roles
        }
    ]).then((answer) => {
        db.delRole(answer.role);
    });
}

async function listEmployees(){
    let empArr = [];
    let employees = await db.employeeNames();
    Object.keys(employees).forEach(function (key){
        let row = employees[key];
        empArr.push(row.employee_name);
    });
    return empArr;
}

async function listDept(){
    let deptArr = [];
    let depts = await db.departmentNames();
    Object.keys(depts).forEach(function (key) {
        let row = depts[key];
        deptArr.push(row.departments);
    });
    return deptArr;
}

async function listRoles(){
    let roleArr = [];
    let roles = await db.roleNames();
    Object.keys(roles).forEach(function (key) {
        let row = roles[key];
        roleArr.push(row.roles);
    });
    return roleArr;
}