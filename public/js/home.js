let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = "transactions.html";
});
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

    

     alert("Adicionado com sucesso!");
     verNegativo();
     getCashIn();
     getCashOut();
     getTotal();
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

    getCashIn();
    getCashOut();
    getTotal();
}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type ==="1");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        } else{
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++){
            cashInHtml += `
            <div class="row mb-4">
                            <div class="col-12">
                              <h3 class="fs-2">R$ ${cashIn[index].valor.toFixed(2)}</h3>
                              <div class="container p-0">
                                <div class="row">
                                  <div class="col-12 col-md-8">
                                    <p>${cashIn[index].descricao}</p>
                                  </div>
                                  <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          `
          }
  
          document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut(){
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type ==="2");

    if(cashIn.length){
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5){
            limit = 5;
        } else{
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++){
            cashInHtml += `
            <div class="row mb-4">
                            <div class="col-12">
                              <h3 class="fs-2">R$ ${cashIn[index].valor.toFixed(2)}</h3>
                              <div class="container p-0">
                                <div class="row">
                                  <div class="col-12 col-md-8">
                                    <p>${cashIn[index].descricao}</p>
                                  </div>
                                  <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          `
          }
  
          document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }
}

//TOTAL
function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) =>{
        if(item.type ==="1"){
            total += item.valor;
        } else{
            total -= item.valor;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
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
    });
}
