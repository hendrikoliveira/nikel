let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);


//ADICIONAR LANÇAMENTO
document.getElementById("novo-lancamento").addEventListener("submit", function(e){
    e.preventDefault();

    const date = document.getElementById("data").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const type = document.querySelector('input[name="type-input"]:checked').value;
   
    data.transactions.unshift({
       valor: valor, type: type, descricao: descricao, date: date  
    });
     saveData(data);
     e.target.reset();

    getTransactions();

     alert("Adicionado com sucesso!");
     verNegativo();
})

checkLogged();

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions(){
    const transactions = data.transactions;
    let  transactionsHtml = ``;
    
    if(transactions.length){
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type ==="2"){
                type = "Saída";
            }
            transactions.Html += `
            
            <tr>
                                <th scope="row">${item.date}</th>
                                <td>${item.valor.toFixed(2)}</td>
                                <td>${type}</td>
                                <td>${item.descricao}</td>
                              </tr>

            `
            
            
        })
    }

    document.getElementById("transactions-list").innerHTML = transactions.Html;
}

function saveData(data){
    localStorage.setItem(data.email, JSON.stringify(data));
}
function verNegativo(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) =>{
        if(item.type ==="1"){
            total += item.valor;
        } else{
            total -= item.valor;
           
        }
         if(total < 0){
                alert("Seu saldo vai ficar negativo!");
            }
    })