var inputs = document.getElementsByClassName('registro__input');

for (var i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener('keyup', function () {

        if (this.value.length >= 1) {
            this.nextElementSibling.classList.add('fijar')

        } else {
            this.nextElementSibling.classList.remove('fijar')
        }
    });
}

function validar() {
    let valido = true;
    
    try {
        var correo, telefono, nombre_usuario, contraseña;
        correo = document.getElementById("correo").value;
        telefono = document.getElementById("telefono").value;
        nombre_usuario = document.getElementById("nombre_usuario").value;
        contraseña = document.getElementById("contraseña").value;
        terminos= document.getElementById("terminos").checked;
        expresion_correo= /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        expresion_telefono= /^\d{9}$/;
    
    
    
        if (correo === "" || telefono === "" || nombre_usuario === "" || contraseña === "" ) {
            alert("Todos los campos son obligatorios.");
            valido = false;
        }
        else if (correo.length > 100) {
            alert("El correo es muy largo.");
            valido = false;
        }
        else if (!expresion_correo.test(correo)) {
            alert("El correo no es valido.");
            valido = false;
        }
        else if (telefono.length > 9) {
            alert("El telefono es muy largo.");
            valido = false;
        }
        else if (!expresion_telefono.test(telefono)) {
            alert("El telefono no es valido.");
            valido = false;
        }
        
        else if (nombre_usuario.length > 20 || contraseña.length > 20) {
            alert("El nombre de usuario y contraseña max 20 caracteres.");
            valido = false;
        }
       
    
        if (!document.getElementById('terminos').checked) {
            alert("Porfavor acepta los terminos.");
            valido = false;
        }
  
    } catch(err) {
        console.log(err)
        valido = false;
    } finally {
        return valido;
        
    }
}