let objetoPrincipal;

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => objetoPrincipal = json);
    let todaLaApi = objetoPrincipal
    let arrayProductos = todaLaApi.response
    guardarTodosLosProductos(arrayProductos);

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
        crearCartasFiltradas(datos);
    }
    productosFiltrados();


    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA

    function crearCartasFiltradas(array) {
        templateCartas = ""
        if (array.length !== 0) {
            crearCartas(array, "cartaJuguetes")
        } else {
            document.getElementById("cartaJuguetes").innerHTML = `<img class="container" style="width:55%" src="../IMAGES/MINDYNOENCONTRAMOS.png" />`
        }
    }

    crearCartas(arrayJuguetes, "cartaJuguetes");
    actualizarCarrito();
}
getData()