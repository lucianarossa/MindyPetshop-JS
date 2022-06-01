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

    let idCards = [];

    function agregarCarro(id) {
        if (localStorage.getItem("prodAgregados")) {
            idCards = JSON.parse(localStorage.getItem("prodAgregados"))
            console.log(idCards);
            if (idCards.includes(id)) {
                idCards = idCards.filter(i => i !== id)
            } else {
                idCards.push(id)
            }
            console.log(idCards);
        } else {
            idCards = [id]
        }
        localStorage.setItem("prodAgregados", JSON.stringify(idCards))
    }

    // document.getElementsByClassName("comprar").addEventListener("click", function(){
    //   agregarCarro();
    // });

    function detalle() {
        var id = location.search.split(`?id=`);
        var idSeleccionado = id[1];
        var producto = arrayProductos.find(producto => {

            return producto._id == idSeleccionado

        })

        var templateCartas = `        <div class="card mb-3">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button class="btn btn-secondary comprar" onclick="comprar('${producto._id}')" id="${producto.id}">Comprar</button>
        </div>
      </div>
      `

        document.getElementById("cartDetalle").innerHTML = templateCartas
    }

    detalle()
    actualizarCarrito();



}
getData()