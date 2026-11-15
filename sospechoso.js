class Sospechoso {
  constructor(x, y, imagenesSospechoso) { // Recibe el array desde afuera
    this.x = x; //posicion en x 
    this.y = y;//psoicion en y 
    this.escala = 120; //tamaño del sospechoso
    this.velocidadY = 1.0;  // velocidad en y 

    this.animacion = imagenesSospechoso; // Asigna el array directamente
    this.frameActual = 0; // numero de la imagen que se muestra ahora
    this.tiempoSprites = 0; //Contador parala velocidad de la animación
  }
// Actualiza los fotogramas para que el sospechoso se vea animado
  actualizacion() {
    this.tiempoSprites++;// Suma tiempo en cada fotograma
    //cada 10 ciclos cambia de imagen para crear la animacion de movimiento
    if (this.tiempoSprites % 10 === 0) {
      this.frameActual++;// Pasa a la siguiente imagen
      if (this.frameActual >= this.animacion.length) {  //si llega al final de las imágenes, vuelve a empezar la animación desde la primera
        this.frameActual = 0;
      }
    }
  }
// Dibuja al sospechoso en la pantalla
  dibujar() {
    imageMode(CENTER);
    image(this.animacion[this.frameActual], this.x, this.y, this.escala, this.escala);
  }
}