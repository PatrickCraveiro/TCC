class Apostila {

    constructor(id, nome, tema, podeBaixar, podeLer) {
        this._id = id;
        this._nome = nome;
        this._tema = tema;
        this._podeBaixar = podeBaixar;
        this._podeLer = podeLer;
    }

    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get tema() {
        return this._tema;
    }

    get podeBaixar() {
        return this._podeBaixar;
    }

    get podeLer() {
        return this._podeLer;
    }
    
}

class Clinica {

    constructor(id, email, name) {
        this._id = id;
        this._email = email;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get email() {
        return this._email;
    }

    get name() {
        return this._name;
    }
    
}