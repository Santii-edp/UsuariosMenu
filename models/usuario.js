const { v4: uuidv4 } = require('uuid'); // Importar uuid solo una vez

class Usuario {
    constructor(nombre, apellido, telefono, email) {
        this.id = uuidv4();  // Genera un ID único usando uuid
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
    }
}

module.exports = Usuario;
