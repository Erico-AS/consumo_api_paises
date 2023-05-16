window.addEventListener('load', function() {
    const valores = fetch('https://restcountries.com/v2/all').then(resultado => {
       resultado.json().then( dados => {
            var paises = Number(dados.length)
            numeros(dados, 0, paises)

            for (var i = 0; i <= dados.length - 1; i++) {
                mostraDados(dados, i)
            }

            const btnVerde = this.document.querySelectorAll('.btnVerde')
            const tabela_fav = this.document.querySelector('#fav')
            const pop_cout_fav = this.document.querySelector('#populacao-fav')
            const pais_fav = this.document.querySelector('#pais-fav')
            var pop_fav = 0
            var count_pais_fav = 0

            btnVerde.forEach(e => {
                e.addEventListener('click', elemento => {
                    var botao = elemento.target
                    if (botao.classList == "btnVerde") {
                        botao.classList = "btnVermelho"
                        botao.innerHTML = "-"

                        var pais_favorito = botao.parentNode
                        pais_favorito.classList = "pais_fav"
                        tabela_fav.appendChild(pais_favorito)
                        pop_fav += parseInt(pais_favorito.children[2].children[1].textContent.replace(/\./g, ''), 10)
                        count_pais_fav += 1
                        paises -= 1
                        pais_fav.textContent = `Países (${count_pais_fav})`
                        pop_cout_fav.textContent = `População ${pop_fav.toLocaleString()}`
                        numeros(dados, pop_fav, paises)

                        let tds = Array.from(document.querySelectorAll('#fav td'))
                        let tr = this.document.querySelector('#fav')
                        tds = Array.from(tds)
                        var primeirosDois = tds.splice(0, 2)
                        tds.sort(function(a, b) {
                            var textoA = a.children[2].children[0].textContent
                            var textoB = b.children[2].children[0].textContent
                            return textoA.localeCompare(textoB)
                        })
                        var resultado = primeirosDois.concat(tds)
                        tr.innerHTML = ''
                        resultado.forEach(function(td) {
                            tr.appendChild(td)
                        })
                    } else {
                        var botao = elemento.target
                        const tr = document.querySelector('.inner-table')
                        botao.classList = "btnVerde"
                        botao.innerHTML = "+"

                        var pais_favorito = botao.parentNode
                        tr.appendChild(pais_favorito)
                        pop_fav -= parseInt(pais_favorito.children[2].children[1].textContent.replace(/\./g, ''), 10)
                        count_pais_fav -= 1
                        paises += 1
                        pais_fav.textContent = `Países (${count_pais_fav})`
                        pop_cout_fav.textContent = `População ${pop_fav.toLocaleString()}`
                        numeros(dados, pop_fav, paises)
                        mostraDados(dados, i)
                    }
                })
            })
        })
    }).catch(erro=>{
       console.log(erro+" erro na requisição")
    })

   function mostraDados(dados, i) {
       const tr = document.querySelector('.inner-table')
       const td = document.createElement('td')
       td.classList = "paises-normais"
       var tds = Array.from(document.querySelectorAll('#tab-1 td'))
       tds = Array.from(tds)
       var primeirosDois = tds.splice(0, 2)
       tds.sort(function(a, b) {
            var textoA = a.children[2].children[0].textContent
            var textoB = b.children[2].children[0].textContent
            return textoA.localeCompare(textoB);
       })
        var resultado = primeirosDois.concat(tds)
        tr.innerHTML = ''
        resultado.forEach(function(td) {
            tr.appendChild(td)
        })
        td.innerHTML = `<button class="btnVerde">+</button> <div class="bandeira" style="background-image:url(${dados[i].flag})"></div> <div><h4>${dados[i].name}</h4> <h4 id="num_populacao">${dados[i].population.toLocaleString()}</h4> </div>` 
        tr.appendChild(td)
    }

    function numeros(dados, fav, paises) {
        var populacao = document.querySelector('#populacao')
        var totalPopulacao = 0

        dados.forEach(element => {
            totalPopulacao += element.population
        })

        totalPopulacao = totalPopulacao - fav

        this.document.querySelector('#pais').textContent = `Países (${paises})`
        populacao.textContent = `População ${totalPopulacao.toLocaleString()}`
    }
});