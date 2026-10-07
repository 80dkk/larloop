const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Öppna meny" : "Stäng meny");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Öppna meny");
    siteNav.classList.remove("is-open");
  });
});

const features = {
  quiz: {
    label: "DAGS ATT ÖVA",
    count: "01 / 05",
    title: "Vad händer när en atom avger en elektron?",
    description: "Välj det svar du tror på. Du får en förklaring efteråt – oavsett om du svarar rätt.",
    answers: [
      ["A", "Den blir en negativ jon", false],
      ["B", "Den blir en positiv jon", true],
      ["C", "Den blir en isotop", false],
    ],
  },
  cards: {
    label: "BEGREPPSKORT",
    count: "03 / 08",
    title: "Vad menas med en jonbindning?",
    description: "Försök förklara med egna ord innan du vänder på kortet. Att plocka fram svaret hjälper minnet.",
    answers: [
      ["A", "Elektroner delas mellan atomer", false],
      ["B", "Motsatt laddade joner dras till varandra", true],
      ["C", "Atomer byter plats i en molekyl", false],
    ],
  },
  writing: {
    label: "TEXTFEEDBACK",
    count: "DIN TEXT",
    title: "Hur kan du göra ditt resonemang tydligare?",
    description: "Du har en bra idé. Lägg till ett exempel som visar hur du tänker – då blir kopplingen lättare att följa.",
    answers: [
      ["1", "Visa vad som orsakar förändringen", true],
      ["2", "Använd fler svåra ord", false],
      ["3", "Ta bort din förklaring", false],
    ],
  },
  assistant: {
    label: "FRÅGA VIDARE",
    count: "AI-ASSISTENT",
    title: "Kan du förklara det på ett enklare sätt?",
    description: "Absolut! Tänk dig att atomer håller i händerna. I en jonbindning lämnar en atom över en elektron.",
    answers: [
      ["↗", "Visa ett exempel från vardagen", true],
      ["?", "Förklara ett ord i taget", false],
      ["✦", "Gör ett miniquiz av det", false],
    ],
  },
};

const tabs = [...document.querySelectorAll(".feature-tab")];
const panel = document.querySelector("#feature-panel");
const nextButton = document.querySelector("#next-question");
const feedback = document.querySelector("#answer-feedback");
let activeFeature = "quiz";
let answered = false;

function renderFeature(featureName) {
  const feature = features[featureName];
  activeFeature = featureName;
  answered = false;
  document.querySelector("#preview-label").textContent = feature.label;
  document.querySelector("#preview-count").textContent = feature.count;
  document.querySelector("#preview-title").textContent = feature.title;
  document.querySelector("#preview-description").textContent = feature.description;
  document.querySelector("#answer-list").replaceChildren(...feature.answers.map(([letter, text, correct]) => {
    const answer = document.createElement("button");
    answer.className = "answer-option";
    answer.type = "button";
    answer.dataset.correct = String(correct);
    const key = document.createElement("span");
    key.textContent = letter;
    answer.append(key, document.createTextNode(text));
    answer.addEventListener("click", () => chooseAnswer(answer));
    return answer;
  }));
  feedback.textContent = "";
  nextButton.disabled = true;
  panel.setAttribute("aria-labelledby", `tab-${featureName}`);
}

function chooseAnswer(selected) {
  if (answered) return;
  answered = true;
  const isCorrect = selected.dataset.correct === "true";
  selected.classList.add(isCorrect ? "is-correct" : "is-incorrect");
  document.querySelectorAll(".answer-option").forEach((answer) => {
    answer.disabled = true;
    if (answer.dataset.correct === "true") answer.classList.add("is-correct");
  });
  feedback.textContent = isCorrect
    ? "Precis! En atom som avger en negativt laddad elektron får positiv laddning."
    : "Inte riktigt – det rätta svaret är markerat. En atom som tappar en elektron blir positiv.";
  nextButton.disabled = false;
  const nextProgress = Math.min(Number(document.querySelector("#progress-value").textContent.replace("%", "")) + (isCorrect ? 8 : 3), 100);
  document.querySelector("#progress-value").textContent = `${nextProgress}%`;
  document.querySelector("#progress-bar").style.width = `${nextProgress}%`;
  document.querySelector(".progress-track").setAttribute("aria-valuenow", String(nextProgress));
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    renderFeature(tab.dataset.feature);
  });
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0
      : event.key === "End" ? tabs.length - 1
        : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  });
});

nextButton.addEventListener("click", () => {
  if (activeFeature !== "quiz") {
    renderFeature(activeFeature);
    return;
  }
  const count = Number(document.querySelector("#preview-count").textContent.split(" / ")[0]);
  const next = count >= 5 ? 1 : count + 1;
  document.querySelector("#preview-count").textContent = `${String(next).padStart(2, "0")} / 05`;
  document.querySelector("#preview-title").textContent = next % 2
    ? "Vad händer när en atom avger en elektron?"
    : "Vilken bindning uppstår mellan positiva och negativa joner?";
  document.querySelector("#preview-description").textContent = "Välj det svar du tror på. Du får en förklaring efteråt – oavsett om du svarar rätt.";
  const options = next % 2
    ? [["A", "Den blir en negativ jon", false], ["B", "Den blir en positiv jon", true], ["C", "Den blir en isotop", false]]
    : [["A", "Jonbindning", true], ["B", "Metallbindning", false], ["C", "Kovalent bindning", false]];
  document.querySelector("#answer-list").replaceChildren(...options.map(([letter, text, correct]) => {
    const answer = document.createElement("button");
    answer.className = "answer-option";
    answer.type = "button";
    answer.dataset.correct = String(correct);
    const key = document.createElement("span");
    key.textContent = letter;
    answer.append(key, document.createTextNode(text));
    answer.addEventListener("click", () => chooseAnswer(answer));
    return answer;
  }));
  answered = false;
  feedback.textContent = "";
  nextButton.disabled = true;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
