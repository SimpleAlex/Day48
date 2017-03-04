var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = 800,
  cx = cw / 2;
var ch = canvas.height = 550,
  cy = ch / 2;
ctx.strokeStyle = "#ff3366";
var frames = 0;
var fl = 350;
var N = 1;
var x = 0.1,
  y = 0,
  z = 0;
var n = 4;
var n1 = n,
  n2 = n,
  n3 = n,
  M = 12,
  a = 10,
  b = 14;

var speed = 0.00005;
var m = {
  x: 0,
  y: 0
};
var rot = 0;

var points = [];

function Point(x, y, z, r1, r2) {
  this.r = 2;
  this.r1 = r1;
  this.r2 = r2;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.xpos = x;
  this.ypos = y;
  this.zpos = z;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.rot = 0;
  this.visible = true;
}

function rotateY(p, rot) {
  var cos = Math.cos(rot);
  var sin = Math.sin(rot);
  var x1 = p.xpos * cos - p.zpos * sin;
  var z1 = p.zpos * cos + p.xpos * sin;
  p.xpos = x1;
  p.zpos = z1;
  if (p.zpos > -fl) {
    var scale = fl / (fl + p.zpos);
    p.scaleX = p.scaleY = scale;
    p.x = cx + p.xpos * scale * N;
    p.y = cy + p.ypos * scale * N;
    p.visible = true;
  } else {
    p.visible = false;
  }
}
function rotateX(p, rot) {
  var cos = Math.cos(rot);
  var sin = Math.sin(rot);
  var y1 = p.ypos * cos - p.zpos * sin;
  var z1 = p.zpos * cos + p.ypos * sin;
  p.ypos = y1;
  p.zpos = z1;
  if (p.zpos > -fl) {
    var scale = fl / (fl + p.zpos);
    p.scaleX = p.scaleY = scale;
    p.x = cx + p.xpos * scale * N;
    p.y = cy + p.ypos * scale * N;
    p.visible = true;
  } else {
    p.visible = false;
  }
}


var rot = 0;
var rotX = 0;
var points1 = PBsupershape3D1();
var points2 = PBsupershape3D2();

function Draw() {
  frames+= speed;
  requestId = window.requestAnimationFrame(Draw);
  ctx.clearRect(-cw, -ch, 2 * cw, 2 * ch)
  rot = (m.x - cx) * speed;
  rotX = (m.y - cy) * speed/2;
  drawShape(points1);
  drawShape(points2);
}
requestId = window.requestAnimationFrame(Draw);


function drawShape(points){
  ctx.beginPath();
  for (var i = 0; i < points.length; i++) {
    if (points[i].visible) {
      rotateY(points[i], rot);
      rotateX(points[i], rotX);
      ctx.lineTo(points[i].x, points[i].y);
    }
  }
  ctx.stroke();
}

function PBsupershape3D1() {
  var points = [];

  for (var phi = -Math.PI / 2; phi <= Math.PI / 2; phi += .03) {
    for (var t = -Math.PI; t < Math.PI; t += .03) {

      buildPoint(points,phi,t)
    }
  }
   return points;
}

function PBsupershape3D2() {
  var points = [];

  for (var t = -Math.PI / 2; t <= Math.PI / 2; t += .06) {
    for (var phi = -Math.PI; phi < Math.PI; phi += .06) {

      buildPoint(points,phi,t);
    }
  }
  return points;
}


function buildPoint(points,phi,t){
  var r1 = supershapeR(phi);
      var r2 = supershapeR(t);
      var x = r1 * Math.cos(phi) * r2 * Math.cos(t);
      var y = r1 * Math.sin(phi) * r2 * Math.cos(t);
      var z = M * r2 * Math.sin(t);

      var p = new Point(x, y, z, r1, r2);
      points.push(p);
}

function supershapeR(phi) {
  var cos = Math.abs((1 / a) * Math.cos(phi * M / 3));
  var sin = Math.abs((1 / b) * Math.sin(phi * M / 3));
  var r = 1 / (Math.pow(Math.pow(cos, n2) + Math.pow(sin, n3), 1 / n1));

  return r;
}

canvas.addEventListener("mousemove", function(e) {
  m = oMousePos(canvas, e);
}, false);

canvas.addEventListener("mouseout", function(e) {
  m = {
    x: 0,
    y: 0
  };
}, false);

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  };
}
