const {series, parallel, src, dest} = require('gulp')// build (forma(serial , paralela), pasta do projeto(origin), destino)
const del = require('del') // deletar a pasta
const browserify = require('browserify')
const source = require ('vinyl-source-stream')
const tsify = require('tsify')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

function limparDist(cb) { //limpa o diretorio quando ela for chamada significa que a task foi concluida
    return del(['dist']) // deleta o dist se o mesmo existir
}

function copiarHTML() { 
    return src('public/**/*') // utiliza o padrao pipes and filters
        .pipe(dest('dist')) // copia os arquivos de pasta publica para a pasta de destino
}
function gerarJS(cb) {
    return browserify({
        basedir: '.',
        entries: ['src/main.ts']
    })
        .plugin (tsify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(dest('dist'))
}
function gerarJSProducao(params) // processo serial que fara a minificaçao do js para que o arquivo fique mais leve
{
    return src('dist/app.js')
        .pipe(rename('app.min.js'))   // crinado o alrquivo minificado
        .pipe(uglify())
        .pipe(dest('dist'))
}
exports.default = series(
    limparDist,
    parallel(gerarJS,copiarHTML),
    gerarJSProducao
) // ondem em que as funçoes seram executadas primeiramente serial e posteriormente de forma paralela 