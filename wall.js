function wall(gl, z_dist, scale, side) {
  // Now create an array of positions for the cube.

  const positions = [
    // Front
    -5.0, 10.0 * scale, 6.0,
    -5.0, -10.0, 6.0,
    5.0, -10.0, 6.0,
    5.0, 10.0 * scale, 6.0,

    //Right
    5.0, -10.0, 6.0,
    5.0, 10.0 * scale, 6.0,
    5.0, 10.0 * scale, -6.0,
    5.0, -10.0, -6.0,

    //Back
    5.0, 10.0 * scale, -6.0,
    5.0, -10.0, -6.0,
    -5.0, -10.0, -6.0,
    -5.0, 10.0 * scale, -6.0,

    //Left
    -5.0, -10.0, -6.0,
    -5.0, 10.0 * scale, -6.0,
    -5.0, 10.0 * scale, 6.0,
    -5.0, -10.0, 6.0,

    //Top
    -5.0, 10.0 * scale, 6.0,
    5.0, 10.0 * scale, 6.0,
    5.0, 10.0 * scale, -6.0,
    -5.0, 10.0 * scale, -6.0,

    //Bottom
    -5.0, -10.0, 6.0,
    5.0, -10.0, 6.0,
    5.0, -10.0, -6.0,
    -5.0, -10.0, -6.0,
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
    // Right
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

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
    // Front
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
  ];

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
  ];

  const texture = loadTexture(gl, 'assets/wall.jpg');

  return {
    'indices': indices,
    'vertexCount': 36,
    'positions': positions,
    'vertexNormals' : vertexNormals,
    'textureCoordinates' : textureCoordinates,
    'texture' : texture,
    'rotation': 0.05,
    'translate': [12 * side, 0, z_dist],
    'initial_z': z_dist,
    'type': "wall",
    'side': side,
  }
}

function wall_delete(gl, object) {

  var index = walls.indexOf(object);
  var r = getRandomFloat(0.8, 2.5);

  walls[index] = wall(gl, -150, r, object.side);
  buffer_objects[index + objects.length] = initBuffers(gl, walls[walls.length - 1]);
}

function wall_tick(gl, walls) {

  for (var i = 0; i < walls.length; ++i) {

    walls[i].translate[2] += 0.2;

    if (walls[i].translate[2] > -4) {
      wall_delete(gl, walls[i]);
    }
  }

}
