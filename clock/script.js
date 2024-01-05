const secondHand = document.querySelector('.sec');
const minuteHand = document.querySelector('.min');
const hourHand = document.querySelector('.hour');
const btnsrch = document.querySelector('.search ');

let sec = 0;
let min = 0;
let hour = 0;

let apisec = 0;
let apimin = 0;
let apihour = 0;
var city;

function runclock() {
    setInterval(() => {
        sec = sec + 6;
        if (sec === 360) {
            sec = 0;
        }
        min = min + .1
        if (min >= 360 && min <= 360.1) {
            min = 0;
        }
        hour = hour + 0.008333333;
        if (hour >= 360 && hour < 360.1) {
            hour = 0;
        }
        secondHand.style.transform = `rotate(${sec}deg) translateY(-122px)`;
        minuteHand.style.transform = `rotate(${min}deg) translateY(-100px)`;
        hourHand.style.transform = `rotate(${hour}deg) translateY(-50%)`;
    }, 1000);
}


function updateclock(apihour, apimin, apisec) {
    sec = (apisec * 6);
    min = (apimin * 6) + (apisec * .1) + 180;
    hour = ((apihour % 12) * 30) + (apimin * 0.5) + (apisec * 0.00833333) + 165;

    secondHand.style.transform = `rotate(${sec}deg) translateY(-122px)`;
    minuteHand.style.transform = `rotate(${min}deg) translateY(-100px)`;
    hourHand.style.transform = `rotate(${hour}deg) translateY(-50%)`;
}
function fetchtime(city) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
        headers: { 'X-Api-Key': 'djHsauKMSF+zMzaydJTSSw==OAjDnVopEu2OMDhr' },
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            let currenttime = new Date(result.datetime)
            let apihour = currenttime.getUTCHours();
            let apimin = currenttime.getUTCMinutes();
            let apisec = currenttime.getUTCSeconds();

            updateclock(apihour, apimin, apisec);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

btnsrch.addEventListener("click", function () {
    city = document.querySelector('.city').value;
    fetchtime(city);
})

function handleKeyDown(event) {
    if (event.key === "Enter") {
        city = document.querySelector('.city').value;
        fetchtime(city);
    }
}
document.querySelector('.city').addEventListener("keydown", handleKeyDown);

runclock();

