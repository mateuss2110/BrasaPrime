import {
  db,
  collection,
  addDoc
}
from "./firebase.js";

const form =
  document.getElementById("form-reserva");

form.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const nome =
    document.getElementById("nome").value;

  const telefone =
    document.getElementById("telefone").value;

  const data =
    document.getElementById("data").value;

  const hora =
    document.getElementById("hora").value;

  try{

    await addDoc(
      collection(db,"reservas"),
      {

        nome,
        telefone,
        data,
        hora,
        criadoEm:new Date()

      }
    );

    alert("Reserva realizada com sucesso!");

    form.reset();

  }catch(error){

    console.log(error);

    alert("Erro ao salvar reserva.");

  }

});