function criaElemento(tipo, classe = null, html = null, attr = null) {
  let elem = document.createElement(tipo);
  if (classe) elem.className = classe;

  if (html !== null) {
    elem.innerHTML = html;
  }

  if (attr !== null) {
    elem.setAttribute(attr[0], attr[1]);
  }

  return elem;
}
class LoadingPage extends HTMLElement {
  constructor() {
    super();
    this.itemsDiv = this.appendChild(
      criaElemento("div", "loading-page__items")
    );
  }

  static async for(arrOperations) {
    let existingPage = document.querySelector("loading-page");
    if (!existingPage) {
      existingPage = document.body.appendChild(new LoadingPage());
    }

    if (!(arrOperations instanceof Array)) arrOperations = [arrOperations];

    let items = arrOperations.map((obj) => new LoadingPageItem(obj));
    existingPage.itemsDiv.append(...items);

    let result = null;

    for (let item of items) {
      result = await item.executeOperation(result);
      if (result == false) break;
    }

    existingPage.fadeOut(result === false);
    return result;
  }

  fadeOut(instant) {
    setTimeout(
      () => {
        this.classList.add("fade-out");
        setTimeout(() => {
          this.remove();
        }, 500);
      },
      instant ? 1 : 1000
    );
  }
}
customElements.define("loading-page", LoadingPage);

class LoadingPageItem extends HTMLElement {
  constructor(objOperation) {
    super();
    this.className = "inactive";

    this.message = this.appendChild(
      criaElemento("div", "loading-message", objOperation.description)
    );

    this.promise = objOperation.promise;

    let retryButton = criaElemento(
      "button",
      "loading-button",
      "TENTAR NOVAMENTE"
    );
    retryButton.onclick = this.retryOperation;

    let cancelButton = criaElemento("button", "loading-button", "CANCELAR");
    cancelButton.onclick = this.cancelOperation;

    this.appendChild(criaElemento("div", "loading-buttons")).append(
      ...[retryButton, cancelButton]
    );
  }

  async executeOperation(previousOperationResult) {
    let promiseResult = null;
    this.classList.remove("inactive");
    while (this.status !== "done") {
      this.result = null;
      this.status = "running";

      promiseResult = await this.promise(previousOperationResult)
        .then((value) => {
          if (value === false) {
            // console.log('retorno FALSE da promise em LoadingPage');
            this.result = "false";
          } else {
            // console.log('sucesso na promise em LoadingPage!');
            // console.log(value);
            this.result = "true";
          }
          return value;
        })
        .catch((err) => {
          console.log("erro na promise em LoadingPage!");
          console.log(err);
          this.result = "false";
          return false;
        });

      if (this.result === "false") {
        this.status = "paused";
        await new Promise((resolve) => {
          let interval = setInterval(() => {
            if (this.status !== "paused") {
              clearInterval(interval);
              resolve();
            }
          }, 250);
        });
      } else this.status = "done";
    }

    return promiseResult;
  }

  retryOperation() {
    let item = this.closest("loading-page-item");
    if (item.status === "paused") {
      item.status = "running";
    }
  }
  cancelOperation() {
    let item = this.closest("loading-page-item");
    if (item.status === "paused") {
      item.status = "done";
    }
  }

  get result() {
    return this.getAttribute("dt-result");
  }
  set result(value) {
    return value === null
      ? this.removeAttribute("dt-result")
      : this.setAttribute("dt-result", value);
  }
}
customElements.define("loading-page-item", LoadingPageItem);

function fechaModalDownload() {
  modalCadastro = document.querySelector(".modalCadastro");
  modalCadastro.classList.add("fade-out");
  setTimeout(() => {
    document.body.removeChild(modalCadastro);
  }, 350);
}

