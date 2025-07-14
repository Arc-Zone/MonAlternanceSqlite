
let buttonSearch = document.getElementById('addCandidate')
let closeModalButton = document.getElementById('closeModal')
let modal = document.getElementById('modal')
let submitEpreventDefault = document.getElementById('submitEpreventDefault')


buttonSearch.addEventListener('click' , function(e){
e.preventDefault()
modal.style.display = "block"
})

closeModalButton.addEventListener('click' , function(){
    modal.style.display = 'none'
})

// submitEpreventDefault.preventDefault()