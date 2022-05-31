let objetoPrincipal;

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json => objetoPrincipal = json);
    let todaLaApi = objetoPrincipal
    console.log(todaLaApi)
    let arrayProductos = todaLaApi.response
    console.log(arrayProductos)


    let arrayStock = arrayProductos.filter(e => e.stock < 4);
    console.log(arrayStock);



    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA

    function crearCartas() {
        templateCartas = ""

        arrayStock.forEach(producto => {
            templateCartas += `<div class="card">
                                        <img src="${producto.imagen}" class="card-img-top" style="height: 254px" alt="...">
                                      <div class="card-body height: 200px">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">Stock: ${producto.stock}</p>
                                        <div >
                                        <a href="./detalle.html?id=${producto._id}" class="btn btn-secondary">Ver mas</a>
                                        <button class="btn btn-secondary" onclick="getSeleccionados(${producto._id})">Comprar</button>
                                        </div>
                                      </div>
                                   </div>`
        })

        document.getElementById("cartaIndex").innerHTML = templateCartas

    }
    crearCartas()

}
getData()