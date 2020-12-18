let tableEl = document.getElementById("tabla");

let midiv = document.getElementById("midiv");


//data en formato JSON
let data = `{
    "lugares": [
      {
        "codigo": 1,
        "nombre": "montaña",
        "tipo_Alojamiento": "camping",
        "cantidad_Personas": 1,
        "precio": "400" 
      },
      { 
        "codigo": 2,
        "nombre": "playa",
        "tipo_Alojamiento": "hotel",
        "cantidad_Personas": 2,
        "precio": "100"
      },
      {
        "codigo": 3,
        "nombre": "lago",
        "tipo_Alojamiento": "cabaña",
        "cantidad_Personas": 3,
        "precio": "250"
      },
      {
        "codigo": 4,
        "nombre": "ciudad",
        "tipo_Alojamiento": "apart",
        "cantidad_Personas": 4,
        "precio": "50"
      }
    ]
  }
`
//convertimos la data en formato JSON a un objeto JS para poder acceder a sus propiedades
let dataParseada = JSON.parse(data);

//obtenemos las claves del objeto json lugares con promos 
let clavesLugares = Object.keys(dataParseada.lugares[0]);
//console.log(clavesLugares);