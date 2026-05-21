const airlines = {

"KL": "nl",
"HV": "nl",
"AF": "fr",
"LH": "de",
"BA": "gb",
"IB": "es",
"TP": "pt",
"LX": "ch",
"OS": "at",
"AY": "fi",
"FR": "ie",
"EI": "ie",
"AZ": "it",
"TK": "tr",
"AT": "ma"

};

let score = 0;

let currentAirline = "";

const label =
document.getElementById("floating-label");

function nextQuestion() {

const keys =
Object.keys(airlines);

currentAirline =
keys[Math.floor(Math.random() * keys.length)];

label.innerHTML =
`✈️ ${currentAirline}`;
}

document.addEventListener("mousemove", (e) => {

label.style.left =
(e.pageX + 20) + "px";

label.style.top =
(e.pageY + 20) + "px";
});

window.addEventListener("load", () => {

const svgObject =
document.getElementById("svgMap");

svgObject.addEventListener("load", () => {

const svgDoc =
svgObject.contentDocument;

const countries =
svgDoc.querySelectorAll("[id]");

countries.forEach(country => {

country.style.cursor = "pointer";

country.style.transition =
"fill 0.2s";

country.addEventListener("click", () => {

const clicked =
country.id;

const correct =
airlines[currentAirline];

if(clicked === correct) {

country.style.fill = "white";

score++;

document.getElementById("score")
.innerHTML = `Score: ${score}`;

setTimeout(() => {

country.style.fill = "green";

nextQuestion();

}, 500);

} else {

country.style.fill = "red";

setTimeout(() => {

country.style.fill = "green";

}, 500);
}

});

});

nextQuestion();

});

});
