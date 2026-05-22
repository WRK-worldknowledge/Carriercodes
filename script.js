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

  "SK": ["se", "no", "dk"],

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

let locked = false;

let activeHintIntervals = [];

const label =
  document.getElementById("floating-label");

let remainingAirlines =
  [...Object.keys(airlines)]
    .sort(() => Math.random() - 0.5);

function nextQuestion() {

  if(remainingAirlines.length === 0) {

    label.innerHTML =
      `🎉 Finished! Final Score: ${score}`;

    document.getElementById("remaining")
      .innerHTML =
        `Remaining: 0`;

    return;
  }

  mistakes = 0;

  hintMode = false;

  currentAirline =
    remainingAirlines[0];

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

      if(locked) return;

      const clicked =
        country.parentNode.id.startsWith("svg")
          ? country.id
          : country.parentNode.id;

      const correct =
        airlines[currentAirline];

      let isCorrect = false;

      if(Array.isArray(correct)) {

        isCorrect =
          correct.some(code =>
            clicked.startsWith(code)
          );

      } else {

        isCorrect =
          clicked.startsWith(correct);
      }

      if(isCorrect) {

        if(hintMode) {

          locked = false;
        }

        activeHintIntervals.forEach(interval => {

          clearInterval(interval);

        });

        activeHintIntervals = [];

        hintMode = false;

        locked = true;

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

          remainingAirlines.shift();

          nextQuestion();

          locked = false;

        }, 700);

      } else {

        if(hintMode) return;

        mistakes++;

        country.style.fill = "red";

        setTimeout(() => {

          country.style.fill = "green";

        }, 500);

        if(mistakes >= 2) {

          locked = true;

          hintMode = true;

          const allCountries =
            svgDoc.querySelectorAll("[id]");

          allCountries.forEach(c => {

            const id =
              c.parentNode.id.startsWith("svg")
                ? c.id
                : c.parentNode.id;

            const matches = Array.isArray(correct)

              ? correct.some(code =>
                  id.startsWith(code)
                )

              : id.startsWith(correct);

            if(matches) {

              let visible = false;

              const interval =
                setInterval(() => {

                  c.style.fill =
                    visible
                      ? "green"
                      : "orange";

                  visible = !visible;

                }, 400);

              activeHintIntervals.push(interval);
            }

          });

          locked = false;
        }

      }

    });

  });

  nextQuestion();

}
