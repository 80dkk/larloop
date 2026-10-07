const toolButtons = [...document.querySelectorAll(".tool-nav-button")];
const panels = [...document.querySelectorAll(".workspace-panel")];
const subjectSelect = document.querySelector("#subject-select");
let quizIndex = 0;
let quizAnswered = false;
let cardIndex = 0;
let cardIsFlipped = false;

const learningContent = {
  Svenska: {
    quiz: [
      { question: "Vad hjälper ett exempel till med i ett resonerande svar?", options: ["Att visa hur ett påstående kan märkas i praktiken", "Att göra texten längre utan att ändra innehållet", "Att ersätta en förklaring"], answer: 0, explanation: "Ett exempel visar hur din tanke kan märkas i en konkret situation." },
      { question: "Vilket ord hjälper oftast läsaren att se ett orsakssamband?", options: ["Däremot", "Därför", "Till exempel"], answer: 1, explanation: "Därför signalerar att det som kommer nu är en följd av det du just beskrivit." },
      { question: "Vad är ett bra första steg när du bearbetar en text?", options: ["Kontrollera om texten svarar på uppgiften", "Byta ut alla korta ord", "Ta bort rubriken"], answer: 0, explanation: "Börja med att säkerställa att texten faktiskt svarar på frågan." },
    ],
    cards: [
      ["Tes", "Huvudåsikten eller det påstående som en argumenterande text driver."],
      ["Källkritik", "Att granska var information kommer ifrån och om den går att lita på."],
      ["Resonemang", "Att förklara hur du tänker och visa varför du drar en viss slutsats."],
    ],
    terms: ["tes", "argument", "källa", "resonemang", "exempel", "slutsats", "påstående"],
  },
  Kemi: {
    quiz: [
      { question: "Vad händer när en natriumatom lämnar ifrån sig en elektron?", options: ["Den får positiv laddning", "Den får negativ laddning", "Den blir en annan sorts atom"], answer: 0, explanation: "När natrium lämnar ifrån sig en negativt laddad elektron får atomen positiv laddning." },
      { question: "Vad håller samman en jonförening?", options: ["Motsatt laddade joner som dras till varandra", "Atomer som delar alla sina protoner", "Vattenmolekyler som byter plats"], answer: 0, explanation: "Den elektriska dragningskraften mellan positiva och negativa joner bildar jonbindningen." },
      { question: "Vilken partikel bestämmer vilket grundämne en atom är?", options: ["Elektronen", "Neutronen", "Protonen"], answer: 2, explanation: "Antalet protoner i kärnan är atomnumret och avgör vilket grundämne atomen är." },
    ],
    cards: [
      ["Jon", "En atom eller molekyl som har elektrisk laddning efter att ha tagit upp eller lämnat ifrån sig elektroner."],
      ["Jonbindning", "Dragningskraften mellan positivt och negativt laddade joner."],
      ["Atomnummer", "Antalet protoner i atomkärnan. Det avgör vilket grundämne det är."],
    ],
    terms: ["atom", "jon", "elektron", "proton", "bindning", "reaktion", "molekyl"],
  },
  Historia: {
    quiz: [
      { question: "Varför jämför historiker flera olika källor?", options: ["För att kunna undersöka om uppgifter bekräftar eller motsäger varandra", "För att alla källor alltid säger exakt samma sak", "För att slippa fundera på vem som skapat källan"], answer: 0, explanation: "Jämförelser gör det lättare att upptäcka olika perspektiv och pröva hur trovärdiga uppgifterna är." },
      { question: "Vad betyder det att en källa är samtida?", options: ["Den skapades nära tiden för händelsen", "Den är alltid neutral", "Den återberättas muntligt i dag"], answer: 0, explanation: "En samtida källa skapades medan händelsen pågick eller i nära anslutning till den." },
      { question: "Vad kan tendens i en källa handla om?", options: ["Att avsändaren vill påverka hur vi ser på något", "Vilket årtal som kommer först", "Hur långt ett dokument är"], answer: 0, explanation: "Tendens handlar om att källan kan ha en viss vinkling eller vilja påverka läsaren." },
    ],
    cards: [
      ["Samtida källa", "En källa som skapades under eller nära den tid som den berättar om."],
      ["Tendens", "När en källa har en vinkling eller avsändaren vill påverka mottagaren."],
      ["Historiskt perspektiv", "Ett sätt att undersöka och förstå en händelse utifrån olika människors synvinklar."],
    ],
    terms: ["källa", "perspektiv", "samhälle", "förändring", "orsak", "konsekvens", "tendens"],
  },
  Biologi: {
    quiz: [
      { question: "Vad är fotosyntesens viktigaste uppgift för växten?", options: ["Att omvandla ljusenergi till kemisk energi i socker", "Att göra syre till växtens enda näring", "Att flytta rötterna närmare solen"], answer: 0, explanation: "Med hjälp av ljus bygger växten energirikt socker från koldioxid och vatten." },
      { question: "Var i cellen sker den mesta fotosyntesen?", options: ["I cellkärnan", "I kloroplasterna", "I cellmembranet"], answer: 1, explanation: "Kloroplasterna innehåller klorofyll och är cellens plats för fotosyntes." },
      { question: "Vad är en näringskedja?", options: ["En beskrivning av vem som äter vem i ett ekosystem", "En lista på cellens delar", "Ett sätt för växter att fånga vatten"], answer: 0, explanation: "En näringskedja visar hur energi förs vidare när organismer äter varandra." },
    ],
    cards: [
      ["Fotosyntes", "När växter använder ljus för att omvandla vatten och koldioxid till socker och syre."],
      ["Ekosystem", "Alla levande organismer och den miljö de samspelar med på en plats."],
      ["Cell", "Den minsta levande byggstenen som organismer är uppbyggda av."],
    ],
    terms: ["cell", "fotosyntes", "organism", "ekosystem", "energi", "näringskedja", "miljö"],
  },
  Engelska: {
    quiz: [
      { question: "What is a strong way to support an argument?", options: ["Give a relevant example and explain its connection", "Repeat the same sentence several times", "Add an unrelated fact"], answer: 0, explanation: "A relevant example makes your point clearer when you explain how it supports your argument." },
      { question: "Which word signals a contrast?", options: ["Because", "However", "For example"], answer: 1, explanation: "However tells the reader that the next idea contrasts with what came before." },
      { question: "What should a conclusion do?", options: ["Bring the main idea together", "Introduce several unrelated topics", "Copy the first paragraph word for word"], answer: 0, explanation: "A conclusion should return to the main idea and help the reader understand your final point." },
    ],
    cards: [
      ["Evidence", "Information or examples that support an idea or an argument."],
      ["Point of view", "The way a person sees or describes a situation."],
      ["Conclusion", "The final part of a text that brings the main points together."],
    ],
    terms: ["because", "however", "evidence", "example", "therefore", "argument", "conclusion"],
  },
};

