
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("form-login").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("senha-input").value;
    const session = document.getElementById("session-input").checked;

    const conta = getAccount(email);

    if(!conta) {
        alert("Verifique seu login!")
        return;
    }
    if(conta) {
        if(conta.senha !== senha){
            alert("Verifique seu login!")
            return;
        }

        saveSession(email, session);

        window.location.href = "home.html";
    }
    

});
//CRIAR CONTA
document.getElementById("form-novo").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("novo-email").value;
    const senha = document.getElementById("nova-senha").value;
    const confirmasenha = document.getElementById("confirma-senha").value;

    if(email.length < 10){
        alert("Insira um e-mail válido");
        return;
    }
    if(senha.length < 5){
        alert("Insira uma senha válida");
        return;
    }
    if(confirmasenha != senha){
        alert("As senhas não coincidem!");
        return;
    }

    saveAccount({
        email: email,
        senha: senha,
        transactions: []
    });
    
  
    alert("Conta criada com sucesso!");
    
});
    
    function checkLogged(){
        if(session){
            sessionStorage.setItem("logged", session);
            logged = session;
        }

        if(logged){
            saveSession(logged, session);
            window.location.href = "home.html";
        }
    }


    function saveAccount(data) {
        localStorage.setItem(data.email, JSON.stringify(data));
    }

    function saveSession(data, saveSession){
        if(saveSession){
            localStorage.setItem("session", data);
        }

        sessionStorage.setItem("logged", data);
    }

    function getAccount(key){
        const conta = localStorage.getItem(key);

        if(conta){
            return JSON.parse(conta);
        }
        return "";
    }

