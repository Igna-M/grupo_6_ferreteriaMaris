window.addEventListener("load", () => {

    const todosLosErrores = {
        fname:false,
        lname:false,
        user:false,
        email:false,
        birth_date:false,
        password:false,
        confirm_pass:false,
        file:false,
    }

    const alphanumeric = /^[A-ZÁÉÍÓÚÑa-záéíóúüñ0-9 ]+$/;
    const userMatch = /^[A-ZÁÉÍÓÚÑa-záéíóúüñ0-9_]+$/;
    const emailMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const dateMatch = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
    const passMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
    const fileMatch = /(.*?)\.(jpg|jpeg|png|gif)$/

    // // // // // // // // // // // // // // // //  

    let fname = document.querySelector("input#fname").value
    if (fname.length > 2 && alphanumeric.test(fname)){
        todosLosErrores.fname = true
    }

    let lname = document.querySelector("input#lname").value
    if (lname.length > 2 && alphanumeric.test(lname)){
        todosLosErrores.lname = true
    }

    let user = document.querySelector("input#user").value
    if (user.length > 2 && userMatch.test(user)){
        todosLosErrores.user = true
    }

    let email = document.querySelector("input#email").value
    if (emailMatch.test(email)){
        todosLosErrores.email = true
    }

    let birth_date = document.querySelector("input#birth_date").value
    let anno = Number(birth_date.substring(0, 4));
    if (dateMatch.test(birth_date)){
        if (anno > 1900 && anno < 2021){
            todosLosErrores.birth_date = true
        }
    }

    // // // // // // // // // // // // // // // //  

    document.querySelector("input#fname").addEventListener("keyup", function(e){

        let hayErrores = false
        let errorLargo = false
        let errorAlphaN = false
        let mensajeDeError

        if(this.value.length < 3){
            this.classList.add("con-errores");
            errorLargo = true
        } else {
            errorLargo = false
        }
        
        if (!alphanumeric.test(this.value)){
            errorAlphaN = true
        } else {
            errorAlphaN = false
        }

        if (errorLargo || errorAlphaN){
            hayErrores =true
        } else {
            hayErrores = false
        }

        if (errorLargo && errorAlphaN) {
            mensajeDeError = "<p>3 caracteres como mínimo</p> <p>Sólo caracteres alfanuméricos</p>"
        } else if (!errorLargo && errorAlphaN){
            mensajeDeError = "<p>Sólo caracteres alfanuméricos</p>"
        } else if (errorLargo && !errorAlphaN){
            mensajeDeError = "<p>3 caracteres como mínimo</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-fname").style.display = "block"
                if (errorLargo == true) {
                    document.querySelector("p#js-errores-fname").innerHTML = mensajeDeError
                }
                if (errorAlphaN == true) {
                    document.querySelector("p#js-errores-fname").innerHTML = mensajeDeError
                }
        } else {
            document.querySelector("p#js-errores-fname").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.fname = false
        } else {
            todosLosErrores.fname = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

document.querySelector("input#lname").addEventListener("keyup", function(e){

        let hayErrores = false
        let errorLargo = false
        let errorAlphaN = false
        let mensajeDeError

        if(this.value.length < 3){
            this.classList.add("con-errores");
            errorLargo = true
        } else {
            errorLargo = false
        }
        
        if (!alphanumeric.test(this.value)){
            errorAlphaN = true
        } else {
            errorAlphaN = false
        }

        if (errorLargo || errorAlphaN){
            hayErrores =true
        } else {
            hayErrores = false
        }

        if (errorLargo && errorAlphaN) {
            mensajeDeError = "<p>3 caracteres como mínimo</p> <p>Sólo caracteres alfanuméricos</p>"
        } else if (!errorLargo && errorAlphaN){
            mensajeDeError = "<p>Sólo caracteres alfanuméricos</p>"
        } else if (errorLargo && !errorAlphaN){
            mensajeDeError = "<p>3 caracteres como mínimo</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-lname").style.display = "block"
                if (errorLargo == true) {
                    document.querySelector("p#js-errores-lname").innerHTML = mensajeDeError
                }
                if (errorAlphaN == true) {
                    document.querySelector("p#js-errores-lname").innerHTML = mensajeDeError
                }
        } else {
            document.querySelector("p#js-errores-lname").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.lname = false
        } else {
            todosLosErrores.lname = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("input#user").addEventListener("keyup", function(e){

        let hayErrores = false
        let errorLargo = false
        let errorAlphaN = false
        let mensajeDeError

        if(this.value.length < 3){
            this.classList.add("con-errores");
            errorLargo = true
        } else {
            errorLargo = false
        }
        
        if (!userMatch.test(this.value)){
            errorAlphaN = true
        } else {
            errorAlphaN = false
        }

        if (errorLargo || errorAlphaN){
            hayErrores =true
        } else {
            hayErrores = false
        }

        if (errorLargo && errorAlphaN) {
            mensajeDeError = "<p>3 caracteres como mínimo</p> <p>Sólo caracteres alfanuméricos</p>"
        } else if (!errorLargo && errorAlphaN){
            mensajeDeError = "<p>Sólo caracteres alfanuméricos</p>"
        } else if (errorLargo && !errorAlphaN){
            mensajeDeError = "<p>3 caracteres como mínimo</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-user").style.display = "block"
                if (errorLargo == true) {
                    document.querySelector("p#js-errores-user").innerHTML = mensajeDeError
                }
                if (errorAlphaN == true) {
                    document.querySelector("p#js-errores-user").innerHTML = mensajeDeError
                }
        } else {
            document.querySelector("p#js-errores-user").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.user = false
        } else {
            todosLosErrores.user = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("input#email").addEventListener("keyup", function(e){

        let hayErrores = false
        let mensajeDeError

        if (!emailMatch.test(this.value)){
            hayErrores = true
        } else {
            hayErrores = false
        }

        if (hayErrores) {
            mensajeDeError = "<p>Debes introducir un email válido</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-email").style.display = "block"
            document.querySelector("p#js-errores-email").innerHTML = mensajeDeError
        } else {
            document.querySelector("p#js-errores-email").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.email = false
        } else {
            todosLosErrores.email = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("input#birth_date").addEventListener("input", function(e){

        let hayErrores = false
        let mensajeDeError

        if (!dateMatch.test(this.value)){
            hayErrores = true
        } else {
            if (Number(this.value.substring(0, 4)) > 2020 || Number(this.value.substring(0, 4)) < 1900){
                hayErrores = true
            } else {
                hayErrores = false
            }
        }

        if (hayErrores) {
            mensajeDeError = "<p>Debes introducir una fecha válida</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-birth_date").style.display = "block"
            document.querySelector("p#js-errores-birth_date").innerHTML = mensajeDeError
        } else {
            document.querySelector("p#js-errores-birth_date").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.birth_date = false
        } else {
            todosLosErrores.birth_date = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("input#password").addEventListener("keyup", function(e){

        let hayErrores = false
        let mensajeDeError

        if (!passMatch.test(this.value)){
            hayErrores = true
        } else {
            hayErrores = false
        }

        if (hayErrores) {
            mensajeDeError = "<p>Tu contraseña debe tener un mínimo de 8 caracteres,</p><p>una mayúscula, una minúscula, un número y un caracter especial</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-password").style.display = "block"
            document.querySelector("p#js-errores-password").innerHTML = mensajeDeError
        } else {
            document.querySelector("p#js-errores-password").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.password = false
        } else {
            todosLosErrores.password = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("input#confirm_pass").addEventListener("keyup", function(e){

        let pass = document.querySelector("input#password").value

        let hayErrores = false
        let mensajeDeError

        if (this.value != pass){
            hayErrores = true
        } else {
            hayErrores = false
        }

        if (hayErrores) {
            mensajeDeError = "<p>Las contraseñas no coinciden</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-confirm_pass").style.display = "block"
            document.querySelector("p#js-errores-confirm_pass").innerHTML = mensajeDeError
        } else {
            document.querySelector("p#js-errores-confirm_pass").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.confirm_pass = false
        } else {
            todosLosErrores.confirm_pass = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("input#file").addEventListener("change", function(e){

        let hayErrores = false
        let mensajeDeError
        
        if (!fileMatch.test(this.value)){
            hayErrores = true
        } else {
            hayErrores = false
        }

        if (hayErrores) {
            mensajeDeError = "<p>Los archivos permitisos son .jpg jpeg .png .gif</p>"
        } else {
            mensajeDeError = ''
        }

        if (hayErrores == true) {
            document.querySelector("p#js-errores-file").style.display = "block"
            document.querySelector("p#js-errores-file").innerHTML = mensajeDeError
        } else {
            document.querySelector("p#js-errores-file").style.display = "none"
            this.classList.remove("con-errores");
        }

        if (hayErrores){
            todosLosErrores.file = false
        } else {
            todosLosErrores.file = true
        }

    });

    // // // // // // // // // // // // // // // //  
    // / / // // // // // // // // // // // // // // 

    document.querySelector("form#form").addEventListener("change", function(e){

        var result = true;

        for (var i in todosLosErrores) {
        if (todosLosErrores[i] === false) {
            result = false;
            break;
            }
        }

        if (result == false){
            document.querySelector("p#js-errores-submit").style.display = "block"
            document.querySelector("p#js-errores-submit").innerHTML = "Todavía hay errores en el formulario"
        } else {
            document.querySelector("p#js-errores-submit").style.display = "none"
        }

    });

    // Botón de Submit chequea si hay errores antes de hacer el envío
    document.querySelector("button#submit").addEventListener("click", function(e){
        
        var result = true;

        for (var i in todosLosErrores) {
        if (todosLosErrores[i] === false) {
            result = false;
            break;
            }
        }

        if (result == false){
            e.preventDefault()
            document.querySelector("p#js-errores-submit").style.display = "block"
            document.querySelector("p#js-errores-submit").innerHTML = "Todavía hay errores en el formulario"
        } 
    });

})