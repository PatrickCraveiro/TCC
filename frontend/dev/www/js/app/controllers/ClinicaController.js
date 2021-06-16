class ClinicaController {
  constructor() {
    this._listaConsultaAPI = new ListaConsultaAPI();
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

    let formPreenchido = new FormClinica;

    let clinica = new Clinica(
      formPreenchido[1].value,
      formPreenchido[0].value,
      formPreenchido[2].value
    );

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
            body: JSON.stringify(clinica),
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

  async editClinica(event) {
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

  async excluiClinica(event) {
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
}
