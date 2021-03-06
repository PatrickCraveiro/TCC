class MainPageAdm extends HTMLDivElement{
    constructor() {
        super();
        this.className = 'container'
        this.setAttribute('id','app')
        this.innerHTML = `

        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" v-on:click="abaAtiva='relatorios'" href="javascript:;"
                        onclick="location.reload()">MEDQUERY</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li v-bind:class="{active:abaAtiva=='relatorios'}" v-on:click="abaAtiva='relatorios'"
                            onclick="location.reload()">
                            <a href="javascript:;">ADMIN</a>
                        </li>
                        <li v-bind:class="{active:abaAtiva=='consultas'}" v-on:click="abaAtiva='consultas'">
                            <a href="javascript:;">Consultas</a>
                        </li>
                        <li v-bind:class="{active:abaAtiva=='treinamento'}" v-on:click="abaAtiva='treinamento'">
                            <a href="javascript:;">Relátorio</a>
                        </li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="mt-1"><img id="fotoPerfil" class="img-circle oculto" width="45px"></li>
                        <li><span id="nome-usuario" class="texto-comum oculto"></span></li>
                        <div id="botao-Google">
                            <li class="mt-2">
                                <div class="g-signin2" data-onsuccess="onSignIn" data-lang="pt-BR" id="botaoLogin">
                                </div>
                            </li>
                        </div>
                        <div id="botao-logout" style="display: none;">
                            <li>
                                <a href="#" onclick="deslogar();"><b class="texto-comum">Sair</b></a>
                            </li>
                        </div>
                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
        </nav>

        <!-- #relatórios -->
        <div class="container" v-if="abaAtiva=='relatorios'" id="relatorios">
            <div class="row text-center">
                <h1>Gerenciar Clinicas</h1>
                <br>
                <form class="form-inline" onsubmit="consultaAPIController.pesquisaClinica(event)">
                    <!-- onchange="makeApiCall()" -->
                    <select id="clinicaConsultaSelect" class="form-control">
                        <option selected="selected">Todas</option>
                        <option>CNPJ</option>
                        <option>nome</option>
                        <option>cidade</option>
                    </select>
                    <input type="text" id="clinicaConsultaText" class="form-control">
                    <button type="submit" class="admin btn-primary btn-sm btn-graficos">Consultar</button>
                </form>
                <br>
            </div>
            <p class="button-cadastro" onclick="cadastro()">
                Cadastrar nova Clínica
            </p>

            <div class="container pesquisaClinicaBtn">

            </div>

            <div class="row text-center">
                <h1>Gerenciar Funcionários</h1>
                <br>
                <form class="form-inline" onsubmit="consultaAPIController.pesquisaFuncionario(event)">
                    <!-- onchange="makeApiCall()" -->
                    <select id="funcionarioConsultaSelect" class="form-control">
                        <option selected="selected">Todos</option>
                        <option>clinica onde trabalha</option>
                        <option>nome colaborador</option>
                        <option>cargo</option>
                        <option>data admissão</option>
                    </select>
                    <input type="text" id="funcionarioConsultaText" class="form-control">
                    <button type="submit" class="admin btn-primary btn-sm btn-graficos">Consultar</button>
                </form>
                <br>
            </div>
            <p class="button-cadastro" onclick="cadastroFuncionario()">
                Cadastrar nova Clínica
            </p>
            <div class="container pesquisaFuncionarioBtn">

            </div>

        </div>

        <div class="container" v-if="abaAtiva=='consultas'" id="consultas">
            <div class="row">
                <div class="col-md-offset-1">
                    <p class="h3">
                        Consultas -
                        <small class="text-muted">API</small>
                    </p>
                </div>
                <br />

                <div class="text-center">
                    <form class="form" onsubmit="consultaAPIController.consultaApostilasPermitidas(event)">
                        <div class="form-group col-sm-3 col-md-3">
                            <label for="ApostilasPermitidas">Apostilas Permitidas</label>
                            <input class="form-control input-sm" type="text" id="" placeholder="ID Aluno" />
                            <button type="submit" class="btn btn-default btn-sm">Consultar</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /row -->

            <div id="ConsultaAPIView">

            </div>



        </div>
        <!-- /#consultas -->
        <div class="container" v-if="abaAtiva=='treinamento'" id="treinamento">

            <!--     
                <script>
                var xValues = ["Santo Paulo", "Visconde De Nicolau", "Maria da Graça", "Santa Fé", "NovaClinica"];
                var yValues = [0, 1, 0, 2, 0];
                var barColors = [
                  "#b91d47",
                  "#00aba9",
                  "#2b5797",
                  "#e8c3b9",
                  "#1e7145"
                ];
                
                new Chart("myChart", {
                  type: "pie",
                  data: {
                    labels: xValues,
                    datasets: [{
                      backgroundColor: barColors,
                      data: yValues
                    }]
                  },
                  options: {
                    title: {
                      display: true,
                      text: "Consultas Agendadas em 2021"
                    }
                  }
                });
                </script>
                      -->

        </div>


        <!-- /.row -->
        <script src="js/jquery-1.12.4.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/vue.js"></script>
        <script src="js/main.js"></script>
        <script src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="js/grafico.js"></script>
        <script src="js/consultaApi.js"></script>
        <script src="js/app/models/Apostila.js"></script>
        <script src="js/login.js"></script>
        <script src="js/app/models/ClinicaModel.js"></script>
        <script src="js/app/models/ListaConsultaAPI.js"></script>
        <script src="js/app/controllers/ConsultaAPIController.js"></script>
        <script src="js/app/controllers/ConsultaAPIControllerFuncionario.js"></script>
        <script src="js/app/views/CadastraConsultaView.js"></script>
        <script src="js/app/views/ConsultaFuncionarioView.js"></script>
        <script src="js/app/views/ConsultaClinicaView.js"></script>
        <script src="js/app/models/Login.Model.js"></script>
    
        <script>
            let consultaAPIController = new ConsultaAPIController();
            let clinicaController = new ClinicaController();
        </script>`
    }
}
customElements.define('main-page-adm', MainPageAdm, { extends: 'div' });