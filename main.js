let money = 0;
let autoCount = 0;
let mult = 1;

const moneyEl = document.getElementById("money");
const clickBtn = document.getElementById("clicker");
const buyAutoBtn = document.getElementById("buy-auto");
const buyMultBtn = document.getElementById("buy-mult");
const autoDesc = document.getElementById("auto-desc");
const multDesc = document.getElementById("mult-desc");

const AUTO_BASE = 50;
const MULT_BASE = 100;

function save() {
  localStorage.setItem("cashClicker", JSON.stringify({ money, autoCount, mult }));
}

function load() {
  const saved = JSON.parse(localStorage.getItem("cashClicker"));
  if (saved) {
    money = saved.money;
    autoCount = saved.autoCount;
    mult = saved.mult;
  }
}

function updateUI() {
  moneyEl.textContent = `Money: $${Math.floor(money)}`;
  autoDesc.textContent = `Cost: $${AUTO_BASE + autoCount * 50} | You own: ${autoCount}`;
  multDesc.textContent = `Cost: $${MULT_BASE + (mult - 1) * 100} | Multiplier: x${mult}`;
}

clickBtn.addEventListener("click", () => {
  money += mult;
  updateUI();
  save();
});

buyAutoBtn.addEventListener("click", () => {
  const cost = AUTO_BASE + autoCount * 50;
  if (money >= cost) {
    money -= cost;
    autoCount++;
    updateUI();
    save();
  } else alert("Not enough money!");
});

buyMultBtn.addEventListener("click", () => {
  const cost = MULT_BASE + (mult - 1) * 100;
  if (money >= cost) {
    money -= cost;
    mult++;
    updateUI();
    save();
  } else alert("Not enough money!");
});

// Auto income loop
setInterval(() => {
  money += autoCount;
  updateUI();
  save();
}, 1000);

load();
updateUI();
