let img;
let rotateXAmount = 0;
let rotateYAmount = 0;

function preload() {
  img = loadImage('beach.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
  }
}

function draw() {
  background(0);
  texture(img);
  sphere(500);

  // Rotar la vista usando los valores del acelerómetro y el giroscopio
  rotateX(radians(rotateXAmount));
  rotateY(radians(rotateYAmount));

  // Obtener el vector de dirección
  let directionVector = direction(rotateXAmount, rotateYAmount);

  // Dibujar un punto negro en el vector de dirección
  stroke(0);
  fill(0);
  ellipse(directionVector.x * 500, directionVector.y * 500, 10, 10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function handleOrientation(event) {
  // Actualizar los valores de rotación de acuerdo a los valores del dispositivo
  rotateXAmount = map(event.beta, -180, 180, -90, 90);
  rotateYAmount = map(event.gamma, -90, 90, -90, 90);
}

function direction(xAngle, yAngle) {
  // Convertir los ángulos a vectores de dirección
  let x = sin(radians(yAngle));
  let y = sin(radians(xAngle)) * -1;
  let z = cos(radians(yAngle)) * cos(radians(xAngle));
  let directionVector = createVector(x, y, z);
  return directionVector;
}
