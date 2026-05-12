function changeImage(element) {

  // 获取主图

  const mainImage =
    document.getElementById("mainProductImage");

  // 替换主图

  mainImage.src = element.src;

  // 去掉所有active

  const thumbs =
    document.querySelectorAll(".thumb");

  thumbs.forEach((thumb) => {

    thumb.classList.remove("active-thumb");

  });

  // 当前加active

  element.classList.add("active-thumb");
}



// function changeNumber(element) {
//   const minus = document.querySelector(".quantity button:first-child");
//   const plus = document.querySelector(".quantity button:last-child");
//   const count = document.querySelector(".quantity span");

//   let num = 1;

//   minus.addEventListener("click", () => {
//     if (num > 1) {
//       num--;
//       count.innerText = num;
//     }
//   });

//   plus.addEventListener("click", () => {
//     num++;
//     count.innerText = num;
//   });
// }


/* =========================
ADD TO CART
========================= */

addCartButtons.forEach(button => {

  button.addEventListener('click', (e) => {

    e.preventDefault();

    const cartAction =
      button.closest('.cart-action');

    const quantityBox =
      cartAction.querySelector('.quantity-box');

    quantityBox.classList.add('active');

    button.style.display = 'none';

    activeQuantityBox = quantityBox;

    /* popup data */
    popupTitle.innerHTML =
      button.dataset.product;

    popupImage.src =
      button.dataset.image;

    popupQty.innerText = '1';

    popup.classList.add('show');

  });

});

/* =========================
PLUS / MINUS
========================= */

document.querySelectorAll('.quantity-box')
  .forEach(box => {

    const minus =
      box.querySelector('.minus-btn');

    const plus =
      box.querySelector('.plus-btn');

    const qty =
      box.querySelector('.qty-number');

    let count = 1;

    plus.addEventListener('click', () => {

      count++;

      qty.innerText = count;

      popupQty.innerText = count;

    });

    minus.addEventListener('click', () => {

      if (count > 1) {

        count--;

        qty.innerText = count;

        popupQty.innerText = count;

      }

    });

  });



/* =========================
ADD TO CART POPUP
========================= */

const addButtons = document.querySelectorAll('.add-cart-btn');

const popup = document.getElementById('cartPopup');

const popupName = document.getElementById('popupProductName');

const cartDot = document.querySelector('.cart-dot');

let cartCount = 0;

addButtons.forEach(button => {

  button.addEventListener('click', (e) => {

    /* 阻止跳转 */
    e.preventDefault();

    e.stopPropagation();

    /* 获取产品名字 */
    const productName =
      button.dataset.name;

    popupName.innerText =
      `${productName} added successfully`;

    /* 显示popup */
    popup.classList.add('show');

    /* 红点显示 */
    cartDot.classList.add('active');

    cartCount++;

    /* 2.5秒后隐藏 */
    setTimeout(() => {

      popup.classList.remove('show');

    }, 2500);

  });

});