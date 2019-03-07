var statusKeys = {};
var cubeRotation = 0.0;
var cameraAngleDegHoriz = 0;
var cameraAngleDegVert = 0;
var num_walls = 30;

main();

function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec3 aVertexNormal;
  attribute vec2 aTextureCoord;
  uniform mat4 uNormalMatrix;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;
  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
    // Apply lighting effect
    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.1, 0.6, 0.1));
    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);
  }
  `;

  // Fragment shader program

  const fsSource = `
  precision mediump float;
  varying vec2 vTextureCoord;
  varying highp vec3 vLighting;
  uniform sampler2D texture0;
  uniform sampler2D texture1;
  void main(void) {
      highp vec4 color0 = texture2D(texture0, vTextureCoord);
      highp vec4 color1 = texture2D(texture1, vTextureCoord);
      gl_FragColor = vec4(color0.rgb * vLighting, color0.a);
      //gl_FragColor = color0;
  }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
			texture0: gl.getUniformLocation(shaderProgram, 'texture0'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  objects = []; // Contains player, ground
  walls = [];
  coins = [];
  obstacles = [];

  buffer_objects = [];
  buffer_coins = [];
  buffer_obstacles = [];

  obstacles.push(obstacle(gl, -20));
  buffer_obstacles.push(initBuffers(gl, obstacles[0]));
  objects.push(player(gl));
  objects.push(ground(gl));

  walls.push(wall(gl, -15, -1));
  for (let i = 1;i < num_walls ; ++i){

    if(i < num_walls/2)
      walls.push(wall(gl, walls[i - 1].initial_z - 14, getRandomFloat(0.8,2.5), -1));
    else
      walls.push(wall(gl, walls[i - num_walls/2].initial_z - 14, getRandomFloat(0.8,2.5), 1));
  }

  for (var i = 0; i < objects.length; ++i) {
    buffer_objects.push(initBuffers(gl, objects[i]));
  }

  for (var i = 0; i < walls.length; ++i) {
    buffer_objects.push(initBuffers(gl, walls[i]));
  }

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {

    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;

    const projectionMatrix = clearScene(gl);

    var rand = getRandomInt(1, 200);

    if(rand% 13 == 0){

      let r = getRandomInt(0, 2);
      let track = 0.0;
      if (r == 0)
      {
        track = -0.25;
      }
      else if(r == 1){
        track = 0.0;
      }
      else if(r == 2){
        track = 0.25;
      }
      if(coins.length == 0){
        coins.push(coin(gl, track, -10));
        buffer_coins.push(initBuffers(gl, coins[coins.length - 1]));
      }
      else{
        coins.push(coin(gl, track, coins[coins.length - 1].translate[2] - 2));
        buffer_coins.push(initBuffers(gl, coins[coins.length - 1]));
      }
    }

    if(rand% 17 == 0){

      let r = getRandomInt(0, 2);
      let track = 0.0;
      if (r == 0)
      {
        track = -0.25;
      }
      else if(r == 1){
        track = 0.0;
      }
      else if(r == 2){
        track = 0.25;
      }
      // if(coins.length == 0){
      //   coins.push(coin(track, -10));
      //   buffer_coins.push(initBuffers(gl, coins[coins.length - 1]));
      // }
      // else{
      //   coins.push(coin(track, coins[coins.length - 1].translate[2] - 2));
      //   buffer_coins.push(initBuffers(gl, coins[coins.length - 1]));
      // }


    }

    wall_tick(gl, walls);
    obstacle_tick(gl, obstacles);
    coin_tick(gl, coins);
    player_tick(objects[0], deltaTime);

    for (let i = 0; i < buffer_objects.length; i++) {

      if(buffer_objects[i].type == "mono"){
        drawScene(gl, programInfo, buffer_objects[i], deltaTime, projectionMatrix, objects[i], objects[i].texture);
      }
      else {
        drawScene(gl, programInfo, buffer_objects[i], deltaTime, projectionMatrix, walls[i - objects.length], walls[i - objects.length].texture);
      }
    }

    for(let i = 0; i < buffer_coins.length; ++i){
      drawScene(gl, programInfo, buffer_coins[i], deltaTime, projectionMatrix, coins[i], coins[i].texture);
    }

    for(let i = 0; i < buffer_obstacles.length; ++i){
      drawScene(gl, programInfo, buffer_obstacles[i], deltaTime, projectionMatrix, obstacles[i], obstacles[i].texture);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl, object) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.positions), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(object.indices), gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoordinates = object.textureCoordinates;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
			gl.STATIC_DRAW);

	const normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	const vertexNormals = object.vertexNormals;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
			gl.STATIC_DRAW);


    return {
      position: positionBuffer,
      normal: normalBuffer,
  		textureCoord: textureCoordBuffer,
      indices: indexBuffer,
      type: object.type,
    };
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
