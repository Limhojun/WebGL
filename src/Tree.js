var Point3D = function () {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.color = new Color();
};

Point3D.prototype.setPoint = function (x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

var Color = function () {
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
};

Color.prototype.setColor = function (r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};


var Line = function () {
  this.point1 = new Point3D();
  this.point2 = new Point3D();
};

Line.prototype.setLine = function (x1, y1, z1, x2, y2, z2) {
  this.point1.setPoint(x1, y1, z1);
  this.point2.setPoint(x2, y2, z2);
};

Line.prototype.setColor = function () {
  this.point1.color.setColor(0.6,0.4,0.4,1.0);
  this.point2.color.setColor(0.8,0.4,0.4,1.0);
};

var LineArrayList = function (){
  this.lineArray = [];
  this.linePositionBufferKey = undefined;
  this.lineColorBufferKey = undefined;
};

LineArrayList.prototype.newLine = function (x1,y1,z1, x2,y2,z2) {
  var line = new Line();
  line.setLine(x1,y1,z1, x2, y2, z2);
  line.setColor();
  this.lineArray.push(line);
  return this.lineArray;
};

LineArrayList.prototype.getLinePositionArray = function () {
  var lineCount = this.lineArray.length;
  var float32values_count = lineCount * 2 * 3;
  var lineArray = new Float32Array(float32values_count);

  for(var i = 0 ; i < lineCount; i++) {
    var line = this.lineArray[i];
    lineArray[i*6] = line.point1.x;
    lineArray[i*6+1] = line.point1.y;
    lineArray[i*6+2] = line.point1.z;

    lineArray[i*6+3] = line.point2.x;
    lineArray[i*6+4] = line.point2.y;
    lineArray[i*6+5] = line.point2.z;
  }
  return lineArray;

};

LineArrayList.prototype.getLineColorArray = function () {
  var lineCount = this.lineArray.length;
  var float32values_count = lineCount * 2 * 4;
  var lineArray = new Float32Array(float32values_count);

  for(var i = 0 ; i < lineCount; i++) {
    var line = this.lineArray[i];
    lineArray[i*8] = line.point1.color.r;
    lineArray[i*8+1] = line.point1.color.g;
    lineArray[i*8+2] = line.point1.color.b;
    lineArray[i*8+3] = line.point1.color.a;

    lineArray[i*8+4] = line.point2.color.r;
    lineArray[i*8+5] = line.point2.color.g;
    lineArray[i*8+6] = line.point2.color.b;
    lineArray[i*8+7] = line.point2.color.a;
  }
  return lineArray;
};

LineArrayList.prototype.getLineArrayBufferKey = function (gl) {
  if(this.linePositionBufferKey == undefined) {
    this.linePositionBufferKey = gl.createBuffer();
    var lineArray = this.getLinePositionArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.linePositionBufferKey);
    gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW);
  }
  return this.linePositionBufferKey;
};

LineArrayList.prototype.getLineColorBufferKey = function (gl) {
  if(this.lineColorBufferKey == undefined) {
    this.lineColorBufferKey = gl.createBuffer();
    var lineArray = this.getLineColorArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.lineColorBufferKey);
    gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW);
  }
  return this.lineColorBufferKey;
};

LineArrayList.prototype.draw = function (gl, shaderProgram) {
  var linePositionBufferKey = this.getLineArrayBufferKey(gl);
  var lineColorBufferKey = this.getLineColorBufferKey(gl);

  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

  var lineCount = this.lineArray.length;
  gl.bindBuffer(gl.ARRAY_BUFFER, linePositionBufferKey);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, lineColorBufferKey);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
  gl.lineWidth(8);
  gl.drawArrays(gl.LINES, 0, lineCount * 2);
};

var Tree = function () {
  this.TreeArray = new LineArrayList();
  this.treePositionBufferKey = undefined;
  this.treeColorBufferKey = undefined;

  this.x =0;
  this.StartPointY =0.0;
};

Tree.prototype.makeTree = function () {
  if(this.TreeArray.lineArray.length == 0) {
    this.TreeArray.newLine(0.0,0.0,0.0, 0.0,this.StartPointY,0.0);
  }
};

Tree.prototype.setTree = function (x,y,z) {
  var tree1 = this.TreeArray.lineArray[0];
  tree1.setLine(0,0,0, x,y,z);
};

Tree.prototype.draw = function (gl, shaderProgram) {
  this.TreeArray.draw(gl, shaderProgram);
};