function cadastro() {
  let modalCadastro = document.createElement("div");
  modalCadastro.classList.add("modalCadastro");
  modalCadastro.innerHTML = `<div class="download-window-fade"><div class="download-window">
    <header-download>
        <div>
            Cadastrar nova Clínica
        </div>
        <div class="download-window__btn-close" onclick="fechaModalDownload()">
            x
        </div>
    </header-download>

    <main-download>
        <div class="download-window__area--select">

        <form class="formulario cadastro" id="formCadastroClinica" onsubmit="consultaAPIController.cadastroClinica(event)">
  
    <label class="labelCadastro">
    <span>Nome:</span>
    <input class="inputCadastro name=">
  </label>
  <label class="labelCadastro">
  <span>CNPJ:</span>
  <input class="inputCadastro name=">
    </label>
    <label class="labelCadastro">
    <span>Cidade:</span>
    <input class="inputCadastro name=">
  </label>
  <label class="labelCadastro">
  <span>Bairro:</span>
  <input class="inputCadastro name=">
</label>
<label class="labelCadastro">
<span>CEP:</span>
<input class="inputCadastro name=">
</label>

<button type="submit" class="cadastro btn-primary btn-sm btn-graficos">Cadastrar</button>
  
</form>

        </div>
    </main-download>

    <footer-download class="feedbackCadastro">

    </footer-download>
</div></div>`;
  document.body.appendChild(modalCadastro);
  document.querySelector(".button-cadastro").classList.add("verde");
}

function cadastroFuncionario() {
  let modalCadastro = document.createElement("div");
  modalCadastro.classList.add("modalCadastro");
  modalCadastro.innerHTML = `<div class="download-window-fade"><div class="download-window">
    <header-download>
        <div>
            Cadastrar nova Clínica
        </div>
        <div class="download-window__btn-close" onclick="fechaModalDownload()">
            x
        </div>
    </header-download>

    <main-download>
        <div class="download-window__area--select">

        <form class="formulario cadastro" id="formCadastroFuncionario" onsubmit="consultaAPIController.cadastroFuncionario(event)">
  
    <label class="labelCadastro">
    <span>Nome:</span>
    <input class="inputCadastro name=">
  </label>
  <label class="labelCadastro">
  <span>CPF:</span>
  <input class="inputCadastro name=">
</label>
  <label class="labelCadastro">
  <span>Email:</span>
  <input class="inputCadastro name=">
    </label>
    <label class="labelCadastro">
    <span>CNPJ da Clínica:</span>
    <input class="inputCadastro name=">
  </label>
  <label class="labelCadastro">
  <span>Nome Clinica:</span>
  <input class="inputCadastro name=">
</label>
<label class="labelCadastro">
<span>data da admissão:</span>
<input class="inputCadastro name=">
</label>
  <label class="labelCadastro">
  <span>Cargo:</span>
  <select name="select">
  <option>Enfermeiro</option>
  <option>Desenvolvedor</option>
  <option selected> Médico</option>
  <option>ADM</option>
  <option>Auxiliar de serviços gerais</option>
  <option>Recepcionista</option>
</select>
</label>


<button type="submit" class="cadastro btn-primary btn-sm btn-graficos">Cadastrar</button>
  
</form>

        </div>
    </main-download>

    <footer-download class="feedbackCadastro">

    </footer-download>
</div></div>`;
  document.body.appendChild(modalCadastro);
  document.querySelector(".button-cadastro").classList.add("verde");
}

function agendaConsulta() {
  document
    .querySelector("#verificaConsulta")
    .classList.replace("slide-in-bottom", "slide-out-blurred-top");
  document
    .querySelector("#agendaConsulta")
    .classList.replace("slide-in-bottom", "swirl-out-bck");

  let modalazul = document.createElement("div");
  modalazul.className = "swirl-in-fwd";

  document.body.appendChild(modalazul);

  let a = new ConsultaAPIController();
  a.cadastraConsulta();
}

