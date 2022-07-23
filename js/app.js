function Seguro(marca, year, tipo){
   this.marca = marca;
   this.year = year; 
   this.tipo = tipo; 
}

Seguro.prototype.CotizarSeguro = function(){
  /*
  1 = Americano > 1.15
  2 = Asiatico > 1.05
  3 = Europeo > 1.45
  */
 let cantidad; 
 const base = 2000; 
  switch (this.marca) {
    case '1':
      cantidad = base * 1.15; 
      break;

    case '2':
      cantidad = base * 1.05; 
      break;  
    case '3':
      cantidad = base * 1.45; 
      break;

    default:
        break;
  }

  //leer año, dependiendo el año su valor reduce un 3%
  const diferencia = new Date().getFullYear() - this.year; 
  cantidad -= ((diferencia * 3) * cantidad) / 100; 

  if(this.tipo === 'basico'){
   cantidad *= 1.30;
  }else{
    cantidad *= 1.50;
  }
 
  return cantidad;


}


function UI(){}


UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(); 
    min = max - 20; 

    const SelectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i; 
        option.textContent = i; 
        SelectYear.appendChild(option); 

    }
}
UI.prototype.mostrarMensaje = (mensaje, tipo) =>{
    const div = document.createElement('DIV');
    if(tipo === 'error'){
      div.classList.add('error');
    }else{
      div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10'); 
    div.textContent = mensaje; 
    //Insertar en HTML
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
      div.remove(); 
    }, 2000);
}

UI.prototype.MostrarResultado = (seguro, total) =>{
  const div = document.createElement('DIV');
  div.classList.add('mt-10'); 
  let marcaTexto;
  switch (seguro.marca) {
    case '1':
      marcaTexto = 'Americano'
      break;
    case '2':
      marcaTexto = 'Asiatico'
      break;  
    case '3':
      marcaTexto = 'Europeo'
      break;

    default:
        break;
  }

  div.innerHTML = `
      <p class="header">Tu Resumen</p>
      <p class="font-bold">Marca: <span class = "font-normal">${marcaTexto}</span></p>
      <p class="font-bold">Año: <span class = "font-normal">${seguro.year}</span></p>
      <p class="font-bold">Tipo: <span class = "font-normal">${seguro.tipo}</span></p>
      <p class="font-bold">Total: <span class = "font-normal">${total}</span></p>
  `;

  const resultadoDiv = document.querySelector('#resultado'); 
 
  //mostrar Sppiner 
  const spinner = document.querySelector('#cargando'); 
  spinner.style.display = 'block'; 
  setTimeout(() => {
    spinner.style.display = 'none'; 
    resultadoDiv.appendChild(div); 
  }, 2100);


}

const ui = new UI(); 

document.addEventListener('DOMContentLoaded', () => {
       ui.llenarOpciones(); 
}); 

eventListeners(); 

function eventListeners(){
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro); 
}

function cotizarSeguro(e){
  e.preventDefault(); 

  const marca = document.querySelector('#marca').value;
  const year = document.querySelector('#year').value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if(marca === '' || year === '' || tipo === ''){
   ui.mostrarMensaje('Todos los Campos son Obligatorios', 'error');
   return; 
  }
  ui.mostrarMensaje('Cotizando', 'exito');
  //Ocultar Cotizaciones Previas 
  const resultados = document.querySelector('#resultado div');
  if(resultados != null){
     resultados.remove(); 
  }
  //Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.CotizarSeguro();
  
  ui.MostrarResultado(seguro, total);
  

  
}

