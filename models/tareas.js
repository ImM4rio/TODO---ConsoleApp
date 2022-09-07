const Tarea = require( "./tarea" );


class Tareas {

    _listado = {};

    // Getter para el array
    get listadoArr() {
        const listado = [];
        
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
            
        } ) 

        


        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){

        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray ( tareas = [] ) {

        // No regresa nada, cargar el _listado
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }


    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );
        
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();

        this.listadoArr.forEach( (tarea, i) => {

            const index = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${index} ${desc} :: ${estado}`);


        })

    }

    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;

        this.listadoArr.forEach( tarea => {

            const{ desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                ? completadoEn.green
                : 'Pendiente'.red;

            if( completadas ){
                if ( completadoEn ){
                    contador++;
                    console.log( `${(contador.toString() +'.').green} ${desc} :: ${estado}` );
    
                }

            }else{
                if ( !completadoEn ) {
                    contador ++;
                    console.log( `${(contador.toString() +'.').green} ${desc} :: ${estado}` );
                }
            }
              

        })

    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];

            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            
            }
        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;

            }
        })
    }

}

module.exports = Tareas;