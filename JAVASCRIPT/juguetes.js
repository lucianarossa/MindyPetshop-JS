let objetoPrincipal;

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => objetoPrincipal = json);
    let todaLaApi = objetoPrincipal
    console.log(todaLaApi)
    let arrayProductos = todaLaApi.response
    console.log(arrayProductos)

    // MAPEAMOS EL ARRAY PRINCIPAL Y CREAMOS UN NUEVO ARRAY CON LAS CATEGORIAS

    // 
    let arrayJuguetes = arrayProductos.filter(e => e.tipo === "Juguete")
    console.log(arrayJuguetes)

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
            datos.push(...arrayJuguetes.filter(producto => producto.nombre.toLowerCase().includes(searchText.trim().toLowerCase()) || producto.tipo.toLowerCase().includes(searchText.trim().toLowerCase())));
        } else {
            datos.push(...arrayJuguetes);
        }
        crearCartas(datos);
    }
    productosFiltrados();


    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA

    function crearCartas(array) {
        templateCartas = ""
        if (array.length !== 0) {
            array.forEach(producto => {
                templateCartas += `<div class="card" style="width: 18rem;">
                                        <img src="${producto.imagen}" class="card-img-top" style="height: 254px" alt="...">
                                      <div class="card-body height: 200px">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">$ ${producto.precio}</p>
                                        <a href="#" class="btn btn-secondary">Ver mas</a>
                                      </div>
                                   </div>`


            })

            document.getElementById("cartaJuguetes").innerHTML = templateCartas
        } else {
            document.getElementById("cartaJuguetes").innerHTML = `<img class="container" style="width:55%" src="../IMAGES/MINDYNOENCONTRAMOS.png" />`
        }
    }



}
getData()