function cadastroLogin() {
  let modalCadastro = document.createElement("div");
  modalCadastro.classList.add("modalCadastro");
  modalCadastro.innerHTML = `<div class="download-window-fade">
  <div class="download-window">
    <header-download>
      <div>
        Cadastro
      </div>
      <div class="download-window__btn-close" onclick="fechaModalDownload()">
        x
      </div>
    </header-download>

    <main-download>
      <div class="download-window__area--select">

        <form class="formulario cadastro" id="formCadastroLogin2"
          onsubmit="consultaAPIController.cadastroLogin2(event)">

          <label class="labelCadastro">
            <span>Login:</span>
            <input class="inputCadastro name=">
          </label>
          <label class="labelCadastro">
            <span>senha:</span>
            <input class="inputCadastro name=">
          </label>
          <label class="labelCadastro">
            <span>email:</span>
            <input class="inputCadastro name=">
          </label>

          <button type="submit" class="cadastro btn-primary btn-sm btn-graficos">Consultar</button>
        </form>

      </div>
    </main-download>

    <footer-download class="feedbackCadastro">

    </footer-download>
  </div>
</div>`;
  document.body.appendChild(modalCadastro);
}

function formLogin() {
  var sdk = new ConsultaAPIController();
  sdk.formLogin();
}

function marcaDataConsulta() {
  document
    .querySelectorAll(
      ".calendarioConsulta-body .calendarioConsulta-row .calendarioConsulta-unit"
    )
    .forEach((el) => {
      el.addEventListener("click", function () {
        let clinicaConsulta = document.createElement("div");
        clinicaConsulta.classList.add("clinicaConsultaSalvo");
        clinicaConsulta.textContent = this.firstElementChild.textContent;

        this.innerHTML =
          this.innerHTML +
          `
        <div class="horarios">
        <div id="infoHorario" class="aaa">09:00</div>
        <div id="infoHorario" class="aaa">10:00</div>
        <div id="infoHorario" class="aaa">11:00</div>
        <div id="infoHorario" class="aaa">13:00</div>
        <div id="infoHorario" class="aaa">14:00</div>
            </div>
        `;
        document.querySelector("#infoLoginUser").append(clinicaConsulta);
        infoHorario();
      });
    });
}

function infoHorario() {
  document.querySelectorAll("#infoHorario").forEach((el) => {
    el.addEventListener("click", function () {
      document.querySelector("#infoLoginUser").append(el);

      let swirl = document.querySelector(".swirl-in-fwd");
      swirl.outerHTML = `<div class="swirl-in-fwd">
          <div class="choice1 optionsEspecialidades">
            <div class="CxEspecialidade"><p>Mal Estar</p></div>
            <div class="CxEsp"> </div>
          </div>
          <div class="choice2 optionsEspecialidades">
            <div class="CxEspecialidade"><p>Mal Estar</p></div>
            <div class="CxEsp"> </div>
          </div>
          <div class="choice3 optionsEspecialidades">
            <div class="CxEspecialidade"><p>Mal Estar</p></div>
            <div class="CxEsp"> </div>
          </div>
        </div>`;

      console.log("vai fazer");
      choiceEspeclidade();
    });
  });
}

