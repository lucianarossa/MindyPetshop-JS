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

    const cat = arrayProductos.map(producto => producto.tipo);
    console.log(cat)
    const catSet = new Set(cat);
    const categorias = [...catSet];
    console.log(categorias); // VARIABLE PARA CREAR LOS CHECKBOX

    //IMPRESION DE LOS CHECKBOX

    function crearCheckbox() {
        let templateHTML = "";
        categorias.forEach(tipo => {
            templateHTML += ` 
                              <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" value="${tipo}">
                              <label class="btn btn-outline-primary" for="btncheck1">${tipo}</label>`

        })
        document.getElementById("checkBox").innerHTML = templateHTML
    }

    crearCheckbox()

    console.log(arrayProductos[0].tipo)

    //CREAR FUNCION PARA IMPRIMIR PRODUCTOS DE FARMACIA

    function crearCartas() {
        templateCartas = ""
        arrayProductos.forEach(producto => {
            templateCartas += `<div class="card" style="width: 18rem;">
                                        <img src="${producto.imagen}" class="card-img-top" alt="...">
                                      <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <a href="#" class="btn btn-primary">Compra</a>
                                      </div>
                                   </div>`


        })
        document.getElementById("cartaFarmacia").innerHTML = templateCartas

    }
    crearCartas()


















    // AL ARRAY DE CATEGORIAS LE PUSHEAMOS LOS PRODUCTOS CORRESPONDIENTES A ESA CATEGORIA.

    // const arrayCategorias = [];
    // categorias.map(categoria =>
    //     arrayCategorias.push({
    //         tipo: categoria,
    //         producto: arrayProductos.filter(producto => producto.tipo === categoria),
    //     }));
    // console.log(arrayCategorias);

    // arrayTiposProductos = [];
    // arrayCategorias.map(datos =>
    //     arrayTiposProductos.push({
    //             descripcion: datos.producto.map(item => item.descripcion),
    //             imagen: datos.producto.map(item => item.imagen),
    //             nombre: datos.producto.map(item => item.nombre),
    //             precio: datos.producto.map(item => item.precio),
    //             stock: datos.producto.map(item => item.stock),
    //             tipo: datos.producto.map(item => item.tipo),
    //             __v: datos.producto.map(item => item.__v),
    //             _id: datos.producto.map(item => item._id),

    //         }

    //     )
    // )
    // console.log(arrayTiposProductos)


















}
getData()