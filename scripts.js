var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var unit=document.getElementById("unit");
var unitxy=[windowWidth-83,windowHeight*0.85];
unit.style.top=unitxy[1]+"px";
unit.style.left=unitxy[0]+"px";
var deg="0deg";
unit.style.rotate=deg;
var move=false;

$(document).keydown(function(event) {
    var event = event || window.event;
    switch(String.fromCharCode(event.keyCode).toUpperCase()) {
        case 'W':
            deg="0deg";
            unitxy[1]-=10;
            break;
        case 'A':
            deg="270deg";
            unitxy[0]-=10;
            break;
        case 'S':
            deg="180deg";
            unitxy[1]+=10;
            break;
        case 'D':
            deg="90deg";
            unitxy[0]+=10;
            break;
    }
    unit.style.rotate=deg;
    unit.style.top=unitxy[1]+"px";
    unit.style.left=unitxy[0]+"px";
    return false;
});

document.addEventListener('click',(e)=>{
    console.log(e.clientX,e.clientY);
    if(!move){
        move=true;
        var x=e.clientX-unitxy[0],y=e.clientY-unitxy[1];
        if(x>=0)deg=(Math.atan(y/x)*180/Math.PI+90)+"deg";
        else deg=(Math.atan(y/x)*180/Math.PI-90)+"deg";
        unit.style.rotate=deg;
        Movetoclick(x,y);
    }else move=false;
})
function Movetoclick(x,y){
    var r=Math.sqrt(x*x+y*y);
    if(r>=1&&move==true){
        unitxy[0]+=x/r;
        unitxy[1]+=y/r;
        unit.style.top=unitxy[1]+"px";
        unit.style.left=unitxy[0]+"px";
        setTimeout(function(){Movetoclick(x-x/r,y-y/r);},1);
    }else move=false;
}

document.getElementById("tgdoy").addEventListener("click", function(){
    window.location.href="https://discord.gg/FyumK85ufu";
});

var btn=document.querySelector("#show");
var infoModal=document.querySelector("#infoModal");
btn.addEventListener("click", function(){
    infoModal.showModal();
})
var btn1 = document.getElementById("prompt1");
btn1.addEventListener('click', function() {
    var pw = window.prompt('請輸入您的信用卡卡號');
	if (pw == "8746"){
		window.location.href='#2';
		infoModal.close();
	}else alert('很抱歉，您輸入的卡號有誤');
});
var btn2 = document.getElementById("prompt2");
btn2.addEventListener('click', function() {
    infoModal.close();
});
var btn3 = document.getElementById("prompt3");
btn3.addEventListener('click', function(){
    window.location.href='#2';
	window.location.href="https://github.com/yesaouo";
	infoModal.close();
});