console.log("SCRIPT CARREGOU");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6Q8XRP99c3mVkwdEL-jMCJFDEMdLbd4w",
  authDomain: "brasa-prime.firebaseapp.com",
  projectId: "brasa-prime",
  storageBucket: "brasa-prime.firebasestorage.app",
  messagingSenderId: "283430936504",
  appId: "1:283430936504:web:a1f38ebb1f5d2ae7cff94d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let carrinho =
  JSON.parse(localStorage.getItem("carrinho")) || [];

let total = 0;

function adicionarCarrinho(nome, preco){

  carrinho.push({
    nome,
    preco
  });

  localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
  );

  alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho(){

  const lista =
    document.getElementById("lista-carrinho");

  const totalTexto =
    document.getElementById("total");

  if(!lista) return;

  lista.innerHTML = "";

  total = 0;

  carrinho.forEach((item, index) => {

    total += item.preco;

    const li = document.createElement("li");

    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)}

      <button onclick="removerItem(${index})">
        ❌
      </button>
    `;

    lista.appendChild(li);

  });

  totalTexto.innerHTML =
    `Total: R$ ${total.toFixed(2)}`;
}

async function finalizarPedido(){

  if(carrinho.length === 0){

    alert("Carrinho vazio!");

    return;
  }

  const pagamento =
    document.getElementById("pagamento").value;

  try{

    await addDoc(
      collection(db, "pedidos"),
      {

        itens: carrinho,

        total: total,

        pagamento: pagamento,

        criadoEm: new Date()

      }
    );

    alert(`
Pedido realizado com sucesso!

Pagamento:
${pagamento}

Total:
R$ ${total.toFixed(2)}
    `);

    carrinho = [];

    localStorage.removeItem("carrinho");

    atualizarCarrinho();

  }catch(error){

    console.log(error);

    alert("Erro ao salvar pedido.");

  }

}

function mostrarPagamento(){

  const pagamento =
    document.getElementById("pagamento").value;

  const pix =
    document.getElementById("pix-area");

  const cartao =
    document.getElementById("cartao-area");

  const dinheiro =
    document.getElementById("dinheiro-area");

  pix.style.display = "none";
  cartao.style.display = "none";
  dinheiro.style.display = "none";

  if(pagamento === "pix"){

    pix.style.display = "block";

  }

  if(pagamento === "cartao"){

    cartao.style.display = "flex";

  }

  if(pagamento === "dinheiro"){

    dinheiro.style.display = "block";

  }

}

atualizarCarrinho();

function removerItem(index){

  carrinho.splice(index, 1);

  localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
  );

  atualizarCarrinho();
}

window.adicionarCarrinho = adicionarCarrinho;

window.finalizarPedido = finalizarPedido;

window.mostrarPagamento = mostrarPagamento;

window.removerItem = removerItem;

