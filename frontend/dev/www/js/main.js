var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    abaAtiva: "relatorios",
    curso: '',
    statusOV: '',
    ano: '',
    appsDireito: '',
    observacoes: '',
    consultaRealizada: ''
  },
  methods: {
    toogleActive: function () {
      this.relatoriosActive = !this.relatoriosActive;
    },

    consultaRegraDeAcesso: function (){
      //Extensivo Ano Atual:
      if((curso.value == 'MEDCURSO' || curso.value == 'MED')
          && statusOV.value == 'Ativa'
          && ano.value == 'Atual') {
            appsDireito = "ÁREA RESTRITA, MEDSOFT PRO, MEDREADER, RECURSOS, CONCURSOS";
            this.appsDireito = appsDireito;
            observacoes = "";
            this.observacoes = observacoes;
        }
        //MEDELETRO Ano Atual:
       else if (curso.value == 'MEDELETRO'
          && statusOV.value == 'Ativa'
          && ano.value == 'Atual') {
            appsDireito = "ÁREA RESTRITA, MEDSOFT PRO, MEDREADER, RECURSOS, CONCURSOS, MEDELETRO";
            this.appsDireito = appsDireito;
            observacoes = "";
            this.observacoes = observacoes;
        }
        //Extensivo/Intensivo Ano Anterior:
       else if ((curso.value == 'MEDCURSO' || curso.value == 'MED' || curso.value == 'INTENSIVÃO/RA/CPMED')
          && statusOV.value == 'Ativa'
          && ano.value == 'Anterior') {
            appsDireito = "ÁREA RESTRITA, MEDREADER";
            this.appsDireito = appsDireito;
            observacoes = "Restrita: Apenas menu administrativo, MEDREADER: Apenas referente ao período cursado";
            this.observacoes = observacoes;
        }
        //Cancelado Extensivo ou Intensivo
      else if ((curso.value == 'MEDCURSO' || curso.value == 'MED' || curso.value == 'INTENSIVÃO/RA/CPMED')
         && statusOV.value == 'Cancelada') {
           appsDireito = "ÁREA RESTRITA, MEDREADER";
           this.appsDireito = appsDireito;
           observacoes = "Restrita: Apenas menu administrativo, MEDREADER: Apenas referente ao período cursado";
           this.observacoes = observacoes;
       }
        //MEDELETRO Ano Anterior:
       else if (curso.value == 'MEDELETRO'
          && statusOV.value == 'Ativa'
          && ano.value == 'Anterior') {
            appsDireito = "ÁREA RESTRITA, MEDREADER, MEDELETRO";
            this.appsDireito = appsDireito;
            observacoes = "Restrita: Apenas menu administrativo, MEDREADER: Apenas referente ao período cursado, MEDELETRO: Somente Resumão";
            this.observacoes = observacoes;
        }
        //Cancelado MEDELETRO:
        else if (curso.value == 'MEDELETRO'
           && statusOV.value == 'Cancelada') {
             appsDireito = "ÁREA RESTRITA, MEDREADER, MEDELETRO";
             this.appsDireito = appsDireito;
             observacoes = "Restrita: Apenas menu administrativo, MEDREADER: Apenas referente ao período cursado, MEDELETRO: Somente Resumão";
             this.observacoes = observacoes;
         }
        //Intensivo Ano Atual:
       else if ((curso.value == 'INTENSIVÃO/RA/CPMED')
          && statusOV.value == 'Ativa'
          && ano.value == 'Atual'){
            appsDireito = "ÁREA RESTRITA, MEDREADER, RECURSOS, CONCURSOS";
            this.appsDireito = appsDireito;
            observacoes = "Não possui Aulas de Revisão e Questões de Apostila";
            this.observacoes = observacoes;
        }

      else if (statusOV.value == 'Inadimplente Meses Anteriores'){
        appsDireito = "Acesso normal como aluno ativo até 6º dia após aceite de aviso";
        this.appsDireito = appsDireito;
        observacoes = "Após 6º dia perde acesso até regularizar situação";
        this.observacoes = observacoes;
      }

      else{
        appsDireito = "Sem acesso";
        this.appsDireito = appsDireito;
        observacoes = "";
        this.observacoes = observacoes;
      }
    }
  }

});
