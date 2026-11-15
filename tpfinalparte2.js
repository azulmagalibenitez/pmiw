//https://youtu.be/1hcdKCxg-qI?si=UBiyLYcFIHLMdAr3

let objJuego;
let fondo; 
let imgPersonajes = []; // Arreglo de los personajes
let imgSalto = [];
let Obstaculos = []; // Arreglo para obstaculos
let imagenesSospechoso = []; 
let inicio;
let estado = "inicio"; // Indica el estado en el que se encuentra el juego.
let botones = []; 
let sonidogeneral; // sonido

function preload() {
    fondo = loadImage('assets/Fondo/Fondo.jpg'); 
    
    // Personajes
    imgPersonajes[0] = loadImage('assets/Personajes0.png');
    imgPersonajes[1] = loadImage('assets/Personajes1.png');
    imgPersonajes[2] = loadImage('assets/Personajes2.png');
    imgPersonajes[3] = loadImage('assets/Personajes3.png');
    imgPersonajes[4] = loadImage('assets/Personajes4.png');
    imgPersonajes[5] = loadImage('assets/Personajes5.png');

    // Obstáculos
    Obstaculos[0] = loadImage('assets/Botellarota.png');
    Obstaculos[1] = loadImage('assets/Chiclemascado.png');
    Obstaculos[2] = loadImage('assets/Lata.png');
    Obstaculos[3] = loadImage('assets/Papelarrugado.png');

    // Sprite del sospechoso
    imagenesSospechoso[0] = loadImage('assets/Sospechoso0.png');
    imagenesSospechoso[1] = loadImage('assets/Sospechoso1.png');
    imagenesSospechoso[2] = loadImage('assets/Sospechoso2.png');
    imagenesSospechoso[3] = loadImage('assets/Sospechoso3.png');
    imagenesSospechoso[4] = loadImage('assets/Sospechoso4.png');
    imagenesSospechoso[5] = loadImage('assets/Sospechoso5.png');
    imagenesSospechoso[6] = loadImage('assets/Sospechoso6.png');
    imagenesSospechoso[7] = loadImage('assets/Sospechoso7.png');

    botones[0] = loadImage('assets/Perdiste.png');
    botones[1] = loadImage('assets/Ganaste.png');
    botones[2]= loadImage('assets/Reiniciar.png')

    inicio = loadImage('assets/Inicio.png');
    sonidogeneral = loadSound('assets/musica.mp3');
}

function setup() {
    createCanvas(800, 400);
    objJuego = new Juego(fondo, imgPersonajes, imagenesSospechoso);
}

function draw() {
    background(0);

    if (estado === "inicio") {
        // La pantalla de inicio sí ocupa todo el canvas
        image(inicio, 0, 0, width, height);
    } 
    else if (estado === "jugando") {
        objJuego.actualizar();
        objJuego.dibujar();

        if (objJuego.personaje.vivo === false) {
            estado = "perdiste";
        } else if (objJuego.gano === true) {
            estado = "ganaste";
        }
    } 
    else if (estado === "perdiste") {
        objJuego.dibujar();
        imageMode(CENTER);
        image(botones[0], width / 2, height / 2 - 20, 400, 200); // Cartel perdiste
        image(botones[2], width / 2, height / 2 + 90, 160, 50);  // Botón de reinicio desde el arreglo
        imageMode(CORNER);
    } 
    else if (estado === "ganaste") {
        objJuego.dibujar();
        imageMode(CENTER);
        image(botones[1], width / 2, height / 2 - 20, 400, 200); // Cartel ganaste
        image(botones[2], width / 2, height / 2 + 90, 160, 50);  // Botón de reinicio desde el arreglo
        imageMode(CORNER);
    }

    else if (estado === "instrucciones") {
        background(30);
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("INSTRUCCIONES\nUsa las flechas para moverte y saltar.\nEsquiva los obstáculos y llega hasta el sospechoso.\n\nHaz clic en cualquier lado para volver", width / 2, height / 2);
        textAlign(LEFT, BASELINE); // Restaurar alineación
    }
    else if (estado === "creditos") {
       
        background(30);
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("CRÉDITOS\nJuego desarrollado con p5.js\nDiseño y Programación: Azul Benitez y Analía Canteros\n\nHaz clic en cualquier lado para volver", width / 2, height / 2);
        textAlign(LEFT, BASELINE); // Restaurar alineación
    }
}
    
    /*fill(255); 
    textSize(14);
    text("X: " + mouseX + " Y: " + mouseY, mouseX + 15, mouseY); 
} */

function mousePressed() {
    if (estado === "inicio") {
        // Botón Jugar
        let botonX = 311; 
        let botonY = 227; 
        let botonAncho = 176; 
        let botonAlto = 40; 

        // Botón Instrucciones
        let instX = 311; 
        let instY = 276; 
        let instAncho = 176; 
        let instAlto = 40; 

        // Botón Créditos 
        let credX = 311; 
        let credY = 320; 
        let credAncho = 176; 
        let credAlto = 60; 

        if (mouseX > botonX && mouseX < botonX + botonAncho &&
            mouseY > botonY && mouseY < botonY + botonAlto) {
            estado = "jugando"; 
          //Arranca el sonido general si no está sonando
            if (!sonidogeneral.isPlaying()) {    
                sonidogeneral.loop();    
            }

        } // Botón para ir a las instrucciones
        else if (mouseX > instX && mouseX < instX + instAncho &&
                 mouseY > instY && mouseY < instY + instAlto) {
            estado = "instrucciones"; 
        } // Botón para ir a los créditos
        else if (mouseX > credX && mouseX < credX + credAncho &&
                 mouseY > credY && mouseY < credY + credAlto) {
            estado = "creditos"; 
        }
    } 
// Si estamos en instrucciones o créditos, cualquier clic nos devuelve al inicio
    else if (estado === "instrucciones" || estado === "creditos") {
        // Si hacés clic en estas pantallas, vuelve al inicio
        estado = "inicio";
    } //Click en el botón de reinicio si estamos en perdiste o ganaste
    else if (estado === "perdiste" || estado === "ganaste") {
        let rX = (width / 2) - 80;   
        let rY = (height / 2 + 90) - 25; 
        let rAncho = 158;
        let rAlto = 40;

        if (mouseX > rX && mouseX < rX + rAncho &&
            mouseY > rY && mouseY < rY + rAlto) { 
             sonidogeneral.stop();// Se frena la musica general al reiniciar el juego
            objJuego = new Juego(fondo, imgPersonajes, imagenesSospechoso);
            estado = "inicio"; 
        }
    }
}

function keyPressed() {
    if (estado === "jugando") {
        objJuego.teclaPresionada(keyCode); //Se presiona la tecla y se llama a la función teclaPresionada del objeto objJuego
    }
}

function keyReleased() {
    if (estado === "jugando") {
        objJuego.teclaLiberada(keyCode); // Nota cuando se suelta la tecla
    }
}