//var clientId = '898358535937-ufcu5f43nn8k25t1hi0r1ilirjon6r9q.apps.googleusercontent.com';
//var scopes = 'https://spreadsheets.google.com/feeds';

function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log("Retorno de perfil Google: ok");

    var validacao = validarEmail(profile.getEmail());

    if (validacao){
        var idUsuario = profile.getId();
        var nome = profile.getName();
        var foto =  profile.getImageUrl();
        var email = profile.getEmail();

        document.getElementById('fotoPerfil').src = foto;
        document.getElementById('nome-usuario').innerText = nome;
    }
    else{
        alert("Aviso: Você não possui permissão de acesso!");
        deslogar();
    }

    trocarBotaoLoginLogout();
}

function deslogar() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

    var profile = '';
    document.getElementById('fotoPerfil').src = '';
    document.getElementById('nome-usuario').innerText = '';

    trocarBotaoLoginLogout();
}

function trocarBotaoLoginLogout() {
    var exibirGoogle = document.getElementById('botao-Google');
    var exibirLogout = document.getElementById('botao-logout');
    var exibirFoto = document.getElementById('fotoPerfil');
    var exibirNome = document.getElementById('nome-usuario');

    if(exibirLogout.style.display==='none'){
        exibirLogout.style.display = 'inline';
        exibirFoto.style.display = 'initial';
        exibirNome.style.display = 'initial';
        exibirGoogle.style.display = 'none';

    } else {
        exibirLogout.style.display = 'none';
        exibirFoto.style.display = 'none';
        exibirNome.style.display = 'none';
        exibirGoogle.style.display = 'inline';
    }

}

/*
A função a seguir utiliza um padrão chamado RegExp para testar o domínio do e-mail.
Observe que esta não é a melhor forma de validar o e-mail já que é possível "burlar", facilmente o Javascript, tornando o objeto da validação praticamente nulo.
O ideal é realizar essa validação junto à validação do OAuth 2.
Para mais informações sobre RegExp acesse https://www.w3schools.com/jsref/jsref_obj_regexp.asp
-Léo.
*/
function validarEmail(email) 
{
    if (/^\"?[\w-_\.]*\"?@medgrupo\.com\.br$/.test(email)){
        console.log("e-mail validado: "+email);
        return (true);
    }
    else{
        console.log("e-mail não validado! :"+email);
        return (false);
    }
}



/* Para estudo: implementação do botão de Login em nav bar com Vue

var app = new Vue({
    el: '#visualizacaoBotaoLogin',
    data: {
        botao: 'logar'
    },
    methods: {
        trocarBotao: function () {
            if(botao==='logar'){
                this.botao = 'deslogar'
            }
            else{
                this.botao = 'logar'
            }
        }
    }
})

*/
