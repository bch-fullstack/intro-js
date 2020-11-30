const config = {
    ALPHA: 360 / 60, // second arm travel in a second
    BETA: 360 / 60, // minute arm travel in a minute
    DELTA: 360 / 12 // hour arm travel in an hour
};

const arms = {
    hour: document.getElementById('hour'),
    minute: document.getElementById('minute'),
    second: document.getElementById('second')
};

interface Time {
    hour: number,
    minute: number,
    second: number
}

let now: Time;

let angles: Time;

const sound = new Audio('../ring.mp3');

const getNow = (): void => {
    const time = new Date();

    // now.hour = time.getHours;
    // now.minute = time.getMinutes()
    // now.second = time.getSeconds()

    now = {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
};

const getAngles = (): void => {
    // angles.second = config.ALPHA * now.second;
    // angles.minute = config.BETA * (now.minute + now.second / 60);
    // angles.hour = config.DELTA * (now.hour + now.minute / 60 + now.second / 3600);

    angles = {
        second: config.ALPHA * now.second,
        minute: config.BETA * (now.minute + now.second / 60),
        hour: config.DELTA * (now.hour + now.minute / 60 + now.second / 3600)
    }
};

const positionClockArms = (): void => {
    arms.hour.style.transform = `rotate(${angles.hour}deg)`;
    arms.second.style.transform = `rotate(${angles.second}deg)`;
    arms.minute.style.transform = `rotate(${angles.minute}deg)`;
};

const adjustAngles = (): void => {
    now.second++;
    getAngles();
    positionClockArms();
};

const init = (): void => {
    getNow();
    getAngles();
    positionClockArms();
    setInterval(
        adjustAngles,
        1000
    );
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

class Person {
    private firstName: string;
    public lastName: string;
    readonly age: number;

    constructor(first: string, last: string, age: number){
        this.firstName = first;
        this.lastName = last;
        this.age = age;
    }

    report(){
        console.log(`My name is ${this.firstName}, ${this.lastName}, ${this.age} years old`);
    }

    update(first: any, last: any){
        if (typeof(first) === 'string') {
            this.firstName = first;
        }

        if (typeof(last) === 'string') {
            this.lastName = last;
        }

        // this.age = age; this operation is not allowed for readonly property
    }
}

const student = new Person('Daniel', 'White', 18);

student.lastName = 'Peter';

console.log(student.lastName);

// student.age = 23;
console.log(student.age);

student.report();

student.update('Donald', 18);

student.report();