const stopWords = new Set("och att det i en jag är som på för med till av den har inte om ett man kan då när så du vi de dem sig sin för ett från men också vara blir varit genom efter eller hur vad som var upp den hur där vilken vilka detta dessa deras dom".split(" "));
const connectors = ["eftersom", "därför", "vilket", "däremot", "exempelvis", "till exempel", "å ena sidan", "å andra sidan", "samtidigt", "alltså", "however", "because", "therefore", "for example"];
const examples = ["till exempel", "exempelvis", "som när", "föreställ dig", "exempel", "for example", "such as"];

function wordsIn(text) {
  return text.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) || [];
}

function sentenceList(text) {
  return text.split(/(?<=[.!?])\s+/u).map((sentence) => sentence.trim()).filter(Boolean);
}

function setTool(toolName) {
  toolButtons.forEach((button) => {
    const selected = button.dataset.tool === toolName;
    button.classList.toggle("is-active", selected);
    if (selected) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== toolName;
  });
}

toolButtons.forEach((button) => {
  button.addEventListener("click", () => setTool(button.dataset.tool));
});

subjectSelect.addEventListener("change", () => {
  document.querySelectorAll(".selected-subject").forEach((label) => {
    label.textContent = label.closest(".tutor-panel") ? subjectSelect.value.toLowerCase() : subjectSelect.value.toUpperCase();
  });
  quizIndex = 0;
  quizAnswered = false;
  cardIndex = 0;
  cardIsFlipped = false;
  renderQuiz();
  renderCard();
});

const essayInput = document.querySelector("#essay-input");
essayInput.addEventListener("input", () => {
  const count = wordsIn(essayInput.value).length;
  document.querySelector("#word-count").textContent = `${count} ord`;
});

