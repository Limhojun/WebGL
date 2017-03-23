
var Point3D = function () {
  this.x = 0;  this.y = 0;  this.z = 0;
  this.color = new Color();
};

Point3D.prototype.setPoint = function (x,y,z) {
  this.x = x; this.y = y; this.z = z;
};

var Color = function () {
  this.r = 1;  this.g = 0;  this.b = 0;  this.a = 1;
};

Color.prototype.setColor = function (r,g,b,a) {
  this.r = r; this.g = g; this.b = b; this.a = a;
};

var Triangle = function () {
  this.point1 = new Point3D();
  this.point2 = new Point3D();
  this.point3 = new Point3D();

  this.trianglePositionBufferKey = undefined;
  this.triangleColorBufferKey = undefined;
};

Triangle.prototype.makeTriangle = function (x1,y1,z1 ,x2,y2,z2, x3,y3,z3) {
  for(var i = 0 ; i< 3; i++) {
    var point = eval("this.point"+(i+1));
    var x = eval("x"+(i+1));
    var y = eval("y"+(i+1));
    var z = eval("z"+(i+1));
    point.setPoint(x,y,z);
  }
};
Triangle.prototype.setColor = function (r,g,b,a) {
  this.point1.color.setColor(r,g,b,a);
  this.point2.color.setColor(r,g,b,a);
  this.point3.color.setColor(r,g,b,a);
};
Triangle.prototype.getTrianglePositionArray = function () {
  var triangleCount = 1;
  var float32values_count = triangleCount * 3 * 3;
  var triangleArray = new Float32Array(float32values_count);
  for(var i = 0 ; i < triangleCount * 3; i++) {
    var point = eval("this.point"+(i+1));
    triangleArray[i*3] = point.x;
    triangleArray[i*3+1] = point.y;
    triangleArray[i*3+2] = point.z;
  }
  return triangleArray;
};

Triangle.prototype.getTriangleColorArray = function () {
  var triangleCount = 1;
  var float32values_count = triangleCount * 3 * 4;
  var triangleArray = new Float32Array(float32values_count);
  for(var i = 0 ; i < triangleCount * 3; i++) {
    var point = eval("this.point"+(i+1));
    triangleArray[i*4] = point.color.r;
    triangleArray[i*4+1] = point.color.g;
    triangleArray[i*4+2] = point.color.b;
    triangleArray[i*4+3] = point.color.a;
  }
  return triangleArray;
};

Triangle.prototype.getTrianglePositionBufferKey = function (gl) {
  if(this.trianglePositionBufferKey == undefined) {
    this.trianglePositionBufferKey = gl.createBuffer();
    var triangleArray = this.getTrianglePositionArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglePositionBufferKey);
    gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
  }
  return this.trianglePositionBufferKey;
};

Triangle.prototype.getTriangleColorBufferKey = function (gl) {
  if(this.triangleColorBufferKey == undefined) {
    this.triangleColorBufferKey = gl.createBuffer();
    var triangleArray = this.getTriangleColorArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleColorBufferKey);
    gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
  }
  return this.triangleColorBufferKey;
};

Triangle.prototype.draw = function (gl, shaderProgram) {
  var positionBufferKey = this.getTrianglePositionBufferKey(gl);
  var colorBufferKey = this.getTriangleColorBufferKey(gl);

  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,3,gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferKey);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,4,gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

var Pyramid = function () {
  this.triangle1 = new Triangle();
  this.triangle2 = new Triangle();
  this.triangle3 = new Triangle();
  this.triangle4 = new Triangle();
  this.triangle5 = new Triangle();
  this.triangle6 = new Triangle();
}

Pyramid.prototype.makePyramid = function () {
  this.triangle1.makeTriangle(-1.0,-1.0,0.0, 1.0,1.0,0.0, -1.0,1.0,0.0);
  this.triangle2.makeTriangle(-1.0,-1.0,0.0, 1.0,-1.0,0.0, 1.0,1.0,0.0);
  this.triangle3.makeTriangle(-1.0,-1.0,0.0, 1.0,-1.0,0.0, 0.0,0.0,1.0);
  this.triangle4.makeTriangle(1.0,-1.0,0.0, 1.0,1.0,0.0, 0.0,0.0,1.0);
  this.triangle4.setColor(0.0,0.0,0.0,1.0);
  this.triangle5.makeTriangle(1.0,1.0,0.0, -1.0,1.0,0.0, 0.0,0.0,1.0);
  this.triangle5.setColor(0.0,0.0,1.0,1.0);
  this.triangle6.makeTriangle(-1.0,1.0,0.0, -1.0,-1.0,0.0, 0.0,0.0,1.0);
  this.triangle6.setColor(0.0,1.0,0.0,1.0);
};

Pyramid.prototype.draw = function (gl ,shaderProgram) {
  for(var i = 0 ; i < 6 ; i++) {
    var triangle = eval("this.triangle"+(i+1));
    triangle.draw(gl, shaderProgram);
  }
};
