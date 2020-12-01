// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

function Engineer(name, id, email, github) {
    Employee.call(this, name, id, email);
    this.github = github;
    this.role = 'Engineer';
}

Engineer.prototype = Object.create(Employee.prototype);
Object.defineProperty(Engineer.prototype, 'constructor', {
    value: Engineer,
    enumerable: false,
    writable: true
});

Engineer.prototype.getGithub = function () {
    return this.github;
};

module.exports = Engineer;