function containsAny(text, list) {
  const normalized = text.toLocaleLowerCase("sv");
  return list.some((item) => normalized.includes(item));
}

function assessWriting(essay, assignment) {
  const tokens = wordsIn(essay);
  const normalized = essay.toLocaleLowerCase("sv");
  const sentences = sentenceList(essay);
  const paragraphs = essay.split(/\n\s*\n/).filter((part) => part.trim());
  const connectivesFound = [...new Set(connectors.filter((word) => normalized.includes(word)))];
  const exampleFound = containsAny(normalized, examples);
  const vocab = learningContent[subjectSelect.value].terms.filter((term) => normalized.includes(term));
  const assignmentWords = wordsIn(assignment.toLocaleLowerCase("sv"))
    .filter((word) => word.length > 3 && !stopWords.has(word));
  const relevantWords = assignmentWords.filter((word) => normalized.includes(word));
  const averageSentence = sentences.length ? tokens.length / sentences.length : tokens.length;
  const shortSentences = sentences.some((sentence) => wordsIn(sentence).length < 4);
  const hasSentenceEndings = /[.!?]["’”')\]]?\s*$/u.test(essay.trim());

  const feedback = [];
  feedback.push({
    title: "Svar på uppgiften",
    level: !assignmentWords.length || relevantWords.length >= Math.min(2, assignmentWords.length) ? "På väg" : "Utveckla",
    good: !assignmentWords.length || relevantWords.length >= Math.min(2, assignmentWords.length),
    detail: !assignmentWords.length
      ? "Lägg gärna till uppgiften så blir det lättare att se hur texten svarar mot den."
      : relevantWords.length >= Math.min(2, assignmentWords.length)
        ? `Jag hittar kopplingar till uppgiftens ämne, bland annat «${relevantWords.slice(0, 3).join("», «")}». Gör gärna svaret på själva frågan ännu tydligare.`
        : "Uppgiftens nyckelord syns inte så tydligt i texten än. Skriv gärna en mening som svarar direkt på frågan."
  });
  feedback.push({
    title: "Resonemang",
    level: connectivesFound.length >= 2 ? "Stark grund" : "Utveckla",
    good: connectivesFound.length >= 2,
    detail: connectivesFound.length
      ? `Du binder ihop idéer med «${connectivesFound.slice(0, 3).join("», «")}». Lägg till en förklaring av varför sambandet spelar roll.`
      : "Du berättar vad du tycker eller vet. Förklara också varför: prova «eftersom …» eller «det leder till att …»."
  });
  feedback.push({
    title: "Exempel och ämnesord",
    level: exampleFound && vocab.length ? "Stark grund" : "Utveckla",
    good: exampleFound && vocab.length > 0,
    detail: exampleFound
      ? `Bra att du använder ett konkret exempel${vocab.length ? ` och ämnesord som «${vocab.slice(0, 3).join("», «")}»` : ""}. Visa vad exemplet säger om din huvudidé.`
      : `Gör resonemanget mer konkret med ett exempel. ${vocab.length ? `Du använder redan ämnesord som «${vocab.slice(0, 3).join("», «")}».` : `Försök få in något viktigt begrepp från ${subjectSelect.value.toLocaleLowerCase("sv")}.`}`
  });
  feedback.push({
    title: "Struktur och tydlighet",
    level: sentences.length >= 3 && hasSentenceEndings && paragraphs.length >= 2 ? "Stark grund" : "På väg",
    good: sentences.length >= 3 && hasSentenceEndings && paragraphs.length >= 2,
    detail: sentences.length < 3
      ? "Texten är kort än så länge. En mening med ett skäl och en med ett exempel kan hjälpa läsaren följa tanken."
      : !hasSentenceEndings
        ? "Dela upp några tankar med punkt. Läs texten högt och stanna där en tanke tar slut."
        : paragraphs.length < 2 && tokens.length > 85
          ? "Texten blir lättare att följa om du börjar ett nytt stycke när du byter tanke."
          : shortSentences
            ? "Några meningar är väldigt korta. Prova att förklara hur de hör ihop."
            : `Texten har ${sentences.length} meningar och går att följa. Se gärna om ett nytt stycke skulle göra huvudidén ännu tydligare.`
  });

  let nextStep;
  if (!exampleFound) nextStep = "Välj en av dina huvudidéer och lägg till ett konkret exempel. Skriv sedan en mening om hur exemplet hänger ihop med uppgiften.";
  else if (connectivesFound.length < 2) nextStep = "Knyt ihop exemplet och din tanke. En förklaring som börjar med «Detta är viktigt eftersom …» visar hur du resonerar.";
  else if (sentences.length < 4 || averageSentence < 6) nextStep = "Utveckla en av meningarna med ett skäl, ett exempel och vad du drar för slutsats.";
  else nextStep = "Läs texten en gång till utifrån uppgiften. Avsluta med en mening som sammanfattar vad du vill att läsaren ska förstå.";

  const firstSentence = sentences[0] || "";
  const rewrite = firstSentence
    ? `Du skriver: «${firstSentence}»\n\nSom nästa steg kan du utveckla tanken så här: «${firstSentence.replace(/[.!?]+$/u, "")} Detta märks till exempel när [ett konkret exempel]. Det är viktigt eftersom [förklara sambandet med uppgiften].»`
    : "Skriv en mening som uttrycker din huvudidé. Lägg sedan till ett konkret exempel och förklara varför det stöder din tanke.";

  const strengths = [];
  if (tokens.length >= 55) strengths.push("Du ger texten utrymme att utvecklas.");
  if (exampleFound) strengths.push("Du använder exempel för att konkretisera dina tankar.");
  if (connectivesFound.length) strengths.push("Du binder ihop idéer med sambandsord.");
  if (vocab.length) strengths.push(`Du får med relevanta ämnesord: ${vocab.slice(0, 3).join(", ")}.`);
  if (!strengths.length) strengths.push("Du har kommit igång och har en tanke att bygga vidare på.");

  return {
    feedback,
    nextStep,
    rewrite,
    intro: `${strengths.join(" ")} Nästa utvecklingssteg är valt utifrån mönster i texten och din uppgift.`,
    wordCount: tokens.length,
  };
}

document.querySelector("#writing-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const essay = essayInput.value.trim();
  const assignment = document.querySelector("#assignment-input").value.trim();
  const count = wordsIn(essay).length;
  if (count < 12) {
    essayInput.setCustomValidity("Skriv gärna minst 12 ord så finns det tillräckligt med text att ge återkoppling på.");
    essayInput.reportValidity();
    essayInput.setCustomValidity("");
    return;
  }
  const result = assessWriting(essay, assignment);
  const grid = document.querySelector("#feedback-grid");
  grid.replaceChildren(...result.feedback.map((item) => {
    const card = document.createElement("article");
    card.className = "feedback-item";
    const heading = document.createElement("div");
    heading.className = "feedback-item-header";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const level = document.createElement("span");
    level.className = `feedback-level${item.good ? " level-good" : ""}`;
    level.textContent = item.level;
    const detail = document.createElement("p");
    detail.textContent = item.detail;
    heading.append(title, level);
    card.append(heading, detail);
    return card;
  }));
  document.querySelector("#feedback-intro").textContent = `${result.intro} (Text: ${result.wordCount} ord.)`;
  document.querySelector("#next-suggestion").textContent = result.nextStep;
  document.querySelector("#rewrite-example").textContent = result.rewrite;
  const feedbackPanel = document.querySelector("#feedback-panel");
  feedbackPanel.hidden = false;
  feedbackPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelector("#revise-button").addEventListener("click", () => {
  essayInput.focus();
  essayInput.scrollIntoView({ behavior: "smooth", block: "center" });
  essayInput.setSelectionRange(essayInput.value.length, essayInput.value.length);
});
document.querySelector("#clear-feedback").addEventListener("click", () => {
  essayInput.value = "";
  document.querySelector("#assignment-input").value = "";
  document.querySelector("#word-count").textContent = "0 ord";
  document.querySelector("#feedback-panel").hidden = true;
  essayInput.focus();
});

document.querySelector("#material-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const source = document.querySelector("#notes-input").value.trim();
  const sentences = sentenceList(source);
  const words = wordsIn(source.toLocaleLowerCase("sv"));
  if (words.length < 10) {
    document.querySelector("#notes-input").setCustomValidity("Lägg till minst 10 ord så att jag har material att utgå från.");
    document.querySelector("#notes-input").reportValidity();
    document.querySelector("#notes-input").setCustomValidity("");
    return;
  }
  const summary = sentences.slice(0, 2).join(" ");
  document.querySelector("#summary-output").textContent = summary.length > 350 ? `${summary.slice(0, 347).trimEnd()}…` : summary;
  const subjectTerms = learningContent[subjectSelect.value].terms;
  const frequency = new Map();
  words.filter((word) => word.length > 4 && !stopWords.has(word)).forEach((word) => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });
  const relevant = [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);
  const terms = [...new Set([
    ...subjectTerms.filter((term) => source.toLocaleLowerCase("sv").includes(term)),
    ...relevant,
  ])].slice(0, 6);
  const list = document.querySelector("#terms-output");
  list.replaceChildren(...(terms.length ? terms : ["huvudidé", "exempel", "samband"]).map((term) => {
    const item = document.createElement("li");
    item.textContent = term;
    return item;
  }));
  document.querySelector("#question-output").textContent = `Förklara med egna ord hur «${terms[0] || "huvudidén"}» hänger ihop med innehållet i dina anteckningar. Vilket exempel kan du använda?`;
  document.querySelector("#generated-material").hidden = false;
});

