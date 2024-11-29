const fs = require('fs');
const path = require('path');

// Ruta donde se guardarán los datos
const archivo = path.join(__dirname, '../db/data.txt');

// Función para guardar los datos en un archivo
const guardarDB = (data) => {
    try {
        // Convierte los datos en formato JSON y los guarda en el archivo
        fs.writeFileSync(archivo, JSON.stringify(data, null, 2));
        console.log('Datos guardados exitosamente!');
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
};

// Función para leer los datos del archivo
const leerDB = () => {
    try {
        // Verifica si el archivo existe
        if (!fs.existsSync(archivo)) {
            console.warn('El archivo no existe, retornando array vacío');
            return []; // Retorna un array vacío si el archivo no existe
        }

        // Lee y parsea el contenido del archivo
        const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        if (!Array.isArray(data)) {
            console.error('El formato de los datos en el archivo no es un arreglo');
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error al leer o parsear el archivo:', error);
        return []; // Retorna array vacío si ocurre un error
    }
};

// Función para verificar si el archivo de base de datos existe
const archivoExiste = () => {
    return fs.existsSync(archivo);
};

module.exports = {
    guardarDB,
    leerDB,
    archivoExiste
};
