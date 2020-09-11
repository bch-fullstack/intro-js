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
        alpha: 360 / 60,
        beta: 360 / 60 / 60,
        delta: 360 / 12 
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
    getNow: function(){
        var time = new Date()
        this.now.hour = time.getHours()
        this.now.minute = time.getMinutes()
        this.now.second = time.getSeconds()
    },
    getAngles: function(){
        this.angles.second = this.constants.alpha * this.now.second;
        this.angles.minute = this.constants.beta * (this.now.minute + this.now.second / 60);
        this.angles.hour = this.constants.delta * (this.now.hour + this.now.minute / 60 + this.now.second / 360);
    },
    positionClockArms: function(){
        this.arms.second.style.transform = `rotate(${this.angles.second}deg)`;
        this.arms.minute.style.transform = `rotate(${this.angles.minute}deg)`;
        this.arms.hour.style.transform = `rotate(${this.angles.hour}deg)`;
    },
    adjustAngles: function(){
        console.log(this)
        this.now.second++;
        this.getAngles();
        this.positionClockArms();
    },
    init: function(){
        this.getNow();
        this.getAngles();
        this.positionClockArms();
        setInterval(this.adjustAngles.bind(this), 1000);
        
        // var scope = this;
        // setInterval(function(){
        //     scope.adjustAngles();
        // }, 1000)
    }
}

clock.init()

// clock.getNow()
// clock.getAngles()
// clock.positionClockArms()
// setInterval(clock.adjustAngles, 1000)

// console.log(clock.now)
// console.log(clock.angles)