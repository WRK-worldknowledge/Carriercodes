fetch('Europe_map.svg')
  .then(response => response.text())
  .then(svg => {

    document.getElementById("map-container")
      .innerHTML = svg;

    startGame();

});
const airlines = {

  "A3": "gr",   // Aegean Airlines
  "EI": "ie",   // Aer Lingus
  "SU": "ru",   // Aeroflot
  "BT": "lv",   // Air Baltic
  "AF": "fr",   // Air France
  "KM": "mt",   // Air Malta
  "JU": "rs",   // Air Serbia
  "8R": "fr",   // Amelia
  "OS": "at",   // Austrian
  "BA": "gb",   // British Airways
  "SN": "be",   // Brussels Airlines
  "CND": "nl",  // Corendon Dutch
  "OU": "hr",   // Croatia Airlines
  "OK": "cz",   // Czech Airlines
  "AY": "fi",   // Finnair
  "IB": "es",   // Iberia
  "FI": "is",   // Icelandair
  "AZ": "it",   // ITA Airways
  "LO": "pl",   // LOT
  "LH": "de",   // Lufthansa
  "SK": "se",   // SAS
  "LX": "ch",   // Swiss
  "TP": "pt",   // TAP
  "RO": "ro",   // Tarom
  "HV": "nl",   // Transavia
  "OR": "nl",   // TUI NL
  "KL": "nl"    // KLM

};

let score = 0;

let currentAirline = "";

let mistakes = 0;

const label =
document.getElementById("floating-label");

let remainingAirlines =
  Object.keys(airlines);

function nextQuestion() {

  if(remainingAirlines.length === 0) {

    label.innerHTML =
      `🎉 Finished! Final Score: ${score}`;

    return;
  }

  mistakes = 0;

  const randomIndex =
    Math.floor(Math.random() * remainingAirlines.length);

  currentAirline =
    remainingAirlines[randomIndex];

  remainingAirlines.splice(randomIndex, 1);

  label.innerHTML =
    `✈️ ${currentAirline}`;

  document.getElementById("remaining")
    .innerHTML =
      `Remaining: ${remainingAirlines.length}`;
}
 
document.addEventListener("mousemove", (e) => {

label.style.left =
(e.pageX + 20) + "px";

label.style.top =
(e.pageY + 20) + "px";
});

function startGame() {

  const svgDoc = document.querySelector("svg");

  const countries =
    svgDoc.querySelectorAll("[id]");

  countries.forEach(country => {

    country.style.cursor = "pointer";

    country.style.transition =
      "fill 0.2s";

    country.addEventListener("click", () => {

      const clicked =
  country.parentNode.id.startsWith("svg")
    ? country.id
    : country.parentNode.id;
      console.log(clicked);

      const correct =
        airlines[currentAirline];

      if(clicked.startsWith(correct)) {

  country.style.fill = "white";

  if(mistakes === 0) {

    score += 1;

  } else if(mistakes === 1) {

    score += 0.5;
  }

  document.getElementById("score")
    .innerHTML = `Score: ${score}`;

  setTimeout(() => {

    country.style.fill = "green";

    nextQuestion();

  }, 600);

} else {

  mistakes++;

  country.style.fill = "red";

  setTimeout(() => {

    country.style.fill = "green";

  }, 500);

  if(mistakes >= 2) {

    const allCountries =
      svgDoc.querySelectorAll("[id]");

    allCountries.forEach(c => {

      const id =
        c.parentNode.id.startsWith("svg")
          ? c.id
          : c.parentNode.id;

      if(id.startsWith(correct)) {

        let flashes = 0;

        const flash =
          setInterval(() => {

            c.style.fill =
              flashes % 2 === 0
                ? "orange"
                : "green";

            flashes++;

            if(flashes > 5) {

              clearInterval(flash);

              c.style.fill = "green";

                            nextQuestion();
            }

          }, 250);
      }

    });

  }
}

    });

  });

  nextQuestion();

}
