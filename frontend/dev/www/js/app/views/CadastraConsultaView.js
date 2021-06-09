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
              <div onclick="this.setAttribute('clinicaEscolhida',''), a8()" class="slide-in-right">
              <p id="cnpjCosulta">${n.CNPJ}</p>
              <p id="nomeCosulta">${n.nomel}</p>
              <p id="cidade">${n.cidade}</p>
              </div>`;
            }
          })}`;
  }
}
