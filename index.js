const app = document.getElementById("app");

console.log(localforage);

const form = document.forms[0];

let data = [];

window.addEventListener("load", () => {
  localforage.getItem("data").then((value) => {
    console.log(value);
    if (value !== null) data = value;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const [title, timeInput, dateInput] = form.elements;
  const hour = parseInt(timeInput.value[0] + timeInput.value[1]);
  const minute = parseInt(timeInput.value[3] + timeInput.value[4]);

  const date = new Date(dateInput.value);
  deadline = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute
  );

  console.log(title, timeInput, dateInput);
  console.log(title.value, timeInput.value, dateInput.value);

  localforage
    .setItem(
      "data",
      data.concat({
        id: data.length,
        deadline: deadline,
        title: title.value,
      })
    )
    .then((value) => {
      console.log(value);
      data = value;
    });

  form.reset();
});

const renderTime = (id, time, title, deadline) => {
  const ms = deadline - time;
  const s = ms / 1000;
  const seconds = Math.floor(s) % 60;
  const m = s / 60;
  const minutes = Math.floor(m) % 60;
  const h = m / 60;
  const hours = Math.floor(h) % 24;
  const d = h / 24;
  const days = Math.floor(d);
  return `
  <div class="nes-container with-title margin-top-8" id="renderTime${id}"> 
    <p class="title"> ${title}</p>
    <p> ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds </p>
  </div>
 `;
};

const run = () => {
  const time = new Date();

  app.innerHTML = data
    .map(({ id, title, deadline }) => renderTime(id, time, title, deadline))
    .join("");
  window.requestAnimationFrame(run);
};

window.requestAnimationFrame(run);
