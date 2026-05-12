document.addEventListener('DOMContentLoaded', () => {




  const cartItems = document.querySelectorAll('.cart-item');

  function updateSubtotal() {

    let subtotal = 0;

    cartItems.forEach(item => {

      const quantityElement = item.querySelector('.quantity');
      const totalElement = item.querySelector('.item-total');

      const unitPrice = parseFloat(totalElement.dataset.price);

      const quantity = parseInt(quantityElement.textContent);

      const total = unitPrice * quantity;

      totalElement.textContent = `$${total.toFixed(2)}`;

      subtotal += total;

    });

    document.getElementById('subtotal').textContent =
      `$${subtotal.toFixed(2)}`;
  }

  cartItems.forEach(item => {

    const minusBtn = item.querySelector('.minus');
    const plusBtn = item.querySelector('.plus');

    const quantityElement = item.querySelector('.quantity');

    minusBtn.addEventListener('click', () => {

      let quantity = parseInt(quantityElement.textContent);

      if (quantity > 1) {

        quantity--;

        quantityElement.textContent = quantity;

        updateSubtotal();
      }
    });

    plusBtn.addEventListener('click', () => {

      let quantity = parseInt(quantityElement.textContent);

      quantity++;

      quantityElement.textContent = quantity;

      updateSubtotal();
    });
  });

  updateSubtotal();
});