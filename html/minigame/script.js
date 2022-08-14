var board=document.getElementById("board");
var ctx=board.getContext('2d');
var dice=document.getElementById("dice");
var win=document.getElementById("win");
var lose=document.getElementById("lose");
var text=document.getElementById("text");
var atk_btn=document.getElementById("atk-choose-btn");
var def_btn=document.getElementById("def-choose-btn");
var rec_btn=document.getElementById("rec-choose-btn");
var reboot_btn=document.getElementById("reboot-btn");
var player1=document.getElementById("player1");
var player2=document.getElementById("player2");
var previous_btn=document.getElementById("previous-choose-btn");
var play_btn=document.getElementById("play-choose-btn");
var next_btn=document.getElementById("next-choose-btn");
var player1_choose=document.getElementById("player1-choose");
var player2_choose=document.getElementById("player2-choose");
var Hp=[];
var PP=[];
var playerchx=[];
function Initialization() {
    drawBg();
    Reboot();
}
function drawBg(){
    ctx.beginPath();
    ctx.fillStyle="#FFF2CC";
    ctx.moveTo(0,300);
    ctx.lineTo(500,300);
    ctx.lineTo(500,500);
    ctx.lineTo(0,500);
    ctx.fill();
    ctx.closePath();
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
    if(Hp[1]>20)player2.style.backgroundImage="url('character/p1_0.png')";
    if(Hp[1]<=20)player2.style.backgroundImage="url('character/p1_1.png')";
    if(Hp[1]<=15)player2.style.backgroundImage="url('character/p1_2.png')";
    if(Hp[1]<=10)player2.style.backgroundImage="url('character/p1_3.png')";
    if(Hp[1]<=5)player2.style.backgroundImage="url('character/p1_4.png')";
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
function Reboot(){
    Hp[0]=24;
    Hp[1]=24;
    PP[0]=12;
    PP[1]=12;
    playerchx[0]=40;
    playerchx[1]=410;
    atk_btn.style.display="";
    def_btn.style.display="";
    rec_btn.style.display="";
    player1.style.display="";
    player2.style.display="";
    player1_choose.style.display="none";
    player2_choose.style.display="none";
    reboot_btn.style.display="none";
    dice.style.display="none";
    win.style.display="none";
    lose.style.display="none";
    text.value="";
    player1_choose.style.left="40px";
    player2_choose.style.left="410px";
    drawHp();
    drawPP();
}
function getRandom(n){
    return Math.floor(Math.random()*n)+1;
}

//battle
function Battle1(p1_choose){
    let p2_choose = getRandom(3);
    if(PP[0]<6){
        switch(PP[0]){
            case 5:
                if(getRandom(2)>1)p2_choose=1;
                break;
            case 4:
                if(getRandom(3)>1)p2_choose=1;
                break;
            case 3:
                if(getRandom(4)>1)p2_choose=1;
                break;
            default:
                p2_choose=1;
                break;
        }
    }
    if(PP[1]<6){
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
            default:
                p2_choose = 3;
                break;
        }
    }
    text.value = "你選擇" + Choose(p1_choose) + ",對手選擇" + Choose(p2_choose);
    playerchx[0]=40;
    playerchx[1]=410;
    if(p1_choose==1)player1_choose.style.backgroundImage="url('atk.png')";
    if(p1_choose==2)player1_choose.style.backgroundImage="url('def.png')";
    if(p1_choose==3)player1_choose.style.backgroundImage="url('rec.png')";
    if(p2_choose==1)player2_choose.style.backgroundImage="url('atk.png')";
    if(p2_choose==2)player2_choose.style.backgroundImage="url('def.png')";
    if(p2_choose==3)player2_choose.style.backgroundImage="url('rec.png')";
    player1_choose.style.display="";
    player2_choose.style.display="";
    Animate(p1_choose,p2_choose);
}
function Choose(n){
    switch (n){
        case 1: return "攻擊";
        case 2: return "防禦";
        default: return "回魔";
    }
}
function Animate(n1,n2){
    if(playerchx[0]>190)Animate2(n1,n2);
    else{
        playerchx[0]++;
        playerchx[1]--;
        player1_choose.style.left=playerchx[0]+"px";
        player2_choose.style.left=playerchx[1]+"px";
        setTimeout(function(){Animate(n1,n2)},1);
    }
}
function Animate2(n1,n2){
    if(playerchx[0]<140){
        dice.style.display="";
        setTimeout(function(){dice.style.display="none";},3000);
        Battle2(n1,n2);
    }else{
        playerchx[0]-=2;
        playerchx[1]+=2;
        player1_choose.style.left=playerchx[0]+"px";
        player2_choose.style.left=playerchx[1]+"px";
        setTimeout(function(){Animate2(n1,n2)},5);
    }
}
function Battle2(p1_choose,p2_choose){
    let res1=0, res2=0;
    const dice1 = getRandom(6), dice2 = getRandom(6);
    text.value += "\n擲骰中. 擲骰中.. 擲骰中...\n你的點數是" + dice1 + "，對手的點數是" + dice2 + "\n";
    if (p1_choose == 1 && p2_choose == 1){
        if (dice1 > dice2) {
            res2 = dice1;
            text.value += "對手無法攻擊到你，而你對他造成了" + res2 + "點傷害";
        }
        else if (dice1 < dice2) {
            res1 = dice2;
            text.value += "你無法攻擊到對手，而他對你造成了" + res1 + "點傷害";
        }else text.value += "高手過招，無人受傷";
        
    }
    if (p1_choose == 2 && p2_choose == 2) text.value += "雙方皆損失了" + dice1 + "點能量";
    if (p1_choose == 1 && p2_choose == 2){
        if (dice1 > dice2) { res2 = dice1 - dice2; text.value += "你對對手造成了" + res2 + "點傷害"; }
        if (dice1 < dice2) { res1 = dice2 - dice1; text.value += "對手對你造成了" + res1 + "點傷害，並回復了" + res1 + "點血量"; Hp[1] += res1; }
        if (dice1 == dice2) text.value += "雙方皆損失了" + dice1 + "點能量";
    }
    if (p1_choose == 2 && p2_choose == 1){
        if (dice1 < dice2) { res1 = dice2 - dice1; text.value += "對手對你造成了" + res1 + "點傷害"; }
        if (dice1 > dice2) { res2 = dice1 - dice2; text.value += "你對對手造成了" + res2 + "點傷害，並回復了" + res2 + "點血量"; Hp[0] += res2; }
        if (dice1 == dice2) text.value += "雙方皆損失了" + dice1 + "點能量";
    }
    if (p1_choose == 3 && p2_choose == 3) { text.value += "你回復了" + dice1 + "點能量，對手回復了" + dice2 + "點能量"; PP[0] += dice1 * 2; PP[1] += dice2 * 2; }
    if (p1_choose == 2 && p2_choose == 3) { text.value += "對手回復了" + dice2 + "點能量，你白白損失了" + dice1 + "點能量"; PP[1] += dice2 * 2; }
    if (p1_choose == 3 && p2_choose == 2) { text.value += "你回復了" + dice1 + "點能量，對手白白損失了" + dice2 + "點能量"; PP[0] += dice1 * 2; }
    if (p1_choose == 1 && p2_choose == 3) { res2 = dice1; text.value += "對手回復了" + dice2 + "點能量，你對他造成了" + res2 + "點傷害"; PP[1] += dice2 * 2; }
    if (p1_choose == 3 && p2_choose == 1) { res1 = dice2; text.value += "對手對你造成了" + res1 + "點傷害，你回復了" + dice1 + "點能量"; PP[0] += dice1 * 2; }
    Hp[0] -= res1; Hp[1] -= res2; PP[0] -= dice1; PP[1] -= dice2;
    if (Hp[0] > 0 && Hp[1] > 0 && PP[0] >= 0 && PP[1] >= 0){
        text.value += "\n你現在有" + Hp[0] + "點血量，" + PP[0] + "點能量\n對手現在有" + Hp[1] + "點血量，" + PP[1] + "點能量";
        drawHp();
        drawPP();
    }else{
        if (Hp[0] <= 0||PP[0] < 0) {
            if(Hp[0]<=0)text.value += "\n你的血量歸零";
            if(PP[0]<0)text.value += "\n你的魔力枯竭";
            text.value+="\nYou Lose!";
            lose.style.display="";
        }else {
            if(Hp[1]<=0)text.value += "\n對手血量歸零";
            if(PP[1]<0)text.value += "\n對手魔力枯竭";
            text.value+="\nYou Win!";
            win.style.display="";
        }
        text.value += "\n本遊戲由夜颯製作，感謝您的遊玩";
        atk_btn.style.display="none";
        def_btn.style.display="none";
        rec_btn.style.display="none";
        reboot_btn.style.display="";
        player1.style.display="none";
        player2.style.display="none";
        player1_choose.style.display="none";
        player2_choose.style.display="none";
    }
}

//musicplayer
const audio = document.createElement("audio");
var song=1;
var play = true;
audio.src = "MP3/"+song+".mp3";
audio.volume=0.1;
function playAudio() {
    audio.play();
    play_btn.style.backgroundImage="url('MP3/pause.png')"
}
function pauseAudio(){
    audio.pause();
    play_btn.style.backgroundImage="url('MP3/play.png')"
}
function nextAudio() {
    if(song == 7)song = 0;
    song++;
    audio.src = "MP3/"+song+".mp3";
}
function previousAudio() {
    if(song == 0)song = 8;
    song--;
    audio.src = "MP3/"+song+".mp3";
}

//onclick
atk_btn.onclick = function(event){
    Battle1(1);
}
def_btn.onclick = function(event){
    Battle1(2);
}
rec_btn.onclick = function(event){
    Battle1(3);
}
reboot_btn.onclick = function(event){
    Reboot();
}
previous_btn.onclick = function(event){
    previousAudio();
    playAudio();
}
next_btn.onclick = function(event){
    nextAudio();
    playAudio();
}
play_btn.onclick = function(event){
    if(play)playAudio();
    else pauseAudio();
    play=!play;
}