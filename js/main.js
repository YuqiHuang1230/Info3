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
      if (totalQty > 0) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  updateCartCount();

  /* =====================================
     页面加载时：自动恢复已加入购物车的按钮状态
  ===================================== */
  function restoreButtonStates() {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      const prodName = btn.dataset.product;
      const inCart = cart.find(i => i.product === prodName);
      if (inCart) {
        const box = btn.closest('.cart-action, .buy-actions');
        btn.style.display = 'none';
        const qtyBox = box.querySelector('.quantity-box');
        if (qtyBox) {
          qtyBox.style.display = 'flex';
          const num = qtyBox.querySelector('.qty-number');
          if (num) num.textContent = inCart.quantity;
        }
      }
    });
  }
  restoreButtonStates();

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
  let lastClickedButton = null;

  function showPopup(product, button) {
    if (!popup) return;
    activeProduct = product;
    lastClickedButton = button;
    popupTitle.textContent = product.product;
    popupImage.src = product.image;
    popupQty.textContent = product.quantity;
    popup.classList.add("show");

    const linkEl = document.getElementById('popupProductLink');
    if (linkEl) {
      if (product.product.includes("LARGE")) {
        linkEl.href = "../html/product-large.html";
      } else if (product.product.includes("SMALL")) {
        linkEl.href = "../html/product-small.html";
      }
    }
  }

  function hidePopup() {
    if (!popup) return;
    popup.classList.remove("show");

    if (lastClickedButton) {
      const box = lastClickedButton.closest('.cart-action, .buy-actions');
      lastClickedButton.style.display = 'none';
      const qtyBox = box.querySelector('.quantity-box');
      if (qtyBox) qtyBox.style.display = 'flex';
    }
  }

  closePopup?.addEventListener("click", hidePopup);

  keepShopping?.addEventListener("click", () => {
    hidePopup();
  });

  undoBtn?.addEventListener("click", () => {
    hidePopup();
    if (activeProduct && lastClickedButton) {
      cart = cart.filter(i => i.product !== activeProduct.product);
      saveCart();
      updateCartCount();

      const box = lastClickedButton.closest('.cart-action, .buy-actions');
      lastClickedButton.style.display = 'flex';
      const qtyBox = box.querySelector('.quantity-box');
      if (qtyBox) qtyBox.style.display = 'none';

      activeProduct = null;
      lastClickedButton = null;
    }
  });

  /* =====================================
     POPUP +/-
  ===================================== */
  if (popupPlus && popupMinus && popupQty) {
    popupPlus.addEventListener('click', () => {
      let c = parseInt(popupQty.textContent) || 1;
      popupQty.textContent = ++c;
      if (activeProduct) {
        const it = cart.find(i => i.product === activeProduct.product);
        if (it) it.quantity = c;
        saveCart();
      }
    });
    popupMinus.addEventListener('click', () => {
      let c = parseInt(popupQty.textContent) || 1;
      if (c > 1) {
        popupQty.textContent = --c;
        if (activeProduct) {
          const it = cart.find(i => i.product === activeProduct.product);
          if (it) it.quantity = c;
          saveCart();
        }
      }
    });
  }

  /* =====================================
     ADD TO CART
  ===================================== */
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const pn = button.dataset.product;
      const pr = parseFloat(button.dataset.price);
      const img = button.dataset.image;
      let qty = 1;

      const qel = button.closest('.cart-action, .buy-actions')?.querySelector('.qty-number');
      if (qel) qty = parseInt(qel.textContent) || 1;

      const exist = cart.find(i => i.product === pn);
      if (exist) exist.quantity = qty;
      else cart.push({ product: pn, price: pr, image: img, quantity: qty });

      saveCart();
      updateCartCount();
      showPopup({ product: pn, image: img, quantity: qty }, button);
    });
  });

  /* =====================================
     主页 + 产品页：数量 +/- / 删除
  ===================================== */
  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.closest('.quantity-box');
      const num = box.querySelector('.qty-number');
      let v = parseInt(num.textContent) || 1;
      num.textContent = ++v;

      const btnAdd = btn.closest('.cart-action, .buy-actions').querySelector('.add-cart-btn');
      const pn = btnAdd.dataset.product;
      const item = cart.find(i => i.product === pn);
      if (item) { item.quantity = v; saveCart(); updateCartCount(); }
    });
  });

  document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.closest('.quantity-box');
      const num = box.querySelector('.qty-number');
      let v = parseInt(num.textContent) || 1;
      if (v > 1) {
        num.textContent = --v;
        const btnAdd = btn.closest('.cart-action, .buy-actions').querySelector('.add-cart-btn');
        const pn = btnAdd.dataset.product;
        const item = cart.find(i => i.product === pn);
        if (item) { item.quantity = v; saveCart(); updateCartCount(); }
      }
    });
  });

  document.querySelectorAll('.delete-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = btn.closest('.quantity-box');
      const btnAdd = btn.closest('.cart-action, .buy-actions').querySelector('.add-cart-btn');
      const pn = btnAdd.dataset.product;

      cart = cart.filter(i => i.product !== pn);
      saveCart();
      updateCartCount();

      btnAdd.style.display = 'flex';
      box.style.display = 'none';
    });
  });

  /* =====================================
     CART PAGE
  ===================================== */
  const cartPage = document.querySelector(".cart-page");
  const checkoutPage = document.querySelector(".checkout-page");
  if (cartPage || checkoutPage) {
    let container = cartPage ? cartPage.querySelector(".cart-left") : document.querySelector(".checkout-product-list");
    let subtotalEl = document.getElementById("subtotal");

    function renderCart() {
      if (!container) return;
      container.querySelectorAll(".cart-item").forEach(el => el.remove());
      let subtotal = 0;
      cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const html = `
          <div class="cart-item">
            <div class="cart-image"><img src="${item.image}" alt=""></div>
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
          </div>`;
        container.insertAdjacentHTML("beforeend", html);
      });
      if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
      bindCartButtons();
    }

    function bindCartButtons() {
      document.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = btn.dataset.index;
          cart[i].quantity++; saveCart(); renderCart(); updateCartCount();
        });
      });
      document.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = btn.dataset.index;
          if (cart[i].quantity > 1) cart[i].quantity--;
          saveCart(); renderCart(); updateCartCount();
        });
      });
      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = btn.dataset.index;
          cart.splice(i, 1); saveCart(); renderCart(); updateCartCount();
          restoreButtonStates();
        });
      });
    }
    renderCart();
  }
});

function changeImage(el) {
  const main = document.getElementById("mainProductImage");
  main.src = el.src;
  document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active-thumb"));
  el.classList.add("active-thumb");
}