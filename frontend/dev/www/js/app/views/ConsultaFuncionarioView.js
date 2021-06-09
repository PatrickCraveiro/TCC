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
