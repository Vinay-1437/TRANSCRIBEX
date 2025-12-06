const a = document.getElementById("Startbtn");
const b = document.getElementById("Stopbtn");
const c = document.getElementById("input");
const d = document.getElementById("Savebtn");
const e = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
e.lang = "en-IN";
e.continuous = true;
e.interimResults = true;
let finalText = "";
e.onresult = (ev) => {
  let temp = "";
for (let i = ev.resultIndex; i < ev.results.length; i++) {
    temp += ev.results[i][0].transcript;
    if (ev.results[i].isFinal) {
      finalText += temp + "\n";
      temp = "";
    }
  }
  c.value = finalText + temp;
};
a.addEventListener("click", () => {
  e.start();
  a.style.backgroundColor = "red";  
});
e.onend = () => {
  a.style.backgroundColor = "";      
};
b.addEventListener("click", () => {
  e.stop();
});
let num = 0;
const box = document.getElementById("container");
d.onclick = () => {
  if (!c.value.trim()) return;
  num++;
  const div = document.createElement("div");
  div.className = "entry";
  div.innerHTML = `<span class="num">${num}.</span> <div class="text">${c.value}</div>`;
  box.prepend(div);

  c.value = "";
  finalText = "";
};
