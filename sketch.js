let simpleShader;
let cPos;
let img0;
let img1;
let img2;

let input1;
let input2;

function sketch(p) {
  p.preload = function () {
    // Load the shader
    simpleShader = p.loadShader("basic.vert", "basic.frag");

    // Load the image
    img0 = p.loadImage("sand.png");
    img1 = p.loadImage("ripples_blur.jpg");
    img2 = p.loadImage("boosygoosy.png");
  };

  p.setup = function () {
    cPos = p.createVector(0, 0);
    // shaders require WEBGL mode to work
    p.createCanvas(img0.width, img0.height, p.WEBGL);

    input1 = document.getElementById("file-input1");
    input1.addEventListener("change", handleFile1, false);
    input2 = document.getElementById("file-input2");
    input2.addEventListener("change", handleFile2, false);

    //img1.blend(img2, 0, 0, img1.width, img1.height, 0, 0, img1.width, img2.height/6, DARKEST);
  };

  //update cPos when mouse is down
  p.mouseDragged = function () {
    cPos.x = p.mouseX;
    cPos.y = p.mouseY;
  };

  p.draw = function () {
    // shader() sets the active shader with our shader
    p.shader(simpleShader);

    const mx = p.map(cPos.x, 0, p.width, 0, 0.7);
    const my = p.map(cPos.y, 0, p.width, 0, 0.7);

    // Send the image to the shader
    simpleShader.setUniform("uTexture0", img0);
    simpleShader.setUniform("uTexture1", img1);
    simpleShader.setUniform("uScale", [mx, my]);

    // rect gives us some geometry on the screen
    p.rect(0, 0, p.width, p.height);
  };



  handleFile1 = function () {
    const fileList = this.files; /* now you can work with the file list */
    const file = fileList[0]
    console.log(file)
  
    var reader = new FileReader();
  
    reader.onload = function(e) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        img0 = p.createImg(e.target.result, '');
        img0.hide();
      } else {
        img0 = null;
      }
    }
  
    reader.readAsDataURL(file);
  }
  handleFile2 = function () {
    const fileList = this.files; /* now you can work with the file list */
    const file = fileList[0]
    console.log(file)
  
    var reader = new FileReader();
  
    reader.onload = function(e) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        img1 = p.createImg(e.target.result, '');
        img1.hide();
      } else {
        img1 = null;
      }
    }
  
    reader.readAsDataURL(file);
  }
}



new p5(sketch, "p5canvas");
