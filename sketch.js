let simpleShader;
let cPos;
let img0;
let img1;
let img2;

let input1;
let input2;

let animationAmount = 0;
let animationSpeed = 0;

function preload() {
  // Load the shader
  simpleShader = loadShader("basic.vert", "basic.frag");

  // Load the image
  img0 = loadImage("sand.png");
  img1 = loadImage("ripples_blur.jpg");
  img2 = loadImage("boosygoosy.png");
}

function setup() {
  cPos = createVector(0, 0);
  // shaders require WEBGL mode to work
  let canvas = createCanvas(img0.width, img0.height, WEBGL);

  var input1 = document.getElementById("fileInput1");

  var input2 = document.getElementById("fileInput2");
  input1.onchange = (e) => {
    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result; // this is the content!
      img0 = loadImage(content, () => {
        console.log("loaded");
        resizeCanvas(img0.width, img0.height);
      });
    };
  };

  input2.onchange = (e) => {
    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result; // this is the content!
      img1 = loadImage(content);
    };
  };

  let slider1 = document.getElementById("slider1");
  slider1.oninput = (e) => {
    animationAmount = e.target.value;
  };

  let slider2 = document.getElementById("slider2");
  slider2.oninput = (e) => {
    animationSpeed = e.target.value;
  };

  //img1.blend(img2, 0, 0, img1.width, img1.height, 0, 0, img1.width, img2.height/6, DARKEST);
}

//update cPos when mouse is down
function mouseDragged() {
  //when inside canvas
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    cPos.x = mouseX;
    cPos.y = mouseY;
  }
}

function draw() {
  // shader() sets the active shader with our shader
  shader(simpleShader);

  const mx = map(cPos.x, 0, width, 0, 0.7) + Math.sin(frameCount*animationSpeed) * animationAmount;
  const my = map(cPos.y, 0, width, 0, 0.7) + Math.cos(frameCount*animationSpeed) * animationAmount;

  // Send the image to the shader
  simpleShader.setUniform("uTexture0", img0);
  simpleShader.setUniform("uTexture1", img1);
  simpleShader.setUniform("uScale", [mx, my]);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}
