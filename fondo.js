class FondoParallax {
  constructor(imgFondo) {
    this.img = imgFondo;
    this.x1 = 0;          
    this.x2 = width; // La segunda imagen empieza justo donde termina la primera
    this.velocidad = 4; // Velocidad de desplazamiento horizontal
  }

  actualizar() {
    // Movemos ambas imágenes hacia la izquierda
    this.x1 -= this.velocidad;
    this.x2 -= this.velocidad;

   //Cuando la imagen sale de la pantalla, la mandamos al final de la otra para crear un efecto de bucle.
    if (this.x1 <= -width) {
      this.x1 = this.x2 + width;
    }

   
    if (this.x2 <= -width) {
      this.x2 = this.x1 + width;
    }
  }

  dibujar() {
    imageMode(CORNER);
    // Dibujamos las dos imágenes una al lado de la otra
    image(this.img, this.x1, 0, width, height);
    image(this.img, this.x2, 0, width, height);
  }
}

