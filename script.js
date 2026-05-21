fetch('Europe_map.svg')
  .then(response => response.text())
  .then(svg => {

    document.getElementById("map-container")
      .innerHTML = svg;

    startGame();

});

const airlines = {

  "A3": "gr",
  "EI": "ie",
  "SU": "ru",
  "BT": "lv",
  "AF": "fr",
  "KM": "mt",
  "JU": "rs",
  "8R": "fr",
  "OS": "at",
  "BA": "gb",
  "SN": "be",
  "CND": "nl",
  "OU": "hr",
  "OK": "cz",
  "AY": "fi",
  "IB": "es",
  "FI": "is",
  "AZ": "it",
  "LO": "pl",
  "LH": "de",
  "SK": "se",
  "LX": "ch",
  "TP": "pt",
  "RO": "ro",
  "HV": "nl",
  "OR": "nl",
  "KL": "nl"

};

let score = 0;

let currentAirline = "";

let mistakes = 0;

let hintMode = false;

const label =
  document.getElementById("floating-label");

let remainingAirlines =
  [...Object.keys(airlines)];

function nextQuestion() {

  if(remainingAirlines.length === 0) {

    label.innerHTML =
      `🎉 Finished! Final Score: ${score}`;

    document.getElementById("remaining")
      .innerHTML = `Remaining: 0`;

    return;
  }

  mistakes = 0;

  hintMode = false;

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

  const svgDoc =
    document.querySelector("svg");

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

      const correct =
        airlines[currentAirline];

      const isCorrect =
        clicked.startsWith(correct);

      if(isCorrect) {

        country.style.fill = "white";

        if(!hintMode) {

          if(mistakes === 0) {

            score += 1;

          } else if(mistakes === 1) {

            score += 0.5;
          }
        }

        document.getElementById("score")
          .innerHTML =
            `Score: ${score}`;

        setTimeout(() => {

          country.style.fill = "green";

          nextQuestion();

        }, 700);

      } else {

        if(hintMode) return;

        mistakes++;

        country.style.fill = "red";

        setTimeout(() => {

          country.style.fill = "green";

        }, 500);

        if(mistakes >= 2) {

          hintMode = true;

          const allCountries =
            svgDoc.querySelectorAll("[id]");

          allCountries.forEach(c => {

            const id =
              c.parentNode.id.startsWith("svg")
                ? c.id
                : c.parentNode.id;

            if(id.startsWith(correct)) {

              let visible = false;

              setInterval(() => {

                c.style.fill =
                  visible ? "green" : "orange";

                visible = !visible;

              }, 400);
            }

          });

        }

      }

    });

  });

  nextQuestion();

}
