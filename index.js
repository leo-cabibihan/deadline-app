const app = document.getElementById("app");

const form = document.forms[0];

let data = [];
let deadline = new Date(2022, 0, 1);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const [timeInput, dateInput] = form.elements;
  console.log(timeInput.value);
  const hour = parseInt(timeInput.value[0] + timeInput.value[1]);
  const minute = parseInt(timeInput.value[3] + timeInput.value[4]);

  console.log(hour);
  console.log(minute);
  console.log(new Date(dateInput.value));
  const date = new Date(dateInput.value);
  console.log(date.getFullYear());
  console.log(date.getMonth());
  console.log(date.getDate());
  deadline = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    minute
  );
});

const renderTime = (time, deadline) => {
  const ms = deadline - time;
  const s = ms / 1000;
  const seconds = Math.round(s) % 60;
  const m = s / 60;
  const minutes = Math.round(m) % 60;
  const h = m / 60;
  const hours = Math.round(h) % 60;
  const d = h / 24;
  const days = Math.round(d);
  return `
 time till deadline: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds
 `;
};

const run = () => {
  const time = new Date();
  app.innerText = renderTime(time, deadline);
  window.requestAnimationFrame(run);
};

window.requestAnimationFrame(run);
