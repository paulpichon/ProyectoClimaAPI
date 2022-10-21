//246.- primeros pasos con la APP

//variables
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//window -> load = es muy similar a DOMCONTENTLOADED
window.addEventListener('load', () => {
    //listener al formulario
    formulario.addEventListener('submit', buscarClima);
});

//funcion
function buscarClima( e ) {
    //prevenir la accion por defecto
    e.preventDefault();

    //validar el formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    //validar que no esten vacios los input
    if ( ciudad === '' || pais === '' ) {
        //LLAMAR FUNCION PARA MOSTRAR MENSAJE
        mostrarError('AMBOS CAMPOS SON OBLIGATORIOS');

        return;
    }

    //consultar la API
    consultarAPI(ciudad, pais);

}

//funcion para mostrar alerta
function mostrarError( mensaje ) {

    //validar que no hayan alerta previas para no mostrar mas de 1 alerta
    const alertas = document.querySelector('.bg-red-100');

    if ( !alertas ) {
        //construir el HTML
        const alerta = document.createElement('div');
        //agregar clases de estilo
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        //innerhtml
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${ mensaje } </span>
        `;
        //renderizar
        container.appendChild( alerta );
        //quitar la alerta 
        setTimeout(() => {
            //quitar alerta
            alerta.remove();
        }, 5000);
        
    }

}
//funcion para consultar API
function consultarAPI(ciudad, pais) {
    //ID de la API , esta ID se obtiene del sitio web https://home.openweathermap.org/api_keys
    const appId = 'baff472b86ea5101b23295870499945a';
    //URL desde donde se haran las peticiones
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    //fetch()
    fetch( url )
        .then( respuesta => respuesta.json() )
        .then( datos => {
            //limpiar html anterior
            limpiarHTML();
            //mostrar mensaje de ciudad no encontrada en caso que le codigo se 404
            if (datos.cod === '404') {
                mostrarError('CIUDAD NO ENCONTRADA');
                return;
            }

            //imprime la respuesta en el HTML
            mostrarClima( datos );

        });

}


//funcion que muestra datos de la respuesta
function mostrarClima( datos ) {

    //destructuring de un objeto dentro de otro objeto
    const { main: { temp, temp_max, temp_min } } = datos;
    //temperatura normal 
    const centigrados = kelvinACentigrados( temp );
    
    const actual = document.createElement('p');
    actual.innerHTML = `${ centigrados } &#8451`;
    actual.classList.add('font-bold', 'text-6xl');
    //insertar actual a resultadoDiv
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild( actual );
    //renderizar
    resultado.appendChild( resultadoDiv );
}
//funcion para convertir grados kelvin a grados celcius
//se puede tener aqlgo asi o tambien como arrow function
/*function kelvinACentigrados( grados ) {
    //retornamos la operacion
    return parseInt( grados - 273.15 );
}*/
//de esta forma queda mucho mas corta y sencillo
const kelvinACentigrados = grados => parseInt( grados - 273.15 );

//limpiar html enterior
function limpiarHTML() {
    while ( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild );
    }
}