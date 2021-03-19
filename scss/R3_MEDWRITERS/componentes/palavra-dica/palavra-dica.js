function hideDica() {
    console.log("Entrou");
    
    var dicaTexto = document.getElementsByClassName("palavra-dica__texto");
    console.log("dica aqui", dicaTexto);
    
    for (let index = 0; index < dicaTexto.length; index++) {
        dicaTexto[index].style.display = "none";
    }
}

var palavraDica = document.getElementsByClassName("palavra-dica");
for (let index = 0; index < palavraDica.length; index++) {
    palavraDica[index].addEventListener("click", function showDica() {
        var result = palavraDica[index].getElementsByClassName("palavra-dica__texto");

        if (result[0].style.display == "none") {
            result[0].style.display = "block";
        } else {
            result[0].style.display = "none";
        }
    });
}


hideDica();
