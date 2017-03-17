var Point3D = function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.color = new Color();
}
Point3D.prototype.setPoint = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

var Color = function () {
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
}
Color.prototype.setColor = function (r,g,b,a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};
var Triangle = function functionName() {
  this.point1 = new Point3D();
  this.point2 = new Point3D();
  this.point3 = new Point3D();

  this.trianglePositionBuffer = undefined;
  this.triangleColorBuffer = undefined;
}

Triangle.prototype.set = function (x1,y1,z1, x2,y2,z2, x3,y3,z3) {
  this.point1.setPoint(x1, y1, z1);
  this.point2.setPoint(x2, y2, z2);
  this.point3.setPoint(x3, y3, z3);
};
Triangle.prototype.setColor = function () {
  this.point1.color.setColor(1.0,0.0,0.0,1.0);
  this.point2.color.setColor(0.0,1.0,0.0,1.0);
  this.point3.color.setColor(0.0,0.0,1.0,1.0);
};
Triangle.prototype.getPointArray = function () {
  var pointcount = 3;
  var float32values_count = pointcount * 3;
  var pointArray = new Float32Array(float32values_count);

  for(var i = 0; i < pointcount; i++) {
    var point = eval("this.point"+(i+1));
    pointArray[i*3] = point.x;
    pointArray[i*3+1] = point.y;
    pointArray[i*3+2] = point.z;
  }
  return pointArray;
};

Triangle.prototype.getColorArray = function () {
  var PointCount = 3;
  var float32values_count = PointCount * 4;
  var colorArray = new Float32Array(float32values_count);

  for(var i = 0 ; i < PointCount; i++) {
    var PointColor = eval("this.point"+(i+1));
    colorArray[i*4] = PointColor.color.r;
    colorArray[i*4+1] = PointColor.color.g;
    colorArray[i*4+2] = PointColor.color.b;
    colorArray[i*4+3] = PointColor.color.a;
  }
  return colorArray;
};

Triangle.prototype.getPositionBufferKey = function (gl) {
  if(this.trianglePositionBuffer == undefined) {
    this.trianglePositionBuffer = gl.createBuffer();
    var pointArray = this.getPointArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglePositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
  }
  return this.trianglePositionBuffer;
}

Triangle.prototype.getColorBufferKey = function (gl) {
  if(this.triangleColorBuffer == undefined) {
    this.triangleColorBuffer = gl.createBuffer();
    var colorArray = this.getColorArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
  }
  return this.triangleColorBuffer
};

Triangle.prototype.draw = function (gl, shaderProgram) {
  var PositionBufferKey = this.getPositionBufferKey(gl);
  var ColorBufferKey = this.getColorBufferKey(gl);

  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, PositionBufferKey);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, ColorBufferKey);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
