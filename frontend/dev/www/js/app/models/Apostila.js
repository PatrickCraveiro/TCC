class Clinica {

    constructor(CNPJ, email, nome) {
        this._CNPJ = CNPJ;
        this._email = email;
        this._nome = nome;
    }

    get CNPJ() {
        return this._CNPJ;
    }

    get email() {
        return this._email;
    }

    get nome() {
        return this._nome;
    }
    
}