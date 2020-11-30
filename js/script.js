console.log('Script loaded')

/**
 * 1. Get the current time
 * 2. extract the hour, minute, second
 * 3. convert hour, minute, second into angles that those arms need to be moved to from the point 0
 * 4. position those arms according to those calculation
 * 5. update their position every 1 seconds
 * a. recalculate the angle of those arms every 1 seconds
 * b. position those arms again to new calculation
 */

// var now = new Date();
// var hour = now.getHours();
// var minute = now.getMinutes();
// var second = now.getSeconds();

// console.log(`The time now is ${hour}:${minute}:${second}`)

// var alpha = 360 / 60; // second arm moves every sec
// var beta = 360 / 60; // minute arm moves every minute
// var delta = 360 / 12; // hour arm moves every hour

// // angle of the second arm
// var secondArmAngle = alpha * second;
// // angle of the minute arm
// var minuteArmAngle = beta * (minute + second / 60);
// // angle of the hour arm
// var hourArmAngle = delta * (hour + minute / 60 + second / 360);

// console.log(`The time now is ${hourArmAngle}:${minuteArmAngle}:${secondArmAngle}`);

// SECONDARM.style.transform = `rotate(${secondArmAngle}deg)`;
// MINUTEARM.style.transform = `rotate(${minuteArmAngle}deg)`;
// HOURARM.style.transform = `rotate(${hourArmAngle}deg)`;

// var secondArmOffset = alpha;
// var minuteArmOffset = alpha / 60;
// var hourArmOffset = alpha / 60 / 60;

// function updateArmPosition(){
//     // console.log(this) // refers to the global scope


//     secondArmAngle += secondArmOffset; // secondArmAngle = secondArmAngle + secondArmOffset
//     minuteArmAngle += minuteArmOffset;
//     hourArmAngle += hourArmOffset;

//     SECONDARM.style.transform = `rotate(${secondArmAngle}deg)`;
//     MINUTEARM.style.transform = `rotate(${minuteArmAngle}deg)`;
//     HOURARM.style.transform = `rotate(${hourArmAngle}deg)`;
// }

var clock = {
    constants: {
        alpha: 360 / 60, // second arm travel in a second
        beta: 360 / 60, // minute arm travel in a minute
        delta: 360 / 12 // hour arm travel in an hour
    },
    arms: {
        hour: document.getElementById('hour'),
        minute: document.getElementById('minute'),
        second: document.getElementById('second')
    },
    now: {
        hour: null,
        minute: null,
        second: null
    },
    angles: {
        hour: null,
        minute: null,
        second: null
    },
    sound: new Audio('../ring.mp3'),
    alarm: {
        hour: null,
        minute: null
    },
    getNow: function(){
        var time = new Date()
        this.now.hour = time.getHours()
        this.now.minute = time.getMinutes()
        this.now.second = time.getSeconds()
    },
    getAngles: function(){
        this.angles.second = this.constants.alpha * this.now.second;
        this.angles.minute = this.constants.beta * (this.now.minute + this.now.second / 60);
        this.angles.hour = this.constants.delta * (this.now.hour + this.now.minute / 60 + this.now.second / 3600);
    },
    positionClockArms: function(){
        this.arms.second.style.transform = `rotate(${this.angles.second}deg)`;
        this.arms.minute.style.transform = `rotate(${this.angles.minute}deg)`;
        this.arms.hour.style.transform = `rotate(${this.angles.hour}deg)`;
    },
    adjustAngles: function(){
        this.now.second++;
        this.getAngles();
        this.positionClockArms();
    },
    setAlarm: function(time){
        this.alarm.hour = time.split(':')[0];
        this.alarm.minute = time.split(':')[1];
        var scope = this;
        console.log(scope)
        console.log(`Setting alarm at ${this.alarm.hour}:${this.alarm.minute}`)
        setInterval(function(){
            console.log(`Check for alarm at ${scope.alarm.hour}:${scope.alarm.minute}`)
            var now = new Date()
            if (now.getHours() == scope.alarm.hour && now.getMinutes() == scope.alarm.minute){
                scope.sound.play()
            }
        }, 1000)
    },
    init: function(){
        this.getNow();
        this.getAngles();
        this.positionClockArms();
        setInterval(this.adjustAngles, 1000);
        
        // var scope = this;
        // setInterval(function(){
        //     scope.adjustAngles();
        // }, 1000)
    }
}

clock.init()

document.getElementById('alarm').addEventListener('submit', function(e){
    e.preventDefault()
    console.log(this.time.value)
    clock.setAlarm(this.time.value)
})

document.querySelector("#time").addEventListener("input", function(e) {
    const reTime = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    const time = this.value;
    if (reTime.exec(time)) {
      const minute = Number(time.substring(3,5));
      const hour = Number(time.substring(0,2)) % 12 + (minute / 60);
      this.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='18.5' fill='none' stroke='%23222' stroke-width='3' /><path d='M20,4 20,8 M4,20 8,20 M36,20 32,20 M20,36 20,32' stroke='%23bbb' stroke-width='1' /><circle cx='20' cy='20' r='2' fill='%23222' stroke='%23222' stroke-width='2' /></svg>"), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M18.5,24.5 19.5,4 20.5,4 21.5,24.5 Z' fill='%23222' style='transform:rotate(${360 * minute / 60}deg); transform-origin: 50% 50%;' /></svg>"), url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M18.5,24.5 19.5,8.5 20.5,8.5 21.5,24.5 Z' style='transform:rotate(${360 * hour / 12}deg); transform-origin: 50% 50%;' /></svg>")`;
    }
});

// clock.getNow()
// clock.getAngles()
// clock.positionClockArms()
// setInterval(clock.adjustAngles, 1000)

// console.log(clock.now)
// console.log(clock.angles)