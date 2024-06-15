let Commands;
const API_KEY = "8caed383e894baa0042cdbfdf1e6b098";
const songs = {
    one: "Ed Sheeran   Shape of you.webm",
    two: "Imran Khan - Satisfya.webm",
    three: "Senorita.webm",
    four: "Chand_Tare_Tod_Full_Video_Song.mp3",
    five: "Imagine Dragons - Believer.mp3",
    six: "Justin Bieber – Despacito.mp3",
    seven: "The Chainsmokers - Closer.mp3",
    eight: "Baby Song.mp3",
    eleven: "Background Music.mp3"
};

function fetchCommands() {
    fetch("/mic/Process.json") // Adjusted path to fetch Process.json from mic folder
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Commands = data;
            console.log("Commands loaded successfully:", Commands);
        })
        .catch(error => {
            console.error('Error fetching commands:', error);
            // Handle error, perhaps fallback to default commands or inform the user
        });
}

fetchCommands();


const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

function startListening() {
    const recong = new speechRecognition();
    recong.start();
    recong.onstart = () => {
        document.getElementById("microphoneButton").classList.add("Listen");
    };

    recong.onresult = function (data) {
        document.getElementById("microphoneButton").classList.remove("Listen");
        handleResults(data);
    };

    recong.onerror = function (event) {
        console.error('Error occurred in recognition: ', event.error);
    };
}

function handleResults(data) {
    let text = data.results[0][0].transcript.toLowerCase();
    console.log("Recognized text:", text);  // Log recognized text for debugging
    ProcessCommand(text);
}

function ProcessCommand(UserText) {
    console.log("Processing command:", UserText);  // Log processed command for debugging
    if (UserText.includes('open youtube')) {
        Speak("Opening YouTube...");
        window.open("https://www.youtube.com");
    } else if (UserText.includes('the time')) {
        Speak("The time is: " + getCurrentTime());
    } else if (UserText.includes('open facebook') || UserText.includes('open fb')) {
        Speak("Opening Facebook...");
        window.open("https://www.facebook.com");
    } else {
        Speak('I can\'t perform task: ' + UserText);
    }

    if (Commands) {
        for (const eachCommand in Commands) {
            if (UserText.includes(eachCommand) || UserText === eachCommand) {
                let task = Commands[eachCommand];
                eval(task);
            }
        }
    }

    if (UserText.includes("search on google")) {
        UserText = UserText.slice(16);
        Speak('Searching initiated...' + UserText);
        searchOnGoogle(UserText);
    } else if (UserText.includes("hey jarvis")) {
        UserText = UserText.slice(10);
        Speak('Searching initiated...' + UserText);
        searchOnGoogle(UserText);
    } else if (UserText.includes("search on youtube")) {
        UserText = UserText.slice(17);
        Speak('Searching initiated...' + UserText);
        searchOnYoutube(UserText);
    }
}

function Speak(TEXT) {
    const utter = new SpeechSynthesisUtterance();
    utter.text = TEXT;
    utter.voice = window.speechSynthesis.getVoices()[1];
    window.speechSynthesis.speak(utter);
}

function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let currentTimeIs = `${hours} hours ${minutes} minutes`;
    Speak("The time is " + currentTimeIs);
    return currentTimeIs;
}

document.getElementById("microphoneButton").addEventListener("click", startListening);

function openWeb(Url) {
    window.open(Url);
}

function getWeatherDetails() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            let response = await fetch(api_url);
            let data = await response.json();
            manipulateWeatherData(data);
        });
    }
}

function manipulateWeatherData(data) {
    let city = data.name;
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let msg = `Current temperature is ${temp} degree Celsius and humidity is ${humidity}%`;
    Speak(msg);
}

function getTodayDate() {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[d.getMonth()];
    var date = d.getDate();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekDay = days[d.getDay()];
    var year = d.getFullYear();
    Speak("Today's date is " + weekDay + " " + date + " " + month + " " + year);
}

function openCamera() {
    window.open('http://localhost:5500/mic/Camera2.html', "", "width=700px,height=450px,left=300px,top=100px");
}

function closeCamera() {
    if (window.openCamera) {
        window.openCamera.close();
    }
}

function searchOnGoogle(data) {
    window.open(`https://www.google.com/search?q=${data}`, "Google");
}

function searchOnYoutube(data) {
    window.open(`https://www.youtube.com/results?search_query=${data}`, "YouTube");
}

function closeJarvis() {
    setTimeout(function () {
        window.close();
    }, 2000);
}

function reloadJarvis() {
    Speak("Please wait...");
    Speak("Reloading...");
    setTimeout(function () {
        location.reload();
    }, 7000);
}

