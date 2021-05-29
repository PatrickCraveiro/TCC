class ConsultaClinica {
  constructor(elemento) {
    this._elemento = elemento;
  }

  loading() {
    this._elemento.innerHTML = '<div id="preloader"></div>';
  }

  update(model, filtro, filtroTxt) {
    this._elemento.innerHTML = `
        <div class="row">
            <table><tbody>
                <tr class="tabela-coluna" id="pai">
                    <th>NOME</th> 
                    <th>CNPJ</th> 
                    <th>CIDADE</th>
                </tr> 
                ${model.map((n) => {
                  console.log(filtroTxt);
                  if (filtro) {
                    switch (filtro) {
                      case "name":
                        if (n.name.match(`${filtroTxt}`)) {
                          return ` <tr class="tabela-coluna">
                         <td>${n.id}</td>
                         <td>${n.email}</td>
                         <td>${n.name}</td>
                     </tr>`;
                        }
                        break;

                      case "email":
                        if (n.email.match(`${filtroTxt}`)) {
                          return ` <tr class="tabela-coluna">
                          <td>${n.id}</td>
                          <td>${n.email}</td>
                          <td>${n.name}</td>
                      </tr>`;
                        }
                        break;

                      default:
                        break;
                    }
                  } else {
                    return `
                    <tr class="tabela-coluna">
                        <td>${n.id}</td>
                        <td>${n.email}</td>
                        <td>${n.name}</td>
                    </tr>`;
                  }
                })}
            </tbody></table>
        </div>`;
  }
}

class ConsultaAPIView {
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
