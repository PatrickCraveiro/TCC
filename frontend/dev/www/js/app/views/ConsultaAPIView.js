class ConsultaClinica {
  constructor(elemento) {
    this._elemento = elemento;
  }

  loading() {
    this._elemento.innerHTML = '<div id="preloader"></div>';
  }

  update(model) {
    this._elemento.innerHTML = `
        <div class="row">
            <table><tbody>
                <tr class="tabela-coluna">
                    <th>NOME</th> 
                    <th>CNPJ</th> 
                    <th>CIDADE</th>
                </tr> 
                ${console.log(model,'model'),
                     model.map((n) => {
                      return `
                      <tr class="tabela-coluna">
                          <td>${n.id}</td>
                          <td>${n.nome}</td>
                          <td>${n.tema}</td>
                      </tr>`;
                    })
                    .join("")}
            </tbody></table>
        </div>`
  }
}

class ConsultaAPIView{
  constructor(elemento) {
    this._elemento = elemento;
  }

  loading() {
    this._elemento.innerHTML = '<div id="preloader"></div>';
  }

  update(model) {
    this._elemento.innerHTML = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>TEMA</th>
                    <th>PODE BAIXAR?</th>
                    <th>PODE LER?</th>
                </tr>
            </thead>
            <tbody>
                ${model
                  .map((n) => {
                    return `
                    <tr>
                        <td>${n.id}</td>
                        <td>${n.nome}</td>
                        <td>${n.tema}</td>
                        <td>${n.podeBaixar ? "NÃO" : "SIM"}</td>
                        <td>${n.podeLer ? "SIM" : "NÃO"}</td>
                    </tr>`;
                  })
                  .join("")}
            </tbody>
        </table>`;
  }
}
