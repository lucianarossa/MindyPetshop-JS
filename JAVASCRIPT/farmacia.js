let objetoPrincipal;

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => objetoPrincipal = json);
    let todaLaApi = objetoPrincipal
    console.log(todaLaApi)
    let arrayProductos = todaLaApi.response
    guardarTodosLosProductos(arrayProductos);
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
        crearCartasFiltradas(datos);
    }
    productosFiltrados();


    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA

    function crearCartasFiltradas(array) {
        templateCartas = ""
        if (array.length !== 0) {
            crearCartas(array, "cartaFarmacia");
            actualizarCarrito();
        } else {
            document.getElementById("cartaFarmacia").innerHTML = `<img class="container" style="width:55%" src="../IMAGES/MINDYNOENCONTRAMOS.png" />`
        }

    }

    crearCartas(arrayMedicamentos, "cartaFarmacia");
    actualizarCarrito();
}
getData()