async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => objetoPrincipal = json);

    //DECLARAMOS TODAS LAS VARIABLES NECESARIAS

    let todaLaApi = objetoPrincipal
    console.log(todaLaApi)


    let arrayProductos = todaLaApi.response
    console.log(arrayProductos)

    let contenedorTienda = document.getElementById("contedorTienda")
    let vacio = []
    let local = [];
    var arraySeleccionados = []

    //FUNCION LOCAL STORE

    function getLocalStorage() {
        if (localStorage.getItem("seleccionados")) {
            arraySeleccionados = JSON.parse(localStorage.getItem("seleccionados"))
            let data = arrayProductos.filter(p => arraySeleccionados.include(p._id))
            mostrarCarrito(data)
        } else {
            arraySeleccionados = []
        }
    }

    getLocalStorage()

    function getSeleccionados(id) {
        if (localStorage.getItem("seleccionados")) {
            if (arraySeleccionados.includes(id)) {
                arraySeleccionados = arraySeleccionados.filter(idS => idS !== id)
            } else {
                arraySeleccionados.push(id)
            }
        } else {
            arraySeleccionados = [id]
        }
        localStorage.setItem("seleccionados", JSON.stringify(arraySeleccionados))
        getLocalStorage()
    }

    function mostrarCarrito(array) {
        contenedorTienda.innerHTML = ""
        array.forEach(e => {
            contenedorTienda.innerHTML += `<div class="row">
            <div class="col-8 d-flex justify-content-center ">
                <p>Producto</p>
            </div>
            <div class="col-4 d-flex justify-content-center  ">
                <p>Precio</p>
            </div>
        </div>
        <div class="row">
            <div class="col-8 d-flex flex-row border border-dark" id="dataProducto">
                <div> <img class="img-carrito"
                        src="${e.imagen}" alt="" style="width: 100px" ></div>
                <div class="d-flex flex-column justify-content-center">
                    <p>${e.nombre}</p>
                    <p>Stock :${e.stock}</p>
                </div>
            </div>
            <div class="col-4 d-flex flex-column justify-content-center align-items-center border border-dark"
                id="precioEliminar">
                <p>${e.precio}</p>
                <a href=""><i class="bi bi-trash"></i>Eliminar</a>
            </div>
        </div>`
        });
    }























}
getData()