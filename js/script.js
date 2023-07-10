function rugbyShopLogica(){
  let articulos = [
      {nombre: "Botines Under Armour", categoria: "botines" , id: 1, precio: 5000, srcImg: "botines-under.PNG"},
      {nombre: "Botines Gilbert", categoria: "botines" , id: 2, precio: 4800, srcImg: "botines-gilbert.PNG"},
      {nombre: "Botines Canterbury- Red", categoria: "botines" , id: 3, precio: 6500, srcImg: "botines-canterbury2.PNG"},
      {nombre: "Botines Canterbury- Blues", categoria: "botines" , id: 4 , precio: 6600, srcImg: "botines-canterbury.PNG"},
      {nombre: "Botines Adidas- Blacks", categoria: "botines" , id: 5, precio: 6400, srcImg: "botines-adidas2.PNG"},
      {nombre: "Botines Adidas- Kakari", categoria: "botines" , id: 6, precio: 6250, srcImg: "botines-adidas.PNG"},
      {nombre: "Protector Bucal", categoria: "accesorios" , id: 7, precio: 800, srcImg: "bucal1.PNG"},
      {nombre: "Protector Bucal", categoria: "accesorios" , id: 8, precio: 800, srcImg: "bucal2.PNG"},
      {nombre: "Protector Bucal", categoria: "accesorios" , id: 9, precio: 800, srcImg: "bucal3.PNG"},
      {nombre: "Protector Bucal", categoria: "accesorios" , id: 10 , precio: 800, srcImg: "bucal4.PNG"},    
      {nombre: "Camiseta All Blacks", categoria: "indumentaria" , id: 11, precio: 4000, srcImg: "camiseta-all-blacks.PNG"},    
      {nombre: "Camiseta Duendes", categoria: "indumentaria" , id: 12, precio: 3900, srcImg: "camiseta-duendes.PNG"},    
      {nombre: "Camiseta Escocia", categoria: "indumentaria" , id: 13, precio: 4000, srcImg: "camiseta-escocia.PNG"},    
      {nombre: "Camiseta Francia", categoria: "indumentaria" , id: 14 , precio: 4200, srcImg: "camiseta-francia.PNG"},    
      {nombre: "Camiseta OLD Pumas", categoria: "indumentaria" , id: 15 , precio: 4500, srcImg: "camiseta-OLD-pumas.PNG"},    
      {nombre: "Camiseta SIC", categoria: "indumentaria" , id: 16 , precio: 3900, srcImg: "camiseta-sic.PNG"},    
      {nombre: "Camiseta Wales", categoria: "indumentaria" , id: 17, precio: 4000, srcImg: "camiseta-wales.PNG"},
      {nombre: "Casco Canterbury", categoria: "accesorios" , id: 18 , precio: 2000, srcImg: "casco1.PNG"},            
      {nombre: "Medias Entrenamiento", categoria: "indumentaria" , id: 19, precio: 2000, srcImg: "medias.PNG"},    
      {nombre: "Pelota Gilbert", categoria: "pelotas" , id: 20 , precio: 5000, srcImg: "pelota.PNG"},    
      {nombre: "Pelota 4 Naciones", categoria: "pelotas" , id: 21, precio: 4400, srcImg: "pelota2.PNG"},        
      {nombre: "Pelota Escocia", categoria: "pelotas" , id: 22 , precio: 5000, srcImg: "pelota4.PNG"},    
  ]

  // ASIGNANDO CONTENEDOR PARA CARDS
  let contenedor = document.getElementById("articulos")

  // RECUPERANDO CARRITO DEL STORAGE
  let contenidoCarritoJSON = JSON.parse(localStorage.getItem("contenidoCarrito"))
  let contenidoCarrito = contenidoCarritoJSON ? contenidoCarritoJSON : []

  mostrarContenidoCarrito(contenidoCarrito) 

  // LOGICA FINALIZAR COMPRA
  let btnComprar = document.getElementById("comprar")
  btnComprar.addEventListener("click", () => {
    let totalCompra = calcularTotalCompra(contenidoCarrito)
    comprar(contenidoCarrito, totalCompra)
  })
  

  // LOGICA BIENVENIDA
  let inputNombre = document.getElementById("nUser")
  let bUser = document.getElementById("bUser")
  let btnLogin = document.getElementById("login")
  bienvenida(inputNombre, bUser, btnLogin)

  // FILTRAR POR INPUT
  let filtrador = document.getElementById("filtroInp")
  filtrador.addEventListener("input", () => filtrar(articulos, contenedor, filtrador, contenidoCarrito))

  // LOGICA BOTONES FILTRO
  let btnFiltroCat = document.getElementsByClassName("filtroCat")
  for (const button of btnFiltroCat) {
      button.addEventListener("click", (button) => filtroCat(articulos, contenedor, button, contenidoCarrito))
  }

  // ABRIR CARRITO
  let btnCarrito = document.getElementById("carrito")
  btnCarrito.addEventListener("click", abrirCarrito)

  // BOTON INICIO
  let btnInicio = document.getElementById("inicio")
  btnInicio.addEventListener("click", abrirCarrito)

  // CREADOR TARJETAS
  creadorCard(articulos, contenedor, contenidoCarrito)
}

