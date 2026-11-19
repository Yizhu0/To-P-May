/* ✏️ แก้ข้อความตรงนี้ได้เลย */
const MESSAGES = [
  "เค้ายังรู้สึกไม่ดีมากๆ \nสำหรับเรื่องที่ทำให้เธอเสียใจ 🥺",
  "ช่วงที่ผ่านมา เค้าได้คิดทบทวนเยอะเลย\nว่าตรงไหนที่เค้าทำผิดไป ☁️",
  "เค้าอยากได้โอกาสอีกสักครั้ง\nอยากเรียนรู้ และเปลี่ยนตัวเองให้ดีขึ้น 🌱",
  "เค้ายังคิดถึงเธออยู่ตลอดนะ\nทำอันนี้เสร็จเค้าต้องเผลอหลับหน้าคอมแน่ๆ 🥹",
  "เค้าเลยอยากถามว่า...\nเราสองคนลองเริ่มต้นใหม่ด้วยกัน\nและให้โอกาสอีกสักครั้งได้ไหมคับ? 🤍"
];

const $ = id => document.getElementById(id);
const mascot = $("mascot");
const show = n => { document.querySelectorAll(".stage").forEach(s => s.classList.remove("on")); $("s"+n).classList.add("on"); };
const mood = m => { mascot.classList.remove("happy","calm"); if (m) mascot.classList.add(m); };

for (let i = 0; i < 6; i++) {
  const c = document.createElement("div"); c.className = "cloud";
  const w = 90 + Math.random()*90;
  c.style.cssText = `width:${w}px;height:${w*.3}px;top:${5+Math.random()*80}%;animation-duration:${40+Math.random()*40}s;animation-delay:-${Math.random()*60}s`;
  document.body.appendChild(c);
}
function fx(emoji, size, fall) {
  const h = document.createElement("div"); h.className = "fx" + (fall ? " fall" : "");
  h.textContent = emoji; h.style.left = Math.random()*100 + "vw"; h.style.fontSize = size + "px";
  h.style.animationDuration = (fall ? 3 + Math.random()*3 : 5 + Math.random()*5) + "s";
  document.body.appendChild(h); setTimeout(() => h.remove(), 10500);
}
let ambient = setInterval(() => fx(["🤍","☁️","✨","💗"][Math.random()*4|0], 14 + Math.random()*16), 1500);

let i = 0, timer;
const dots = $("dots");
MESSAGES.forEach(() => dots.appendChild(document.createElement("i")));
function type(text) {
  clearInterval(timer); const el = $("msg"); el.textContent = ""; let k = 0; const ch = [...text];
  timer = setInterval(() => { el.textContent += ch[k++] || ""; if (k >= ch.length) clearInterval(timer); }, 55);
}
function step() {
  [...dots.children].forEach((d, n) => d.classList.toggle("on", n === i));
  type(MESSAGES[i]);
  $("next").textContent = i === MESSAGES.length - 1 ? "ถามหน่อยนะ 💌" : "ต่อไป →";
}
$("open").onclick = () => { show(1); step(); };
$("next").onclick = () => { if (i < MESSAGES.length - 1) { i++; step(); } else { clearInterval(timer); show(2); } };

$("yes").onclick = () => {
  show(3); mood("happy");
  for (let n = 0; n < 40; n++) setTimeout(() => fx(["💖","💕","🎀","✨","🤍","☁️"][Math.random()*6|0], 20 + Math.random()*26), n*90);
};
/* ปุ่ม "ไม่เอาแล้ว": หนี 3 รอบ แล้วกดได้จริง */
const noBtn = $("no"), yesBtn = $("yes");
const NO_TEXTS = ["ไม่เอาแล้ว","เอ๊ะ กดไม่ได้ 🙈","จะกดจริงๆ เหรอ 🥹","ไม่เอาแล้วจริงๆ"];
const MAX_DODGE = 2;
let dodges = 0, lastDodge = 0;
function dodge(e) {
  if (dodges >= MAX_DODGE) return;
  if (e && e.cancelable) e.preventDefault();
  dodges++; lastDodge = Date.now();
  noBtn.textContent = NO_TEXTS[dodges];
  yesBtn.style.transform = `scale(${1 + dodges * 0.1})`;
  if (dodges < MAX_DODGE) {
    noBtn.style.transform = "";
    const r = noBtn.getBoundingClientRect();
    const x = 10 + Math.random() * (innerWidth - r.width - 20);
    const y = 10 + Math.random() * (innerHeight - r.height - 20);
    noBtn.style.transform = `translate(${x - r.left}px, ${y - r.top}px)`;
  } else {
    setTimeout(() => { noBtn.style.transform = ""; noBtn.textContent = NO_TEXTS[4]; }, 1100);
  }
}
noBtn.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") dodge(e); });
noBtn.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") dodge(e); });
noBtn.addEventListener("click", e => {
  if (dodges < MAX_DODGE) { if (Date.now() - lastDodge > 400) dodge(e); return; }
  clearInterval(ambient); show(4); mood("calm");
  for (let n = 0; n < 10; n++) setTimeout(() => fx(["🤍","☁️","🌷"][n % 3], 18 + Math.random()*10), n*300);
});
$("back").onclick = () => {
  dodges = 0; noBtn.style.transform = ""; yesBtn.style.transform = ""; noBtn.textContent = NO_TEXTS[0];
  mood(null); show(2); ambient = setInterval(() => fx("🤍", 18), 1500);
};
