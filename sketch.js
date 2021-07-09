//__VrB__//
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//__VB__//
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//__VrR__//
let xRaquete = 5;
let yRaquete = 150;

//__VrRo__//
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//__PJ__//
let meusPontos = 0;
let pontosDoOponente = 0;

//__Sons__//
let raquetada
let ponto
let fundo

//__Errar__//
let errar = 0;

function preload (){
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("Som Mario Coin - Efeito de som_160k-[AudioTrimmer.com].mp3")
  fundo = loadSound("Melhor Musica para Fundo de Videos De todos os Tempos !_160k.mp3")
}

function setup() {
  fundo.loop()
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  chancerrar();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
                              xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente
  chancerrar()
}

function chancerrar() {
  if (pontosDoOponente >= meusPontos) {
    errar += 1
    if (errar >= 49){
    errar = 50
    }
  } else {
    errar -= 1
    if (errar <= 15){
    errar = 15
    }
  }
}

function incluiPlacar(){
  stroke(257)
  textAlign (CENTER)
  textSize (16)
  fill(color(102, 0, 102))
  rect (130,10,40,20)
  fill (257)
  text(meusPontos, 150, 26);
  fill(color(102, 0, 102))
  rect (430,10,40,20)
  fill (257)
  text(pontosDoOponente, 450, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play()
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play()
  }
}


