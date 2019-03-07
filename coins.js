function coin(gl, initial_x, initial_z) {


  const positions = [];
  for (var i = 0; i < 50; i++) {
    positions[9*i] = 0.0;
    positions[9*i+1] = 0.0;
    positions[9*i+2] = 0.0;
    positions[9*i+3] = 0.075*Math.cos(2*3.14159265*i/50);
    positions[9*i+4] = 0.075*Math.sin(2*3.14159265*i/50);
    positions[9*i+5] = 0.0;
    positions[9*i+6] = 0.075*Math.cos((2*3.14159265*(i+1))/50);
    positions[9*i+7] = 0.075*Math.sin((2*3.14159265*(i+1))/50);
    positions[9*i+8] = 0.0;
  }

  const indices = [];

  for(var i = 0; i< 50;++i){

      indices[3*i] = 3*i;
      indices[3*i + 1] = 3*i + 1;
      indices[3*i + 2] = 3*i +2;
  }

  var colors = [];

  for (var j = 0; j < 50; ++j) {
    const c = [0.996, 0.87, 0.0, 1.0];
    colors = colors.concat(c, c, c);
  }

  const vertexNormals = [];

  for(let i = 0;i < 150; ++i){
    vertexNormals[3*i] = 1.0;
    vertexNormals[3*i + 1] = 0.0;
    vertexNormals[3*i + 2] = 0.0;
  }

  const textureCoordinates = [];
  let x = 0;

  for(let i = 0 ;i < 50; ++i){

    for(let j = 0;j<9;++j){
        if((9*i+j)%3 != 1 && (9*i+j) != 1)
        {
          textureCoordinates[x++] = positions[9*i+j];
        }
    }
  }

  const texture = loadTexture(gl, 'assets/coin.jpg');

  return {
      'indices': indices,
      'vertexCount': 150,
      'positions': positions,
      'vertexNormals' : vertexNormals,
      'textureCoordinates' : textureCoordinates,
      'texture' : texture,
      'rotation': 0.05,
      'translate': [initial_x, 0.85, initial_z],
      'type': "coins",
    }


}

function coin_tick(gl, coins){

  for(let i = 0; i <coins.length; ++i){

    coins[i].translate[2] += 0.075;
  }

}
