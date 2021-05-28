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

var clientId =
  "898358535937-ufcu5f43nn8k25t1hi0r1ilirjon6r9q.apps.googleusercontent.com";
var scopes = "https://spreadsheets.google.com/feeds";

function id(x) {
  y = document.getElementById(x);
  return y;
}

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

<button type="submit" class="admin btn-primary btn-sm btn-graficos">Consultar</button>
<label class="cadastro btn-primary btn-sm btn-graficos" onclick="feedbackCadastro()">Cadastrar
                </label>
  
</form>

        </div>
    </main-download>

    <footer-download class="feedbackCadastro">

    </footer-download>
</div></div>`;
  document.body.appendChild(modalCadastro);
  document.querySelector(".button-cadastro").classList.add("verde");
}

// function feedbackCadastro() {
//   let feedbackCadastro = document.querySelector(".feedbackCadastro");
//   return LoadingPage.for([
//     {
//       description: "Cadastrando nova Clínica",
//       promise: async () => {
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             feedbackCadastro.innerHTML =
//               "<p> Clínica cadastrada com sucesso. </p>";
//             setTimeout(() => {
//               resolve();
//             }, 300);
//           }, 300);
//         });
//       },
//     },
//   ]);
//   console.log(feedbackCadastro);
// }

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

function carregarGraficos() {
  gapi.auth.authorize(
    { client_id: clientId, scope: scopes, immediate: true },
    handleAuthResult
  );
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById("authorize-button");
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = "hidden";
    makeApiCall();
    gerarFiltros();
  } else {
    authorizeButton.style.visibility = "";
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
    { client_id: clientId, scope: scopes, immediate: false },
    handleAuthResult
  );
  return false;
}

function makeApiCall() {
  var filtroGeral = "";
  var conectivo = " WHERE ";
  var temWhere = false;

  var aplicativo = id("aplicativos").value;
  var status = id("status").value;
  var dispositivo = id("dispositivos").value;
  var dataDe = id("dataDe").value;
  var dataAte = id("dataAte").value;
  var sheetAno = id("ano").value;

  function validaWhere() {
    if (temWhere) {
      conectivo = " AND ";
    }
  }

  if (aplicativo != "APLICATIVO") {
    validaWhere();
    filtroGeral += conectivo + 'I="' + aplicativo + '"';
    temWhere = true;
  }
  if (status != "STATUS") {
    validaWhere();
    filtroGeral += conectivo + 'N="' + status + '"';
    temWhere = true;
  }
  if (dispositivo != "DEVICE") {
    validaWhere();
    filtroGeral += conectivo + 'J="' + dispositivo + '"';
    temWhere = true;
  }
  if (dataDe != "") {
    validaWhere();
    filtroGeral += conectivo + 'F>= date "' + dataDe + '"';
    temWhere = true;
  }
  if (dataAte != "") {
    validaWhere();
    filtroGeral += conectivo + 'F<= date "' + dataAte + '"';
    temWhere = true;
  }
  if (sheetAno == "ANO") {
    sheetAno = new Date().getFullYear();
  }

  function limitaFiltroData(obj) {
    obj.setAttribute("min", sheetAno + "-01-01");
    obj.setAttribute("max", sheetAno + "-12-31");
  }

  limitaFiltroData(id("dataDe"));
  limitaFiltroData(id("dataAte"));

  var queryString = encodeURIComponent(
    "SELECT K, COUNT(K)" + filtroGeral + " GROUP BY K ORDER BY COUNT(K) DESC"
  );

  //Consulta Adriano
  var tqUrl =
    "https://docs.google.com/spreadsheets" +
    "/d/1spwpMp4_zRO35067JGjTGquhVU3mAgr_5HomASkaoIo/gviz/tq?sheet=" +
    sheetAno +
    "&headers=2&tq=" +
    queryString +
    "&tqx=responseHandler:handleTqResponse" +
    "&access_token=" +
    encodeURIComponent(gapi.auth.getToken().access_token);

  //acesso geral
  var UrlAcesso =
    "https://docs.google.com/spreadsheets" +
    "/d/1spwpMp4_zRO35067JGjTGquhVU3mAgr_5HomASkaoIo/gviz/tq?sheet=" +
    sheetAno +
    "&tqx=responseHandler:handleTqResponse" +
    "&access_token=" +
    encodeURIComponent(gapi.auth.getToken().access_token);

  console.log(tqUrl);

  gerandoGrafico(tqUrl, UrlAcesso);
}

function gerarFiltros() {
  var aplicacoes = new Object();
  aplicacoes["1"] = "MEDReader";
  aplicacoes["2"] = "MEDCode";
  aplicacoes["3"] = "MEDSoft";
  aplicacoes["4"] = "MEDSoft Pro";
  aplicacoes["5"] = "MEDEletro";
  aplicacoes["6"] = "Recursos";
  aplicacoes["7"] = "Concursos";
  aplicacoes["8"] = "Área Restrita";

  for (var i in aplicacoes) {
    var option = document.createElement("option");
    var textoption = document.createTextNode(aplicacoes[i]);
    option.setAttribute("value", aplicacoes[i]);
    option.appendChild(textoption);
    document.getElementById("aplicativos").appendChild(option);
  }

  var status = new Object();
  status["1"] = "Parcial";
  status["2"] = "Pendente";
  status["3"] = "Solucionado";

  for (var i in status) {
    var option = document.createElement("option");
    var textoption = document.createTextNode(status[i]);
    option.setAttribute("value", status[i]);
    option.appendChild(textoption);
    document.getElementById("status").appendChild(option);
  }

  var devices = new Object();
  devices["1"] = "iPad";
  devices["2"] = "iPhone";
  devices["3"] = "Smartphone Android";
  devices["4"] = "Tablet Android";
  devices["5"] = "Mac";
  devices["6"] = "Windows Phone";
  devices["7"] = "Smart TV";
  devices["8"] = "Computador";

  for (var i in devices) {
    var option = document.createElement("option");
    var textoption = document.createTextNode(devices[i]);
    option.setAttribute("value", devices[i]);
    option.appendChild(textoption);
    document.getElementById("dispositivos").appendChild(option);
  }

  var ano = new Object();
  var anoInicial = 2015;
  var anoAtual = new Date().getFullYear();

  for (var j = 0; anoAtual > anoInicial; j++) {
    anoAtual--;
    ano[j] = anoAtual;
  }

  for (var i in ano) {
    var option = document.createElement("option");
    var textoption = document.createTextNode(ano[i]);
    option.setAttribute("value", ano[i]);
    option.appendChild(textoption);
    document.getElementById("ano").appendChild(option);
  }
}

function gerandoGrafico(tqUrl, UrlAcesso) {
  var div = document.getElementById("graficoProblemas");
  div.innerHTML = "";
  var preloader = document.createElement("div");
  preloader.setAttribute("id", "preloader");
  div.appendChild(preloader);
  /*
    //Formatar data atual
    var tipoData = new Date();
    var localeOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
    var dataAtual = tipoData.toLocaleString('en-US', localeOptions);
    console.log(dataAtual); 
    */

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(desenhaGrafico);
  google.charts.setOnLoadCallback(drawVisualization);

  function desenhaGrafico() {
    var query = new google.visualization.Query(tqUrl);
    query.send(resposta);
  }

  function resposta(response) {
    if (response.isError()) {
      alert(
        "Error in query: " +
          response.getMessage() +
          " " +
          response.getDetailedMessage()
      );
      return;
    }

    var dados = response.getDataTable();

    var grafico = new google.visualization.ColumnChart(div);

    grafico.draw(dados, {
      title: "Problemas x Quantidade",
      titleTextStyle: {
        fontSize: 20,
        bold: true,
      },
      legend: { position: "none" },
      orientation: "vertical",
      backgroundColor: "transparent",
    });
  }

  function drawVisualization() {
    //#GRAFICOS DE APLICATIVOS
    var gAplicativos = new google.visualization.ChartWrapper();
    gAplicativos.setChartType("PieChart");
    gAplicativos.setDataSourceUrl(UrlAcesso);
    gAplicativos.setContainerId("graficoAplicativo");
    gAplicativos.setQuery(
      'SELECT I,COUNT (I) WHERE F>= date "' +
        id("dtAppInicial").value +
        '" AND F<= date "' +
        id("dtAppFinal").value +
        '" GROUP BY I'
    );
    gAplicativos.setOptions({
      title: "Atendimentos x Aplicativos",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "left",
        textStyle: {
          fontSize: "12",
        },
      },
    });

    var gAplicativosSemanal = new google.visualization.ChartWrapper();
    gAplicativosSemanal.setChartType("PieChart");
    gAplicativosSemanal.setDataSourceUrl(UrlAcesso);
    gAplicativosSemanal.setContainerId("graficoAplicativoSemanal");
    gAplicativosSemanal.setQuery(
      'SELECT I,COUNT (I) WHERE F>= date "' +
        formatarDataAtual(-6) +
        '" AND F<= date "' +
        formatarDataAtual(0) +
        '" GROUP BY I'
    );
    gAplicativosSemanal.setOptions({
      title: "Atendimentos x Aplicativos [Semanal]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "left",
        textStyle: {
          fontSize: "12",
        },
      },
    });

    var gAplicativosHoje = new google.visualization.ChartWrapper();
    gAplicativosHoje.setChartType("PieChart");
    gAplicativosHoje.setDataSourceUrl(UrlAcesso);
    gAplicativosHoje.setContainerId("graficoAplicativoHoje");
    gAplicativosHoje.setQuery(
      'SELECT I,COUNT (I) WHERE F= date "' +
        formatarDataAtual(0) +
        '" GROUP BY I'
    );
    gAplicativosHoje.setOptions({
      title: "Atendimentos x Aplicativos [Hoje]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "left",
        textStyle: {
          fontSize: "12",
        },
      },
    });

    gAplicativos.draw();
    gAplicativosSemanal.draw();
    gAplicativosHoje.draw();

    //#GRAFICOS DE DEVICE
    var gDevices = new google.visualization.ChartWrapper();
    gDevices.setChartType("PieChart");
    gDevices.setDataSourceUrl(UrlAcesso);
    gDevices.setContainerId("graficoDevices");
    gDevices.setQuery(
      'SELECT J,COUNT (J) WHERE F>= date "' +
        id("dtDInicial").value +
        '" AND F<= date "' +
        id("dtDFinal").value +
        '" GROUP BY J'
    );
    gDevices.setOptions({
      title: "Atendimentos x Devices",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "left",
        textStyle: {
          fontSize: "12",
        },
      },
    });

    var gDevicesSemanal = new google.visualization.ChartWrapper();
    gDevicesSemanal.setChartType("PieChart");
    gDevicesSemanal.setDataSourceUrl(UrlAcesso);
    gDevicesSemanal.setContainerId("graficoDevicesSemanal");
    gDevicesSemanal.setQuery(
      'SELECT J,COUNT (J) WHERE F>= date "' +
        formatarDataAtual(-6) +
        '" AND F<= date "' +
        formatarDataAtual(0) +
        '" GROUP BY J'
    );
    gDevicesSemanal.setOptions({
      title: "Atendimentos x Devices [Últimos 7 dias]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "left",
        textStyle: {
          fontSize: "12",
        },
      },
    });

    var gDevicesHoje = new google.visualization.ChartWrapper();
    gDevicesHoje.setChartType("PieChart");
    gDevicesHoje.setDataSourceUrl(UrlAcesso);
    gDevicesHoje.setContainerId("graficoDevicesHoje");
    gDevicesHoje.setQuery(
      'SELECT J,COUNT (J) WHERE F= date "' +
        formatarDataAtual(0) +
        '" GROUP BY J'
    );
    gDevicesHoje.setOptions({
      title: "Atendimentos x Devices [Hoje]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "left",
        textStyle: {
          fontSize: "12",
        },
      },
    });

    gDevices.draw();
    gDevicesSemanal.draw();
    gDevicesHoje.draw();

    //#GRAFICOS DE STATUS
    var gStatus = new google.visualization.ChartWrapper();
    gStatus.setChartType("PieChart");
    gStatus.setDataSourceUrl(UrlAcesso);
    gStatus.setContainerId("graficoStatus");
    gStatus.setQuery(
      'SELECT N,COUNT (N) WHERE F>= date "' +
        id("dtSInicial").value +
        '" AND F<= date "' +
        id("dtSFinal").value +
        '" GROUP BY N'
    );
    gStatus.setOptions({
      title: "Status de Atendimentos",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      pieSliceText: "value",
      pieStartAngle: "60",
      slices: {
        1: { offset: "0.2", color: "black" },
        2: { offset: "0.3", color: "orange" },
        3: { offset: "0.4", color: "red" },
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "labeled",
        textStyle: {
          fontSize: "12",
          color: "black",
        },
      },
      bar: "{groupWidth:95%}",
    });
    gStatus.draw();

    var gStatusSemanal = new google.visualization.ChartWrapper();
    gStatusSemanal.setChartType("PieChart");
    gStatusSemanal.setDataSourceUrl(UrlAcesso);
    gStatusSemanal.setContainerId("graficoStatusSemanal");
    gStatusSemanal.setQuery(
      'SELECT N,COUNT (N) WHERE F>= date "' +
        formatarDataAtual(-6) +
        '" AND F<= date "' +
        formatarDataAtual(0) +
        '" GROUP BY N'
    );
    gStatusSemanal.setOptions({
      title: "Status de Atendimentos [Semanal]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      pieSliceText: "value",
      pieStartAngle: "60",
      slices: {
        1: { offset: "0.2", color: "black" },
        2: { offset: "0.3", color: "orange" },
        3: { offset: "0.4", color: "red" },
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "labeled",
        textStyle: {
          fontSize: "12",
          color: "black",
        },
      },
      bar: "{groupWidth:95%}",
    });
    gStatusSemanal.draw();

    var gStatusHoje = new google.visualization.ChartWrapper();
    gStatusHoje.setChartType("PieChart");
    gStatusHoje.setDataSourceUrl(UrlAcesso);
    gStatusHoje.setContainerId("graficoStatusHoje");
    gStatusHoje.setQuery(
      'SELECT N,COUNT (N) WHERE F= date "' +
        formatarDataAtual(0) +
        '" GROUP BY N'
    );
    gStatusHoje.setOptions({
      title: "Status de Atendimentos [Hoje]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      pieSliceText: "value",
      pieStartAngle: "60",
      slices: {
        1: { offset: "0.2", color: "black" },
        2: { offset: "0.3", color: "orange" },
        3: { offset: "0.4", color: "red" },
      },
      width: "500",
      backgroundColor: "transparent",
      legend: {
        position: "labeled",
        textStyle: {
          fontSize: "12",
          color: "black",
        },
      },
      bar: "{groupWidth:95%}",
    });
    gStatusHoje.draw();

    //#GRAFICOS DE COLABORADOR
    var gColaborador = new google.visualization.ChartWrapper();
    gColaborador.setChartType("BarChart");
    gColaborador.setDataSourceUrl(UrlAcesso);
    gColaborador.setContainerId("graficoColaborador");
    gColaborador.setQuery(
      'SELECT B,COUNT (B) WHERE F>= date "' +
        id("dtCInicial").value +
        '" AND F<= date "' +
        id("dtCFinal").value +
        '" GROUP BY B'
    );
    gColaborador.setOptions({
      title: "Atendimentos x Colaborador",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      backgroundColor: "transparent",
      legend: "none",
      bar: "{groupWidth:95%}",
      animation: {
        duration: "3000",
        easing: "out",
        startup: "true",
      },
    });
    gColaborador.draw();

    var gColaboradorSemanal = new google.visualization.ChartWrapper();
    gColaboradorSemanal.setChartType("BarChart");
    gColaboradorSemanal.setDataSourceUrl(UrlAcesso);
    gColaboradorSemanal.setContainerId("graficoColaboradorSemanal");
    gColaboradorSemanal.setQuery(
      'SELECT B,COUNT (B) WHERE F>= date "' +
        formatarDataAtual(-6) +
        '" AND F<= date "' +
        formatarDataAtual(0) +
        '" GROUP BY B'
    );
    gColaboradorSemanal.setOptions({
      title: "Atendimentos x Colaborador [Semanal]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      backgroundColor: "transparent",
      legend: "none",
      bar: "{groupWidth:95%}",
      animation: {
        duration: "3000",
        easing: "out",
        startup: "true",
      },
    });
    gColaboradorSemanal.draw();

    var gColaboradorHoje = new google.visualization.ChartWrapper();
    gColaboradorHoje.setChartType("BarChart");
    gColaboradorHoje.setDataSourceUrl(UrlAcesso);
    gColaboradorHoje.setContainerId("graficoColaboradorHoje");
    gColaboradorHoje.setQuery(
      'SELECT B,COUNT (B) WHERE F= date "' +
        formatarDataAtual(0) +
        '" GROUP BY B'
    );
    gColaboradorHoje.setOptions({
      title: "Atendimentos x Colaborador [Hoje]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      backgroundColor: "transparent",
      legend: "none",
      bar: "{groupWidth:95%}",
      animation: {
        duration: "3000",
        easing: "out",
        startup: "true",
      },
    });
    gColaboradorHoje.draw();

    //#GRAFICOS DE ATENDIMENTOS
    var gAtendimentos = new google.visualization.ChartWrapper();
    gAtendimentos.setChartType("Calendar");
    gAtendimentos.setDataSourceUrl(UrlAcesso);
    gAtendimentos.setContainerId("graficoAtendimentos");
    gAtendimentos.setQuery(
      'SELECT F,COUNT (F) WHERE F>= date "' +
        id("dtAInicial").value +
        '" AND F<= date "' +
        id("dtAFinal").value +
        '" GROUP BY F'
    );
    gAtendimentos.setOptions({
      title: "Atendimentos x Período",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      backgroundColor: "transparent",
      legend: "none",
      animation: {
        duration: "3000",
        easing: "out",
        startup: "true",
      },
    });
    gAtendimentos.draw();

    var gAtendimentosHoje = new google.visualization.ChartWrapper();
    gAtendimentosHoje.setChartType("ColumnChart");
    gAtendimentosHoje.setDataSourceUrl(UrlAcesso);
    gAtendimentosHoje.setContainerId("graficoAtendimentosHoje");
    gAtendimentosHoje.setQuery(
      'SELECT F, COUNT (G) WHERE F= date "' +
        formatarDataAtual(0) +
        '" GROUP BY F'
    );
    gAtendimentosHoje.setOptions({
      title: "Atendimentos x Período [Hoje]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      backgroundColor: "transparent",
      legend: "none",
      animation: {
        duration: "3000",
        easing: "out",
        startup: "true",
      },
      hAxis: {
        legend: "none",
      },
    });
    gAtendimentosHoje.draw();

    var gAtendimentosSemanal = new google.visualization.ChartWrapper();
    gAtendimentosSemanal.setChartType("ColumnChart");
    gAtendimentosSemanal.setDataSourceUrl(UrlAcesso);
    gAtendimentosSemanal.setContainerId("graficoAtendimentosSemanal");
    gAtendimentosSemanal.setQuery(
      'SELECT F,COUNT (F) WHERE F>= date "' +
        formatarDataAtual(-6) +
        '" AND F<= date "' +
        formatarDataAtual(0) +
        '" GROUP BY F'
    );
    gAtendimentosSemanal.setOptions({
      title: "Atendimentos x Período [Semanal]",
      titleTextStyle: {
        fontSize: "20",
        bold: "true",
      },
      backgroundColor: "transparent",
      legend: "none",
      animation: {
        duration: "3000",
        easing: "out",
        startup: "true",
      },
    });
    gAtendimentosSemanal.draw();
  }
}
