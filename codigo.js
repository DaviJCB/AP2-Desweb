document.addEventListener('DOMContentLoaded', () => {
    const url = "https://botafogo-atletas.mange.li";
    const Senha_Certs = "Senha";

    const containerBotoes = document.createElement('div');
    containerBotoes.id = 'container_botoes';
    document.body.appendChild(containerBotoes);

    const containerAtletas = document.createElement('div');
    containerAtletas.id = 'container_atletas';
    document.body.appendChild(containerAtletas);

    const Pag_login = login();
    document.body.appendChild(Pag_login);

    function criarBotao(texto, filtro) {
        const botao = document.createElement('button');
        botao.className = 'botao-filtro';
        botao.textContent = texto;

        botao.addEventListener('click', () => {
            if (CORRETO()) {
                atualizaURL(filtro);
            } 
        });

        return botao;
    }

    const botaoMasculino = criarBotao('Masculino', 'masculino');
    const botaoFeminino = criarBotao('Feminino', 'feminino');
    const botaoTodos = criarBotao('Todos', 'all');

    function login() {
        const formulario = document.createElement('form');

        const inputSenha = document.createElement('input');
        inputSenha.placeholder = 'Digite a senha';
        formulario.appendChild(inputSenha);

        const botaoProx = document.createElement('button');
        botaoProx.className = 'botaoProx';
        botaoProx.textContent = 'Próximo';
        botaoProx.addEventListener('click', (event) => {
            event.preventDefault();
            const senhaDigitada = inputSenha.value;
            const mensagemErro = document.getElementById("mensagemErro");
            if (senhaDigitada == Senha_Certs) {
                MensagemLogin.style.visibility = 'hidden';
                document.body.removeChild(mensagemErro);
                document.body.removeChild(formulario);
                containerBotoes.appendChild(botaoMasculino);
                containerBotoes.appendChild(botaoFeminino);
                containerBotoes.appendChild(botaoTodos);
            } else {
                mensagemErro.innerHTML = 'Senha incorreta. Tente novamente.';
            }
        });
        formulario.appendChild(botaoProx);

        return formulario;
    }

    function CORRETO() {
        return true; 
    }

    async function atualizaURL(elenco) {
        const novoURL = `${url}/${elenco}`;
        const dados = await pega_json(novoURL);

        limpaCartoes();

        for (const atleta of dados) {
            cria_cartao(atleta);
        }
    }

    function limpaCartoes() {
        while (containerAtletas.firstChild) {
            containerAtletas.removeChild(containerAtletas.firstChild);
        }
    }

    function cria_cartao(entrada) {
        const containerAtleta = document.createElement('article');
        containerAtleta.className = 'cartao';
        containerAtleta.dataset.id = entrada.id;
        containerAtleta.dataset.altura = entrada.altura;
        containerAtleta.dataset.nome_completo = entrada.nome_completo;
        containerAtleta.dataset.nascimento = entrada.nascimento;

        const titulo = document.createElement('h3');
        titulo.innerHTML = entrada.nome;
        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `foto_de_${entrada.nome}`;
        const descricao = document.createElement('p');
        descricao.innerHTML = entrada.descricao;

        containerAtleta.appendChild(titulo);
        containerAtleta.appendChild(imagem);
        containerAtleta.appendChild(descricao);

        containerAtleta.onclick = manipulaClick;

        containerAtletas.appendChild(containerAtleta);
    }

    function manipulaClick(e) {
        const artigo = e.target.closest('article');

        document.cookie = `id=${artigo.dataset.id}`;
        document.cookie = `altura=${artigo.dataset.altura}`;
        document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
        document.cookie = `nascimento=${artigo.dataset.nascimento}`;

        localStorage.setItem('id', artigo.dataset.id);
        localStorage.setItem('altura', artigo.dataset.altura);
        localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
        localStorage.setItem('nascimento', artigo.dataset.nascimento);
        localStorage.setItem('dados_atleta', artigo.dataset);

        sessionStorage.setItem('id', artigo.dataset.id);
        sessionStorage.setItem('altura', artigo.dataset.altura);
        sessionStorage.setItem('nome_completo', artigo.dataset.nome_completo);
        sessionStorage.setItem('nascimento', artigo.dataset.nascimento);
        sessionStorage.setItem('dados', JSON.stringify(artigo.dataset));

        window.location = `outra.html?id=${artigo.dataset.id}`;
    }

    async function pega_json(caminho) {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }
}); 