// Video hecho con mi compañera: https://youtu.be/rF6q8HyHZqU

let pantallaActual = 0; // variable de estado para guardar el número de panalla
let minTexto = 0; // Que se vaya escribiendo tipo máquina
let maxTexto = 0;
let escenarios = []; // arreglos de img de los escenarios, son 15 imagenes.
let texto = []; // textos de la narracion de todas las pantallas 
let fuente1; // tipografia de los textos 
let textoBotones = []; // texto de botones, este es arreglo bidimensional
let imgobjetos ; //Lo del carné
let imgBoton=[]; // Botones de la historia, son 4 imagenes
let imgDetective = []; // Arreglo de imágenes del detective 1
let xDetective = 800; // Donde va en X
let yDetective = 200; // Donde va en Y
let velocidadDetective = 3;// Velocidad de movimiento del detective
let imgDetective2 = [];
let xDetective2 = -80;
let yDetective2 = 230;
let velocidadDetective2 = 2;
let sonidogeneral; // para el sonido
let sonidoPolicia;

// valor de los arreglos strings
texto=[ 
 //Pantalla1:
 " Es la 1.AM. Tu compañero abre la cámara frigorífica para buscar nuggets y encuentra al supervisor amordazado y atado a una silla, junto a una carta que indicaba que se habían robado la receta secreta. Tiempo después, escuchan un ruido y al levantar la mirada, ven a alguien huyendo.",
 //Pantalla2:
 "En la oficina rompen un florero caro por accidente y manchan todo con salsa barbacoa, pero, debajo del jarrón roto en la mesa, encuentran una servilleta que menciona un bingo clandestino.",
 //Pantalla3:
 "Siguen al sospechoso en auto, pero se quedan sin combustible. Encuentran una  bicicleta doble que esta afuera de una pizzería",
 //Pantalla4:
 "Terminan cantando ¡Bingo! por error en pleno operativo de infiltración y llaman la atención de todos. En el caos de gritos de ancianos molestos por perder, ven tirado en el piso, el carnet de Vanessa, la cajera de Fast & Food.",
 //Pantalla5:
 "Tras una persecución fallida, terminan atrapados entre cajas probando teorías absurdas, hasta que descubren un carnet de la recepcionista tirado.",
 //Pantalla6:
 "Hablan con el sospechoso, que resultó ser Ramón, el cajero del turno tarde de Fast & Food y les habla de que solo escuchó la mención de Vanessa.",
 //Pantalla7:
 "Vuelven al  local de comida para esperar a Vanessa. En el mientras tanto, revisan la caja para ver si se había dejado algo allí y si, un cronograma de su plan",
 //Pantalla8:
 "Vanessa llega al local, para cubrir su turno y los encuentra con una nerviosa sonrisa, detrás del mostrador",
 //Pantalla9:
 " Se cargan con dispensadores de mostaza y cero preparación física.",
 //Pantalla10:
 "Fallan y la recepcionista los tiene acorralados. Deben tomar la decisión definitiva para resolver la situación.",
 //Pantalla11:
 "La trampa funciona de milagro y la reducen torpemente. Atrapan a la culpable, la policía llega y se convierten en leyendas locales. Abren su propia agencia de detectives.",
 //Pantalla12:
 "Negocian con ella. El jefe despierta sin recordar nada, la receta vuelve a su lugar y consiguen un ascenso a cambio de mantener el secreto y no hacer un podcast sobre el tema.",
 //Pantalla13:
 "El lío armado hace que llegue la policía. Por la salsa barbacoa en la oficina, las huellas y los destrozos, los arrestan a ustedes como sospechosos principales.",
 //Pantalla14:
 "Aventura gráfica creada por Analía Canteros y Azul Benítez, estudiantes de la Universidad Pública de la Plata (UNLP), de la carrera Licenciatura en Diseño Multimedial, en 2026.",
 ];

 textoBotones = [
  //Pantalla 1 ,botones A y B
  ["Revisar la oficina del \njefe buscando pistas ","Perseguir al\n sospechoso encapuchado"],
  //Pantalla2 ,boton A 
  ["Ir al bingo disfrazados\n de ancianos" ],
  //Pantalla3 , botones A y B
  ["Lograr detener al \n sospechoso", "Cortar camino por un\n depósito abandonado."],
  //4,5,6 sin botones 
  [],
  [],
  [],
  // Pantalla7 , botones A y B
  ["Armar trampas caseras\n en la cocina","Prepararse para\nconfrontarla de frente"],
   //Pantalla8 ,botones A y B
  ["Llevarla a la cocina","Negociar con Vanessa"], 
  // Pantalla9,botones A y B
  ["Atacar a Vanessa juntos","Atacar a Vanessa\n  por separados"],
  //Pantalla10,botones A y B
  ["Negociar con Vanessa","Intentar atacarla\n juntos esta vez"],
  //Pantalla11 ,boton unico
  ["Volver al inicio"],
  //Pantalla12,boton unico
  ["Volver al inicio"],
  //Pantalla13,boton unico
  ["Volver al inicio"],
  ];

 function preload(){
  fuente1 = loadFont('assets/PressStart2P-Regular.ttf');
  imgBoton[0]=loadImage('assets/botonplay.png');
  imgBoton[1]=loadImage('assets/botoncreditos.png')
  imgBoton[2]=loadImage('assets/boton1.png');
  imgBoton[3]=loadImage('assets/boton2.png');
  

 for (let i = 0; i <= 14; i++) {
  escenarios[i] = loadImage('assets/pantalla' + i + '.jpg'); // Carga de imágenes de escenarios
}

  imgobjetos = loadImage('assets/Carne.png');  // img de carné para pantalla 4, 5 y 6

for (let i = 0; i < 5; i++) {
  imgDetective[i] = loadImage('assets/detectiveH' + i + '.png'); // Carga de imágenes del detective 1
}
for (let i = 0; i < 4; i++) {
  imgDetective2[i] = loadImage('assets/detectiveM' + i + '.png'); // Carga de imágenes del detective 2
}

sonidogeneral=loadSound('assets/detectivesonido.mp3'); //Sonido que aparece desde que apretas "play"
sonidoPolicia=loadSound('assets/policia.mp3'); // Pantalla 11
}


