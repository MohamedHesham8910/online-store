const addButton = document.querySelectorAll('#product-info button');
const badge = document.querySelector('.nav-list .badge');
const addButtons = document.querySelectorAll('.product-actions button');
const updateForms = document.querySelectorAll('.update-section');
const priceTag = document.querySelector('#price span');

async function updateCart(event){
    event.preventDefault();
    const updateForm = event.target;
    const id = updateForm.dataset.id;
    const csrf = updateForm.dataset.csrf;
    const response = await fetch('/cart/items',{
        method: 'PATCH',
        body: JSON.stringify({
            id: id,
            quantity: updateForm.firstElementChild.value,
            _csrf: csrf
        }),
        headers: {'Content-type':'application/json'}
    });
    if(!response.ok){
        alert("something went wrong");
        return;
    }

    const itemPrice = updateForm.parentElement.querySelector('.item-total-price');

    const responseData = await response.json();
    const newQuantity = responseData.totalQuantity;
    const newTotalPrice = responseData.totalPrice;
    const updatedItemPrice = responseData.updatedItemPrice;
    badge.textContent = newQuantity;
    priceTag.textContent = newTotalPrice;
    if(updatedItemPrice == 0){
        updateForm.parentElement.remove();
    }
    else{
        itemPrice.textContent = updatedItemPrice;
    }
}


async function addToCart(event){
    const addButton = event.target;
    const id = addButton.dataset.id;
    const csrf = addButton.dataset.csrf;
    const response = await fetch('/cart/items?_csrf=' +csrf, {
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

for (const button of addButton) {
    button.addEventListener('click',addToCart);
}

for (const form of updateForms) {
    form.addEventListener('submit',updateCart);
}

for (const button of addButtons) {
    button.addEventListener('click',addToCart);
}

