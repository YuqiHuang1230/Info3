document.addEventListener('DOMContentLoaded', () => {
  /* =====================================
     HAMBURGER MENU
  ===================================== */
  const menuBtn = document.querySelector(".hamburger-btn");
  const sidebar = document.querySelector(".mobile-sidebar");
  const closeBtn = document.querySelector(".close-sidebar");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.add("show");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
    });
  }

  /* =====================================
     CART STORAGE
  ===================================== */
  let cart = JSON.parse(localStorage.getItem("hotmess-cart")) || [];

  function saveCart() {
    localStorage.setItem("hotmess-cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartDots = document.querySelectorAll(".cart-dot");
    cartDots.forEach(dot => {
      if (totalQty > 0) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  updateCartCount();

  /* =====================================
     POPUP ELEMENTS
  ===================================== */
  const popup = document.getElementById('cartPopup');
  const closePopup = document.getElementById('closePopup');
  const keepShopping = document.querySelector('.keep-shopping');
  const popupTitle = document.getElementById('popupTitle');
  const popupImage = document.getElementById('popupImage');
  const popupQty = document.getElementById('popupQty');
  const popupMinus = document.querySelector('.minus-popup');
  const popupPlus = document.querySelector('.plus-popup');
  const undoBtn = document.querySelector('.undo-btn');

  let activeProduct = null;

  function showPopup(product) {
    if (!popup) return;
    activeProduct = product;
    popupTitle.textContent = product.product;
    popupImage.src = product.image;
    popupQty.textContent = product.quantity;
    popup.classList.add("show");
  }

  function hidePopup() {
    if (!popup) return;
    popup.classList.remove("show");
  }

  closePopup?.addEventListener("click", hidePopup);
  keepShopping?.addEventListener("click", hidePopup);

  undoBtn?.addEventListener("click", () => {
    hidePopup();
    if (activeProduct) {
      cart = cart.filter(item => item.product !== activeProduct.product);
      saveCart();
      updateCartCount();
      activeProduct = null;
    }
  });

  /* =====================================
     POPUP +/- BUTTONS
  ===================================== */
  if (popupPlus && popupMinus && popupQty) {
    popupPlus.addEventListener('click', () => {
      let count = parseInt(popupQty.textContent);
      count++;
      popupQty.textContent = count;

      if (activeProduct) {
        const item = cart.find(i => i.product === activeProduct.product);
        if (item) item.quantity = count;
        saveCart();
      }
    });

    popupMinus.addEventListener('click', () => {
      let count = parseInt(popupQty.textContent);
      if (count > 1) {
        count--;
        popupQty.textContent = count;

        if (activeProduct) {
          const item = cart.find(i => i.product === activeProduct.product);
          if (item) item.quantity = count;
          saveCart();
        }
      }
    });
  }

  /* =====================================
     ADD TO CART —— 主页 + 产品页 通用
  ===================================== */
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const productName = button.dataset.product;
      const productPrice = parseFloat(button.dataset.price);
      const productImage = button.dataset.image;
      let quantity = 1;

      const qtyEl = button.closest('.buy-actions, .cart-action')?.querySelector('.qty-number');
      if (qtyEl) quantity = parseInt(qtyEl.textContent) || 1;

      if (!productPrice) {
        alert("Price missing!");
        return;
      }

      const existing = cart.find(item => item.product === productName);
      if (existing) {
        existing.quantity = quantity;
      } else {
        cart.push({
          product: productName,
          price: productPrice,
          image: productImage,
          quantity: quantity
        });
      }

      saveCart();
      updateCartCount();
      showPopup({
        product: productName,
        image: productImage,
        quantity: quantity
      });
    });
  });

  /* =====================================
     CART PAGE RENDER
  ===================================== */
  const cartPage = document.querySelector(".cart-page");
  const checkoutPage = document.querySelector(".checkout-page");

  if (cartPage || checkoutPage) {
    let container = null;
    let subtotalEl = document.getElementById("subtotal");

    if (cartPage) container = cartPage.querySelector(".cart-left");
    if (checkoutPage) container = document.querySelector(".checkout-product-list");

    function renderCart() {
      if (!container) return;
      container.querySelectorAll(".cart-item").forEach(el => el.remove());
      let subtotal = 0;

      cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const html = `
          <div class="cart-item">
            <div class="cart-image">
              <img src="${item.image}" alt="">
            </div>
            <div class="cart-info">
              <h2>${item.product}</h2>
              <p>Heat intensity</p>
              <div class="quantity-row">
                <div class="quantity-box">
                  <button class="qty-btn minus" data-index="${index}">−</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="qty-btn plus" data-index="${index}">+</button>
                </div>
              </div>
            </div>
            <div class="cart-price">
              <h3 class="item-total">$${(item.price * item.quantity).toFixed(2)}</h3>
              <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
        container.insertAdjacentHTML("beforeend", html);
      });

      if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
      bindCartButtons();
    }

    function bindCartButtons() {
      document.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.dataset.index;
          cart[index].quantity++;
          saveCart();
          renderCart();
          updateCartCount();
        });
      });
      document.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.dataset.index;
          if (cart[index].quantity > 1) cart[index].quantity--;
          saveCart();
          renderCart();
          updateCartCount();
        });
      });
      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.dataset.index;
          cart.splice(index, 1);
          saveCart();
          renderCart();
          updateCartCount();
        });
      });
    }

    renderCart();
  }
});

function changeImage(element) {
  const mainImage = document.getElementById("mainProductImage");
  mainImage.src = element.src;
  const thumbs = document.querySelectorAll(".thumb");
  thumbs.forEach((thumb) => {
    thumb.classList.remove("active-thumb");
  });
  element.classList.add("active-thumb");
}