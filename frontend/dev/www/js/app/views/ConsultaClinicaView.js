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
                        case "CNPJ":
                          if (n.CNPJ == filtroTxt) {
                            return ` <tr class="tabela-coluna">
                           <td>${n.CNPJ}</td>
                           <td>${n.nome}</td>
                           <td>${n.cidade}</td>
                       </tr>`;
                          }
                          break;

                        case "nome":
                          if (n.nome.match(`${filtroTxt}`)) {
                            return ` <tr class="tabela-coluna">
                            <td>${n.CNPJ}</td>
                            <td>${n.nome}</td>
                            <td>${n.cidade}</td>
                        </tr>`;
                          }
                          break;

                        case "cidade":
                          if (n.cidade.match(`${filtroTxt}`)) {
                            return ` <tr class="tabela-coluna">
                              <td>${n.CNPJ}</td>
                              <td>${n.nome}</td>
                              <td>${n.cidade}</td>
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
