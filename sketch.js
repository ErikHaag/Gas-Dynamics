let particles = [];
const fr = 30
let particleCount;
let particleMasses;
let pM
let g;
let debug;
const radius = 5;

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  frameRate(fr);
  getParams();
  reset();
  colorMode(HSB, 360, 100, 100);
  strokeWeight(1);
  console.log("type \'g = [value]\' to set gravity, positive values accelerate the particles DOWN!");
  console.log("type \'debug = true/false\' to see velocity lines.")
}

function draw() {
  background(0, 0, 100);
  //update particle position and velocity
  particles.forEach(E => E.update());
  //display particle position and velocity
  particles.forEach(E => E.draw());
  //update particle velocity from colliding with other particles
  collisionHandler();
}

function reset() {
  particles.splice(0);
  pM = particleMasses;
  for (let i = 1; i <= particleCount; i++) {
    // create particleCount particles randomly on the right side of the screen
    particles.push(createParticle(
      randInt(width / 2 + radius, width - radius),
      randInt(radius, height - radius),
      randInt(-10, 11), randInt(-10, 11),
      random(pM)));
  }
}

function getParams() {
  let params = (new URL(document.location)).searchParams;
  particleMasses = params.get('masses') === null ? [1, 1, 1, 1, 5, 5, 5, 10, 10, 50] : params.get('masses').slice(1,-1).split(',').forEach(x => int(x));
  particleCount = params.get('count') === null ? 600 : int(params.get('count'));
  g = params.get('g') === null ? 0 : int(params.get('g'));
  debug = params.get('debug') == 'true' ? true : false;
}

function randInt(a, b) {
  if (b <= a) {
    return a;
  }
  return floor(random(a, b));
}
