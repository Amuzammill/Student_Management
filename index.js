import inquirer from "inquirer";
class student {
    static counter = 10000;
    id;
    name;
    course;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.course = [];
        this.balance = 100;
    }
    enroll_course(course) {
        this.course.push(course);
    }
    view_balnce() {
        console.log(`balance for ${this.name} : ${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid Succesfully for ${this.name} `);
    }
    show_status() {
        console.log(`ID :${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Course : ${this.course}`);
        console.log(`Balnce : ${this.balance}`);
    }
}
// Defing a student_manger class to mange students
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student1 = new student(name);
        this.students.push(student1);
        console.log(`Student :${name} added successfully. Student ID :${student1.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balnce();
        }
        else {
            console.log("Student not found.Please entre a correct student ID");
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found.Please enter a correct Id");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome to 'MUZAMIL AHMED'-Student Managemnet System");
    console.log("-".repeat(50));
    let student_manager1 = new student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "add student",
                    "enroll student",
                    "view student balance",
                    "pay fess",
                    "show status",
                    "Exit"
                ]
            }
        ]);
        switch (choice.choice) {
            case "add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "enter a student name",
                    }
                ]);
                student_manager1.add_student(name_input.name);
                break;
            case "enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a course name",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name",
                    }
                ]);
                student_manager1.enroll_student(course_input.student_id, course_input.course);
                break;
            case "view student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    }
                ]);
                student_manager1.view_student_balance(balance_input.student_id);
                break;
            case "pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter a amount to pay"
                    }
                ]);
                student_manager1.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student id"
                    }
                ]);
                student_manager1.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
