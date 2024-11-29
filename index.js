const { menu,volverAlMenu, leerInput, mostrarUsuarios, seleccionarUsuario, pause } = require('./helpers/menu');
const Usuarios = require('./models/usuarios');

const principal = async () => {
    let opt = '0';
    const usuarios = new Usuarios();

    do {
        opt = await menu();

        switch (opt) {
            case '1': // Crear nuevo usuario
                const nombre = await leerInput('Nombre: ');
                const apellido = await leerInput('Apellido: ');
                const telefono = await leerInput('Teléfono: ');
                const email = await leerInput('Email: ');
                usuarios.crearUsuario(nombre, apellido, telefono, email);
                console.log('Usuario creado exitosamente!');
                break;
            
            case '2': // Mostrar todos los usuarios registrados
                console.log('\nTodos los usuarios registrados:\n');
                mostrarUsuarios(usuarios.listadoArr); // Muestra todos los usuarios
                break;

            case '3': // Listar usuarios completos
                console.log('\nUsuarios con información completa:\n');
                mostrarUsuarios(usuarios.listarUsuariosCompletos());
                break;

            case '4': // Listar usuarios incompletos
                console.log('\nUsuarios con información incompleta:\n');
                mostrarUsuarios(usuarios.listarUsuariosIncompletos());
                break;

            case '5': // Editar usuario
                const idEditar = await seleccionarUsuario(usuarios.listadoArr); // Ahora selecciona de todos los usuarios
                const usuarioEditar = usuarios.obtenerUsuarioPorId(idEditar);

                if (usuarioEditar) {
                    const nuevoNombre = await leerInput(`Nuevo nombre (actual: ${usuarioEditar.nombre}): `);
                    const nuevoApellido = await leerInput(`Nuevo apellido (actual: ${usuarioEditar.apellido}): `);
                    const nuevoTelefono = await leerInput(`Nuevo teléfono (actual: ${usuarioEditar.telefono}): `);
                    const nuevoEmail = await leerInput(`Nuevo email (actual: ${usuarioEditar.email}): `);

                    // Actualizamos los valores si no se dejaron en blanco
                    usuarioEditar.nombre = nuevoNombre || usuarioEditar.nombre;
                    usuarioEditar.apellido = nuevoApellido || usuarioEditar.apellido;
                    usuarioEditar.telefono = nuevoTelefono || usuarioEditar.telefono;
                    usuarioEditar.email = nuevoEmail || usuarioEditar.email;

                    console.log('Usuario actualizado exitosamente!');
                } else {
                    console.log('Usuario no encontrado.');
                }
                break;

            case '6': // Eliminar usuario
                const idEliminar = await seleccionarUsuario(usuarios.listadoArr); // Selecciona de todos los usuarios
                if (idEliminar) {
                    usuarios.eliminarUsuario(idEliminar);
                    console.log('Usuario eliminado exitosamente!');
                } else {
                    console.log('Usuario no encontrado.');
                }
                break;

            case '7': // Salir
                console.log('chauuuu...');
                break;

            default:
                console.log('Opción no válida');
                break;
        }

        await pause();  
    } while (opt !== '7');
};

principal();
