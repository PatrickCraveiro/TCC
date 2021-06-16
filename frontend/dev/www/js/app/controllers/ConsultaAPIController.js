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
          const response = await fetch("http://18.231.113.43:3050/clinica", {
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
  }

  async cadastroClinica(event) {
    event.preventDefault();
    let form = {};
    let formPreenchido = document.querySelectorAll(
      "#formCadastroClinica >*> input"
    );

    form.CNPJ = formPreenchido[1].value;
    form.nome = formPreenchido[0].value;
    form.cidade = formPreenchido[2].value;

    console.log(form);

    return LoadingPage.for([
      {
        description: "Cadastrando Clínica",
        promise: async () => {
          const response = await fetch("http://18.231.113.43:3050/clinica", {
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
          feedbackCadastro.innerHTML = `<p class="textfeedback"> Clínica cadastrada com sucesso. </p>`;
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
          const response = await fetch(
            "http://18.231.113.43:3050/funcionario",
            {
              method: "GET",
            }
          )
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });

          let filtro = document.querySelector(
            "#funcionarioConsultaSelect"
          ).value;
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
    let form = new Funcionario();
    let formPreenchido = document.querySelectorAll(
      "#formCadastroFuncionario >*> input"
    );
    let formCargo = document.querySelector(
      "#formCadastroFuncionario >*> select"
    );

    form.cpfFuncionario = formPreenchido[1].value;
    form.nomeFuncionario = formPreenchido[0].value;
    form.emailFuncionario = formPreenchido[2].value;
    form.cargoFuncionario = formCargo.value;
    form.clinicaCNPJ = Number(formPreenchido[3].value);
    form.nomeClinica = formPreenchido[4].value;
    form.dataContracao = formPreenchido[5].value;

    return LoadingPage.for([
      {
        description: "Pesquisando Clínicas",
        promise: async () => {
          const response = await fetch(
            "http://18.231.113.43:3050/funcionario",
            {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(form),
            }
          )
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          let feedbackCadastro = document.querySelector(".feedbackCadastro");
          feedbackCadastro.innerHTML = `<p class="textfeedback"> Clínica cadastrada com sucesso. </p>`;
        },
      },
    ]);
  }

  cadastroLogin2(event) {
    event.preventDefault();
    let infoLogin = document.querySelector("#formCadastroLogin2")

    let login = new Login(
      infoLogin.children[0].children[1].value,
      infoLogin.children[1].children[1].value,
      infoLogin.children[2].children[1].value,
      0
    );

    console.log(login);

    return LoadingPage.for([
      {
        description: "Cadastrando login",
        promise: async () => {
          const response = await fetch(
            "http://18.231.113.43:3050/login",
            {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(login),
            }
          )
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          let feedbackCadastro = document.querySelector(".feedbackCadastro");
          feedbackCadastro.innerHTML = `<p class="textfeedback"> Usuario cadastrdo com sucesso </p>`;
        },
      },
    ]);
  }

  async formLogin() {
    let formLogin = document.querySelector("#formLogin");
    console.log(formLogin[0].value);

    let formPreenchido = {};

    formPreenchido.login = formLogin[0].value;
    formPreenchido.senha = formLogin[1].value;

    return LoadingPage.for([
      {
        description: "Fazendo login",
        promise: async () => {
          const response = await fetch("http://localhost:3050/logins", {
            method: "GET",
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          console.log(response);
        },
      },
    ]);
  }

  realizaLogin(event) {
    event.preventDefault();

    let inputsLogin = document.querySelector("#realizaLogin");

    let formLogin = [];

    inputsLogin.querySelectorAll("input").forEach((input) => {
      formLogin.push(input.value);
    });

    console.log(formLogin);

    let vm = this;

    return LoadingPage.for([
      {
        description: "Realizando Login",
        promise: async () => {
          const response = await fetch("http://18.231.113.43:3050/login", {
            method: "GET",
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          let acesso = false;
          let adm = false;
          response.forEach((el) => {
            if (el.LOGIN === formLogin[0] && el.senha === formLogin[1]) {
              if (el.adm === 1) {
                acesso = el.LOGIN;
                adm = true;
              } else {
                acesso = el.LOGIN;
              }
            }
          });

          if (acesso) {
            if (adm) {
              isAdm();
            }
            else{
              opcaoAdm1();
            }
            let infoLogin = document.createElement("div");
            infoLogin.textContent = acesso;
            document.querySelector("#infoLoginUser").append(infoLogin);
            let divLogin = document.createElement("div");
            divLogin.classList.add("divLoginSalvo");
            divLogin.textContent = `Bem vindo: ${acesso}`;
            document.querySelector(".navbar-right").append(divLogin);

            console.log(divLogin);
            console.log("acessou");
          } else {
            alert("login ou user errado");
            return false;
          }
        },
      },
    ]);
  }

  cadastraConsultaReal() {
    let consultaInfos = document.querySelector("#infoLoginUser").children;

    let agendaConsulta = new AgendaConsulta(
      document.querySelector(".swirl-in-fwd")
    );

    let consulta = new Consulta(
      consultaInfos[0].textContent,
      consultaInfos[1].textContent,
      consultaInfos[2].textContent,
      consultaInfos[3].textContent,
      consultaInfos[4].textContent,
      consultaInfos[6].textContent
    );

    return LoadingPage.for([
      {
        description: "Agendando consulta",
        promise: async () => {
          const response = await fetch("http://18.231.113.43:3050/consulta", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(consulta),
          })
            .then((response) => {
              return response.json();
            })
            .catch((rejected) => {
              console.error("Erro na requisição", rejected);
              return false;
            });
          agendaConsulta.update(document.querySelector(".swirl-in-fwd"));
        },
      },
    ]);
  }

  async cadastraConsulta() {
    let vm = this;
    let cadastraConsulta = new CadastraConsulta(
      document.querySelector(".swirl-in-fwd")
    );
    const response = await fetch("http://18.231.113.43:3050/clinica", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((rejected) => {
        console.error("Erro na requisição", rejected);
        return false;
      });

    cadastraConsulta.update(response);
    console.log(response);
  }
}
