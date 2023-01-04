const imagePicker = document.querySelector('#image-upload-control input');
const imagePreview = document.querySelector('#image-upload-control img');

function updateImagePreview(){
    const files = imagePicker.files;

    if(!files || files.length === 0){
        imagePreview.style.display = 'none'
        return;
    }

    const selectedImage = files[0];
    const url = URL.createObjectURL(selectedImage);
    imagePreview.src = url;
    imagePreview.style.display = 'block';
}

imagePicker.addEventListener('change', updateImagePreview);