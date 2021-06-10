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
                      <th>NOME</th>
                      <th>CARGO</th>
                      <th>DATA CONTRATAÇÃO</th>
                  </tr> 
                  ${model.map((n) => {
                    if (filtro) {
                      switch (filtro) { 
                        case "clinica onde trabalha":
                          if (n.nomeClinica.match(`${filtroTxt}`)) {
                            return ` <tr class="tabela-coluna">
                           <td>${n.nomeClinica}</td>
                           <td>${n.nomeFuncionario}</td>
                           <td>${n.cargoFuncionario}</td>
                           <td>${n.dataContracao}</td>
                       </tr>`;
                          }
                          break;

                        case "nome colaborador":
                          if (n.nomeFuncionario.match(`${filtroTxt}`)) {
                            return ` <tr class="tabela-coluna">
                            <td>${n.nomeClinica}</td>
                            <td>${n.nomeFuncionario}</td>
                            <td>${n.cargoFuncionario}</td>
                            <td>${n.dataContracao}</td>
                        </tr>`;
                          }
                          break;
                        case "cargo":
                          if (n.cargoFuncionario.match(`${filtroTxt}`)) {
                            return ` <tr class="tabela-coluna">
                            <td>${n.nomeClinica}</td>
                            <td>${n.nomeFuncionario}</td>
                            <td>${n.cargoFuncionario}</td>
                            <td>${n.dataContracao}</td>
                        </tr>`;
                          }
                          break;

                        case "data admissão":
                          if (n.dataContracao.match(`${filtroTxt}`)) {
                            return ` <tr class="tabela-coluna">
                            <td>${n.nomeClinica}</td>
                            <td>${n.nomeFuncionario}</td>
                            <td>${n.cargoFuncionario}</td>
                            <td>${n.dataContracao}</td>
                          </tr>`;
                          }
                          break;

                        default:
                          break;
                      }
                    } else {
                      return `
                      <tr class="tabela-coluna">
                      <td>${n.nomeClinica}</td>
                      <td>${n.nomeFuncionario}</td>
                      <td>${n.cargoFuncionario}</td>
                      <td>${n.dataContracao}</td>
                      </tr>`;
                    }
                  })}
              </tbody></table>
          </div>`;
  }
}
