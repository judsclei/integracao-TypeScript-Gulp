import $ from 'jquery'
import Livro from "./modelo/livro";


const livro = new Livro('Clean code', 200.50, 15);
console.log(livro.precoComDesconto())

$('body').append(`<h1>${livro.nome}</h1>`)
$('body').append(`<h2> Preço: R$ ${livro.precoComDesconto()}</h2>`)