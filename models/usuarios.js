const inquirer = require('inquirer');
const { guardarDB, leerDB } = require('../helpers/guardarArchivo');
const Usuario = require('./usuario');

class Usuarios {
    _listado = {};

    get listadoArr() {
        return Object.values(this._listado);
    }

    constructor() {
        const data = leerDB();
        if (data) {
            data.forEach((usuario) => {
                this._listado[usuario.id] = new Usuario(usuario.nombre, usuario.apellido, usuario.telefono, usuario.email);
                this._listado[usuario.id].id = usuario.id; // Mantén el ID original
            });
        }
    }

    obtenerUsuarioPorId(id) {
        return this._listado[id] || null; // Retorna el usuario si existe, o null si no se encuentra
    }

    crearUsuario(nombre, apellido, telefono, email) {
        const usuario = new Usuario(nombre, apellido, telefono, email);
        this._listado[usuario.id] = usuario;
        this.guardarUsuarios();
    }

    async eliminarUsuario(id) {
        // Verificar si hay usuarios registrados
        if (this.listadoArr.length === 0) {
            console.log('No hay usuarios registrados para eliminar.');
            return;
        }

        if (this._listado[id]) {
            // Confirmar eliminación del usuario
            const confirmacion = await inquirer.default.prompt([
                {
                    type: 'confirm',
                    name: 'confirmar',
                    message: `¿Estás seguro de que deseas eliminar el usuario con ID: ${id}?`,
                    default: false,
                },
            ]);

            if (confirmacion.confirmar) {
                delete this._listado[id]; // Elimina el usuario por ID
                this.guardarUsuarios(); // Guarda los cambios en el archivo
                console.log(`Usuario con ID: ${id} eliminado.`);
            } else {
                console.log('Eliminación de usuario cancelada.');
            }
        } else {
            console.log('Usuario no encontrado.');
        }
    }

    guardarUsuarios() {
        const data = this.listadoArr.map(({ id, nombre, apellido, telefono, email }) => ({
            id,
            nombre,
            apellido,
            telefono,
            email
        }));
        guardarDB(data);
    }

    listarUsuariosCompletos() {
        return this.listadoArr.filter((usuario) =>
            usuario.nombre && usuario.apellido && usuario.telefono && usuario.email
        );
    }

    listarUsuariosIncompletos() {
        return this.listadoArr.filter((usuario) =>
            !usuario.nombre || !usuario.apellido || !usuario.telefono || !usuario.email
        );
    }
}

module.exports = Usuarios;