function renderQuiz() {
  const questions = learningContent[subjectSelect.value].quiz;
  const item = questions[quizIndex];
  quizAnswered = false;
  document.querySelector("#quiz-number").textContent = `FRÅGA ${quizIndex + 1} AV ${questions.length}`;
  document.querySelectorAll(".quiz-dots i").forEach((dot, index) => dot.classList.toggle("active", index === quizIndex));
  document.querySelector("#quiz-question").textContent = item.question;
  document.querySelector("#quiz-feedback").textContent = "";
  document.querySelector("#quiz-next").disabled = true;
  document.querySelector("#quiz-next").innerHTML = quizIndex === questions.length - 1
    ? 'Börja om <span aria-hidden="true">↻</span>'
    : 'Nästa fråga <span aria-hidden="true">→</span>';
  document.querySelector("#quiz-options").replaceChildren(...item.options.map((label, index) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "quiz-option";
    option.dataset.correct = String(index === item.answer);
    const letter = document.createElement("span");
    letter.textContent = String.fromCharCode(65 + index);
    option.append(letter, document.createTextNode(label));
    option.addEventListener("click", () => answerQuiz(option, item));
    return option;
  }));
}

function answerQuiz(selected, question) {
  if (quizAnswered) return;
  quizAnswered = true;
  const correct = selected.dataset.correct === "true";
  document.querySelectorAll(".quiz-option").forEach((option) => {
    option.disabled = true;
    if (option.dataset.correct === "true") option.classList.add("is-correct");
  });
  if (!correct) selected.classList.add("is-wrong");
  document.querySelector("#quiz-feedback").textContent = `${correct ? "Precis!" : "Inte riktigt."} ${question.explanation}`;
  document.querySelector("#quiz-next").disabled = false;
}

