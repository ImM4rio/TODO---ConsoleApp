require('colors');

// const { mostrarMenu, pausa } = require('./helpers/mensajes');

const { guardarDB, leerDB } = require( './helpers/guardarArchivo' );
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require( './models/tarea' );
const Tareas = require( './models/tareas' );



const main = async() =>{
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );

    }


    do {

        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );

                break;
        
            case '2':
                // Listar opcion
                //console.log( tareas._listado );
                
                tareas.listadoCompleto();
                break;

            case '3':
                // Listar completadas

                tareas.listarPendientesCompletadas();
                break;

            case '4':
                //Listar tareas pendientes

                tareas.listarPendientesCompletadas( false );
                break;

            case '5':
                // Completar tareas

                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                
                // console.log(ids);
                break;
           
            case '6':
                //Borrar tareas

                // Hay que esperar que la tarea async termine AWAIT!!!!
                const id = await listadoTareasBorrar( tareas.listadoArr );
                    if ( id !== '0' ){
                        const ok = await confirmar( '¿Está seguro?');
                        
                        if( ok ) {
                            tareas.borrarTarea( id );
        
                            console.log('Tarea borrada');
                        }

                    }
                    
                break;

            default:
                console.log('Estás dentro del default');
                break;
        }


        guardarDB( tareas.listadoArr );
        
        // console.log( {opt} );

        // const tareas = new Tareas();
        // const tarea = new Tarea('Comprar comida');
        
        // Crea un objeto con el id de la tarea y le pasa la tarea completa, es decir, para ese id la tarea es...
        //tareas._listado[ tarea.id ] = tarea;
        
        //console.log(tareas);
        
        await pausa();

        
        // if ( opt !== '0' ) await pausa();
 
    } while ( opt !== '0');


}

main();