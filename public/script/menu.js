const { clipboard } = require('electron');
let menu = document.getElementById('menu')
let divQuerry = menu.querySelectorAll("div")

menu.addEventListener('click' , function(){
    divQuerry.forEach(div => {
        if(div.style.display === "block"){
            div.style.display = "none"
        }else{
            div.style.display = "block"
        }
    });
    divQuerry.forEach(div =>{
        div.addEventListener('click' , function(event){
            event.stopPropagation()
        })
    })
})

divQuerry.forEach(div => {
    div.addEventListener('click', () => {
        let link = div.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const textElement = document.getElementById(targetId);
        const text = textElement.innerText.trim();
        clipboard.writeText(text);
    });
});
