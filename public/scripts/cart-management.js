const addButton = document.querySelector('#product-info button');
const badge = document.querySelector('.nav-list .badge');

async function addToCart(){
    const id = addButton.dataset.id;
    const csrf = addButton.dataset.csrf;
    const response = await fetch('/cart/items'+'?_csrf=' +csrf, {
        method: 'POST',
        body: JSON.stringify({
            productId: id
        }),
        headers: {
            'Content-type': 'application/json'
        }

    });
    if(!response.ok){
        alert('Wrong');
        return;
    }
    const responseData = await response.json();
    const quantity = responseData.totalQuantity;
    badge.textContent = quantity;
}

addButton.addEventListener('click',addToCart);