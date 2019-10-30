(function(global) {

  var points=[];
  // var canvas2, gl2, program2;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Register Callbacks
    // window.addEventListener('resize', resizer);

    // Get canvas element and check if WebGL enabled
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);

    canvas.addEventListener('mousedown', function(event) { onmousedown(event, points); });


    // resizer();
    var vertices4 = [];
    var vertices5 = [];

    for (var i=-180; i<=90; i+=1) {
      // degrees to radians
      var n = i * Math.PI / 180;
      // X Y Z
      var vert1 = [
      0.6 + Math.sin(n)*0.25,
      0.3 + Math.cos(n)*0.4,    1.0, 0.0, 0.0
        // 0,
      ];
  
      DONUT:
      var vert2 = [
      0.6 + Math.sin(n)*0.12,
      0.3 + Math.cos(n)*0.181,    0.0, 1.0, 0.0
      ];
      vertices4 = vertices4.concat(vert1);
      vertices4 = vertices4.concat(vert2);
    }

    for (var i=0; i<=270; i+=1) {
      // degrees to radians
      var o = i * Math.PI / 180;
      // X Y Z
      var vert1 = [
      0.6 + Math.sin(o)*0.25,
      -0.28 + Math.cos(o)*0.4,    0.0, 1.0, 0.0
        // 0,
      ];
  
      DONUT:
      var vert2 = [
      0.6 + Math.sin(o)*0.12,
      -0.28 + Math.cos(o)*0.181,    1.0, 0.0, 0.0
      ];
      vertices5 = vertices5.concat(vert1);
      vertices5 = vertices5.concat(vert2);
    }
 
    function drawShapes(type,vertices,n){
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
    
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }  

    function drawShapes2(type,vertices,n){
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
    
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }  

    var scaleXLocation = gl.getUniformLocation(program2, 'scaleX');
    // var scaleYLocation = gl.getUniformLocation(program2, 'scaleY');
    var scaleX = 1.0;
    // var scaleY = 1.0;
    var melebar = 1;  

  function render2(){
    // Bersihkan layar jadi hitam
    gl.useProgram(program2);

    if (scaleX >= 1) melebar = -1;
    else if (scaleX <= -1) melebar = 1; 
    scaleX += 0.0134 * melebar;
    gl.uniform1f(scaleXLocation, scaleX);
    // gl.uniform1f(scaleYLocation, scaleY);

    drawShapes2(gl.TRIANGLE_STRIP, vertices4, 540);
    drawShapes2(gl.TRIANGLE_STRIP, vertices5, 540);
  
    requestAnimationFrame(render2);

}
  render();
  render2();

  function onmousedown(event, points) {

    // find x and y of click
    var x = event.clientX, y = event.clientY;

    // canvas midX and midY
    var midX = canvas.width/2, midY = canvas.height/2;

    // get bounding box of the mouse click's target (canvas object)
    var rect = event.target.getBoundingClientRect();

    // convert the x and y value to webgl space
    // desired = -1.0 to +1.0
    // (x - 0) - midpoint => -/+ of 0 (-320 to +320) => / midpoint = -1.0 to +1.0
    x = ((x - rect.left) - midX) / midX;

    // midpoint - (y-0) => -/+ of 0 (-240 to +240) => / midpoint = -1.0 to +1.0
    y = (midY - (y - rect.top)) / midY;

    console.log(x + "  " + y);
  }

}


})(window || this);