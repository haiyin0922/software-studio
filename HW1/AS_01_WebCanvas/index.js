var pencil = false;
var eraser = false;
var text = false;
var circle = false;
var triangle = false;
var rectangle = false;
var line = false;
var undo = false;
var textEnd = true;
var lineEnd = true;

var step = -1;
var maxstep = -1;
var userhistory = new Array();

function listener(){
  var isDrawing = false;
  var isErasing = false;
  var isTexting = false;
  var isCircling = false;
  var isTriangling = false;
  var isRectangling = false;
  var isLining = false;
  var x = 0;
  var y = 0;
  var x1 = 0;
  var y1 = 0;

  canvas.addEventListener('mousedown', e => {
    context.globalCompositeOperation = "source-over";
    if(pencil){
      isDrawing = true;
    }
    else if(eraser){
      isErasing = true;
      context.globalCompositeOperation = "destination-out";
    }
    else if(text && textEnd){
      isTexting = true;
    }
    else if(circle){
      isCircling = true;
      tempCanvas.style.zIndex = 1;
      canvas.style.zIndex = 0;
    }
    else if(triangle){
      isTriangling = true;
      tempCanvas.style.zIndex = 1;
      canvas.style.zIndex = 0;
    }
    else if(rectangle){
      isRectangling = true;
      tempCanvas.style.zIndex = 1;
      canvas.style.zIndex = 0;
    }
    else if(line){
      isLining = true;
      tempCanvas.style.zIndex = 1;
      canvas.style.zIndex = 0;
    }
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    x1 = x;
    y1 = y;

  });

  canvas.addEventListener('mousemove', e => {
    if(isDrawing){
      draw(x, y, e.clientX - rect.left, e.clientY - rect.top);
    }
    else if(isErasing){
      erase(x, y, e.clientX - rect.left, e.clientY - rect.top);
    }
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseup', e => {
    if(isDrawing){
      draw(x, y, e.clientX - rect.left, e.clientY - rect.top);
      isDrawing = false;
      push();
    }
    else if(isErasing){
      erase(x, y, e.clientX - rect.left, e.clientY - rect.top);
      isErasing = false;
      push();
    }
    else if(isTexting){
      if(!textEnd){
        drawText();
        textEnd = true;
        isTexting = false;
        push();
      }
      else{
        inputText(x, y);
        textEnd = false;
      }
    }
    if(undo){
      maxstep = step;
      undo = false;
    }
    x = 0;
    y = 0;
  });

  canvas.addEventListener('mouseleave', e => {
    if(isDrawing){
      draw(x, y, e.clientX - rect.left, e.clientY - rect.top);
      isDrawing = false;
      push();
    }
    else if(isErasing){
      erase(x, y, e.clientX - rect.left, e.clientY - rect.top);
      isErasing = false;
      push();
    }
    else if(isTexting){
      if(!textEnd){
        drawText();
        textEnd = true;
        isTexting = false;
        push();
      }
      else{
        inputText(x, y);
        textEnd = false;
      }
    }
    if(undo){
      maxstep = step;
      undo = false;
    }
    x = 0;
    y = 0;
  });

  tempCanvas.addEventListener('mousedown', e => {
  });

  tempCanvas.addEventListener('mousemove', e => {
    if(isCircling){
      tempDrawcircle((e.clientX - rect.left + x1)/2, (e.clientY - rect.top + y1)/2, Math.abs((e.clientX - rect.left - x1)/2));
    }
    else if(isTriangling){
      tempDrawtriangle(x1, y1, e.clientX - rect.left, e.clientY - rect.top);
    }
    else if(isRectangling){
      tempDrawrectangle(x1, y1, e.clientX - rect.left - x1+5, e.clientY - rect.top - y1+5);
      
    }
    else if(isLining){
      tempDrawline(x1, y1, e.clientX - rect.left, e.clientY - rect.top);
    }
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  });

  tempCanvas.addEventListener('mouseup', e => {
    if(isCircling){
      drawcircle((x + x1)/2, (y + y1)/2, Math.abs((x - x1)/2));
      isCircling = false;
    }
    else if(isTriangling){
      drawtriangle(x1, y1, x, y);
      isTriangling = false;
    }
    else if(isRectangling){
      drawrectangle(x1, y1, e.clientX - rect.left - x1, e.clientY - rect.top - y1);
      isRectangling = false;
    }
    else if(isLining){
      drawline(x1, y1, x, y);
      isLining = false;
    }
    tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    canvas.style.zIndex = 1;
    tempCanvas.style.zIndex = 0;
    x = 0;
    y = 0;
    push();
  });

  tempCanvas.addEventListener('mouseleave', e => {
    if(isCircling){
      drawcircle((x + x1)/2, (y + y1)/2, Math.abs((x - x1)/2));
      isCircling = false;
      push();
    }
    else if(isTriangling){
      drawtriangle(x1, y1, x, y);
      isTriangling = false;
      push();
    }
    else if(isRectangling){
      drawrectangle(x1, y1, e.clientX - rect.left - x1, e.clientY - rect.top - y1);
      isRectangling = false;
      push();
    }
    else if(isLining){
      drawline(x1, y1, x, y);
      isLining = false;
      push();
    }
    tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    canvas.style.zIndex = 1;
    tempCanvas.style.zIndex = 0;
    x = 0;
    y = 0;
  });
}

