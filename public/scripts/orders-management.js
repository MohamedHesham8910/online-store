const updateButtons = document.querySelectorAll('.status-section');
const statusSpan = document.getElementById('status-span');

async function updateOrder(event){
    event.preventDefault();
    const form = event.target;
    const id = form.dataset.id;
    const csrf = form.dataset.csrf;
    const response = await fetch('/orders/update',{
        method: 'PATCH',
        body:JSON.stringify({
            _csrf:csrf,
            id: id,
            status: form.firstElementChild.value
        }),
        headers:{'Content-type': 'application/json'}
    });
    if(!response.ok){
        alert('something went wrong');
        return;
    }
    statusSpan.textContent = form.firstElementChild.value;
}

for (const button of updateButtons) {
    button.addEventListener('submit', updateOrder);
}