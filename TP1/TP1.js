let imgFondo;                     
let framesCaminata = [];   
let framesRugido =     [];     
let velocidad = 10;  
let xPos = -50; // Arranca afuera de la pantalla a la izquierda
let yPos = 400; // La altura en Y del dino
let inicioEstado = 0;
let posicionFondoX = 0; // Movimiento del fondo
let velocidadFondo = 2; // Velocidad del fondo
let juegoIniciado = false; // Control del estado del juego
let estaRugiendo = false;  // Controla si el dino está haciendo la animación de rugido
let inicioRugido = 0;      // Guarda el frame donde empezó el rugido
let yaRugioEnEsteViaje = false; // Para que no se me bugee

function preload() {
  imgFondo = loadImage("Fondo.png.png");  
  
  // Cargar frames de caminata
  for (let i = 0; i < 8; i++) {
    framesCaminata[i] = loadImage("Dino" + (i + 1) + ".png.png"); 
  }

  // Cargar frames del rugido
  for (let i = 0; i < 8; i++) {
    framesRugido[i] = loadImage("Dinoanm" + (i + 1) + ".png"); 
  }
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
}

function draw() {
  posicionFondoX -= velocidadFondo; // Movimiento del fondo
  if (posicionFondoX <= -width) {
    posicionFondoX = 0;
  }
  dibujarFondoEstatico(imgFondo, width, height, posicionFondoX);

  // Pantallas
  if (!juegoIniciado) {
    dibujarMenuInicio();
  } else {
    let frameActual;

    // Si está rugiendo
    if (estaRugiendo) {
      let frameRelativoRugido = frameCount - inicioRugido;
      let indiceRugido = int(frameRelativoRugido / velocidad);
      
      // S es que todavía estamos dentro de los 8 frames
      if (indiceRugido < 8) {
        dibujarPersonaje(framesRugido, indiceRugido, xPos, yPos);
      } else {
        // Sale del estado de rugido y vuelve a caminar
        estaRugiendo = false;
        inicioEstado = frameCount; // Resetea el tiempo de la caminata para que no salte
      }

    } else {
      // Pantalla dino moviendose normal (caminata)
      let frameRelativo = frameCount - inicioEstado;
      frameActual = obtenerFrameActual(8, velocidad, frameRelativo);
      
      dibujarPersonaje(framesCaminata, frameActual, xPos, yPos); 
      xPos += 2; // El personaje avanza de izquierda a derecha

      // Si llega a la mitad de la pantalla Y NO ha rugido todavía en este recorrido
      if (xPos >= width / 4 && !yaRugioEnEsteViaje) {
        estaRugiendo = true;
        inicioRugido = frameCount;
        yaRugioEnEsteViaje = true; // Marcamos que ya cumplió para que no lo repita en bucle
      }
       
      if (xPos > width + 50) { // Si sale de la pantalla por la derecha, reinicia todo
        xPos = -50;
        inicioEstado = frameCount; 
        yaRugioEnEsteViaje = false; //Resetea para que vuelva a rugir en el siguiente viaje
      }
    }

    // Aviso pequeño en el centro de la pantalla durante la caminata
    if (xPos < width / 2 && !yaRugioEnEsteViaje) {
      push();
      textAlign(CENTER, CENTER);
      textSize(16);
      fill(255, 255, 255, 200);
      noStroke();
      text("Presiona Flecha Abajo para rugir", width / 2, 100);
      pop();
    }
  }
}

// Botón de start (Click en el botón)
function mousePressed() {
  if (!juegoIniciado) {
    let botonX = width / 2;
    let botonY = height / 2 + 20;
    let botonAncho = 200;
    let botonAlto = 60;

    if (
      mouseX > botonX - botonAncho / 2 &&
      mouseX < botonX + botonAncho / 2 &&
      mouseY > botonY - botonAlto / 2 &&
      mouseY < botonY + botonAlto / 2
    ) {
      empezarJuego();
    }
  }
}

// Controles por teclado
function keyPressed() {
  if (!juegoIniciado && (key === ' ' || keyCode === 32)) {
    empezarJuego();
  }

  // Activar el rugido manualmente con la tecla ABAJO (si no está rugiendo ya)
  if (juegoIniciado && keyCode === DOWN_ARROW && !estaRugiendo) {
    estaRugiendo = true;
    inicioRugido = frameCount;
    yaRugioEnEsteViaje = true;
  }
}

function empezarJuego() {
  juegoIniciado = true;
  inicioEstado = frameCount; 
}

// Menú principal
function dibujarMenuInicio() {
  push();
  fill(0, 0, 0, 150); 
  rectMode(CORNER);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);  
  fill(255);
  textSize(48);
  text("DINO DAN", width / 2, height / 2 - 60);

  let botonX = width / 2;
  let botonY = height / 2 + 20;
  let botonAncho = 200;
  let botonAlto = 60;

  if (
    mouseX > botonX - botonAncho / 2 &&
    mouseX < botonX + botonAncho / 2 &&
    mouseY > botonY - botonAlto / 2 &&
    mouseY < botonY + botonAlto / 2
  ) {
    fill(50, 205, 50); 
  } else {
    fill(34, 139, 34); 
  }

  noStroke();
  rectMode(CENTER);
  rect(botonX, botonY, botonAncho, botonAlto, 10); 

  fill(255);
  textSize(24);
  text("START", botonX, botonY); 

  textSize(16);
  fill(200);
  text("O presiona la Barra Espaciadora", width / 2, height / 2 + 85);
  pop();
}

function obtenerFrameActual(totalFrames, velocidadAnimacion, tiempoRelativo) {
  let indice = int(tiempoRelativo / velocidadAnimacion) % totalFrames;
  return indice;
}

function dibujarFondoEstatico(imagenFondo, ancho, alto, posX) { 
  push();
  imageMode(CENTER);
  image(imagenFondo, posX + ancho / 2, alto / 2, ancho, alto);
  image(imagenFondo, posX + ancho + ancho / 2, alto / 2, ancho, alto);
  pop();
}

function dibujarPersonaje(arrayFrames, indiceFrame, x, y) {
  push();
  translate(x, y);
  let imgActual = arrayFrames[indiceFrame];
  // Validamos que el frame exista por seguridad
  if (imgActual) {
    let escala = (arrayFrames === framesRugido) ? 0.28 : 0.8;
    let anchoOriginal = imgActual.width * escala;
    let altoOriginal = imgActual.height * escala;
    image(imgActual, 0, (framesCaminata[0].height * 0.8 - altoOriginal) / 2, anchoOriginal, altoOriginal);
  }
  pop();
}
