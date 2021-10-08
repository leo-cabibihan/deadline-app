const app = document.getElementById("app");

const form = document.forms[0];

let data = [];
let deadline = new Date(2022, 0, 1);

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

  data.push({
    id: data.length,
    deadline: deadline,
    title: title.value,
  });

  form.reset();

  console.log(data);
});

const renderTime = (id, time, title, deadline) => {
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
 <div id="renderTime${id}">time till ${title}: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds</div>
 `;
};

const run = () => {
  const time = new Date();
  console.log(
    data.map(({ id, title, deadline }) => renderTime(id, time, title, deadline))
  );
  app.innerHTML = data
    .map(({ id, title, deadline }) => renderTime(id, time, title, deadline))
    .join("");
  window.requestAnimationFrame(run);
};

window.requestAnimationFrame(run);
