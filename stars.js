// Array to hold all our star objects
let stars = [];
const numStars = 1200; // How many stars to create

// Physics parameters for the interaction
const repelRadius = 120; // How close the mouse needs to be to affect stars
const maxRepelForce = 0.5; // The strongest push force from the mouse
const returnStrength = 0.01; // How strongly stars are pulled back to their home
const damping = 0.95; // Friction to slow the stars down (must be < 1)


function setup() {
  let container = select('#canvas-container');
  let canvas = createCanvas(container.width, container.height);
  canvas.parent('canvas-container');

  initializeStars();
}

function windowResized() {
  let container = select('#canvas-container');
  resizeCanvas(container.width, container.height);
  initializeStars();
}


function draw() {
  let container = select('#canvas-container');
  background(5, 5, 30); // dark blue for night sky

  // Loop through every star, update its position, and draw it
  for (let star of stars) {
    star.update();
    star.display();
  }
}

class Star {
  constructor() {
    // home position
    this.homeX = random(width);
    this.homeY = random(height);
    
    // initial position is home position
    this.x = this.homeX;
    this.y = this.homeY;
    
    // velocity
    this.velocityX = 0;
    this.velocityY = 0;
    
    // Properties for the twinkling effect
    this.minSize = random(0.5, 2);
    this.maxSize = random(2, 4);
    this.twinkleSpeed = random(0.05, 0.1);
    this.twinkleOffset = random(TWO_PI); // Ensures stars don't all twinkle in sync
  }

  // This method calculates where the star should be based on physics
  update() {
    // --- 1. RETURN FORCE ---
    // Calculate the vector pointing from the current position back to home
    let homeForceX = this.homeX - this.x;
    let homeForceY = this.homeY - this.y;
    
    // Apply the return strength to this force
    this.velocityX += homeForceX * returnStrength;
    this.velocityY += homeForceY * returnStrength;

    // --- 2. REPEL FORCE ---
    // Calculate the distance between the star and the mouse
    let distToMouse = dist(this.x, this.y, mouseX, mouseY);

    // If the mouse is within the repel radius, apply a push force
    if (distToMouse < repelRadius) {
      // Calculate the vector pointing away from the mouse
      let repelForceX = this.x - mouseX;
      let repelForceY = this.y - mouseY;

      // The force is stronger when closer. We use map() for a smooth falloff.
      let forceStrength = map(distToMouse, 0, repelRadius, maxRepelForce, 0);
      
      // We need to normalize the force vector and then apply its strength
      let forceMagnitude = sqrt(repelForceX * repelForceX + repelForceY * repelForceY);
      // Avoid division by zero if the star is exactly on the mouse
      if (forceMagnitude > 0) {
        this.velocityX += (repelForceX / forceMagnitude) * forceStrength;
        this.velocityY += (repelForceY / forceMagnitude) * forceStrength;
      }
    }
    
    // --- 3. DAMPING & POSITION UPDATE ---
    // Apply damping to simulate friction and slow the star down
    this.velocityX *= damping;
    this.velocityY *= damping;
    
    // Update the star's actual position with the final velocity
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  // This method draws the star on the canvas
  display() {
    // Calculate size using sin() for a smooth twinkle effect
    let size = map(sin(frameCount * this.twinkleSpeed + this.twinkleOffset), -1, 1, this.minSize, this.maxSize);
    
    noStroke();
    // Use a slightly yellow color for a warmer star feel
    fill(255, 255, 220, 200);  
    circle(this.x, this.y, size);
  }
}

function initializeStars() {
    stars = [];
    // Create all the star objects and add them to the array
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}


function drawGradient() {
  for (let y = 0; y < height; y++) {
    // map() calculates the percentage of the way down the screen
    let inter = map(y, 0, height, 0, 1);
    // lerpColor() finds the color at that percentage between the top and bottom colors
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