document.querySelector("#quiz-next").addEventListener("click", () => {
  quizIndex = quizIndex >= learningContent[subjectSelect.value].quiz.length - 1 ? 0 : quizIndex + 1;
  renderQuiz();
});

function renderCard() {
  const cards = learningContent[subjectSelect.value].cards;
  const [term, definition] = cards[cardIndex];
  cardIsFlipped = false;
  document.querySelector("#flashcard").setAttribute("aria-pressed", "false");
  document.querySelector("#flashcard-count").textContent = `KORT ${cardIndex + 1} AV ${cards.length}`;
  document.querySelector("#flashcard-term").textContent = term;
  document.querySelector("#flashcard-answer").textContent = definition;
  document.querySelector("#flashcard-answer").hidden = true;
  document.querySelector("#flashcard-hint").hidden = false;
  document.querySelector("#flashcard-note").textContent = "";
}

function flipCard() {
  cardIsFlipped = !cardIsFlipped;
  document.querySelector("#flashcard-answer").hidden = !cardIsFlipped;
  document.querySelector("#flashcard-hint").hidden = cardIsFlipped;
  document.querySelector("#flashcard").setAttribute("aria-pressed", String(cardIsFlipped));
}

document.querySelector("#flashcard").addEventListener("click", flipCard);
document.querySelector("#card-next").addEventListener("click", () => {
  const remembered = cardIsFlipped;
  cardIndex = (cardIndex + 1) % learningContent[subjectSelect.value].cards.length;
  renderCard();
  document.querySelector("#flashcard-note").textContent = remembered ? "Snyggt! Ett steg närmare att minnas." : "";
});
document.querySelector("#card-previous").addEventListener("click", () => {
  cardIndex = (cardIndex - 1 + learningContent[subjectSelect.value].cards.length) % learningContent[subjectSelect.value].cards.length;
  renderCard();
});