function stepUp() {
    window.moveBy(0, -100);
}

function stepDown() {
    window.moveBy(0, 100);
}

function moveToXAxisOut() {
    window.moveBy(100, 0);
}

function moveToXAxisIn() {
    window.moveBy(-100, 0);
}

let batteryPromise = navigator.getBattery();
batteryPromise.then(printBatteryStatus);

function printBatteryStatus(batteryObject) {
    window.batteryLevel = Math.round(batteryObject.level * 100);
}

function getBattery() {
    Speak("Battery left in the device is " + window.batteryLevel + " percent");
}

function getFamilyInfo() {
    Speak("There are six members in your family...");
    Speak("Grandmother, father, mother, your brother, sister, and you...");
    Speak("You live in Junibej, which is in Maharashtra...");
    Speak("I have a lot to say but I think it will be enough...");
}

function playMusic() {
    Speak("Playing music...");
    let shutter = new Audio();
    shutter.autoplay = true;
    let randomNumber = Math.floor((Math.random() * 11) + 1);
    console.log(randomNumber);

    switch (randomNumber) {
        case 1:
            shutter.src = songs.one;
            break;
        case 2:
            shutter.src = songs.two;
            break;
        case 3:
            shutter.src = songs.three;
            break;
        case 4:
            shutter.src = songs.four;
            break;
        case 5:
            shutter.src = songs.five;
            break;
        case 6:
            shutter.src = songs.six;
            break;
        case 7:
            shutter.src = songs.seven;
            break;
        case 8:
            shutter.src = songs.eight;
            break;
        case 11:
            shutter.src = songs.eleven;
            break;
        default:
            shutter.src = songs.one;
            break;
    }
    shutter.play();
}

function stopMusic() {
    if (window.shutter) {
        window.shutter.pause();
    }
}

function tellMeAJoke() {
    let shutter1 = new Audio();
    shutter1.autoplay = true;
    let randomNumber = Math.floor((Math.random() * 6) + 1);
    console.log(randomNumber);

    switch (randomNumber) {
        case 1:
            shutter1.src = 'Joke 1.mp3';
            break;
        case 2:
            shutter1.src = 'Joke 2.mp3';
            break;
        case 3:
            shutter1.src = 'Joke 3.mp3';
            break;
        case 4:
            shutter1.src = 'Joke 4.mp3';
            break;
        case 5:
            shutter1.src = 'Joke 5.mp3';
            break;
        case 6:
            shutter1.src = 'Joke 6.mp3';
            break;
        default:
            shutter1.src = 'Joke 1.mp3';
            break;
    }
    shutter1.play();
}

function nextJoke() {
    randomNumber = (randomNumber < 6) ? randomNumber + 1 : 1;
    tellMeAJoke();
}

function welcomeToFriends() {
    Speak("Welcome you all. I am Jarvis. Nice to meet you...");
    Speak("I have a big list and I am sure that you are one from that...");
    Speak("Sir, should I pack up? I think you want to talk to your friends...");
}

function friendList() {
    window.friendList = window.open("http://localhost:5500/mic/friendList.html", "", "width=700px,height=500px");
}

function closeList() {
    if (window.friendList) {
        window.friendList.close();
    }
}

function systemInfo() {
    if (navigator.onLine) {
        Speak("The system is online with the speed of " + navigator.connection.downlink + " MB per second");
    } else {
        Speak("The system is not online...");
    }
    Speak("Keyboard language is " + navigator.language);
    let type = navigator.connection.effectiveType;
    Speak("The type of connection this system is using is " + type.toUpperCase());
    let platform = navigator.platform;
    Speak("The system is " + platform);
}

function internetSpeed() {
    if (navigator.onLine) {
        Speak("The system is online with the speed of " + navigator.connection.downlink + " MB per second");
    } else {
        Speak("The system is not online...");
    }
}

function readList() {
    let friendList1 = localStorage.getItem("array");
    if (friendList1) {
        let friendList = friendList1.split(",");
        console.log(friendList);
        for (let friend of friendList) {
            console.log(friend);
            Speak(friend);
        }
    }
}

function jarvisSaysHello() {
    let d = new Date();
    let hours = d.getHours();
    Speak("I am Jarvis");
    if (hours <= 12) {
        Speak("Good morning...");
    } else if (hours > 12 && hours <= 16) {
        Speak("Good afternoon...");
    } else if (hours > 16 && hours <= 20) {
        Speak("Good evening...");
    } else {
        Speak("Good night...");
    }
    Speak("Say, what can I do for you, sir...");
}



