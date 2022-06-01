async function getData() {
    const objetoPrincipal = await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
    const arrayProductos = objetoPrincipal.response;
    guardarTodosLosProductos(arrayProductos);

    let arrayStock = arrayProductos.filter(e => e.stock < 4);

    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA
    crearCartas(arrayStock, "cartaIndex");
    actualizarCarrito();
}


getData()