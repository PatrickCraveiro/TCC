function insereClasseHypotesis() {

    var botaoHypotesis = document.querySelectorAll('.botao-hypotesis');
    // console.log('qtos botoes hyp: ', botaoHypotesis.length);

    // console.log('botoes hyp: ', botaoHypotesis);
            
    for (var i=0; i < botaoHypotesis.length; i++) {
        
        botaoHypotesis[i].onclick = function() {

            var botaoHyp = this;
            
            botaoHyp.previousElementSibling.classList.toggle('mostraRespostaHypotesis');
            
            if (botaoHyp.innerHTML == "Ocultar resposta") {
                botaoHyp.innerHTML = "Mostrar resposta";
            } else {
                botaoHyp.innerHTML = "Ocultar resposta";
            }
        };
    }

}

function liberaRespostaHypotesis() {
    let mesAno = new Date().toLocaleDateString();
    let horaMinuto = new Date();
    let hora = horaMinuto.getHours();
    let minutos = horaMinuto.getMinutes();

    if (hora < 10) {
        hora += "0" + hora;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }

    let horaAtual = mesAno + " " + hora + ":" + minutos;
    let horaAula = "01/01/2018 16:13";

    if (horaAtual > horaAula) {
        // console.log("Horario de aula Liberado");
        setTimeout(function(){
            insereClasseHypotesis();
        }, 500);
    } else {
        console.log("Horario de aula Bloqueado");
    }

}
liberaRespostaHypotesis();