function setup() {

  createCanvas(800, 450);
  noSmooth(); // es para que se vea bien la tipografia pixeleada
  
}

//Pantallas
function draw() {

  background(220);

   if (pantallaActual==0){
    PantallaGeneral(escenarios[0],null,imgBoton[0],imgBoton[1],null,null);
   }
    else if (pantallaActual==1) {
    PantallaGeneral(escenarios[1],texto[0],imgBoton[2],imgBoton[3],textoBotones[0][0],textoBotones[0][1]);
   }
   else if (pantallaActual==2) {
    PantallaGeneral(escenarios[2],texto[1],imgBoton[2],null,textoBotones[1][0]);
   }
   else if (pantallaActual == 3) {
    PantallaGeneral(escenarios[3],texto[2],imgBoton[2],imgBoton[3],textoBotones[2][0],textoBotones[2][1])
   }
    else if (pantallaActual == 4) {
  PantallaObjetos(escenarios[4], texto[3], imgobjetos, 408, 337, 45, 16);
    }
    else if (pantallaActual == 5) {
  PantallaObjetos(escenarios[5], texto[4], imgobjetos, 371, 331, 40, 24);
   }
    else if (pantallaActual == 6) {
  PantallaObjetos(escenarios[6], texto[5], imgobjetos, 218, 291, 30, 19);
   }
    else if (pantallaActual == 7) {
    PantallaGeneral(escenarios[7],texto[6],imgBoton[2],imgBoton[3],textoBotones[6][0],textoBotones[6][1]);
   }
   else if (pantallaActual == 8) {
    PantallaGeneral(escenarios[8],texto[7],imgBoton[2],imgBoton[3],textoBotones[7][0],textoBotones[7][1]);
   }
    else if (pantallaActual == 9) {
    PantallaGeneral(escenarios[9],texto[8],imgBoton[2],imgBoton[3],textoBotones[8][0],textoBotones[8][1]);
    }
    else if (pantallaActual == 10) {
    PantallaGeneral(escenarios[10],texto[9],imgBoton[2],imgBoton[3],textoBotones[9][0],textoBotones[9][1]);
    }
    else if (pantallaActual == 11) {
    PantallaGeneral(escenarios[11],texto[10],imgBoton[2],null,textoBotones[10][0]);
    push();
  fill(255); // Brde del texto 
  stroke(128, 0, 32);
  strokeWeight(4);

  textFont(fuente1);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("Pulsá enter para vivir la experiencia aún más", 400, 140); // Mensaje para volver al inicio de la pantalla de créditos
  pop(); 
   }
    else if (pantallaActual == 12) {
    PantallaGeneral(escenarios[12],texto[11],imgBoton[2],null,textoBotones[11][0]);
    }
    else if (pantallaActual == 13) {
    PantallaGeneral(escenarios[13],texto[12],imgBoton[2],null,textoBotones[12][0]); 
   }
   else if (pantallaActual == 14) {
  PantallaGeneral(escenarios[14], texto[13], null, null);

  push();
  fill(255); // Brde del texto 
  stroke(128, 0, 32);
  strokeWeight(4);

  textFont(fuente1);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Pulsa ENTER para volver al inicio", 400, 150); // Mensaje para volver al inicio de la pantalla de créditos
  pop();
  }

   if (pantallaActual == 14) { //Sprites
    detectiveCaminando();
    detective2Caminando();
}
  }

  
