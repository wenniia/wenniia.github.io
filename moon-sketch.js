// prompt 1: make a p5js sketch of a storybook style clouds with moon and stars. just give me the javascript file.
// prompt 2: make some big clouds that frame the picture

// A class for the small, drifting clouds in the background
class Cloud {
  // The constructor sets up the initial properties of a single cloud
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // Each cloud will have a slightly different speed for a natural look
    this.speed = random(0.2, 0.6);
    // Each cloud is made of several "puffs" (ellipses)
    this.numPuffs = int(random(5, 10));
    this.puffs = []; // An array to hold the properties of each puff

    // Generate the random puffs that will make up the cloud's shape
    for (let i = 0; i < this.numPuffs; i++) {
      this.puffs.push({
        offsetX: random(-50, 50),
        offsetY: random(-20, 20),
        sizeX: random(50, 90),
        sizeY: random(40, 60),
      });
    }
  }

  // The move method updates the cloud's position each frame
  move() {
    this.x += this.speed;
    // If a cloud moves off the right side of the screen, reset it to the left
    if (this.x > width + 150) {
      this.x = -150;
      this.y = random(50, height / 2); // Respawn higher up
    }
  }

  // The display method draws the cloud on the canvas
  display() {
    fill(245, 245, 245, 210);
    noStroke();
    for (const puff of this.puffs) {
      ellipse(
        this.x + puff.offsetX,
        this.y + puff.offsetY,
        puff.sizeX,
        puff.sizeY
      );
    }
  }
}

// A class for the large, static clouds that frame the bottom of the sketch
class FramingCloud {
  // The constructor sets up a large, multi-puffed cloud
  constructor(x, y, baseSize) {
    this.x = x;
    this.y = y;
    this.puffs = []; // Array to hold the parts of the cloud

    // Create more puffs for a fuller look
    let numPuffs = int(random(15, 25));
    for (let i = 0; i < numPuffs; i++) {
      this.puffs.push({
        offsetX: random(-baseSize * 0.6, baseSize * 0.6),
        offsetY: random(-baseSize * 0.3, 0),
        sizeX: random(baseSize * 0.2, baseSize * 0.5),
        sizeY: random(baseSize * 0.2, baseSize * 0.4),
      });
    }
  }

  // This class does not have a 'move()' method because these clouds are stationary
  display() {
    fill(245, 245, 245, 230); // Slightly more opaque
    noStroke();
    for (const puff of this.puffs) {
      ellipse(
        this.x + puff.offsetX,
        this.y + puff.offsetY,
        puff.sizeX,
        puff.sizeY
      );
    }
  }
}

// --- Global Variables ---
let stars = [];
let clouds = [];
let framingClouds = [];
const numStars = 250;
const numClouds = 6;

// The setup() function runs once when the sketch starts
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create the stars with random properties
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3.5),
      alpha: random(150, 255),
    });
  }
  
  // Create the drifting clouds
  for (let i = 0; i < numClouds; i++) {
    clouds.push(new Cloud(random(width), random(50, height / 2)));
  }

  // Create the large, static framing clouds
  let cloudSize = width / 2.5; // Make cloud size relative to screen width
  framingClouds.push(new FramingCloud(0, height, cloudSize)); // Bottom-left
  framingClouds.push(new FramingCloud(width, height, cloudSize * 1.2)); // Bottom-right
}

// The draw() function runs continuously in a loop
function draw() {
  // Draw the night sky background with a gradient
  drawGradientBackground();

  // Draw all the stars
  drawStars();

  // Draw the crescent moon
  drawMoon(width * 0.8, height * 0.2, 120);
  
  // Draw the large, static framing clouds first, so they are in the foreground
  for (const cloud of framingClouds) {
    cloud.display();
  }
  
  // Move and display each of the smaller, drifting clouds
  for (const cloud of clouds) {
    cloud.move();
    cloud.display();
  }
}


// --- Helper Functions ---

// Creates a dark blue gradient for the sky
function drawGradientBackground() {
  let topColor = color(15, 32, 79); // Dark navy blue
  let bottomColor = color(48, 62, 120); // Lighter purple-blue
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// Draws all the stars, making them twinkle
function drawStars() {
  noStroke();
  for (const star of stars) {
    let twinkle = random(0.7, 1);
    fill(255, 255, 240, star.alpha * twinkle);
    ellipse(star.x, star.y, star.size, star.size);
  }
}

// Draws a simple crescent moon
function drawMoon(x, y, size) {
  fill(255, 255, 240);
  noStroke();
  ellipse(x, y, size, size);

  // Use the sky's top color to create the crescent shape
  fill(15, 32, 79);
  ellipse(x - size * 0.2, y - size * 0.1, size * 0.9, size * 0.9);
}

// This function ensures the canvas resizes if the browser window changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // For a more robust sketch, you might want to regenerate cloud/star positions here
}
