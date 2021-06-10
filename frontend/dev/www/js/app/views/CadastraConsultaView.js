class CadastraConsulta {
  constructor(elemento) {
    this._elemento = elemento;
  }

  update(model) {
    this._elemento.innerHTML = `
          <div class="row consultaContainer">
          ${model.map((n) => {
            {
              return `

    <div class="paiT">
    <div class="iconHospital"></div>
              <div onclick="this.setAttribute('clinicaEscolhida',''), a8()" class="slide-in-right">
              <p class="infoClinica">Nome:</p>
              <p class="respostaClinica" id="nomeCosulta">${n.nomel}</p>
              <p class="infoClinica">CNPJ:</p>
              <p class="respostaClinica" id="cnpjCosulta">${n.CNPJ}</p>
              <p class="infoClinica">Cidade:</p>
              <p class="respostaClinica" id="cidade">${n.cidade}</p>
              </div></div>`;
            }
          })}`;
  }
}
