document.addEventListener('DOMContentLoaded', () => {




    // /* =========================
    // ADD TO CART POPUP
    // ========================= */

    // const addButtons = document.querySelectorAll('.add-cart-btn');

    // const popup = document.getElementById('minicartPopup');

    // const popupName = document.getElementById('popupProductName');

    // const cartDot = document.querySelector('.cart-dot');

    // let cartCount = 0;

    // addButtons.forEach(button => {

    //   button.addEventListener('click', (e) => {

    //     /* 阻止跳转 */
    //     e.preventDefault();

    //     e.stopPropagation();

    //     /* 获取产品名字 */
    //     const productName =
    //       button.dataset.name;

    //     popupName.innerText =
    //       `${productName} added successfully`;

    //     /* 显示popup */
    //     popup.classList.add('show');

    //     /* 红点显示 */
    //     cartDot.classList.add('active');

    //     cartCount++;

    //     /* 2.5秒后隐藏 */
    //     setTimeout(() => {

    //       popup.classList.remove('show');

    //     }, 2500);

    //   });

    // });



    /* =========================
    ELEMENTS
    ========================= */

    const addCartButtons =
        document.querySelectorAll('.add-cart-btn');

    const popup =
        document.getElementById('cartPopup');

    const closePopup =
        document.getElementById('closePopup');

    const keepShopping =
        document.querySelector('.keep-shopping');

    const popupTitle =
        document.getElementById('popupTitle');

    const popupImage =
        document.getElementById('popupImage');

    const popupQty =
        document.getElementById('popupQty');

    let activeQuantityBox = null;

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
    DELETE BUTTON
    ========================= */

    document.querySelectorAll('.delete-cart')
        .forEach(deleteBtn => {

            deleteBtn.addEventListener('click', () => {

                const quantityBox =
                    deleteBtn.closest('.quantity-box');

                const cartAction =
                    deleteBtn.closest('.cart-action');

                const addBtn =
                    cartAction.querySelector('.add-cart-btn');

                quantityBox.classList.remove('active');

                addBtn.style.display = 'flex';

            });

        });

    /* =========================
    POPUP CLOSE
    ========================= */

    closePopup.addEventListener('click', () => {

        popup.classList.remove('show');

    });

    keepShopping.addEventListener('click', () => {

        popup.classList.remove('show');

    });

    /* =========================
    UNDO BUTTON
    ========================= */

    document.querySelector('.undo-btn')
        .addEventListener('click', () => {

            popup.classList.remove('show');

            if (activeQuantityBox) {

                const cartAction =
                    activeQuantityBox.closest('.cart-action');

                const addBtn =
                    cartAction.querySelector('.add-cart-btn');

                activeQuantityBox.classList.remove('active');

                addBtn.style.display = 'flex';

            }

        });

    /* =========================
    POPUP +/- BUTTONS
    ========================= */

    popupMinus.addEventListener('click', () => {

        let count = parseInt(popupQty.innerText);

        if (count > 1) {

            count--;

            popupQty.innerText = count;

            if (activeQuantityBox) {

                const qty =
                    activeQuantityBox.querySelector('.qty-number');

                qty.innerText = count;
            }
        }

    });

    const popupPlus =
        document.querySelector('.plus-popup');

    popupPlus.addEventListener('click', () => {

        let count = parseInt(popupQty.innerText);

        count++;

        popupQty.innerText = count;

        if (activeQuantityBox) {

            const qty =
                activeQuantityBox.querySelector('.qty-number');

            qty.innerText = count;
        }

    });

});