rugbyShopLogica()   

function calcularTotalCompra(contenidoCarrito) {
  let total = 0
  contenidoCarrito.forEach(({ precio, cantidad }) => {
    total += precio * cantidad
  })
  return total
}


// LOGICA BIENVENIDA
function bienvenida(inputNombre, bUser, btnLogin) {
  let nombreRecuperado = localStorage.getItem("nombre")
  if (nombreRecuperado) {
      inputNombre.classList.add("oculto")
      bUser.innerHTML = `- ${nombreRecuperado}`
      btnLogin.classList.toggle("oculto")
  } else {
      btnLogin.addEventListener("click", () => { 
          if (inputNombre.value !== "") { 
              Ot(inputNombre, bUser, btnLogin); 
              btnLogin.classList.add("oculto")
          }
      })
  }
}

// LOGICA BIENVENIDA
function Ot(inputNombre, bUser, btnLogin) {
  let nombre = inputNombre.value
  localStorage.setItem("nombre", nombre)
  inputNombre.classList.add("oculto")
  bUser.innerHTML = `- ${nombre}`
  bienvenida(inputNombre, bUser, btnLogin)
}

// CREADOR TARJETAS
function creadorCard(array, contenedor, contenidoCarrito) {
  contenedor.innerHTML = ""
  array.forEach(({ id, nombre, precio, srcImg }) => {
      let x = document.createElement("div")
      x.className = "card"
        
      x.innerHTML = `
          <div class="bg">
              <h3 class="titleCard">${nombre}</h3>
              <img class="imgCard" src="img/${srcImg}">
              <div class="c2">
                  <h3 class="precioCard">$-${precio}</h3>
                  <button id=${id}>Agregar al carrito</button>
              </div>
          </div>
          <div class="blob"></div>
      `
      contenedor.append(x)
            
      let btnAgregarCarrito = document.getElementById(id)
      btnAgregarCarrito.addEventListener("click", () => pushArticuloCarrito(array, id, contenidoCarrito)) 
  })
}

// FUNCION PUSHEAR ARTICULOS CARRITO
function pushArticuloCarrito(array, id, contenidoCarrito) {
  contenidoCarrito = contenidoCarrito ? contenidoCarrito : []
  let articuloPushCarrito = array.find(articulo => articulo.id === parseInt(id))
  let posicionDeArticulo = contenidoCarrito.findIndex(articulo => articulo.id === articuloPushCarrito.id)

  if (posicionDeArticulo !== -1) {
      contenidoCarrito[posicionDeArticulo].cantidad++
  } else {
      contenidoCarrito.push({
          id: articuloPushCarrito.id,
          nombre: articuloPushCarrito.nombre,
          precio: articuloPushCarrito.precio,
          cantidad: 1,
      })
  }
  lanzarTostada()
  localStorage.setItem("contenidoCarrito", JSON.stringify(contenidoCarrito))
  mostrarContenidoCarrito(contenidoCarrito)
}

