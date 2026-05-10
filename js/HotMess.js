
/* =========================
  Product Page
========================= */
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




/* =========================
  Checkout Page
========================= */

const shippingRadios = document.querySelectorAll('input[name="shipping"]');
const shippingCostEl = document.getElementById("shipping-cost");
const totalEl = document.getElementById("total");

let baseTotal = 45.97;

shippingRadios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    let shipping = index === 0 ? 5 : 12;

    shippingCostEl.textContent = `$${shipping.toFixed(2)}`;
    totalEl.textContent = `$${(baseTotal + shipping).toFixed(2)}`;
  });
});





/* =========================
  Search Page
========================= */
document.getElementById("chatBtn").addEventListener("click", () => {
  alert("Chili-Bot is waking up 🌶🤖...");
});