function addChatMessage(text, isUser) {
  const message = document.createElement("div");
  message.className = `chat-message ${isUser ? "user-message" : "coach-message"}`;
  if (!isUser) {
    const avatar = document.createElement("span");
    avatar.className = "chat-avatar";
    avatar.textContent = "l.";
    avatar.setAttribute("aria-hidden", "true");
    message.append(avatar);
  }
  const content = document.createElement("p");
  content.textContent = text;
  message.append(content);
  const chat = document.querySelector("#tutor-chat");
  chat.append(message);
  chat.scrollTop = chat.scrollHeight;
}

function respondToQuestion(question) {
  const subject = subjectSelect.value;
  const text = question.toLocaleLowerCase("sv");
  if (containsAny(text, ["exempel", "example"])) {
    return `Tänk på ett konkret exempel från ${subject.toLocaleLowerCase("sv")}. Beskriv först vad som händer, och koppla sedan exemplet till själva begreppet. Vad lägger du märke till?`;
  }
  if (containsAny(text, ["enklare", "simpler", "förklara", "explain"])) {
    const explanations = {
      Kemi: "En atom är som en pytteliten byggsten. När den lämnar ifrån sig en elektron ändras dess laddning – lite som när man tar bort ett minus från en balansvåg.",
      Historia: "Tänk på en historisk källa som en persons berättelse. Den kan berätta något viktigt, men vi behöver fundera på vem som berättar och varför.",
      Biologi: "Se en cell som en liten arbetsplats. Olika delar har olika uppgifter, ungefär som olika rum där särskilda saker händer.",
      Svenska: "Tänk att ett resonemang är som en bro: din åsikt är ena sidan, din slutsats den andra, och dina skäl och exempel hjälper dig komma över.",
      Engelska: "Think of an argument as a bridge: your main point is one side, your conclusion is the other, and your reasons and examples connect them.",
    };
    return explanations[subject];
  }
  if (containsAny(text, ["quiz", "test", "fråga"])) {
    const quiz = learningContent[subject].quiz[0];
    return `Vi testar en sak: ${quiz.question} Tänk en stund på ditt svar. Du hittar också ett självrättande quiz under «Träna med quiz».`;
  }
  const cards = learningContent[subject].cards;
  const matchedCard = cards.find(([term]) => text.includes(term.toLocaleLowerCase("sv")));
  if (matchedCard) return `«${matchedCard[0]}» betyder: ${matchedCard[1]} Kan du komma på ett eget exempel där begreppet passar?`;
  const explanations = {
    Kemi: "Börja med att skilja mellan atomer, elektroner och laddning. En förändring i elektroner kan ändra laddningen utan att grundämnet ändras. Vilken del vill du titta närmare på?",
    Historia: "Prova att tänka på både orsaker och följder, och jämför sedan hur två olika personer kan ha upplevt samma händelse. Vilken del av din fråga vill du reda ut?",
    Biologi: "Börja med att se hur delarna samspelar: organismer påverkar varandra och sin miljö. Då blir det lättare att förstå helheten. Vilken del känns svårast?",
    Svenska: "Prova att uttrycka huvudidén först, ge ett konkret exempel och förklara sedan varför exemplet stöder din tanke. Det gör resonemanget lättare att följa. Vad vill du utveckla?",
    Engelska: "Try stating your main idea first, adding one specific example, and then explaining how the example supports your point. Which part would you like to work on?",
  };
  return explanations[subject];
}

document.querySelector("#tutor-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#tutor-question");
  const question = input.value.trim();
  if (!question) return;
  addChatMessage(question, true);
  addChatMessage(respondToQuestion(question), false);
  input.value = "";
  input.focus();
});
document.querySelectorAll(".prompt-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#tutor-question").value = button.textContent;
    document.querySelector("#tutor-form").requestSubmit();
  });
});

renderQuiz();
renderCard();
