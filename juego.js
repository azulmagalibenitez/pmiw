class Juego {
  constructor(imgFondoRecibida, imgPedalRecibidos, imgSospechosoRecibidos) { // El fondo, el jugador y el sospechoso con sus imágenes
    this.fondoJuego = new FondoParallax(imgFondoRecibida); 
    this.personaje = new Personaje(120, 320, imgPedalRecibidos); 
    this.sospechoso = new Sospechoso(700, 320, imgSospechosoRecibidos);
             
    this.obstaculos = []; 
    this.tiempoRestante = 50; //Para que aparezca el primer obstáculo después de 50 frames
    this.intervaloActual = 200;  //Tiempo entre obstáculos, que va disminuyendo hasta un mínimo de 120 frames
    this.gano = false; 

    
    this.velocidadGlobal = 1; //Aumenta la velocidad del juego con el tiempo
  }

  actualizar() { // Aumenta la velocidad general y actualiza el movimiento del fondo y personajes
    this.velocidadGlobal += 0.0008; // Va incrementando la velocidad

    this.fondoJuego.velocidad = 4 * this.velocidadGlobal; // Acelera el fondo también
    this.fondoJuego.actualizar();

    this.sospechoso.actualizacion(); 
    this.personaje.actualizar();

  
    this.tiempoRestante--; //Por cada frame se resta tiempo

   
    if (this.tiempoRestante <= 0) {  // Cuando el contador llega a 0, sale un obstáculo nuevo
      let nuevoObstaculo = new Obstaculo(800, 320);
      this.obstaculos.push(nuevoObstaculo);

      this.tiempoRestante = this.intervaloActual; // Se achica el tiempo de espera entre obstáculos, pero no menos de 120 frames
      this.intervaloActual = max(120, this.intervaloActual - 15); 
    }
    
    for (let i = this.obstaculos.length - 1; i >= 0; i--) { // Velocidad de cada obstáculo
      this.obstaculos[i].velocidadx = 2.0 * this.velocidadGlobal;
      this.obstaculos[i].actualizacion();
     
      if (this.personaje.colisionaCon(this.obstaculos[i])) {  // Si colisiona con un obstáculo pierde
        this.personaje.vivo = false;
      }
    } 

    
    if (this.personaje.tocaSospechoso(this.sospechoso)) { // Si toca al sospechoso gana
      this.gano = true;
    } 
  } 
  dibujar() {
    this.fondoJuego.dibujar();

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].dibujarObstaculo(); 
    }
    
    this.personaje.dibujar();
    this.sospechoso.dibujar();
  }

  crearObstaculos() { //Crea 4 obstáculos al inicio del juego, con posiciones aleatorias
    for (let i = 0; i < 4; i++) {
      let posX = random(150, 650);
      let posY = random(-150, 0);

      let nuevoObstaculo = new Obstaculo(posX, posY); 
      this.obstaculos.push(nuevoObstaculo);
    }
  }

  teclaPresionada(keyCode) { //Teclas para mover al personaje y saltar
    this.personaje.teclaPresionada(keyCode); // Flecha para la derecha
  }

  teclaLiberada(keyCode) {
    this.personaje.teclaLiberada(keyCode); // Marca que la tecla fue liberada
  } 
}