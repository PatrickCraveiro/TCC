class ListaConsultaAPI {
    
    constructor() {
        this._consultas = [];
    }

    get consultas() {
        return [].concat(this._consultas);
    }

    set consultas(consulta) {
        this._consultas.push(consulta);
    }

}