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
    const cartCountEls = document.querySelectorAll(".cart-count");
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEls.forEach(el => el.textContent = totalQty);
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

  let activeQuantityBox = null;

  function showPopup(product) {
    if (!popup) return;
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
    if (activeQuantityBox) {
      activeQuantityBox.classList.remove("active");
      const addBtn = activeQuantityBox.closest('.cart-action')?.querySelector('.add-cart-btn');
      if (addBtn) addBtn.style.display = 'flex';
    }
  });

  /* =====================================
     QUANTITY BOXES
  ===================================== */
  document.querySelectorAll('.quantity-box').forEach(box => {
    const minus = box.querySelector('.minus-btn');
    const plus = box.querySelector('.plus-btn');
    const qty = box.querySelector('.qty-number');
    let count = parseInt(qty?.textContent) || 1;

    plus?.addEventListener('click', () => {
      count++;
      qty.textContent = count;
      popupQty && (popupQty.textContent = count);

      // update price in product page
      let priceEl = box.closest(".buy-actions")?.querySelector(".price") || box.closest(".product-info")?.querySelector(".price");
      if (priceEl) {
        const base = parseFloat(priceEl.dataset.base);
        priceEl.textContent = "$" + (base * count).toFixed(2);
      }
    });

    minus?.addEventListener('click', () => {
      if (count > 1) {
        count--;
        qty.textContent = count;
        popupQty && (popupQty.textContent = count);

        let priceEl = box.closest(".buy-actions")?.querySelector(".price") || box.closest(".product-info")?.querySelector(".price");
        if (priceEl) {
          const base = parseFloat(priceEl.dataset.base);
          priceEl.textContent = "$" + (base * count).toFixed(2);
        }
      }
    });
  });

  /* =====================================
     ADD TO CART BUTTONS
  ===================================== */
  document.querySelectorAll('.add-cart-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const cartAction = button.closest('.cart-action');
      const quantityBox = cartAction?.querySelector('.quantity-box');
      if (!quantityBox) return;

      let qtyNum = quantityBox.querySelector('.qty-number');
      let quantity = parseInt(qtyNum?.textContent) || 1;

      const productName = button.dataset.product;
      const productPrice = parseFloat(button.dataset.price);
      const productImage = button.dataset.image;

      // Add to cart storage
      const existing = cart.find(item => item.product === productName);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ product: productName, price: productPrice, image: productImage, quantity: quantity });
      }
      saveCart();
      updateCartCount();

      // show popup
      activeQuantityBox = quantityBox;
      quantityBox.classList.add('active');
      button.style.display = 'none';
      showPopup({ product: productName, image: productImage, quantity: quantity });
    });
  });

  /* =====================================
     POPUP +/- BUTTONS
  ===================================== */
  popupPlus?.addEventListener('click', () => {
    let count = parseInt(popupQty.textContent);
    count++;
    popupQty.textContent = count;
    if (activeQuantityBox) {
      const qty = activeQuantityBox.querySelector('.qty-number');
      qty.textContent = count;
    }
  });

  popupMinus?.addEventListener('click', () => {
    let count = parseInt(popupQty.textContent);
    if (count > 1) {
      count--;
      popupQty.textContent = count;
      if (activeQuantityBox) {
        const qty = activeQuantityBox.querySelector('.qty-number');
        qty.textContent = count;
      }
    }
  });

  /* =====================================
     DELETE BUTTON
  ===================================== */
  document.querySelectorAll('.delete-cart').forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
      const quantityBox = deleteBtn.closest('.quantity-box');
      const addBtn = quantityBox.closest('.cart-action')?.querySelector('.add-cart-btn');
      quantityBox.classList.remove('active');
      addBtn && (addBtn.style.display = 'flex');
    });
  });

  /* =====================================
     CART PAGE RENDER
  ===================================== */
  const cartPage = document.querySelector(".cart-page");
  if (cartPage) {
    const cartLeft = cartPage.querySelector(".cart-left");
    const subtotalEl = document.getElementById("subtotal");

    function renderCart() {
      cartLeft.querySelectorAll(".cart-item").forEach(el => el.remove());
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
              <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
            <div class="cart-price">
              <h3 class="item-total">$${(item.price * item.quantity).toFixed(2)}</h3>
            </div>
          </div>
        `;
        cartLeft.insertAdjacentHTML("beforeend", html);
      });

      subtotalEl.textContent = "$" + subtotal.toFixed(2);
      bindCartButtons();
    }

    function bindCartButtons() {
      cartLeft.querySelectorAll(".plus").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.dataset.index;
          cart[index].quantity++;
          saveCart();
          renderCart();
        });
      });
      cartLeft.querySelectorAll(".minus").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.dataset.index;
          if (cart[index].quantity > 1) cart[index].quantity--;
          saveCart();
          renderCart();
        });
      });
      cartLeft.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.dataset.index;
          cart.splice(index, 1);
          saveCart();
          renderCart();
        });
      });
    }

    renderCart();
  }

});

// 1. 获取所有商品元素
const cartItems = document.querySelectorAll('.cart-item');
const subtotalEl = document.getElementById('subtotal');

// 2. 计算单个商品总价
function calculateItemTotal(item) {
  const priceEl = item.querySelector('.item-total');
  const quantityEl = item.querySelector('.quantity');
  
  // 读取价格和数量，转为数字（防止 NaN）
  const price = parseFloat(priceEl.dataset.price) || 0;
  const quantity = parseInt(quantityEl.textContent) || 1;
  
  // 计算总价并更新显示
  const total = price * quantity;
  priceEl.textContent = `$${total.toFixed(2)}`;
  
  return total;
}

// 3. 更新所有商品总价和小计
function updateCart() {
  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += calculateItemTotal(item);
  });
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

// 4. 绑定加减按钮事件
cartItems.forEach(item => {
  const minusBtn = item.querySelector('.minus');
  const plusBtn = item.querySelector('.plus');
  const quantityEl = item.querySelector('.quantity');
  
  minusBtn.addEventListener('click', () => {
    let qty = parseInt(quantityEl.textContent);
    if (qty > 1) {
      quantityEl.textContent = qty - 1;
      updateCart();
    }
  });
  
  plusBtn.addEventListener('click', () => {
    let qty = parseInt(quantityEl.textContent);
    quantityEl.textContent = qty + 1;
    updateCart();
  });
});

// 5. 页面加载时初始化
updateCart();