function mostrarContenidoCarrito(contenidoCarrito) {
  let contenidoCarritoPusheado = document.getElementById("contenidoCarrito")
  contenidoCarritoPusheado.innerHTML = `
      <table>
          <tr id="tr">
              <td>CANTIDAD</td>
              <td>NOMBRE</td>
              <td class="tdPrecios"><span>PRECIO</span><span>SUBTOTAL</span></td>
          </tr>
          <table id="table"></table>
      </table>
  `
  let total = 0
  contenidoCarrito.forEach(({ cantidad, nombre, precio }) => {
      let articuloUnitarioCarrito = document.createElement("tr")
      articuloUnitarioCarrito.classList.add("articuloUnitarioCarrito")

      let tdCantidad = document.createElement("td")
      tdCantidad.innerHTML = `
          <button class="restar">-</button>
          ${cantidad}
          <button class="sumar">+</button>
      `
      articuloUnitarioCarrito.appendChild(tdCantidad)

      let tdNombre = document.createElement("td")
      tdNombre.textContent = nombre
      articuloUnitarioCarrito.appendChild(tdNombre)

      let tdPrecioySubtotal = document.createElement("td")
      tdPrecioySubtotal.innerHTML = `<span>$-${precio}</span> <span>$-${precio * cantidad}</span>`
      tdPrecioySubtotal.classList.add("precioySubtot")
      articuloUnitarioCarrito.appendChild(tdPrecioySubtotal)

      contenidoCarritoPusheado.appendChild(articuloUnitarioCarrito)
      let subtotal = precio * cantidad
      total += subtotal
  })

  // Mostrar el total de la compra en el carrito
  let totalCompra = document.createElement("tr")
  totalCompra.innerHTML = `
    <td id="cajaTotal" colspan="2">Total:</td>
    <td class="precioySubtot"><span></span><span>$-${total}</span></td>

  `
  contenidoCarritoPusheado.appendChild(totalCompra)

  let botonesSumar = document.getElementsByClassName("sumar")
  let botonesRestar = document.getElementsByClassName("restar")

  for (let i = 0; i < botonesSumar.length; i++) {
      botonesSumar[i].addEventListener("click", () => sumarUnidad(i, contenidoCarrito))
  }

  for (let i = 0; i < botonesRestar.length; i++) {
      botonesRestar[i].addEventListener("click", () => restarUnidad(i, contenidoCarrito))
  }
}

function sumarUnidad(posicionArticulo, contenidoCarrito) {
  contenidoCarrito[posicionArticulo].cantidad++
  localStorage.setItem("contenidoCarrito", JSON.stringify(contenidoCarrito))
  mostrarContenidoCarrito(contenidoCarrito)
}

function restarUnidad(posicionArticulo, contenidoCarrito) {
  if (contenidoCarrito[posicionArticulo].cantidad > 0) {
      contenidoCarrito[posicionArticulo].cantidad--
      if (contenidoCarrito[posicionArticulo].cantidad === 0) {
          contenidoCarrito.splice(posicionArticulo, 1)
      }
      localStorage.setItem("contenidoCarrito", JSON.stringify(contenidoCarrito))
  }
  mostrarContenidoCarrito(contenidoCarrito)
}

function abrirCarrito() {
  let articulosCaja = document.getElementById("articulos")
  let contenedorCaja = document.getElementById("contenedorArticulos")
  let carrito = document.getElementById("padreCarrito")
  let elementosDeCarrito = document.getElementById("contenedorCarrito")
  let botonesCarrito = document.getElementById("botonesCarrito")
  let filtros = document.getElementById("filtros")
  let footer = document.getElementById("footer")
  let esconder = document.getElementsByClassName("esconder")
  articulosCaja.classList.toggle("oculto")
  carrito.classList.toggle("oculto")
  elementosDeCarrito.classList.toggle("oculto")
  botonesCarrito.classList.toggle("oculto")
  contenedorCaja.classList.toggle("oculto")
  filtros.classList.toggle("oculto")
  footer.classList.toggle("oculto")

  // RECORRO Y APLICO POR CADA ELEMENTO CON CLASS "ESCONDER"
  for (let i = 0; i < esconder.length; i++) {
      esconder[i].classList.toggle("oculto")
  }
}

// FILTRO INPUT
function filtrar(articulos, contenedor, filtrador, contenidoCarrito) {
  let filtroMin = filtrador.value.toLocaleLowerCase()
  let arrayFiltro = articulos.filter(articulo => articulo.nombre.toLocaleLowerCase().includes(filtroMin))
  creadorCard(arrayFiltro, contenedor, contenidoCarrito)
}

// FILTRO BOTONES
function filtroCat(articulos, contenedor, button, contenidoCarrito) {
  let arrayCat = articulos.filter(articulo => articulo.categoria === button.target.value)
  creadorCard(arrayCat, contenedor, contenidoCarrito) 
}

// COMPRAR
function comprar(contenidoCarrito, total) {
  let contenidoCarritoPusheado = document.getElementById("contenidoCarrito")
  contenidoCarritoPusheado.innerHTML = ""
  contenidoCarrito.splice(0, contenidoCarrito.length)
  contenidoCarrito = []
  localStorage.removeItem("contenidoCarrito")
  mostrarContenidoCarrito(contenidoCarrito)
  lanzarAlertCompra(total)
}

function lanzarAlertCompra(total) {
  Swal.fire({
    title: `Total de la compra: $${total}`,
    text: "¿Estás seguro de que deseas realizar la compra?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, comprar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '¡Compra realizada!',
        'Tu compra ha sido procesada.',
        'success'
      );
    }
  });
}


//funcion lanzar Tostada
function lanzarTostada(){
  Toastify({
    text: "AGREGADO AL CARRITO",
    className: "info",
    duration:1500
  }).showToast();
}