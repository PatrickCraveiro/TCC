class Funcionario {
    constructor(cpfFuncionario, nomeFuncionario, emailFuncionario, cargoFuncionario, clinicaCNPJ, nomeClinica, dataContracao) {
      this.cpfFuncionario = cpfFuncionario;
      this.nomeFuncionario = nomeFuncionario;
      this.emailFuncionario = emailFuncionario;
      this.cargoFuncionario = cargoFuncionario;
      this.clinicaCNPJ = clinicaCNPJ;
      this.nomeClinica = nomeClinica;
      this.dataContracao = dataContracao;
    }
    get cpfFuncionario() {
      return this.cpfFuncionario;
    }

    get nomeFuncionario() {
      return this.nomeFuncionario;
    }
  
    get senha() {
      return this.senha;
    }
  
    get emailFuncionario() {
      return this.emailFuncionario;
    }
  
    get cargoFuncionario() {
      return this.cargoFuncionario;
    }
  
    get clinicaCNPJ() {
      return this.clinicaCNPJ;
    }

    get nomeClinica() {
      return this.nomeClinica;
    }

    get dataContracao() {
      return this.dataContracao;
    }
  }
  