function choiceEspeclidade() {
  let inputEscolha1 = document.createElement("div");
  document.querySelector(".swirl-in-fwd").append(inputEscolha1);
  document.querySelector(".swirl-in-fwd").style.overflow = "initial";

  let btnConfirma = document.createElement("button");
  btnConfirma.className = "button-login";
  btnConfirma.textContent = "Agendar consulta.";

  document.querySelector(".swirl-in-fwd").append(btnConfirma);

  btnConfirma.addEventListener("click", function (event) {
    // mostra o contador de cliques dentro da div clicada
    let infoUsuario = document.querySelector("#infoLoginUser");
    let infoPrescricao = document.createElement("div");

    document.querySelectorAll(".inputEscolhas input").forEach((el) => {
      if (el.checked) {
        infoPrescricao.textContent =
          infoPrescricao.textContent +
          " " +
          el.nextElementSibling.textContent +
          ",";
      }
    });

    infoUsuario.append(infoPrescricao);

    azus = new ConsultaAPIController();
    azus.cadastraConsultaReal();
  });

  inputEscolha1.style.display = "none";
  inputEscolha1.classList.add("paiEscolhas");
  inputEscolha1.innerHTML = `<div class="inputEscolhas">
  <p> <input type="checkbox"> <span>Tontura</span> </p><p> <input type="checkbox"> <span>Náusea</span> </p><p> <input type="checkbox"> <span>Febril</span> </p><p> <input type="checkbox"> <span>Outro</span> </p><p> <input type="checkbox"> <span>Não informar</span> </p>
  
  </div>`;

  let inputEscolha2 = document.createElement("div");
  document.querySelector(".swirl-in-fwd").append(inputEscolha2);

  inputEscolha2.style.display = "none";
  inputEscolha2.classList.add("paiEscolhas");
  inputEscolha2.innerHTML = `<div class="inputEscolhas">
  <p> <input type="checkbox"> <span>Tontura</span> </p><p> <input type="checkbox"> <span>Náusea</span> </p><p> <input type="checkbox"> <span>Febril</span> </p><p> <input type="checkbox"> <span>Outro</span> </p><p> <input type="checkbox"> <span>Não informar</span> </p>
  
  </div>`;

  let inputEscolha3 = document.createElement("div");
  document.querySelector(".swirl-in-fwd").append(inputEscolha3);

  inputEscolha3.style.display = "none";
  inputEscolha3.classList.add("paiEscolhas");
  inputEscolha3.innerHTML = `<div class="inputEscolhas">
  <p> <input type="checkbox"> <span>Tontura</span> </p><p> <input type="checkbox"> <span>Náusea</span> </p><p> <input type="checkbox"> <span>Febril</span> </p><p> <input type="checkbox"> <span>Outro</span> </p><p> <input type="checkbox"> <span>Não informar</span> </p>
  
  </div>`;

  document.querySelectorAll(".optionsEspecialidades").forEach((el) => {
    el.addEventListener("click", function () {
      if (this.classList.contains("choiceActive")) {
        this.classList.remove("choiceActive");
        inputEscolha2.style.display = "none";
        inputEscolha3.style.display = "none";
        inputEscolha1.style.display = "none";
      } else {
        this.classList.add("choiceActive");

        if (this.classList.contains("choice1")) {
          inputEscolha1.style.display = "block";
        }

        if (this.classList.contains("choice2")) {
          inputEscolha2.style.display = "block";
        }

        if (this.classList.contains("choice3")) {
          inputEscolha3.style.display = "block";
        }
      }
    });
  });
}

function formatarDataAtual(dias) {
  var myDate = new Date();
  var dayOfMonth = myDate.getDate();
  myDate.setDate(dayOfMonth + dias);

  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var year = myDate.getFullYear();

  return year + "-" + month + "-" + day;
}

function formatarData(data) {
  var myDate = new Date(data);
  var month = myDate.getMonth();
  var day = myDate.getDate();
  var year = myDate.getFullYear();
  return year + "-" + month + "-" + day;
}

function isAdm(login) {
  let modalUser = document.createElement("div");

  modalUser.innerHTML = `<div class="download-window-fade">
  <div class="escolhaADM">
   
   <div onclick="opcaoAdm1()" class="btn1">
    
    <div class="btn1-icon"></div><p>Área do cliente </p>
    
    </div>
<div onclick="opcaoAdm2()" class="btn2"><div class="btn2-icon"></div>
<p>Área administrativa </p>
    
    </div>
    
  </div>
</div>`;

  document.body.append(modalUser);
}

function salvaLogin(login) {
  var loginSalvo = login;
  return loginSalvo;
}

function opcaoAdm1() {
  document.querySelectorAll(".mainPageUser").forEach((el) => {
    el.removeAttribute("style");
  });
  document.querySelector(".mainPageLogin").style.display = "none";
  if (document.querySelector(".download-window-fade")) {
    document.querySelector(".download-window-fade").parentElement.outerHTML =
      "";
  }
}

function opcaoAdm2() {
  document.querySelector(".mainPageAdm").removeAttribute("style");
  document.querySelector(".mainPageLogin").style.display = "none";
  document.querySelector(".download-window-fade").parentElement.outerHTML = "";
}

function isUser() {
  console.log("comum");
}
