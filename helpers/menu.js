var colors = require('colors');
var inquirer = require('inquirer');
const usuarios = [];
const Table = require('cli-table3');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoge la opción de tu preferencia',
    choices: [
        {
            value: '1',
            name: `${'1.'.red} Crear usuario`,
        },
        {
            value: '2',
            name: `${'2.'.red} Listar usuarios`,
        },
        {
            value: '3',
            name: `${'3.'.red} Listar usuarios completos`,
        },
        {
            value: '4',
            name: `${'4.'.red} Listar usuarios incompletos`,
        },
        {
            value: '5',
            name: `${'5.'.red} Editar usuario`,
        },
        {
            value: '6',
            name: `${'6.'.red} Eliminar usuario`,
        },
        {
            value: '7',
            name: `${'7.'.red} Salir`,
        }
    ]
};

const menu = async () => {
    console.clear();
    console.log('============================================='.blue);
    console.log('=         Bienvenido al menú de usuarios    ='.yellow);
    console.log('============================================='.blue);

    const { options } = await inquirer.default.prompt(questions);
    return options;
};

const volverAlMenu = async () => {
    const { continuar } = await inquirer.default.prompt([
        {
            type: 'confirm',
            name: 'continuar',
            message: '¿Quieres volver al menú principal?',
            default: true,
        }
    ]);

    if (!continuar) {
        console.log('Adiós!');
        process.exit(0);  // Sale del programa
    }
};

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'valor',
            message,
            validate(value) {
                if (value.length < 0) {
                    return 'sin valor';
                }
                return true;
            }
        }
    ];

    const { valor } = await inquirer.default.prompt(question);
    return valor;
};

const mostrarUsuarios = (usuarios) => {
    const table = new Table({
        head: ['#', 'Nombre', 'Apellido', 'Teléfono', 'Email'],
        colWidths: [5, 20, 20, 20, 25]
    });

    usuarios.forEach((usuario, i) => {
        table.push([i + 1, usuario.nombre, usuario.apellido, usuario.telefono, usuario.email]);
    });

    console.log(table.toString());
};

const seleccionarUsuario = async (usuarios) => {
    const choices = usuarios.map((usuario, i) => ({
        value: usuario.id,
        name: `${(i + 1).toString().green}. ${usuario.nombre} ${usuario.apellido} - ${usuario.telefono} - ${usuario.email}`,
    }));

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciona el usuario:',
            choices,
        },
    ];

    const { id } = await inquirer.default.prompt(preguntas);
    return id;
};

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'enter'.green} para continuar`
        }
    ];
    await inquirer.default.prompt(question);
};

const leerEstado = async () => {

    const seleccionarEstado = [
        {
            type: 'list',
            name: 'estado',
            message: 'Selecciona el estado de la tarea',
            choices: [
                {
                    value: 'Completada',
                    name: `${'1.'.green}${'Completada'.green}`,
                },
                {
                    value: 'Pendiente',
                    name: `${'2.'.red}${'Pendiente'.yellow}`,
                },
            ],
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingresar un valor';
                }
                return true;
            }
        }
    ];

    const { estado } = await inquirer.default.prompt(seleccionarEstado);
    return estado;
};

module.exports = {
    menu,
    leerInput,
    mostrarUsuarios,
    seleccionarUsuario,
    volverAlMenu,
    pause
};
