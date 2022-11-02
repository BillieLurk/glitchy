precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D uTexture0;
uniform sampler2D uTexture1;

uniform vec2 uScale;

void main() {

  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // Plug it into texture2d
  vec4 dispTex = texture2D(uTexture1, uv);
  
  // Do our displacement from the center
  dispTex.rg = dispTex.rg * 2.0 - 0.5;
    
  // Use the red and green channels for displacement
  vec2 displacement = dispTex.rg * uScale;
  
  // Add the displacement to the uvs
  uv = uv + displacement;
  
  // Sample the texture
  vec4 color = texture2D(uTexture0, uv );
  
  // Send the color to the screen
  gl_FragColor = color;

}