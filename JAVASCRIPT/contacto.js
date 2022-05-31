let comentario=document.getElementById("comentarios")
let templateHTML=""
function mostrarcontacto(){
    
    templateHTML+=`
    <div class="formulario">
        <form action="" method="get">
            <h1 class="tituloCont">Contacto</h1>
            <fieldset>
            <label for="Nombre:">Nombre:</label>
            <input type="text"  name="Nombre" id="Nombre:">
        </fieldset>
        <fieldset>
            <label for="Apellido:">Apellido:</label>
            <input type="text"  name="Apellido" id="Apellido:">
        </fieldset>
        <fieldset>
            <label for="Telefono:">Telefono:</label>
            <input type="text"  name="Telefono" id="Telefono:">
            </fieldset>
            <fieldset class="mover-radio">
            <p>¿Que mascota tienes?</p>
                    <select name="" id="">
                        <option value="">¡Selecciona tu mascota!</option>
                        <option value="">Perro</option>
                        <option value="">Gato</option>
                        <option value="">Conejo</option>
                        <option value="">Otros...</option>
                    </select>
        </fieldset>
        <legend>Comentarios</legend>
        <textarea name="Comentarios" id="comentarios"></textarea>
    <fieldset>
        <input type="submit" id="comentarios-submit">
    </fieldset>
        </form>
    </div>
<div class="d-flex flex-column align-items-center justify-content-center">
    <h3 class="tituloMap">Aqui podes encontrarnos</h3>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.6871004428513!2d-58.432572384236636!3d-34.6120729654484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca429815227f%3A0x5d302e497c2cda87!2sR%C3%ADo%20de%20Janeiro%20300%2C%20C1405CCB%20CABA%2C%20Argentina!5e0!3m2!1ses-419!2scl!4v1653931633998!5m2!1ses-419!2scl" width="350" height="350" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>    
</div>
    `
    document.querySelector("#contacto").innerHTML=templateHTML
}
mostrarcontacto()






let enviar = document.getElementById("comentarios-submit")
enviar.addEventListener("click", (event) => {
    event.preventDefault()
    Swal.fire(
        'Muchas gracias por escribirnos,',
        'Ya hemos enviado tu información.',
        'success'
      )
    })
    