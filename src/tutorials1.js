var Point3D = function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
}
Point3D.prototype.set = function (x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

Point3D.prototype.PointBuffers = function (gl) {
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  var PointCount = 1;
  var PointFloat = PointCount * 3 ;
  var PointArray = new Float32Array(PointFloat);

  PointArray[0] = this.x;
  PointArray[1] = this.y;
  PointArray[2] = this.z;



  gl.bufferData(gl.ARRAY_BUFFER, PointArray, gl.STATIC_DRAW);
};

Point3D.prototype.draw = function (gl , shaderProgram) {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.drawArrays(gl.POINTS, 0, 1);
};

var Triangles = function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;

  this.x1 = 0;
  this.y1 = 0;
  this.z1 = 0;

  this.x2 = 0;
  this.y2 = 0;
  this.z2 = 0;
}
Triangles.prototype.set = function (x,y,z, x1,y1,z1, x2,y2,z2) {
  this.x = x;
  this.y = y;
  this.z = z;

  this.x1 = x1;
  this.y1 = y1;
  this.z1 = z1;

  this.x2 = x2;
  this.y2 = y2;
  this.z2 = z2;
};

Triangles.prototype.PointBuffers = function (gl) {
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  var PointCount = 4;
  var PointFloat = PointCount * 3 ;
  var PointArray = new Float32Array(PointFloat);

  PointArray[0] = this.x;
  PointArray[1] = this.y;
  PointArray[2] = this.z;

  PointArray[3] = this.x1;
  PointArray[4] = this.y1;
  PointArray[5] = this.z1;

  PointArray[6] = this.x2;
  PointArray[7] = this.y2;
  PointArray[8] = this.z2;

  PointArray[9] = 0.0;
  PointArray[10] = -1.0;
  PointArray[11] = this.z2;

  gl.bufferData(gl.ARRAY_BUFFER, PointArray, gl.STATIC_DRAW);
};

Triangles.prototype.draw = function (gl , shaderProgram) {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.drawArrays(gl.POINTS, 0, 4);
};
