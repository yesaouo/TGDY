let login = false;
const menu = document.getElementById("menu");
const user = document.getElementById("user");
const dialogLogin = document.getElementById("dialog-login");
const dialogMsg = document.getElementById("dialog-msg");
const userBtn = document.getElementById("user-btn");
const userHello = document.getElementById("user-hello");
const userWallet = document.getElementById("user-wallet");
const userDiscord = document.getElementById("user-discord");
document.onclick=function(e){
  if(e.target.className == 'user-btn'){
    if(login){
      user.classList.toggle("open");
    }else{
      dialogMsg.innerHTML = '<br>';
      dialogLogin.showModal();
    }
  }else if(e.target.id == 'menu-btn'){
    menu.classList.toggle("open");
  }else if(e.target.id == 'dialog-cancel'){
    dialogLogin.close();
  }else if(e.target.id == 'user-rename'){
    changeName();
  }else if(e.target.id == 'user-photo'){
    changePhoto();
  }else if(e.target.id == 'user-discord'){
    changeDiscord();
  }else if(e.target.id == 'user-logout'){
    LogOut();
  }
}
function Keydown(e) {
  if(e.keyCode==27) {
    menu.classList.toggle("open");
    user.classList.toggle("open");
  }
}
document.addEventListener('keydown', Keydown, false);

function checkAccount(){
  if(document.getElementById("acc").value==''||document.getElementById("pas").value==''){
    dialogMsg.innerHTML =  'Enter account and password';
    return false;
  }else return true;
}
function getName(){
  let name;
  while(!name){
    name=window.prompt('Enter your name');
  }
  return name;
}
function getText(str){
  return window.prompt(str);
}
function LogOut(){
  login = false;
  user.classList.toggle("open");
  userBtn.innerHTML = '<img src="img/user.png" class="user-btn">';
}
async function LogIn(){
  try {
    if(checkAccount()){
      const acc = document.getElementById("acc").value;
      const pas = document.getElementById("pas").value;
      localStorage.setItem('tgdy-account',acc);
      localStorage.setItem('tgdy-password',pas);
      const response = await fetch(`/login?acc=${acc}&pas=${pas}`);
      let profile = await response.text();
      try {
        profile = JSON.parse(profile);
        dialogLogin.close();
        login = true;
        userBtn.innerHTML = `<img src="${profile["Photo"]}" class="user-btn"><img src="img/angle-small-down.png" class="user-btn">`;
        userHello.innerHTML = `Hello, ${profile["Name"]}!`;
        userWallet.innerHTML = `<img src="img/dollar.png">${profile["Coin"]}&nbsp<img src="img/diamond.png">${profile["Diamond"]}`;
        userDiscord.innerHTML = ("Discord" in profile)? profile["Discord"] : 'Add Discord account';
      } catch (error) {
        dialogMsg.innerHTML = profile;
      }
    }
  } catch (error) {dialogMsg.innerHTML = "Error";}
}
async function SignUp(){
  try {
    if(checkAccount()){
      const name = getName();
      const acc = document.getElementById("acc").value;
      const pas = document.getElementById("pas").value;
      localStorage.setItem('tgdy-account',acc);
      localStorage.setItem('tgdy-password',pas);
      const response = await fetch(`/signup?acc=${acc}&pas=${pas}&name=${name}`);
      dialogMsg.innerHTML = await response.text();
    }
  } catch (error) {dialogMsg.innerHTML = "Error";}
}
async function changeName(){
  try {
    const name = getText('Enter your name');
    if(name != null){
      const acc = localStorage.getItem('tgdy-account');
      const pas = localStorage.getItem('tgdy-password');
      const response = await fetch(`/changename?acc=${acc}&pas=${pas}&name=${name}`);
      const result = await response.text();
      if(result != "Error"){
        userHello.innerHTML = 'Hello, ' + name + '!';
      }
      alert(result);
    }
  } catch (error) {alert("Error");}
}
async function changePhoto(){
  try {
    const url = getText('Paste your photo link');
    if(url != null){
      const acc = localStorage.getItem('tgdy-account');
      const pas = localStorage.getItem('tgdy-password');
      const response = await fetch(`/changephoto?acc=${acc}&pas=${pas}&photo=${url}`);
      const result = await response.text();
      if(result != "Error"){
        userBtn.innerHTML = `<img src="${url}" class="user-btn"><img src="img/angle-small-down.png" class="user-btn">`;
      }
      alert(result);
    }
  } catch (error) {alert("Error");}
}
async function changeDiscord(){
  try {
    const dc = getText('Enter your Discord ID (ex: Username#0000)');
    if(dc != null){
      const acc = localStorage.getItem('tgdy-account');
      const pas = localStorage.getItem('tgdy-password');
      const response = await fetch(`/changediscord?acc=${acc}&pas=${pas}&dcname=${dc.split('#')[0]}&dcnum=${dc.split('#')[1]}`);
      const result = await response.text();
      if(result != "Error"){
        userDiscord.innerHTML = dc;
      }
      alert(result);
    }
  } catch (error) {alert("Error");}
}
function Start(){
  document.getElementById("logo-title").innerHTML = (document.body.clientWidth > 500)? "The Grand Duchy of Yesa" : "TGDY";
  var localacc=localStorage.getItem('tgdy-account');
  var localpas=localStorage.getItem('tgdy-password');
  if(localacc && localpas){
    document.getElementById("acc").value=localacc;
    document.getElementById("pas").value=localpas;
    LogIn();
  }
}
window.addEventListener("load",Start,false);