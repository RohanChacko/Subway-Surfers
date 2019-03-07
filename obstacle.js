function obstacle(gl, z_dist) {

  const positions = [
    // Front
    -0.5, 0.5 , 0.75,
    -0.5, -0.5, 0.75,
    0.5, -0.5, 0.75,
    0.5, 0.5 , 0.75,

    //Right
    0.5, -0.5, 0.75,
    0.5, 0.5 , 0.75,
    0.5, 0.5 , -0.75,
    0.5, -0.5, -0.75,

    //Back
    0.5, 0.5 , -0.75,
    0.5, -0.5, -0.75,
    -0.5, -0.5, -0.75,
    -0.5, 0.5 , -0.75,

    //Left
    -0.5, -0.5, -0.75,
    -0.5, 0.5 , -0.75,
    -0.5, 0.5 , 0.75,
    -0.5, -0.5, 0.75,

    //Top
    -0.5, 0.5 , 0.75,
    0.5, 0.5 , 0.75,
    0.5, 0.5 , -0.75,
    -0.5, 0.5 , -0.75,

    //Bottom
    -0.5, -0.5, 0.75,
    0.5, -0.5, 0.75,
    0.5, -0.5, -0.75,
    -0.5, -0.5, -0.75,
  ];


  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23,
    24, 25, 26, 24, 26, 27,
    28, 29, 30, 28, 30, 31,
    32, 33, 34, 32, 34, 35,
  ];

  const vertexNormals = [

    // Front
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    // Right
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    // Back
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,

    // Left
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,

    // Top
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
  ];

  const textureCoordinates = [
    // Front
    0.0,  1.0,
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,

    // Back
    0.0,  1.0,
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,

    // Top
    0.0,  1.0,
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,

    // Bottom
    0.0,  1.0,
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,

    // Right
    0.0,  1.0,
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,

    // Left
    0.0,  1.0,
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,

  ];

  const texture = loadTexture(gl, 'assets/train.jpg');

  return {
    'indices': indices,
    'vertexCount': 36,
    'positions': positions,
    'vertexNormals' : vertexNormals,
    'textureCoordinates' : textureCoordinates,
    'texture' : texture,
    'rotation': 0.05,
    'translate': [0.55 , 1.0, z_dist],
    'initial_z': z_dist,
    'type': "obstacle",
  }

}

function obstacle_tick(gl, obstacles){

  for(let i = 0; i < obstacles.length; ++i){

    obstacles[i].translate[2] += 0.075;
  }

}
