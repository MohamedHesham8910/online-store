const deleteButtons = document.querySelectorAll('.product-actions button');

async function deleteProduct(event) {
  const button = event.target;
  const productId = button.dataset.id;
  const csrfToken = button.dataset.csrf;

  const response = await fetch('/admin/products/delete/' + productId + '?_csrf=' + csrfToken, {
    method: 'DELETE'
  });

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  button.parentElement.parentElement.parentElement.remove();
}

for (const button of deleteButtons) {
  button.addEventListener('click', deleteProduct);
}