function pencilClicked(){
  document.body.style.cursor="url(cur/pencil.cur), auto";
  pencil = true;
  eraser = false;
  text = false;
  circle = false;
  triangle = false;
  rectangle = false;
  line = false;
}

function eraserClicked(){
  document.body.style.cursor="url(cur/eraser.cur), auto";
  pencil = false;
  eraser = true;
  text = false;
  circle = false;
  triangle = false;
  rectangle = false;
  line = false;
}

function textClicked(){
  document.body.style.cursor="url(cur/text.cur), auto";
  pencil = false;
  eraser = false;
  text = true;
  circle = false;
  triangle = false;
  rectangle = false;
  line = false;
}

function circleClicked(){
  document.body.style.cursor="url(cur/circle.cur), auto";
  pencil = false;
  eraser = false;
  text = false;
  circle = true;
  triangle = false;
  rectangle = false;
  line = false;
}

function triangleClicked(){
  document.body.style.cursor="url(cur/triangle.cur), auto";
  pencil = false;
  eraser = false;
  text = false;
  circle = false;
  triangle = true;
  rectangle = false;
  line = false;
}

function rectangleClicked(){
  document.body.style.cursor="url(cur/square.cur), auto";
  pencil = false;
  eraser = false;
  text = false;
  circle = false;
  triangle = false;
  rectangle = true;
  line = false;
}

function lineClicked(){
  document.body.style.cursor="url(cur/line.cur), auto";
  pencil = false;
  eraser = false;
  text = false;
  circle = false;
  triangle = false;
  rectangle = false;
  line = true;
}

function downloadClicked(){
  context.globalCompositeOperation = "source-over";
  var save_link = document.createElement('a');
  save_link.href = canvas.toDataURL('png');
  save_link.download = 'myCanvas.png';
 
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  save_link.dispatchEvent(event);
}

function uploadClicked(){
  context.globalCompositeOperation = "source-over";
  var src = URL.createObjectURL(myImg.files[0]);
  var img = new Image();
  img.src = src;
  img.onload=function(){
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
    push();
  };
}

function undoClicked(){
  context.globalCompositeOperation = "source-over";
  if(step > 0){
    undo = true;
    step--;
    let canvaspic = new Image();
    canvaspic.src = userhistory[step];
    canvaspic.onload = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(canvaspic, 0, 0);
    }
  }
}

function redoClicked(){
  context.globalCompositeOperation = "source-over";
  if(step < maxstep){
    step++;
    let canvaspic = new Image();
    canvaspic.src = userhistory[step];
    canvaspic.onload = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(canvaspic, 0, 0);
    }
  }
}

function resetClicked(){
  context.globalCompositeOperation = "source-over";
  context.clearRect(0, 0, canvas.width, canvas.height);
  step = 0;
  maxstep = 0;
}

