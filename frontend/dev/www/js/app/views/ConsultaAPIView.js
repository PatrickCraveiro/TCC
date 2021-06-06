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
                        <td>${n.nome}</td>
                        <td>${n.CNPJ}</td>
                        <td>${n.cidade}</td>
                    </tr>`;
                  }
                })}
            </tbody></table>
        </div>`;
  }
}

class ConsultaFuncionario {
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
                <tr class="tabela-coluna">
                    <th>CLINICA</th> 
                    <th>EMAIL</th> 
                    <th>NOME</th>
                    <th>CARGO</th>
                </tr> 
                ${model.map((n) => {
                  if (filtro) {
                    switch (filtro) {
                      case "clinica":
                        if (n.nome.match(`${filtroTxt}`)) {
                          return ` <tr class="tabela-coluna">
                         <td>${n.idClinica}</td>
                         <td>${n.email}</td>
                         <td>${n.nome}</td>
                         <td>${n.cargo}</td>
                     </tr>`;
                        }
                        break;

                      case "email":
                        if (n.email.match(`${filtroTxt}`)) {
                          return ` <tr class="tabela-coluna">
                          <td>${n.idClinica}</td>
                         <td>${n.email}</td>
                         <td>${n.nome}</td>
                         <td>${n.cargo}</td>
                      </tr>`;
                        }
                        break;
                      case "nome":
                        if (n.email.match(`${filtroTxt}`)) {
                          return ` <tr class="tabela-coluna">
                          <td>${n.idClinica}</td>
                         <td>${n.email}</td>
                         <td>${n.nome}</td>
                         <td>${n.cargo}</td>
                      </tr>`;
                        }
                        break;

                      case "cargo":
                        if (n.email.match(`${filtroTxt}`)) {
                          return ` <tr class="tabela-coluna">
                            <td>${n.idClinica}</td>
                         <td>${n.email}</td>
                         <td>${n.nome}</td>
                         <td>${n.cargo}</td>
                        </tr>`;
                        }
                        break;

                      default:
                        break;
                    }
                  } else {
                    return `
                    <tr class="tabela-coluna">
                    <td>${n.idClinica}</td>
                    <td>${n.email}</td>
                    <td>${n.nome}</td>
                    <td>${n.cargo}</td>
                    </tr>`;
                  }
                })}
            </tbody></table>
        </div>`;
  }
}

class CadastraConsulta {
  constructor(elemento) {
    this._elemento = elemento;
  }

  update(model) {
    this._elemento.innerHTML = `
        <div class="row">
        ${model.map((n) => {
          {
            return `
            <div class="slide-in-right">
            <p>${n.CNPJ}</p>
            <p>${n.nomel}</p>
            <p>${n.cidade}</p>
            </div>`;
          }
        })}`;
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
