class Personaje {
  constructor(posx, posY, imgPedal) {  // Valores iniciales
    this.posX = posx;
    this.posY = posY;
    this.posYsuelo = posY; // Guardamos el suelo original para que no baje de más
    this.scale = 150; // Tamaño del personaje
    this.velocidad = 0.6; // Velocidad a la que va

    
    this.animacionPedal = imgPedal; //Animación
    this.frameActual = 0;       
    this.moviendose = false;

   
    this.velocidadY = 0; // velocidad del salto      
    this.caida = 0.35;      
    this.fuerzaSalto = -13;   
    this.sisalta = false; 
     
    this.vivo = true; // Para saber si el personaje esta vivo
  }

  actualizar() {
    //  Si no esta vivo, frena la actualización y no hace nada 
    if (!this.vivo) return;
    // Si mantenemos presionada la flecha derecha
    if (this.moviendose) {
      this.posX += this.velocidad; 

     
      if (!this.sisalta && frameCount % 6 === 0) { //Animacion de pedaleo cuando no está saltando
        this.frameActual = (this.frameActual + 1) % this.animacionPedal.length;
      }
    } else if (!this.sisalta) {
      this.frameActual = 0;
    }

    
    if (this.sisalta) { // Si el personaje está saltando en este momento
      this.posY += this.velocidadY; //Actualiza la posición en y sumando la velocidad de salto
      this.velocidadY += this.caida;   

      // Si toca el suelo o baja más de su posición inicial
      if (this.posY >= this.posYsuelo) {//Frena en el suelo, desactivando temporalmente la animación de salto
        this.posY = this.posYsuelo;   
        this.sisalta = false;         
        this.velocidadY = 0;// Reinicia la velocidad
      }
    }

    this.posX = constrain(this.posX, 100, width - 100);// Mantiene al personaje dentro de los límites de la pantalla
  }

  // Animación del salto
  saltar() {
    if (!this.sisalta) {// Solo salta si está tocando el suelo
      this.velocidadY = this.fuerzaSalto;// Impulso inicial hacia arriba
      this.sisalta = true;
    }
  }

  // Dibuja siempre el sprite de pedaleo y cuando salta
  dibujar() {
    
   // marca si cayó bien, si si, lo dibuja.
    if (this.vivo) {
      imageMode(CENTER);
      image(this.animacionPedal[this.frameActual], this.posX, this.posY, this.scale, this.scale);
    }
  }
// Detecta si colisiona con un obstáculo
  colisionaCon(obstaculo) {

    // Limite de los obstáculos
    let obsIzquierda = obstaculo.x;
    let obsDerecha = obstaculo.x + obstaculo.scale;
    let obsArriba = obstaculo.y;
    let obsAbajo = obstaculo.y + obstaculo.scale;

    // Los límites del personaje
    let perIzquierda = this.posX - this.scale / 2;
    let perDerecha = this.posX + this.scale / 2;
    let perArriba = this.posY - this.scale / 2;
    let perAbajo = this.posY + this.scale / 2;

    // Margen para la colisión con el obstáculo
    let margen = 15;

    // Revisa si los bordes del personaje y el obstáculo se cruzan, si es asi, hay colisión y devuelve true, sino false
    let colisionX = perDerecha - margen > obsIzquierda + margen && perIzquierda + margen < obsDerecha - margen;
    let colisionY = perAbajo - margen > obsArriba + margen && perArriba + margen < obsAbajo - margen;

    return colisionX && colisionY;
  }
// Sospechso
  tocaSospechoso(sospechoso) {
    
    // Límites del sospechoso
    let sospIzquierda = sospechoso.x - 40; // Ajustá según el ancho visual del sospechoso
    let sospDerecha = sospechoso.x + 40;
    let sospArriba = sospechoso.y - 40;
    let sospAbajo = sospechoso.y + 40;

    // Límites del personaje
    let perIzquierda = this.posX - this.scale / 2;
    let perDerecha = this.posX + this.scale / 2;
    let perArriba = this.posY - this.scale / 2;
    let perAbajo = this.posY + this.scale / 2;

    // Margen para la colisión con el sospechoso
    let margen = 20;

    //Revisa si los margenes se cruzan, si es así devuelve true, sino false
    let colisionX = perDerecha - margen > sospIzquierda + margen && perIzquierda + margen < sospDerecha - margen;
    let colisionY = perAbajo - margen > sospArriba + margen && perArriba + margen < sospAbajo - margen;

    return colisionX && colisionY;
  }



  teclaPresionada(keyCode) {
    if (keyCode === RIGHT_ARROW) { // Hace que el personaje se mueva a la derecha mientras se mantiene presionada la flecha derecha
      this.moviendose = true; 
    }
   
    if (keyCode === UP_ARROW || keyCode === 32) {   // Salta con flecha arriba o barra espaciadora
      this.saltar();
    }
  }

  teclaLiberada(keyCode) {
    if (keyCode === RIGHT_ARROW) { //Cuano se suelta la flecha derecha, deja de moverse
      this.moviendose = false; 
    }
  }
}