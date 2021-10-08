//find difference between something and something
const app = document.getElementById("app");

const deadline = new Date(2022, 0, 1);

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
 time till next year: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds
 `;
};

const run = () => {
  const time = new Date();
  app.innerText = renderTime(time, deadline);
  window.requestAnimationFrame(run);
};

window.requestAnimationFrame(run);
