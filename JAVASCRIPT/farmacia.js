let objetoPrincipal;

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => objetoPrincipal = json);
    let todaLaApi = objetoPrincipal
    console.log(todaLaApi)
    let arrayProductos = todaLaApi.response
    console.log(arrayProductos)


    let arrayMedicamentos = arrayProductos.filter(e => e.tipo === "Medicamento")
    console.log(arrayMedicamentos)

    //SEARCH

    var searchText = "";
    const searchInput = document.getElementById("search");

    //A LA CONSTANTE QUE ALOJA EL ELEMENTO SEARCH, LE APLICO UN ESCUCHADOR DE EVENTOS TIPO "KEYUP" CON UNA FUNCION DE ALOJAR EL VALOR DEL EVENTO.
    //LUEGO LLAMO A LA FUNCION EVENTOS FILTRADOS QUE SERA LA ENCARGADA DE MOSTRAR LAS TARJETAS CORRESPONDIENTES.

    searchInput.addEventListener("keyup", (evento) => {
        searchText = evento.target.value;
        productosFiltrados();
    });

    function productosFiltrados() {
        let datos = [];
        if (searchText !== "") {
            datos.push(...arrayMedicamentos.filter(producto => producto.nombre.toLowerCase().includes(searchText.trim().toLowerCase()) || producto.tipo.toLowerCase().includes(searchText.trim().toLowerCase())));
        } else {
            datos.push(...arrayMedicamentos);
        }
        crearCartas(datos);
    }
    productosFiltrados();


    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA

    function crearCartas(array) {
        templateCartas = ""
        if (array.length !== 0) {
            array.forEach(producto => {
                templateCartas += `<div class="card" ">
                                        <img src="${producto.imagen}" class="card-img-top" style="height: 254px" alt="...">
                                      <div class="card-body height: 200px">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">$ ${producto.precio}</p>
                                        <div >
                                        <a href="./detalle.html?id=${producto._id}" class="btn btn-secondary">Ver mas</a>
                                        <button class="btn btn-secondary">Comprar</button>
                                        </div>
                                      </div>
                                   </div>`


            })
            document.getElementById("cartaFarmacia").innerHTML = templateCartas
        } else {
            document.getElementById("cartaFarmacia").innerHTML = `<img class="container" style="width:55%" src="../IMAGES/MINDYNOENCONTRAMOS.png" />`
        }

    }



}
getData()