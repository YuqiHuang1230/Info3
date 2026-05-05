const minus = document.querySelector(".quantity button:first-child");
const plus = document.querySelector(".quantity button:last-child");
const count = document.querySelector(".quantity span");

let num = 1;

minus.addEventListener("click", () => {
  if (num > 1) {
    num--;
    count.innerText = num;
  }
});

plus.addEventListener("click", () => {
  num++;
  count.innerText = num;
});