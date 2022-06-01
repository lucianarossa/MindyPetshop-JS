function crearCartas(productos, idContenedor) {
    let templateCartas = ""

    productos.forEach(producto => {
        templateCartas += `
        <div class="card">
            <img src="${producto.imagen}" class="card-img-top" style="height: 254px" alt="...">
            <div class="card-body height: 200px">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Stock: ${producto.stock}</p>
            <div >
            <a href="./detalle.html?id=${producto._id}" class="btn btn-secondary">Ver mas</a>
            <button class="btn btn-secondary" onclick="comprar('${producto._id}')">Comprar</button>
            </div>
            </div>
        </div>
    `;
    })

    document.getElementById(idContenedor).innerHTML = templateCartas
}

function obtenerSeleccionados() {
    if (localStorage.getItem("seleccionados")) {
        const arraySeleccionados = JSON.parse(localStorage.getItem("seleccionados"))
        return arraySeleccionados;
    } else {
        return [];
    }
}

function guardarTodosLosProductos(productos) {
    localStorage.setItem("productos", JSON.stringify(productos))
}

function todosLosProductos() {
    if (localStorage.getItem("productos")) {
        const productos = JSON.parse(localStorage.getItem("productos"))
        return productos;
    } else {
        return [];
    }
}

function productosEnElCarro() {
    const arraySeleccionados = obtenerSeleccionados();
    let productos = todosLosProductos().filter((p) => arraySeleccionados.includes(p._id));
    return productos;
}

function actualizarCarrito() {
    let contenedorTienda = document.getElementById("contedorTienda")

    contenedorTienda.innerHTML = `<div class="row">
            <div class="col-8 d-flex justify-content-center ">
                <p>Producto</p>
            </div>
            <div class="col-4 d-flex justify-content-center  ">
                <p>Precio</p>
            </div>
        </div>`;

    const array = productosEnElCarro();
    if (array.length === 0) {
        contenedorTienda.innerText = "Vacío";
    } else {
        array.forEach(e => {
            contenedorTienda.innerHTML += `
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
                <button class="btn btn-danger" onclick="borrarDelCarro('${e._id}')"><i class="bi bi-trash"></i>Eliminar</button>
            </div>
        </div>`
        });
        contenedorTienda.innerHTML += `
        <button class="btn btn-danger" onclick="vaciarCarro()">Vaciar</button>
        <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>
        `
    }
}

function borrarDelCarro(id) {
    let arraySeleccionados = obtenerSeleccionados();
    arraySeleccionados = arraySeleccionados.filter(idS => idS !== id)
    localStorage.setItem("seleccionados", JSON.stringify(arraySeleccionados))
    actualizarCarrito();
}

function comprar(id) {
    let arraySeleccionados = obtenerSeleccionados();
    if (!arraySeleccionados.includes(id)) {
        arraySeleccionados.push(id)
        localStorage.setItem("seleccionados", JSON.stringify(arraySeleccionados))
        actualizarCarrito();
        Swal.fire(
            'Producto Agregado'
        )
    }
}

function vaciarCarro() {
    localStorage.removeItem("seleccionados");
    actualizarCarrito();
}

function finalizarCompra() {
    Swal.fire(
        'Felicitaciones',
        'Has terminado tu compra.',
        'success'
    )
    vaciarCarro();
}