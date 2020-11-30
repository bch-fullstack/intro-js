var config = {
    ALPHA: 360 / 60,
    BETA: 360 / 60,
    DELTA: 360 / 12 // hour arm travel in an hour
};
var arms = {
    hour: document.getElementById('hour'),
    minute: document.getElementById('minute'),
    second: document.getElementById('second')
};
var now;
var angles;
var sound = new Audio('../ring.mp3');
var getNow = function () {
    var time = new Date();
    // now.hour = time.getHours;
    // now.minute = time.getMinutes()
    // now.second = time.getSeconds()
    now = {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    };
};
var getAngles = function () {
    // angles.second = config.ALPHA * now.second;
    // angles.minute = config.BETA * (now.minute + now.second / 60);
    // angles.hour = config.DELTA * (now.hour + now.minute / 60 + now.second / 3600);
    angles = {
        second: config.ALPHA * now.second,
        minute: config.BETA * (now.minute + now.second / 60),
        hour: config.DELTA * (now.hour + now.minute / 60 + now.second / 3600)
    };
};
var positionClockArms = function () {
    arms.hour.style.transform = "rotate(" + angles.hour + "deg)";
    arms.second.style.transform = "rotate(" + angles.second + "deg)";
    arms.minute.style.transform = "rotate(" + angles.minute + "deg)";
};
var adjustAngles = function () {
    now.second++;
    getAngles();
    positionClockArms();
};
var init = function () {
    getNow();
    getAngles();
    positionClockArms();
    setInterval(adjustAngles, 1000);
};
init();
// interface Person {
//     firstName: string,
//     lastName: string
// }
// const student: Person = {
//     firstName: 'test first name',
//     lastName: 'test last name'
// };
// console.log(student.firstName + student.lastName);
var Person = /** @class */ (function () {
    function Person(first, last, age) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
    }
    Person.prototype.report = function () {
        console.log("My name is " + this.firstName + ", " + this.lastName + ", " + this.age + " years old");
    };
    Person.prototype.update = function (first, last) {
        if (typeof (first) === 'string') {
            this.firstName = first;
        }
        if (typeof (last) === 'string') {
            this.lastName = last;
        }
        // this.age = age; this operation is not allowed for readonly property
    };
    return Person;
}());
var student = new Person('Daniel', 'White', 18);
student.lastName = 'Peter';
console.log(student.lastName);
// student.age = 23;
console.log(student.age);
student.report();
student.update('Donald', 18);
student.report();
