let simpleShader;

let img0;
let img1;
let img2;

function preload(){
  // Load the shader
  simpleShader = loadShader('basic.vert', 'basic.frag');
  
  // Load the image
  img0 = loadImage("sand.png");
  img1 = loadImage("ripples_blur.jpg");
  img2 = loadImage("boosygoosy.png");
  
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(500, 500, WEBGL);
  //img1.blend(img2, 0, 0, img1.width, img1.height, 0, 0, img1.width, img2.height/6, DARKEST);
}

function draw() {  

  // shader() sets the active shader with our shader
  shader(simpleShader);
  
  const mx = map(mouseX, 0, width, 0, 0.7);
  const my = map(mouseY, 0, width, 0, 0.7);
  
  // Send the image to the shader
  simpleShader.setUniform("uTexture0", img0);
  simpleShader.setUniform("uTexture1", img1);
  simpleShader.setUniform("uScale", [mx, my]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}