/* El objeto dibujante se encarga de manipular el canvas y hacer todo lo necesario
para poder pintar en la pantalla. Es un objeto que abstrae las complejidades del
canvas, brindandonos una interfaz para controlarlo facilmente en el juego.
No tenes que preocuparte por este archivo, solo saber como usar sus funciones. */

var Dibujante = {
  canvas: document.createElement('canvas'),

  borrarAreaDeJuego: function () {
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  inicializarCanvas: function (anchoCanvas, altoCanvas) {
    this.canvas.width = anchoCanvas;
    this.canvas.height = altoCanvas;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },

  // Asume que el elemento pasado por parametro sabe responder los mensajes:
  // rutaImg, x, y, ancho y alto
  dibujarImagen: function (ruta, x, y, ancho, alto) {
    var imagen = Resources.get(ruta);
    this.canvas.getContext('2d').drawImage(imagen, x, y, ancho, alto);
  },

  // Dibuja una sprite en la pantalla segun su posicion y ancho y alto.
  dibujarEntidad: function (entidad) {
    this.dibujarImagen(entidad.sprite, entidad.x, entidad.y, entidad.ancho, entidad.alto);
  },

  // Dibuja un rectangulo del color pasado por paramentro en la posicion x, y
  // con ancho y alto
  dibujarRectangulo: function (color, x, y, ancho, alto) {
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
  },

  // Asume que el elemento pasado por parametro sabe responder los mensajes:
  // fuente, color, texto, x, y
  dibujarTexto: function (fuente, color, texto, x, y) {
    var ctx = this.canvas.getContext('2d');
    ctx.font = fuente;
    ctx.fillStyle = color;
    ctx.fillText(texto, x, y);
  },

  dibujarRectangulos: function (elementos) {
    elementos.forEach(function (elem) {
      this.dibujarRectangulo(elem);
    }, this)
  },

  dibujarImagenes: function (imagenes) {
    imagenes.forEach(function (img) {
      this.dibujarImagen(img.rutaImg, img.x, img.y, img.ancho, img.alto);
    }, this)
  },

  // Recibe la cantidad inicial de vidas como parametro: totalDeVidas y
  // la cantidad actual de vidas como parametro: vidasActuales
  dibujarVidas: function (totalDeVidas, vidasActuales) {
    var tamanio = this.canvas.width / totalDeVidas;
    var barra = {
      color: 'white',
      x: 0,
      y: 0,
      ancho: this.canvas.width,
      alto: 8
    };

    this.dibujarRectangulo(barra.color, barra.x, barra.y, barra.ancho, barra.alto);
    for (var i = 0; i < vidasActuales; i++) {
      var x = tamanio * i
      var vida = {
        color: 'red',
        x: x,
        y: 0,
        ancho: tamanio,
        alto: 8
      };

      this.dibujarRectangulo(vida.color, x, vida.y, tamanio, vida.alto);
    }
  }
}
