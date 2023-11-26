
const params = new URLSearchParams(window.location.search);
const atleta_id = params.get('id');
const URL = `https://botafogo-atletas.mange.li/${atleta_id}`;

async function fetchData() {
  try {
    const carreg = document.getElementById('Carregando');
    carreg.style.visibility = 'visible';

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('Erro na solicitação da API');
    }

    const infos = await response.json();
    console.log(infos);
    carreg.style.visibility = 'hidden';


    const img = document.getElementById('imagem').src = infos.imagem;
    const descricao= document.getElementById('descricao').innerHTML = infos.descricao;
    const mome = document.getElementById('nome').innerHTML = infos.nome;
    const Altura = document.getElementById('Altura').innerHTML = "Altura: " + infos.altura;
    const Posicao= document.getElementById('Pos').innerHTML = "Posição: " + infos.posicao;
    const Nascimento = document.getElementById('Nasc').innerHTML ="Nascimento: " + infos.nascimento;
  
  
  } catch (error) {
    console.error(error); 
    window.alert("Erro!");
  }
}

document.addEventListener('DOMContentLoaded', fetchData);
