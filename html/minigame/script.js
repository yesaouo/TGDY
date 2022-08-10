var board=document.getElementById("board");
var ctx=board.getContext('2d');
var dice=document.getElementById("dice");
var text=document.getElementById("text");
dice.style.display="none";
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
    ctx.clearRect(0, 0, 500, 20);
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
    ctx.clearRect(0, 20, 500,40);
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
function Dice(){
    dice.style.display="";
    setTimeout(function(){dice.style.display="none";},3000);
}
function getRandom(n){
    return Math.floor(Math.random()*n)+1;
}
function Choose(n){
    switch (n){
        case 1: return "攻擊";
        case 2: return "防禦";
        default: return "回魔";
    }
}
function reBattle(){

}
function Battle(p1_choose){
    let p2_choose = getRandom(3);
    if (p2_choose != 3){
        switch (PP[1]){
            case 5:
                if (getRandom(6) < 3) p2_choose = 3;
                break;
            case 4:
                if (getRandom(6) < 4) p2_choose = 3;
                break;
            case 3:
                if (getRandom(6) < 5) p2_choose = 3;
                break;
            case 2:
                if (getRandom(6) < 6) p2_choose = 3;
                break;
            default:
                if (PP[1] == 0 || PP[1] == 1) p2_choose = 3;
                break;
        }
    }
    let str = "你選擇" + Choose(p1_choose) + ",對手選擇" + Choose(p2_choose);
    const dice1 = getRandom(6), dice2 = getRandom(6);
    Dice();
    str += "\n擲骰中. 擲骰中.. 擲骰中...\n你的點數是" + dice1 + ",對手的點數是" + dice2 + "\n";
    let res1 = 0, res2 = 0;
    if (p1_choose == 1 && p2_choose == 1)
    {
        if (dice1 > dice2) {
            res2 = dice1;
            str += "對手無法攻擊到你,而你對他造成了" + res2 + "點傷害";
        }
        else if (dice1 < dice2) {
            res1 = dice2;
            str += "你無法攻擊到對手,而他對你造成了" + res1 + "點傷害";
        }else str += "高手過招，無人受傷";
        
    }
    if (p1_choose == 2 && p2_choose == 2) str += "雙方皆損失了" + dice1 + "點能量";
    if (p1_choose == 1 && p2_choose == 2)
    {
        if (dice1 > dice2) { res2 = dice1 - dice2; str += "你對對手造成了" + res2 + "點傷害"; }
        if (dice1 < dice2) { res1 = dice2 - dice1; str += "對手對你造成了" + res1 + "點傷害，並回復了" + res1 + "點血量"; Hp[1] += res1; }
        if (dice1 == dice2) str += "雙方皆損失了" + dice1 + "點能量";
    }
    if (p1_choose == 2 && p2_choose == 1)
    {
        if (dice1 < dice2) { res1 = dice2 - dice1; str += "對手對你造成了" + res1 + "點傷害"; }
        if (dice1 > dice2) { res2 = dice1 - dice2; str += "你對對手造成了" + res2 + "點傷害，並回復了" + res2 + "點血量"; Hp[0] += res2; }
        if (dice1 == dice2) str += "雙方皆損失了" + dice1 + "點能量";
    }
    if (p1_choose == 3 && p2_choose == 3) { str += "你回復了" + dice1 + "點能量，對手回復了" + dice2 + "點能量"; PP[0] += dice1 * 2; PP[1] += dice2 * 2; }
    if (p1_choose == 2 && p2_choose == 3) { str += "對手回復了" + dice2 + "點能量，而你白白損失了" + dice1 + "點能量"; PP[1] += dice2 * 2; }
    if (p1_choose == 3 && p2_choose == 2) { str += "你回復了" + dice1 + "點能量，而對手白白損失了" + dice2 + "點能量"; PP[0] += dice1 * 2; }
    if (p1_choose == 1 && p2_choose == 3) { res2 = dice1; str += "你對對手造成了" + res2 + "點傷害，對手回復了" + dice2 + "點能量"; PP[1] += dice2 * 2; }
    if (p1_choose == 3 && p2_choose == 1) { res1 = dice2; str += "你回復了" + dice1 + "點能量，對手對你造成了" + res1 + "點傷害"; PP[0] += dice1 * 2; }
    Hp[1] -= res2; Hp[0] -= res1; PP[0] -= dice1; PP[1] -= dice2;
    if (Hp[0] > 0 && Hp[1] > 0 && PP[0] >= 0 && PP[1] >= 0){
        str += "\n你現在有" + Hp[0] + "點血量，" + PP[0] + "點能量\n對手現在有" + Hp[1] + "點血量，" + PP[1] + "點能量";
        drawHp();
        drawPP();
        text.value=str;
    }else{
        if (Hp[0] <= 0) {
            text.value = str+"\n抱歉，你已經死了!";
        }else if (PP[0] < 0) {
            text.value = str+"\n死因:精盡人亡";
        }else text.value = str+"\nYou Win!";
        text.value += "\n本遊戲由夜颯製作，感謝您的遊玩";
    }
}
document.getElementById("atk-choose-btn").onclick = function(event){
    Battle(1);
}
document.getElementById("def-choose-btn").onclick = function(event){
    Battle(2);
}
document.getElementById("rec-choose-btn").onclick = function(event){
    Battle(3);
}
