var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    var T = require("timbre");
    T("sin", {freq:880, mul:0.5}).play();
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Henry", "Mattinson");
document.body.innerHTML = greeter(user);
