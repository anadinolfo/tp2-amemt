'use strict'

const overlayEl = document.getElementsByClassName('overlay')[0];
const overlayEd = document.getElementsByClassName('overlay')[1];
const overlayAdd = document.getElementsByClassName('overlay')[2];
const overlayProgressBar = document.getElementsByClassName('overlay')[3];


////

function filtrar() {
    // Declare variables 
    var input, filter, table, tr, td, i, j, visible;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabla");
    tr = table.getElementsByTagName("tr");
  
    // for a partir de la fila dos, asi deja el header
    for (i = 1; i < tr.length; i++) {
      visible = false;
      /* Obtenemos todas las celdas de la fila, no sólo la primera */
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          visible = true;
        }
      }
      if (visible === true) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }



//**************    funcion progres    *********************//
function move() {
    overlayProgressBar.classList.remove('display-none'); //muestra modal progress bar
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);

    function frame() {
        if (width >= 100) {
            clearInterval(id);
            overlayProgressBar.classList.add('display-none');  
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

//**************    showModal Agregar    *********************//
function showModalAdd () {
    const btnAceptarAdd = document.getElementById('btnAceptarAdd');
    const btnCancelarAdd = document.getElementById('btnCancelarAdd');

    overlayAdd.classList.remove('display-none'); //muestra modal
    btnCancelarAdd.onclick = () => {
        overlayAdd.classList.add('display-none');
        console.log("entro a showmodal agregar, y cancele");
    }
    const nombre = document.getElementById('addNombre');
    const tipoAlo= document.getElementById('addTipoAlojamiento');
    const cantidad= document.getElementById('addCantidad');
    const  precio= document.getElementById('addPrecio');
  //codigo.value =  row.childNodes[0].innerText;   
        
    nombre.value = null;     // no pude agregar el codigo, por eso hay un 22, pero lo voy a hacer por q se me rompia pero lo voya agregar
    tipoAlo.value = null;
    cantidad.value = null;
    precio.value = null;
    
    var table = document.getElementById("tabla");
    btnAceptarAdd.onclick = () => {
            move();              // progress bar luego de aceptar     
            const nuevaFila = [ [22],
                            [nombre.value],
                            [tipoAlo.value],
                            [cantidad.value],
                            [precio.value]
                            ] ; 
                                    //obtengo la tabla
            table.appendChild(createRow(nuevaFila))
                  
           
            overlayAdd.classList.add('display-none');
           
            console.log("entro a showmodal add,agregue ");
          
         
    };

};

function Agregar(body) {
    
    var row = body.parentNode; //busco un nivel para arriba y asi obtengo el elemento tr mas cercano al boton en donde hice click
    showModalAdd();    //showModalAdd(row);
};

//*********************        fin agregar  fila     *******************//


//**************    showModalE      para eliminar fila    *******************//
function showModalEl(row) {
    const btnAceptarElim = document.getElementById('btnAceptarElim');
    const btnCancelar = document.getElementById('btnCancelar');

    overlayEl.classList.remove('display-none'); //muestra modal
    btnCancelar.onclick = () => {
        overlayEl.classList.add('display-none');
        console.log("entro a showmodal, cancele");
    }

    btnAceptarElim.onclick = () => {        
            //obtengo la tabla

            var table = document.getElementById("tabla");
            //borro la fila
            table.deleteRow(row.rowIndex);
            overlayEl.classList.add('display-none');
            console.log("entro a showmodal,elimine ");
       
    };
};


function Remove(button) {
    //Funcion que permite eliminar una fila de la tabla,
    //se le pasa como parametro el boton en el cual se hace click, 
    //y a partir de ahi busco la etiqueta tr mas cercana para eliminar
    //la funcion confirm, muestra un dialog preguntando si quiere eliminar
    //la funcion deleteRow, es una funcion en javascript que permite borrar una fila de la tabla

    var row = button.parentNode; //busco un nivel para arriba y asi obtengo el elemento tr mas cercano al boton en donde hice click
    showModalEl(row);
};
//*********************        fin remover fila     *******************//

//*********************        editar               *******************//
function showModalEd(row) {
    overlayEd.classList.remove('display-none'); //muestra modal
    const btnAceptarEditar = document.getElementById('btnAceptarEditar');
    const btnCancelarEd = document.getElementById('btnCancelarEd');
    btnCancelarEd.onclick = () => {
            overlayEd.classList.add('display-none');
            console.log("entro a showmodal boton edite, y cancele");
        }

    // console.log("row", row.innerText);
    // console.log("nodos?", row.children.length);
    //console.log("row val", row.childNodes);
    //console.log("Gnombre",row.childNodes);
    var nombre = document.getElementById('nombre');
    var tipoAlo= document.getElementById('tipoAlojamiento');
    var cantidad= document.getElementById('cantidad');
    var  precio= document.getElementById('precio');

    nombre.value = row.childNodes[1].innerText;
    tipoAlo.value = row.childNodes[2].innerText;
    cantidad.value = row.childNodes[3].innerText;
    precio.value = row.childNodes[4].innerText;

    btnAceptarEditar.onclick = () => {
        //obtengo la tabla
       
        var table = document.getElementById("tabla");
        row.childNodes[1].innerText = nombre.value;
        row.childNodes[2].innerText = tipoAlo.value ;
        row.childNodes[3].innerText =  cantidad.value ;
        row.childNodes[4].innerText  =  precio.value ;
        overlayEd.classList.add('display-none');
        console.log("entro a showmodal,edite ");
               
        move();              // progress bar luego de editar  
    };
};


function Edit(button) { ///editando
    var row = button.parentNode; //busco un nivel para arriba y asi obtengo el elemento tr mas cercano al boton en donde hice click
    showModalEd(row);
};

//************************************************************************************************************//

let createHeader = (claves) => {
    //claves es un array con los nombres de las claves de nuestro objeto --> []
    let theadEl = document.createElement("thead");
    let trEl = document.createElement("tr");
    //recorremos el arreglo de claves
    for (let i = 0; i < claves.length; i++) {
        //creamos un elemento th para cada clave
        let thEl = document.createElement("th");
        //cambiamos el innerHTML del th para que muestre cada clave
        thEl.innerHTML = claves[i];
        //agregamos el elemento th al elemento tr
        trEl.appendChild(thEl);

    }
    //agregamos el elemento tr al thead
    theadEl.appendChild(trEl);
    //agregamos el thead a nuestra tabla
    tableEl.appendChild(theadEl);
};

let createRow = (elemento) => {
    //elemento es el objeto que queremos mostrar en cada filaa --> 
    let codi11;
    let trEl = document.createElement("tr");
    //iteramos sobre las propiedades de nuestro objeto
    for (let clave in elemento) {
        //creamos un elemento td para cada propiedad
        let tdEl = document.createElement("td");
        //cambiamos su innerHTML para que muestre el valor de cada propiedad
        tdEl.innerHTML = elemento[clave];

        //agregamos el elemento td al elemento tr
        //me guardo el i por las dudas
        /* if (clave === 'codigo') {
            codi11 = elemento[clave];
            console.log("codi", codi11);
        }; //esta mal    no devuelve la posicion sino el codigo */

        trEl.appendChild(tdEl);

    }
    // agregare el boton eliminar fizzzzzz
    const buttonElim = document.createElement('button');
    buttonElim.type = 'button';
    buttonElim.innerText = 'Eliminar Fila';

    trEl.appendChild(buttonElim);


    ///////////////////// editar ///////
    // agregare el boton editar fila
    const buttonEd = document.createElement('button');
    buttonEd.type = 'button';
    buttonEd.innerText = 'Editar';

    trEl.appendChild(buttonEd);

    // seteo un attributo en el boton, de onclick, esta forma no se ejecuta hasta que no se haga click
    //y llamo a la funcion Remove, a la cual le paso la variable this, que representa el boton en el cual se hizo click
    buttonElim.setAttribute("onclick", "Remove(this);");
    buttonEd.setAttribute("onclick", "Edit(this);");
    return trEl;
};


let createBody = (elementos) => {
    //elementos es un arreglo con todos los objetos que queremos mostrar en nuestra tabla [{}, {}, {}]
    const tbodyEl = document.createElement("tbody");
    for (let i = 0; i < elementos.length; i++) {
        //recorremos el arreglo de objetos e invocamos la función de crear fila para cada uno de ellos
        //la función nos devuelve un elemento tr y lo agregamos a nuestro elemento tbody
        tbodyEl.appendChild(createRow(elementos[i]));
    }
    //agregamos el elemento tbody a nuestro elemento tabla
    tableEl.appendChild(tbodyEl);
    
};



window.addEventListener("load", () => {
   
    createHeader(clavesLugares);   //header de la tabla
    const palabra= document.getElementById('myInput');
    palabra.setAttribute("onkeyup","filtrar()" );
    createBody(dataParseada.lugares);
    const buttonAgregar = document.createElement('button');
    buttonAgregar.type = 'button';
    buttonAgregar.innerText = 'Agregar Fila';
    buttonAgregar.setAttribute("onclick", "Agregar(this);");
    midiv.appendChild(buttonAgregar);
});
