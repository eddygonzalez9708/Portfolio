let modal = document.getElementById('my-modal')

let img = document.getElementById('my-image')

let modalImg = document.getElementById('img01')

img.onclick = function() {
    modal.style.display = 'flex'
    modalImg.src = this.src
}

let span = document.getElementsByClassName('modal-close')[0];

span.onclick = function() {
    modal.style.display = 'none';
}