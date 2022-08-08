var board=document.getElementById("board");
var ctx=board.getContext('2d');
var Hp=[24,24];
var PP=[12,12];
function drawbg(){
    ctx.beginPath();
    ctx.fillStyle="#FFF2CC";
    ctx.moveTo(0,300);
    ctx.lineTo(500,300);
    ctx.lineTo(500,500);
    ctx.lineTo(0,500);
    ctx.fill();
}
function drawline(){
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.moveTo(0,300);
    ctx.lineTo(500,300);
    ctx.lineTo(500,310);
    ctx.lineTo(0,310);
    ctx.fill();
    ctx.moveTo(350,310);
    ctx.lineTo(340,310);
    ctx.lineTo(340,500);
    ctx.lineTo(350,500);
    ctx.fill();
    ctx.closePath();
}
function drawHp(){
    ctx.clearRect(0, 0, 1000, 20);
    ctx.beginPath();
    ctx.fillStyle="#FF0000";
    ctx.moveTo(0,0);
    ctx.lineTo(5*Hp[0],0);
    ctx.lineTo(5*Hp[0],15);
    ctx.lineTo(0,15);
    ctx.fill();
    ctx.moveTo(500,0);
    ctx.lineTo(500-5*Hp[1],0);
    ctx.lineTo(500-5*Hp[1],15);
    ctx.lineTo(500,15);
    ctx.fill();
    ctx.closePath();
    ctx.font = "15px sans-serif";
    ctx.fillStyle="#00DDDD";
    ctx.fillText("Hp:"+Hp[0],0,12);
    ctx.fillText("Hp:"+Hp[1],450,12);
}
function drawPP(){
    ctx.clearRect(0, 20, 1000,40);
    ctx.beginPath();
    ctx.fillStyle="#00DDDD";
    ctx.moveTo(0,20);
    ctx.lineTo(5*PP[0],20);
    ctx.lineTo(5*PP[0],35);
    ctx.lineTo(0,35);
    ctx.fill();
    ctx.moveTo(500,20);
    ctx.lineTo(500-5*PP[1],20);
    ctx.lineTo(500-5*PP[1],35);
    ctx.lineTo(500,35);
    ctx.fill();
    ctx.closePath();
    ctx.font = "15px sans-serif";
    ctx.fillStyle="#FF0000";
    ctx.fillText("PP:"+PP[0],0,33);
    ctx.fillText("PP:"+PP[1],450,33);
}
document.getElementById("atk-choose-btn").onclick = function(event){
    
}