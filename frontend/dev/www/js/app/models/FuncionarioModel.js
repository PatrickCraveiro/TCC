class Funcionario {
    constructor(LOGIN, senha, email, adm, cidade) {
      this.LOGIN = LOGIN;
      this.senha = senha;
      this.email = email;
      this.adm = adm;
      this.cidade = cidade;
    }
    get LOGIN() {
      return this.LOGIN;
    }
  
    get senha() {
      return this.senha;
    }
  
    get email() {
      return this.email;
    }
  
    get adm() {
      return this.adm;
    }
  
    get cidade() {
      return this.cidade;
    }
  }
  