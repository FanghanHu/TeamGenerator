// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

function Intern(name, id, email, school) {
    Employee.call(this, name, id, email);
    this.school = school;
    this.role = 'Intern';
}

Intern.prototype = Object.create(Employee.prototype);
Object.defineProperty(Intern.prototype, 'constructor', {
    value: Intern,
    enumerable: false,
    writable: true
});

Intern.prototype.getSchool = function() {
  return this.school;
};

module.exports = Intern;