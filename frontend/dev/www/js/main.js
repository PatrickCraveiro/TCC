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
  }

});
