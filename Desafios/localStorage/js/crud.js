"use strict"

/* Vamos criar um Dicionário temporario. */

var tempClient = {
    nome: "Ana",
    sobrenome: "Simas",
    idade: "25"};

/* Agora vamos criar uma Função createClient e passando como referência
 * o Dicionário como paramentro e adicionando o Dicionário no Local Storage.
 */

function createClient1(client) {
    /* Local Storage tem que passar dois paramentro, 1° Chave e 2° Valor. */
    localStorage.setItem("db_client", client);
}

/* Na aba Console chame a Função com o seguinte comando.
 *
 *      createClient1(tempClient)
 * 
 * Na aba Aplicativo, observe o que foi amarzenado.
 * 
 *      1   [object Object]
 * 
 * O Local Storage só aceita String's, então temos que transforma esse Objeto
 * em String com a seguinte alteração na Função.
 */

function createClient2(client) {
    /* Usando JSON.stringify para converter em String. */ 
    localStorage.setItem("db_client", JSON.stringify(client));
}

/* Na aba Console chame a Função com o seguinte comando.
 *
 *      createClient2(tempClient)
 * 
 * Na aba Aplicativo nota-se que está salvando o Dicionário no Local Storage, mas 
 * está sobreescrevendo o conteúdo. 
 * Para isso temos que ler o que já está no Local Storage, com a seguinte alteração
 * na Função.
 */

function createClient3(client) {
    /* Lê o conteúdo do Local Storage */
    var db_client = localStorage.getItem("db_client");
    /* Adiciona o novo cliente ao "db_client" */
    db_client.push(client);
    /* Usando JSON.stringify para converter em String. */ 
    localStorage.setItem("db_client", JSON.stringify(client));
}

/* Na aba Console chame a Função com o seguinte comando.
 *
 *      createClient3(tempClient)
 * 
 * Na aba Console nota-se o seguinte erro.
 * 
 * crud.js:49 Uncaught TypeError: db_client.push is not a function
 *     at createClient2 (crud.js:49:15)
 *     at <anonymous>:1:1
 *
 * Isso ocorre porque está retornado uma String e tentando colocar em
 * um Objeto JSON.
 * Para isso temos que converter a String em Objeto JSON, com a seguinte 
 * alteração na Função.
 */

function createClient4(client) {
    /* Lê o conteúdo do Local Storage e convertendo em Objeto JSON */
    var db_cliente = JSON.parse(localStorage.getItem("db_client"));
    /* Adiciona o novo cliente ao "db_client" */
    db_cliente.push(client);
    /* Usando JSON.stringify para converter em String. */ 
    localStorage.setItem("db_client", JSON.stringify(db_cliente));
}

/* Funcionou, mas se o Local Storage não conter dados? O que acontece. 
 * Na aba Aplicativo, remova o Banco de Dados, volte na aba Console
 * e chame a Função.
 * 
 *      createClient4(tempClient)
 * 
 * crud.js:77 Uncaught TypeError: Cannot read properties of null (reading 'push')
 *  at createClient3 (crud.js:77:16)
 *  at <anonymous>:1:1
 * 
 *  Para isso temos que verificar se o Local Storage está vazio, se sim, retorna
 *  uma lista vazia.
 */

function createClient5(client) {
    /* Lê o conteúdo do Local Storage e convertendo em Objeto JSON, se estiver vazio, 
    retorna uma lista vazia. */
    var db_cliente = JSON.parse(localStorage.getItem("db_client")) ?? [];
    /* Adiciona o novo cliente ao "db_client" */
    db_cliente.push(client);
    /* Usando JSON.stringify para converter em String. */ 
    localStorage.setItem("db_client", JSON.stringify(db_cliente));
}

/* Agora dividir a Função createClient em várias funções */

/* 1° Ler os dados do Local Storage */
function pegarDados() {
    /* Lê o conteúdo do Local Storage e convertendo em Objeto JSON, se estiver vazio, 
    retorna uma lista vazia. */
    return JSON.parse(localStorage.getItem("db_client")) ?? [];
}

/* 2° Gravar os dados no Local Storage */
function salvarDados(db_cliente) {
    /* Usando JSON.stringify para converter em String. */ 
    localStorage.setItem("db_client", JSON.stringify(db_cliente));
}

/* Nossa Função createClient fica assim. */
function createClient6(client) {
    /* Cria a lista e chama a Função pegarDados*/
    var db_cliente = pegarDados();
    /* Adiciona o novo cliente ao "db_client" */
    db_cliente.push(client);
    /* Chama a Função salvarDados passando db_cliente como paramentro */
    salvarDados(db_cliente);
}

/* Criando o CRUD 
 *
 *      C - Create
 *      R - Read
 *      U - Update
 *      D - Delte
 */

/* CRUD => Create */
function createClient(client) {
    var db_client = readCLient();
    db_client.push(client);
    salvarDados(db_client)
}

/* CRUD => Read */
function readCLient() {
    return JSON.parse(localStorage.getItem("db_client")) ?? [];
}

/* Observação
 * 
 *      A Função readClient() é redundate a Função pegarDados()
 *
 */

/* CRUD => Update */
function updateClient(index, client) {
    var db_cliente = pegarDados();
    db_cliente[index] = client;
    salvarDados(db_cliente)
}

/* CRUD => Delete */
function deleteClient(index) {
    var db_cliente = pegarDados();
    db_cliente.splice(index, 1);
    salvarDados(db_cliente);
}