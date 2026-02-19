/* =========================
   Henter elementer fra html
========================= */
const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");
const clearBtn = document.getElementById("clear_knap");

const dueDate = document.getElementById("due_date");
const dueTime = document.getElementById("due_time");

/* =========================
   Funktion til når man tilføjer en task
========================= */

function addTask() {
  // Hvis vores input felt er tomt, så popper der en alert frem
  if (inputBox.value === "") {
    alert("Please write a to do task!");
    // Ellers, hvis vi skriver noget i input feltet, så gælder følgende
  } else {
    let li = document.createElement("li");
    // Vi gemmer brugerens input i disse variabler:
    const taskText = inputBox.value;
    const dateValue = dueDate.value;
    const timeValue = dueTime.value;

    // dato + tidspunkt
    // Vi indsætter indhold i vores "li" element
    // ? = Hvis vores bruger har valgt en dato, så vis den, hvis ikke, så vis ingenting
    li.innerHTML = `
      <div class="task-text">${taskText}</div>
   <p>
  ${dateValue ? dateValue : ""}
  ${timeValue ? `kl. ${timeValue}` : ""} 
  </p>
    `;
    // Tilføjer til listen
    listContainer.appendChild(li);

    //Vi opretter et X så vi kan slette en task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    //Vi lægger det ind i vores "li"
    li.appendChild(span);

    sortTasks();
  }
  //   Vores input felt skal kunne ryddes så man kan skrive nye tasks
  //   Så vi giver inputBox, duedate og duetime en tom string
  inputBox.value = "";
  dueDate.value = "";
  dueTime.value = "";
  saveData();
}

/* =========================
   Kode til når man vil tjekke en task af, eller slette task'en
========================= */

listContainer.addEventListener(
  "click",
  function (e) {
    //    Når man klikker på en task, vil den vise at den er færdig
    if (e.target.tagName === "LI") {
      // Hvis den allerede er markeret som færdig, vil den fjernes igen hvis man klikker igen.
      e.target.classList.toggle("checked");
      sortTasks();
      saveData();
      //   Hvis man klikker på X, så vil task'en slettes
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

/* =========================
Kode til når man gerne vil clear all tasks
========================= */

clearBtn.addEventListener("click", function () {
  listContainer.innerHTML = "";
  saveData();
});

/* =========================
Vi opretter en funktion der gemmer vores data når man reloader siden. 
========================= */

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

/* =========================
Vi opretter en funktion der gemmer vores data når man åbner fanen til to-do listen igen. 
========================= */
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

/* =========================
Kode til at checked tasks smides nederst
========================= */
function sortTasks() {
  // Array.from laver det om til et "rigtigt" array, så vi kan sortere det
  const tasks = Array.from(listContainer.children);

  //Vi kan nu sortere to-do opgaverne
  tasks.sort((a, b) => {
    //Vi skal først se om vores tasks er "checked"
    const aChecked = a.classList.contains("checked");
    const bChecked = b.classList.contains("checked");
    // a er "checked" og b ikke er, så returner og omvendt
    // hvis ingen er "checked", så beholdes rækkefølgen.
    return aChecked - bChecked;
  });

  //for hver task
  // appendChild flytter elementet til bunden af listen
  tasks.forEach((task) => listContainer.appendChild(task));
}

/* =========================
Når man trykker enter så vil tasken tilføjes, i stedet for a man trykker på add knappen.
========================= */

inputBox.addEventListener("keyup", function (e) {
  //e.key = fortæller hvilken tast brugeren har klikket på.
  // hvis det er "enter", så kaldes addTask()
  if (e.key === "Enter") {
    addTask();
  }
});