//Interacciones con los botones y el carné
function mousePressed() {
  
  if (pantallaActual == 0) {
    // Botón Start/Play
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 1;
      maxTexto = 0;
     if (!sonidogeneral.isPlaying()) {
    sonidogeneral.loop();
    }
  }
  
    // Botón Créditos
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 14;
      maxTexto = 0;
    }
  }
  else if (pantallaActual == 1) {
    // Opción A: Revisar la oficina del jefe - Pantalla 2
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 2;
      maxTexto = 0;
    } 
    // Opción B: Perseguir al sospechoso - Pantalla 3
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 3;
      maxTexto = 0;
    }
  }
  else if (pantallaActual == 2) {
    // Ir al bingo - Pantalla 4 (Interactiva)
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 4;
      maxTexto = 0;
    }
  }
  else if (pantallaActual == 3) {
    // Opción A - Pantalla 5 (Interactiva)
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 5; 
      maxTexto = 0;
    } 
    // Opción B - Pantalla 6 (Interactiva)
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 6; 
      maxTexto = 0;
    }
  }
//Carné interactivo
  else if (pantallaActual == 4) {
  if (mouseX >= 408 && mouseX <= 453 &&
      mouseY >= 337 && mouseY <= 353) {
    pantallaActual = 7;
    maxTexto = 0;
    }
  }
  //Carné interactivo
  else if (pantallaActual == 5) {
  if (mouseX >= 371 && mouseX <= 411 &&
      mouseY >= 331 && mouseY <= 355) {
    pantallaActual = 7;
    maxTexto = 0;
    }
  }
  //Carné interactivo
  else if (pantallaActual == 6) {
  if (mouseX >= 218 && mouseX <= 248 &&
      mouseY >= 291 && mouseY <= 310) {
    pantallaActual = 7;
    maxTexto = 0;
  }
    }
 else if (pantallaActual == 7) {
    // Opción A: Armar trampas caseras en la cocina - Pantalla 8
      if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 8;
      maxTexto = 0;
    }
    // Opción B: Prepararse para confrontarla de frente - Pantalla 8
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 9;
      maxTexto = 0;
    }
  }
 
    else if (pantallaActual == 8) {
    // Opción A: Llevarla a la cocina - Pantalla 10
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 11;
      maxTexto = 0;
    }
    // Opción B: Negociar con Vanessa - Pantalla 10
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 12;
      maxTexto = 0;
    }
  }
  else if (pantallaActual == 9) {
    // Opción A: Atacarla juntos - Pantalla 11
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {  
      pantallaActual = 11;
      maxTexto = 0;
    }
    // Opción B: Atacarla por separados - Pantalla 10
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 10;
      maxTexto = 0;
    }
  }
  else if (pantallaActual == 10) {
    // Opción A: Negociar con Vanessa - Pantalla 12
    if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 12;
      maxTexto = 0;
    } 
    // Opción B: Intentar atacarla juntos - Pantalla 13
    else if (mouseX > 474 && mouseX < 726 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 13;
      maxTexto = 0;
    }
}
//Boton volver al inicio
else if (pantallaActual == 11 || pantallaActual == 12 || pantallaActual == 13) {
   if (mouseX > 73 && mouseX < 326 && mouseY > 352 && mouseY < 402) {
      pantallaActual = 0;
      maxTexto = 0;
      sonidoPolicia.stop();    // Asegurarte de apagar la policía
      sonidogeneral.stop();
    } 
  }
}


// Para el: "Pulsa ENTER para volver al inicio" de la pantalla de créditos"
function keyPressed() {
  if (pantallaActual == 14 && keyCode == ENTER) {
    pantallaActual = 0;
    maxTexto = 0;
    minTexto = 0;
  }

if (pantallaActual == 11 && keyCode == ENTER) {
  sonidogeneral.stop();      // Detenemos el sonido general
  sonidoPolicia.loop();
 }
}


