class Obstaculo {
  constructor( x, y) { //Valores inciales
    this.x = width;
    this.y = 350;
    this.scale = 40; // Tamaño del obstaçulo
    this.velocidadx = 2.0; 
    this.tipoImagen = int(random(0, 4)); // Elige al azar una de las 4 imágenes de obstáculos
  }

  actualizacion() {
    this.x -= this.velocidadx; // Mueve el obstáculohacia la izquierda e cada frame
  }

  dibujarObstaculo() {
    imageMode(LEFT);
    image(Obstaculos[this.tipoImagen], this.x, this.y, this.scale, this.scale);
  }
}