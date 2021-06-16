class FormClinica {
  constructor() {
      console.log(this)
      let a = [];
    document.querySelectorAll(
      "#formCadastroClinica >*> input"
    ).forEach(el => {a.push(el.value)})

    return a;
  }
}
