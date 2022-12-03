// criado uma variavel chamada elemento
// document acessa o documento html que esta sendo chamado o Script
// query select é um metodo interno do javascript que nos retorna um elemento html
var elemento = document.querySelector('h1');

// variavel recebendo inner html para incremento ou alteração do descritivo
elemento.innerHTML += ' JS';
// variavel elemento recebendo estilizando de cor
elemento.style.color = '#00f';
// console log é o nosso print, retorno variavel
console.log(elemento);
// criado uma variavel limpar
function limpar(event){

    // não atualiza o reload da ppagina
    event.preventDefault();
    // acessando documento html buscando elemento form e resetando formulario
    document.querySelector('form').reset();
    // console log limpando
    console.log('Limpando...');
}

function salvar(event){
    console.log('Salvando...');
    event.preventDefault();

    var name = document.getElementsByName('nome')[0].value;
    var doc_people = document.getElementsByName('cpf')[0].value;
    var year = document.getElementsByName('idade')[0].value;

    var Aluno = {
        'nome': name,
        'cpf': doc_people,
        'idade': year
    };

    console.log(Aluno);

    localStorage.setItem('Alunos', JSON.stringify(Aluno));
}

document.getElementById('salvar').addEventListener('click', salvar)