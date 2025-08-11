// A p5.js sketch in the style of Wassily Kandinsky
// By Gemini
// prompt: make me a p5js sketch in the art style of wassily kandinsky. please give me the javascript code.

function setup() {
  createCanvas(800, 600);
  background('#F5F5DC'); // A beige, parchment-like background
  noLoop(); // We only want to draw once to create a static image
}

function draw() {
  // Define a Kandinsky-inspired color palette
  const colors = [
    color(217, 87, 65),   // Terracotta Red
    color(65, 105, 225),  // Royal Blue
    color(255, 215, 0),   // Gold/Yellow
    color(50, 50, 50),    // Dark Gray/Black
    color(147, 112, 219), // Medium Purple
    color(46, 139, 87)    // Sea Green
  ];

  // --- Draw larger, foundational shapes ---
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(100, 300);
    let col = random(colors);
    col.setAlpha(150); // Make them slightly transparent
    noStroke();
    fill(col);

    // Randomly choose between a circle or a rectangle
    if (random() > 0.5) {
      ellipse(x, y, size, size);
    } else {
      rectMode(CENTER);
      rect(x, y, size, size);
    }
  }

  // --- Draw smaller, accent shapes and lines ---
  for (let i = 0; i < 25; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);

    // Set properties for the shapes/lines
    strokeWeight(random(1, 4));
    stroke(random(colors));
    fill(random(colors));

    let choice = floor(random(4)); // Choose what to draw

    if (choice === 0) {
      // Draw a bold line
      line(x1, y1, x2, y2);
    } else if (choice === 1) {
      // Draw a small circle
      let d = random(10, 50);
      ellipse(x1, y1, d, d);
    } else if (choice === 2) {
      // Draw a small triangle
      let d = random(20, 60);
      triangle(x1, y1, x1 + d, y1 + d, x1 - d, y1 + d);
    } else {
      // Draw an arc or a partial circle
      noFill();
      let d = random(50, 150);
      let startAngle = random(TWO_PI);
      let endAngle = startAngle + random(PI / 2, PI);
      arc(x1, y1, d, d, startAngle, endAngle);
    }
  }

  // --- Add some final "grid" or "checkerboard" elements ---
  let gridX = random(width * 0.8);
  let gridY = random(height * 0.8);
  let cellSize = 10;
  for (let gx = 0; gx < 5; gx++) {
    for (let gy = 0; gy < 5; gy++) {
      if (random() > 0.6) { // Sparsely populated grid
        fill(random(colors));
        noStroke();
        rect(gridX + gx * cellSize, gridY + gy * cellSize, cellSize, cellSize);
      }
    }
  }
}