function PantallaGeneral(fondo, textoCaja,botonB,botonC,textoB,textoC) {
  
if (fondo) {
  image(fondo, 0, 0, width, height);
}
//Texto de los créditos, con una caja diferente a las demás pantallas
if (textoCaja) {
  push();

  if (pantallaActual == 14) {
    // Caja de créditos
    noStroke();
    fill(115, 9, 9, 150);
    rect(9, 30, 780, 100, 20);

    // Texto centrado
    fill(255);
    textFont(fuente1);
    textSize(12);
    textLeading(15);
    textAlign(CENTER, CENTER);
    text(textoCaja.substring(minTexto, maxTexto++),25, 50, 748, 64);
   }
    else {
    // Caja de texto para las demás pantallas
    noStroke();
    fill(30, 31, 34, 220);
    rect(9, 15, 780, 74, 8);

    // Borde de sombra
    stroke(15, 10, 10, 220);
    strokeWeight(3);
    noFill();
    rect(11, 17, 780, 74, 8);

    // Borde rojo exterior
    stroke('#730909');
    strokeWeight(3);
    noFill();
    rect(7, 13, 780, 74, 8);

    // Borde principal
    stroke('#730909');
    strokeWeight(3);
    noFill();
    rect(9, 15, 780, 74, 8);

    // Texto de la historia
    noStroke();
    fill(255);
    textFont(fuente1);
    textSize(10);
    textLeading(13);
    textAlign(LEFT, TOP);
    text(
      textoCaja.substring(minTexto, maxTexto++),
      28, 27, 760, 80
    );
  }
    pop();
   }
   // BOTONES con el texto 
   if (botonB) {
    image(botonB,50,315,300,125);
    if (textoB) {
    textFont(fuente1)
    textSize(10);
    textLeading(15);
    fill(255); 
    textAlign(CENTER);
     text(textoB,200,375);
   }  
    }

   if (botonC){
    image(botonC,450,315,300,125);
    if (textoC) {
    textFont(fuente1)
    textSize(10);
    textLeading(15);
    fill(255); 
    textAlign(CENTER);
    text(textoC,593,375);
      
    }
  }
}

//Pantalla de objetos interactivos
function PantallaObjetos (fondo, textoCaja, imgobjeto, objX, objY, objAncho, objAlto) {
  if (fondo) {
    image(fondo, 0, 0, width, height); //Escenarios
  }
   if(textoCaja){
   push();
   //el fondo relleno de la caja 
   noStroke();
   fill(30, 31, 34, 220); 
   rect(9, 15, 780, 74, 8);

   //Borde de sombra 
   stroke(15, 10, 10, 220);
   strokeWeight(3);
   noFill();
   rect(11, 17, 780, 74, 8);

   //Borde rojo exterior 
   stroke('#730909');
   strokeWeight(3);
   noFill();
   rect(7, 13, 780, 74, 8);

   //Borde principal de la caja (encuadre final)
   stroke('#730909');
   strokeWeight(3);
   noFill();
   rect(9, 15, 780, 74, 8);
   pop();

   // texto de la historia
    push();
    noStroke();           
    fill(255);         
    textFont(fuente1);       
    textSize(10);  
    textLeading(13);   
    textAlign(LEFT, TOP); 
    text(textoCaja.substring(minTexto, maxTexto++), 28, 27, 760, 80); // para que haga el efecto de escribir  
    pop();
   }
   
   if (imgobjeto) {
    image(imgobjeto, objX, objY, objAncho, objAlto);
   }
  }

function detectiveCaminando() {
  
  let frame = int(frameCount / 8) % 5; // Alterna entre las 5 imágenes
  image(imgDetective[frame], xDetective, yDetective, 200, 240); // Dibuja al detective
  xDetective -= velocidadDetective;// Camina de derecha a izquierda

  // Reiniciar cuando sale por la izquierda
  if (xDetective < -80) {
    xDetective = width;
  }
}

function detective2Caminando() {

  let frame = int(frameCount / 8) % 4;
  image(imgDetective2[frame], xDetective2, yDetective2, 170, 220);
  xDetective2 += velocidadDetective2;

  // Reiniciar cuando sale por la derecha
  if (xDetective2 > width) {
    xDetective2 = -120;
  }
}