function push(){
  step++;
  maxstep++;
  userhistory[step] = canvas.toDataURL();
}

function draw(x1, y1, x2, y2){
  context.strokeStyle = color.value;
  context.lineCap = 'round';
  context.lineWidth = range.value;
  context.beginPath();
  context.moveTo(x1+18, y1+32);
  context.lineTo(x2+18, y2+32);
  context.stroke();
  context.closePath();
}

function erase(x1, y1, x2, y2){
  context.lineWidth = range.value;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(x1-5, y1+30);
  context.lineTo(x2-5, y2+30);
  context.stroke();
  context.closePath();
}

function inputText(x, y){
  input.type = 'text';
  input.style.left = (x+127) + 'px';
  input.style.top = (y+65) + 'px';
  input.style.position = 'absolute';
  input.style.zIndex = 2;
  textSpace.append(input);
  input.focus();
}

var input = document.createElement('input');
function drawText(){
  context.fillStyle = color.value;
  context.font = font.value + 'px ' + size.value;
  context.fillText(input.value, parseInt(input.style.left, 10)-80, parseInt(input.style.top, 10)-45);  
  textSpace.removeChild(input);
  input.value = null;
}

function drawcircle(x, y, r){
  context.strokeStyle = color.value;;
  context.lineWidth = range.value;
  context.beginPath();
  context.arc(x, y, r, 0, 2*Math.PI, true);
  context.closePath();
  context.stroke();
}

function tempDrawcircle(x, y, r){
  tempContext.strokeStyle = color.value;
  tempContext.lineWidth = range.value;
  tempContext.beginPath();
  tempContext.arc(x, y, r, 0, 2*Math.PI, true);
  tempContext.closePath();
  tempContext.stroke();
}

function drawtriangle(x1, y1, x2, y2){
  context.strokeStyle = color.value;
  context.lineWidth = range.value;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2+15, y2);
  context.lineTo(x1-(x2+15-x1), y2);
  context.closePath();
  context.stroke();
}

function tempDrawtriangle(x1, y1, x2, y2){
  tempContext.strokeStyle = color.value;
  tempContext.lineWidth = range.value;
  tempContext.beginPath();
  tempContext.moveTo(x1, y1);
  tempContext.lineTo(x2+15, y2);
  tempContext.lineTo(x1-(x2+15-x1), y2);
  tempContext.closePath();
  tempContext.stroke();
}

function drawrectangle(x1, y1, x2, y2){
  context.strokeStyle = color.value;
  context.lineWidth = range.value;
  context.strokeRect(x1, y1, x2+5, y2+5);
}

function tempDrawrectangle(x1, y1, x2, y2){
  tempContext.strokeStyle = color.value;
  tempContext.lineWidth = range.value;
  tempContext.strokeRect(x1, y1, x2+5, y2+5);
}

function drawline(x1, y1, x2, y2){
  context.strokeStyle = color.value;
  context.lineWidth = range.value;
  context.beginPath();
  context.moveTo(x1+25, y1);
  context.lineTo(x2+25, y2);
  context.closePath();
  context.stroke();
}

function tempDrawline(x1, y1, x2, y2){
  tempContext.strokeStyle = color.value;
  tempContext.lineWidth = range.value;
  tempContext.beginPath();
  tempContext.moveTo(x1+25, y1);
  tempContext.lineTo(x2+25, y2);
  tempContext.closePath();
  tempContext.stroke();
}

window.onload = function(){
  window.canvas = document.getElementById('myCanvas');
  window.context = canvas.getContext('2d');
  window.textSpace = document.getElementById('canvas');
  window.rect = canvas.getBoundingClientRect();
  window.tempCanvas = document.getElementById('tempCanvas');
  window.tempContext = tempCanvas.getContext('2d');
  window.tempRect = tempCanvas.getBoundingClientRect();
  window.color = document.getElementById('color');
  window.range = document.getElementById('range');
  window.size = document.getElementById('menu1');
  window.font = document.getElementById('menu2');
  window.myImg = document.getElementById('file');
  tempContext.globalCompositeOperation = 'destination-atop';
  push();
  listener();
}