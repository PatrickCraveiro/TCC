var mensagemErro = "Digite um ID válido";

function consultaSlidesPermitidos() {
  let idAluno = document.getElementById('SlidesPermitidosAluno').value;
  let idApostila = document.getElementById('SlidesPermitidosApostila').value;
  if(!isNaN(idAluno) && !isNaN(idApostila)) {
    window.location = "https://api.medgrupo.com.br/MateriaisImpressos.svc/json/Aula/Avaliacao/?alunoid=" + idAluno + "&apostilaid=" + idApostila;
  } else {
    alert(mensagemErro);
  }
  return false;
}

function consultaSlidesBaixados() {
  let idAluno = document.getElementById('SlidesBaixados').value;
  if(!isNaN(idAluno)) {
    window.location = "https://api.medgrupo.com.br/MateriaisImpressos.svc/json/slides/baixados/" + idAluno;
  } else {
    alert(mensagemErro);
  }
  return false;
}
