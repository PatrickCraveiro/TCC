class ConsultaAPIController {
  constructor() {
    this._listaConsultaAPI = new ListaConsultaAPI();
  }

  ordenar(tipo) {
    let ordenado = "";

    switch (tipo) {
      case "nome":
        ordenado = this._listaConsultaAPI.consultas.sort((a, b) => {
          return a.nome > b.nome;
        });
        break;
      case "tema":
        ordenado = this._listaConsultaAPI.consultas.sort((a, b) => {
          return a.tema > b.tema;
        });
        break;
      case "podeBaixar":
        ordenado = this._listaConsultaAPI.consultas.sort((a, b) => {
          return a.podeBaixar > b.podeBaixar;
        });
        break;
      case "podeLer":
        ordenado = this._listaConsultaAPI.consultas.sort((a, b) => {
          return a.podeLer > b.podeLer;
        });
        break;
      default:
        ordenado = this._listaConsultaAPI.consultas.sort((a, b) => {
          return a.id > b.id;
        });
    }

    return ordenado;
  }

  async pesquisaClinica(event) {
    event.preventDefault();

    let vm = this;
    let consultaClinica = new ConsultaClinica(
      document.querySelector(".pesquisaClinicaBtn")
    );
    consultaClinica.loading();

    return LoadingPage.for([
      {
        description: "Pesquisando Clínicas",
        promise: async () => {
          const response = await fetch("http://localhost:3050/customers", {
            method: "GET",
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });

          let filtro = document.querySelector("#clinicaConsultaSelect").value;
          const filtroTxt = document.querySelector(
            "#clinicaConsultaText"
          ).value;
          filtro = eval("filtro");

          console.log(response);

          if (filtro != "Todas") {
            consultaClinica.update(response, filtro, filtroTxt);
          } else {
            consultaClinica.update(response);
          }
        },
      },
    ]);

    console.log(response);
  }

  async cadastroClinica(event) {
    event.preventDefault();
    let form = {};
    let formPreenchido = document.querySelectorAll(
      "#formCadastroClinica >*> input"
    );

    form.name = formPreenchido[0].value;
    form.email = formPreenchido[1].value;
    form.id = formPreenchido[2].value;

    return LoadingPage.for([
      {
        description: "Pesquisando Clínicas",
        promise: async () => {
          const response = await fetch("http://localhost:3050/customers", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          let feedbackCadastro = document.querySelector(".feedbackCadastro");
          feedbackCadastro.innerHTML =
            "<p> Clínica cadastrada com sucesso. </p>";
        },
      },
    ]);
  }

  async pesquisaFuncionario(event) {
    event.preventDefault();

    let vm = this;
    let consultaFuncionario = new ConsultaFuncionario(
      document.querySelector(".pesquisaFuncionarioBtn")
    );

    return LoadingPage.for([
      {
        description: "Pesquisando Funcionários",
        promise: async () => {
          const response = await fetch("http://localhost:3050/funcionario", {
            method: "GET",
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });

          let filtro = document.querySelector("#funcionarioConsultaSelect").value;
          const filtroTxt = document.querySelector(
            "#funcionarioConsultaText"
          ).value;
          filtro = eval("filtro");

          console.log(response);

          if (filtro != "Todos") {
            consultaFuncionario.update(response, filtro, filtroTxt);
          } else {
            consultaFuncionario.update(response);
          }
        },
      },
    ]);
  }

  async cadastroFuncionario(event) {
    event.preventDefault();
    let form = {};
    let formPreenchido = document.querySelectorAll(
      "#formCadastroFuncionario >*> input"
    );
    let formCargo = document.querySelector(
      "#formCadastroFuncionario >*> select"
    );

    form.idFuncionario = 0;
    form.idClinica = Number(formPreenchido[2].value);
    form.email = formPreenchido[1].value;
    form.nome = formPreenchido[0].value;
    form.cargo = formCargo.value

    return LoadingPage.for([
      {
        description: "Pesquisando Clínicas",
        promise: async () => {
          const response = await fetch("http://localhost:3050/funcionario", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          let feedbackCadastro = document.querySelector(".feedbackCadastro");
          feedbackCadastro.innerHTML =
            "<p> Clínica cadastrada com sucesso. </p>";
        },
      },
    ]);
  }

  consultaApostilasPermitidas(event) {
    event.preventDefault();
    let vm = this;

    let idAluno = document.querySelector("#ApostilasPermitidas").value;

    let consultaAPIView = new ConsultaAPIView(
      document.querySelector("#ConsultaAPIView")
    );
    consultaAPIView.loading();

    if (!isNaN(idAluno)) {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://api.medgrupo.com.br/MateriaisImpressos.svc/json/apostilaspermitidas/" +
          idAluno
      );
      xhr.send();
      xhr.addEventListener("load", function () {
        let retornoIdBruto = JSON.parse(xhr.responseText);
        let retornoId = retornoIdBruto.GetApostilasPermitidasJsonResult;
        retornoId.map((n) => {
          let xhr2 = new XMLHttpRequest();
          xhr2.open(
            "GET",
            "https://api.medgrupo.com.br/MateriaisImpressos.svc/json/Apostilas/" +
              n.IdApostila +
              "/Apostila"
          );
          xhr2.send();
          xhr2.addEventListener("load", function () {
            let retornoApostila = JSON.parse(xhr2.responseText);
            retornoApostila.map((n2) => {
              vm._listaConsultaAPI.consultas = new Apostila(
                n2.ID,
                n2.Codigo,
                n2.NomeCompleto,
                n.Bloqueada,
                n.PermitidoLer
              );
            }, consultaAPIView.update(vm.ordenar("id")));
          });
        });
      });
    } else {
      alert("Digite um ID válido");
    }
  }
}