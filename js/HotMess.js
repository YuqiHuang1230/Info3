
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
















<!-- ========================= -->
        <!-- ITEM 1 -->
        <!-- ========================= -->

        <div class="cart-item">

          <div class="cart-image">


            <img src="../images/products/large-main.png" alt="large">

          </div>

          <div class="cart-info">

            <h2>
              FERMENTED HOT SAUCE LARGE
            </h2>

            <p>
              Heat intensity
            </p>

            <!-- quantity -->

            <div class="quantity-row">

              <div class="quantity-box">

                <button class="qty-btn minus">
                  −
                </button>

                <span class="quantity">
                  1
                </span>

                <button class="qty-btn plus">
                  +
                </button>

              </div>

            </div>



          </div>

          <!-- price -->

          <div class="cart-price">

            <h3 class="item-total" data-price="19.99">
              $19.99
            </h3>

            <button class="remove-btn">
              Remove
            </button>
            

          </div>

        </div>

        <!-- ========================= -->
        <!-- ITEM 2 -->
        <!-- ========================= -->

        <div class="cart-item">

          <div class="cart-image">


            <img src="../images/products/small-main.png" alt="small">

          </div>

          <div class="cart-info">

            <h2>
              FERMENTED HOT SAUCE SMALL
            </h2>

            <p>
              Heat intensity
            </p>

            <div class="quantity-row">

              <div class="quantity-box">

                <button class="qty-btn minus">
                  −
                </button>

                <span class="quantity">
                  2
                </span>

                <button class="qty-btn plus">
                  +
                </button>

              </div>

            </div>



          </div>

          <div class="cart-price">

            <h3 class="item-total" data-price="12.99">
              $25.98
            </h3>

            <button class="remove-btn">
              Remove
            </button>

            

          </div>

        </div>




















        Checkout page
              <!-- ITEM -->

        <div class="summary-item">


          <img src="../images/products/large-main.png" alt="large">

          <div class="summary-info">

            <div class="summary-top">

              <h4>
                Fermented Hot Sauce Large
              </h4>

              <span class="item-total" data-price="19.99">
                $19.99
              </span>

            </div>

            <div class="quantity-controls">

              <button class="qty-btn minus">
                -
              </button>

              <span class="qty-number">
                1
              </span>

              <button class="qty-btn plus">
                +
              </button>

            </div>

          </div>

        </div>

        <!-- ITEM -->

        <div class="summary-item">


          <img src="../images/products/small-main.png" alt="small">

          <div class="summary-info">

            <div class="summary-top">

              <h4>
                Fermented Hot Sauce Small
              </h4>

              <span class="item-total" data-price="12.99">
                $25.98
              </span>

            </div>

            <div class="quantity-controls">

              <button class="qty-btn minus">
                -
              </button>

              <span class="qty-number">
                2
              </span>

              <button class="qty-btn plus">
                +
              </button>

            </div>

          </div>

        </div>