//Canvas'ımı yani Resim tahtamı ve Context'ı oluşturdum. 'Here I create canvas and Context'

const canvas = document.getElementById('oyuntablo');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 800;

//Ekranın boyutunun değişmesine karşın düzeltme yapan fonksiyon

window.addEventListener('resize', function () {
  canvasposition = canvas.getBoundingClientRect();
});

//Evrensel Değişkenler 'Global Variables' Burda projede Global şekilde kullanacağım değişkenleri atadım. 'Here I assign the global variables of the project'

const cellsize = 100; //Giridsel olarak canvası parçalamak istediğim için. 'For creating the girid system'
const cellgap = 3; //Giridsel nesnelerin boyutunu ayarlamak için. 'For calibrate the objects in the game'
const gamegrid = []; //Giridsel Haritayı Oluşturmak için. 'For creating grid map'
const defenders = []; //Savunanları tutacak array. 'Array For Defenders'
const enemies = []; //Saldıranları tutacak array. 'Array For Enemies'
const enemypositions = []; //Saldıranların canvastaki pozisyonlarını tutan array. 'Array For Enemypositions'
const resources = []; //Toplanacak Kaynakları Tutacak array. 'Array For Resources'
const floatingmassages = []; //Uyarılar için array. 'Array for Massagses'
const leveltypes = []; //Bölüm Seçimi 'Level Choosing'
const MermiType = []; //Mermi Tiplerinin Tanımlanması 'Bullet Types'
const deftypes = []; //Savunanların türü 'Defender Types'
const enemytypes = []; //Saldıranların türü 'Enemy Types'
const Hammadde = []; //Hammadde 'Resources'
const miktar = [20, 30, 40]; //Toplandığında eklenilcek miktar 'Gain Resource when Resource Taken'
let projectiles = []; //Mermiler için array. 'Array For Projectiles'
let enemiesinterval = 1000;
let winningscore = 10000;
let frame = 0;
let numberofresources = 300;
let numberofadvantages = 3;
let numberofarti = 3;
let gameover = false;
let score = 0;
let choosendefender = 6;
let start = false;
let defender_Cost = 0;
let selectlevel = 0;
let startformenu = 0;
let howtp = 0;
let keytolevel = 0;
let submit = 0;
let levelend = 0;
let fps = 0;
let del = 0;
let opens = 0;
let controls = 0;
let controlc = 0;
let loose = false;
let cal = false;

//Assetler 'İmages'

//Mermi Types

const mermi1 = new Image();
mermi1.src = "images/mermi.png";
MermiType.push(mermi1);

const mermi2 = new Image();
mermi2.src = "images/Mermi2.png";
MermiType.push(mermi2);

//Level İmages

const level1 = new Image();
level1.src = "images/bolum1.jpg";
leveltypes.push(level1);

const level2 = new Image();
level2.src = "images/bolum2.jpg";
leveltypes.push(level2);

const level3 = new Image();
level3.src = "images/bolum3.png";
leveltypes.push(level3);

//Defender İmages

const def1 = new Image();
def1.src = "images/Soldier_DefS.png";
deftypes.push(def1);

const def2 = new Image();
def2.src = "images/T_DefS.png";
deftypes.push(def2);

const def3 = new Image();
def3.src = "images/P_FlyD.png";
deftypes.push(def3);

const art = new Image();
art.src = "images/arti.png";
deftypes.push(art);

const bunk = new Image();
bunk.src = "images/sandbag.png";
deftypes.push(bunk);

//Enemy İmages

const enemy1 = new Image();
enemy1.src = "images/Soldier_Walk.png";
enemytypes.push(enemy1);

const enemy2 = new Image();
enemy2.src = "images/T_Run.png";
enemytypes.push(enemy2);

const enemy3 = new Image();
enemy3.src = "images/p_Fly.png";
enemytypes.push(enemy3);

//Resources İmages

const Hammadde1 = new Image();
Hammadde1.src = "images/coin.png";
Hammadde.push(Hammadde1);

//Backgorund İmages

const ustbg = new Image();
ustbg.src = "images/cb1.png";

const ustbg2 = new Image();
ustbg2.src = "images/cb2.png";

const ustbg3 = new Image();
ustbg3.src = "images/cb3.png";

const bg = new Image();
bg.src = "images/bolum1bg.png";

const bg2 = new Image();
bg2.src = "images/bolum2bg.png";

const bg3 = new Image();
bg3.src = "images/bolumbg3.png";

const giris = new Image();
giris.src = "images/giris.jpg";

//Level Objectives and Level Ending Scense

const b1o = new Image();
b1o.src = "images/bolum1objectif.png";

const b2o = new Image();
b2o.src = "images/bolum2objectif.png";

const b3o = new Image();
b3o.src = "images/bolum3objectif.png";

const b1s = new Image();
b1s.src = "images/b1s.png";

const b2s = new Image();
b2s.src = "images/b2s.png";

const b3s = new Image();
b3s.src = "images/b3s.png";

//Nasıl oynanır 

const htp1 = new Image();
htp1.src = "images/htp1.png";

const htp2 = new Image();
htp2.src = "images/htp2.png";

const htp3 = new Image();
htp3.src = "images/htp3.png";

//Audio Mute Unmute

const mute = new Image();
mute.src = "images/mute.png";

const unmute = new Image();
unmute.src = "images/unmute.png";

//Ses Kayıtları 'Audios'

//Genel Arkaplan sesi

const bgaudio = new Audio();
bgaudio.src = "audios/Fallout.mp3"
bgaudio.volume = .20;
bgaudio.loop = true;

//Asker sesleri

const Emir = new Audio();
Emir.src = "audios/Emir.mp3"
Emir.volume = .30;

const Hazir = new Audio();
Hazir.src = "audios/Hazir.mp3"
Hazir.volume = .30;

//Bölüm Sesleri

const bolum1s = new Audio();
bolum1s.src = "audios/bolum1.mp3"
bolum1s.volume = .80;
bolum1s.loop = true;

const bolum2s = new Audio();
bolum2s.src = "audios/bolum2.mp3"
bolum2s.volume = .40;
bolum2s.loop = true;

const bolum3s = new Audio();
bolum3s.src = "audios/bolum3.mp3"
bolum3s.volume = .40;
bolum3s.loop = true;

//Fare + Klavye 'Mouse + Keyboard' 

const mouse = {
  clicked: false,
  x: 5,
  y: 5,
  width: 0.15,
  height: 0.15,
}

canvas.addEventListener('mousedown', function () {
  mouse.clicked = true;
});

canvas.addEventListener('mouseup', function () {
  mouse.clicked = false;
});

let canvasposition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function (e) {
  mouse.x = e.x - canvasposition.left;
  mouse.y = e.y - canvasposition.top;
});

canvas.addEventListener('mouseleave', function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

//Yer tespiti için fonksiyon

function collision(first, second) {
  if (!(first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  )
  ) {
    return true;
  };
};

//Oyun Sayfası (Gridal Sistem) 'GameBoard'

const controlbar = {
  width: canvas.width,
  height: cellsize,
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellsize;
    this.height = cellsize;
  }

  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.strokeStyle = 'Black';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

function creategrid() {
  for (let y = cellsize; y < canvas.height; y += cellsize) {
    for (let x = 0; x < canvas.width; x += cellsize) {
      gamegrid.push(new Cell(x, y));
    }
  }
}

creategrid();
function handlegamegrid() {
  for (let i = 0; i < gamegrid.length; i++) {
    gamegrid[i].draw();
  }
}

//Ses Kontrol 'Audio Control'

const sescontrol = {
  x: 855,
  y: 50,
  width: 50,
  height: 50
}

function seskontrol(){

  if(mouse.clicked == false){
    controlc = 0
  }
  
  if (collision(mouse, sescontrol) && mouse.clicked && !(controlc)) {
    controlc = 1;
    if(controls == 0){
      opens = 0;
      
    }
    else if(controls == 1){
      opens = 1;
    }
  }

  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(sescontrol.x, sescontrol.y, sescontrol.width, sescontrol.height);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(sescontrol.x, sescontrol.y, sescontrol.width, sescontrol.height);

  if(opens == 0){
    controls = 1;
    ctx.drawImage(mute,sescontrol.x, sescontrol.y, sescontrol.width, sescontrol.height);
    bgaudio.pause();
    bolum1s.pause();
    bolum2s.pause();
    bolum3s.pause();
  }
  else if (opens == 1){
    controls = 0;
    ctx.drawImage(unmute,sescontrol.x, sescontrol.y, sescontrol.width, sescontrol.height);
    if(keytolevel == 1){
      if(cal != true){
        bgaudio.pause();
        bolum1s.play();
        bolum2s.pause();
        bolum3s.pause();
        cal = true;
      }
    }
    else if(keytolevel == 2){
      if(cal != true){
        bgaudio.pause();
        bolum1s.pause();
        bolum2s.play();
        bolum3s.pause();
        cal = true;
      }
    }
    else if(keytolevel == 3){
      if(cal != true){
        bgaudio.pause();
        bolum1s.pause();
        bolum2s.pause();
        bolum3s.play();
        cal = true;
      }
    }
    else if (keytolevel == 0){
      bgaudio.play();
      bolum1s.pause();
      bolum2s.pause();
      bolum3s.pause();
      cal = false;
    }
  }
}

//Nasıl Oynanır Kısmı 'How To Play Part'

const nasil1 = {
  x: 100,
  y: 100,
  width: 200,
  height: 600
}
const nasil2 = {
  x: 400,
  y: 100,
  width: 200,
  height: 600
}
const nasil3 = {
  x: 700,
  y: 100,
  width: 200,
  height: 600
}
const nasil4 = {
  x: 400,
  y: 750,
  width: 200,
  height: 50
}

function htp() {

  let nasil1ss = 'black';
  let nasil2ss = 'black';
  let nasil3ss = 'black';
  let nasil4ss = 'black';

  if (collision(mouse, nasil4) && mouse.clicked) {
    howtp = 4;
  }

  if (howtp == 4) {
    nasil1ss = 'black';
    nasil2ss = 'black';
    nasil3ss = 'black';
    nasil4ss = 'gold';
  }
  else {
    nasil1ss = 'black';
    nasil2ss = 'black';
    nasil3ss = 'black';
    nasil4ss = 'black';
  }

  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.drawImage(htp1,nasil1.x, nasil1.y);
  ctx.strokeStyle = nasil1ss;
  ctx.strokeRect(nasil1.x, nasil1.y, nasil1.width, nasil1.height);
  ctx.fillStyle = 'green';
  ctx.font = '20px Arial';
  ctx.fillText('Genel Oyun Bilgileri', 110, 125);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.drawImage(htp2,nasil2.x, nasil2.y);
  ctx.strokeStyle = nasil2ss;
  ctx.strokeRect(nasil2.x, nasil2.y, nasil2.width, nasil2.height);
  ctx.fillStyle = 'green';
  ctx.font = '20px Arial';
  ctx.fillText('Birlikler', 470, 125);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.drawImage(htp3,nasil3.x, nasil3.y);
  ctx.strokeStyle = nasil3ss;
  ctx.strokeRect(nasil3.x, nasil3.y, nasil3.width, nasil3.height);
  ctx.fillStyle = 'green';
  ctx.font = '20px Arial';
  ctx.fillText('Bölümler', 760, 125);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(nasil4.x, nasil4.y, nasil4.width, nasil4.height);
  ctx.strokeStyle = nasil4ss;
  ctx.strokeRect(nasil4.x, nasil4.y, nasil4.width, nasil4.height);
  ctx.fillStyle = 'yellow';
  ctx.font = '30px Arial';
  ctx.fillText('Geri', 470, 785);

}

//Giriş Menusu kısmı 'Start Menu Part'

const girismenusu1 = {
  x: 100,
  y: 620,
  width: 200,
  height: 100
}
const girismenusu2 = {
  x: 400,
  y: 620,
  width: 200,
  height: 100
}
const girismenusu3 = {
  x: 700,
  y: 620,
  width: 200,
  height: 100
}

const girismenusu4 = {
  x: 100,
  y: 750,
  width: 200,
  height: 50
}

function startmenu() {

  let giris1ss = 'black';
  let giris2ss = 'black';
  let giris3ss = 'black';
  let giris4ss = 'black';

  if (collision(mouse, girismenusu1) && mouse.clicked) {
    startformenu = 1;
  }
  else if (collision(mouse, girismenusu2) && mouse.clicked) {
    startformenu = 2;
  }
  else if (collision(mouse, girismenusu3) && mouse.clicked) {
    startformenu = 3;
  }
  else if (collision(mouse, girismenusu4) && mouse.clicked) {
    startformenu = 4;
  }

  if (startformenu == 1) {
    giris1ss = 'gold';
    giris2ss = 'black';
    giris3ss = 'black';
    giris4ss = 'black';
  }
  else if (startformenu == 2) {
    giris1ss = 'black';
    giris2ss = 'gold';
    giris3ss = 'black';
    giris4ss = 'black';
  }
  else if (startformenu == 3) {
    giris1ss = 'black';
    giris2ss = 'black';
    giris3ss = 'gold';
    giris4ss = 'black';
  }
  else if (startformenu == 4) {
    giris1ss = 'black';
    giris2ss = 'black';
    giris3ss = 'black';
    giris4ss = 'gold';
  }
  else {
    giris1ss = 'black';
    giris2ss = 'black';
    giris3ss = 'black';
    giris4ss = 'black';
  }

  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(girismenusu1.x, girismenusu1.y, girismenusu1.width, girismenusu1.height);
  ctx.strokeStyle = giris1ss;
  ctx.strokeRect(girismenusu1.x, girismenusu1.y, girismenusu1.width, girismenusu1.height);
  ctx.fillStyle = 'yellow';
  ctx.font = '30px Arial';
  ctx.fillText('GitHub', 150, 680);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(girismenusu2.x, girismenusu2.y, girismenusu2.width, girismenusu2.height);
  ctx.strokeStyle = giris2ss;
  ctx.strokeRect(girismenusu2.x, girismenusu2.y, girismenusu2.width, girismenusu2.height);
  ctx.fillStyle = 'red';
  ctx.font = '50px Arial';
  ctx.fillText('Başla', 436, 680);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(girismenusu3.x, girismenusu3.y, girismenusu3.width, girismenusu3.height);
  ctx.strokeStyle = giris3ss;
  ctx.strokeRect(girismenusu3.x, girismenusu3.y, girismenusu3.width, girismenusu3.height);
  ctx.fillStyle = 'yellow';
  ctx.font = '30px Arial';
  ctx.fillText('LinkedIn', 740, 680);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(girismenusu4.x, girismenusu4.y, girismenusu4.width, girismenusu4.height);
  ctx.strokeStyle = giris4ss;
  ctx.strokeRect(girismenusu4.x, girismenusu4.y, girismenusu4.width, girismenusu4.height);
  ctx.fillStyle = 'yellow';
  ctx.font = '30px Arial';
  ctx.fillText('Nasıl Oynanır', 108, 785);
}

//Bölüm Dizaynı kısmı 'Level Disagn Part'

const bolum1 = {
  x: 100,
  y: 200,
  width: 200,
  height: 400
}
const bolum2 = {
  x: 400,
  y: 200,
  width: 200,
  height: 400
}
const bolum3 = {
  x: 700,
  y: 200,
  width: 200,
  height: 400
}
const geri1 = {
  x: 700,
  y: 750,
  width: 200,
  height: 50
}

function chooselevel() {

  let bolum1stroke = 'black';
  let bolum2stroke = 'black';
  let bolum3stroke = 'black';
  let geri1stroke = 'black';

  if (collision(mouse, bolum1) && mouse.clicked) {
    selectlevel = 1;
  }
  else if (collision(mouse, bolum2) && mouse.clicked) {
    selectlevel = 2;
  }
  else if (collision(mouse, bolum3) && mouse.clicked) {
    selectlevel = 3;
  }
  else if (collision(mouse, geri1) && mouse.clicked) {
    selectlevel = 4;
  }
  if (selectlevel == 1) {
    bolum1stroke = 'gold';
    bolum2stroke = 'black';
    bolum3stroke = 'black';
    geri1stroke = 'black';
  }
  else if (selectlevel == 2) {
    bolum1stroke = 'black';
    bolum2stroke = 'gold';
    bolum3stroke = 'black';
    geri1stroke = 'black';
  }
  else if (selectlevel == 3) {
    bolum1stroke = 'black';
    bolum2stroke = 'black';
    bolum3stroke = 'gold';
    geri1stroke = 'black';
  }
  else if (selectlevel == 4) {
    bolum1stroke = 'black';
    bolum2stroke = 'black';
    bolum3stroke = 'black';
    geri1stroke = 'gold';
  }
  else {
    bolum1stroke = 'black';
    bolum2stroke = 'black';
    bolum3stroke = 'black';
    geri1stroke = 'black';
  }

  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(bolum1.x, bolum1.y, bolum1.width, bolum1.height);
  ctx.strokeStyle = bolum1stroke;
  ctx.strokeRect(bolum1.x, bolum1.y, bolum1.width, bolum1.height);
  ctx.drawImage(level1, 0, 0, 200, 400, 100, 200, 200, 400);
  ctx.fillStyle = 'yellow';
  ctx.font = '18px Arial';
  ctx.fillText('Bölüm 1:', 165, 220);
  ctx.fillText('Sahillerde Savaşacağız!', 105, 240);


  ctx.fillRect(bolum2.x, bolum2.y, bolum2.width, bolum2.height);
  ctx.strokeStyle = bolum2stroke;
  ctx.strokeRect(bolum2.x, bolum2.y, bolum2.width, bolum2.height);
  ctx.drawImage(level2, 0, 0, 200, 400, 400, 200, 200, 400);
  ctx.fillStyle = 'yellow';
  ctx.font = '18px Arial';
  ctx.fillText('Bölüm 2:', 460, 220);
  ctx.fillText('Geriye Adım Yok!', 430, 240);

  ctx.fillRect(bolum3.x, bolum3.y, bolum3.width, bolum3.height);
  ctx.strokeStyle = bolum3stroke;
  ctx.strokeRect(bolum3.x, bolum3.y, bolum3.width, bolum3.height);
  ctx.drawImage(level3, 0, 0, 200, 400, 700, 200, 200, 400);
  ctx.fillStyle = 'yellow';
  ctx.font = '18px Arial';
  ctx.fillText('Bölüm 3:', 760, 220);
  ctx.fillText('AnaVatan İçin!', 740, 240);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(geri1.x, geri1.y, geri1.width, geri1.height);
  ctx.strokeStyle = geri1stroke;
  ctx.strokeRect(geri1.x, geri1.y, geri1.width, geri1.height);
  ctx.fillStyle = 'red';
  ctx.font = '30px Arial';
  ctx.fillText('Geri', 770, 785);
}

// Mermiler 'Projectiles'

class projectile {
  constructor(x, y, maxhealth) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speed = 10;
    this.defendertp = 0;
    this.power = 0;
    this.maxhealth = maxhealth;
  }
  update() {
    this.x += this.speed;
  }
  draw() {
    if (this.maxhealth == 100) {
      this.power = 20;
      ctx.drawImage(mermi1, 0, 0, 256, 46, this.x, this.y, this.width + 15, this.height);
    }
    else if (this.maxhealth == 200) {
      this.power = 30;
      ctx.drawImage(mermi1, 0, 0, 256, 46, this.x, this.y, this.width + 15, this.height);
    }
    else if (this.maxhealth == 250) {
      this.power = 40;
      ctx.drawImage(mermi1, 0, 0, 256, 46, this.x, this.y, this.width + 15, this.height);
    }
    else if (this.maxhealth == 25) {
      this.power = 60;
      ctx.drawImage(mermi2, 0, 0, 500, 148, this.x, this.y, this.width + 25, this.height);
    }
  }
}

function handleprojectile() {
  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].draw();
    projectiles[i].update();
    for (let j = 0; j < enemies.length; j++) {
      if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
        enemies[j].health -= projectiles[i].power;
        projectiles.splice(i, 1);
        i--;
      }
    }
    if (projectiles[i] && projectiles[i].x > canvas.width - cellsize || gameover || loose) {
      projectiles.splice(i, 1);
      i--;
    }
  }
}

//Savunanlar 'DEFENDERS' 

class defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellsize - cellgap * 2;
    this.height = cellsize - cellgap * 2;
    this.shoot = false;
    this.projectiles = [];
    this.timer = 0;
    this.framex = 0;
    this.framey = 0;
    this.minframe = 0;
    this.maxframe = 7;
    this.spritewidth = 258;
    this.spriteheight = 258;
    this.shootnow = false;
    this.choosendefender = choosendefender;
    if (this.choosendefender == 1) {
      this.health = 100;
      this.maxhealth = 100;
    }
    else if (this.choosendefender == 2) {
      this.health = 200;
      this.maxhealth = 200;
    }
    else if (this.choosendefender == 3) {
      this.health = 250;
      this.maxhealth = 250;
    }
    else if (this.choosendefender == 4) {
      this.health = 25;
      this.maxhealth = 25;
    }
    else if (this.choosendefender == 5) {
      this.health = 400;
    }
  }
  draw() {
    ctx.fillStyle = 'gold';
    ctx.font = '30px Arial';
    if (this.choosendefender == 1) {
      ctx.drawImage(def1, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
      ctx.fillText(Math.floor(this.health), this.x + 25, this.y + 25);
    }
    else if (this.choosendefender == 2) {
      ctx.drawImage(def2, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
      ctx.fillText(Math.floor(this.health), this.x + 25, this.y + 25);
    }
    else if (this.choosendefender == 3) {
      ctx.drawImage(def3, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
      ctx.fillText(Math.floor(this.health), this.x + 25, this.y + 25);
    }
    else if (this.choosendefender == 4) {
      ctx.drawImage(art, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
      ctx.fillText(Math.floor(this.health), this.x + 25, this.y + 25);
    }
    else if (this.choosendefender == 5) {
      ctx.drawImage(bunk, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
      ctx.fillText(Math.floor(this.health), this.x + 0, this.y + 60);
    }
  }
  update() {
    if (frame % 20 == 0) {
      if (this.framex < this.maxframe) {
        this.framex++;
      }
      else {
        this.framex = this.minframe;
      }
      if (this.framex == 4) {
        this.shootnow = true;
      }
    }

    if (this.choosendefender == 1) {
      if (this.shoot) {
        this.minframe = 1;
        this.maxframe = 7;
      }
      else {
        this.minframe = 0;
        this.maxframe = 0;
      }
    }
    if (this.choosendefender == 3) {
      if (this.shoot) {
        this.minframe = 1;
        this.maxframe = 7;
      }
      else {
        this.minframe = 0;
        this.maxframe = 0;
      }
    }
    if (this.choosendefender == 2) {
      if (this.shoot) {
        this.minframe = 1;
        this.maxframe = 7;
      }
      else {
        this.minframe = 0;
        this.maxframe = 0;
      }
    }
    if (this.choosendefender == 4) {
      if (this.shoot) {
        this.minframe = 1;
        this.maxframe = 7;
      }
      else {
        this.minframe = 0;
        this.maxframe = 0;
      }
    }

    if (this.shoot && this.shootnow) {
      projectiles.push(new projectile(this.x + 70, this.y + 50, this.maxhealth));
      this.shootnow = false;
    }
  }
}

// Savunucuların Seçimi İçin 'For Choosing Defenders'

const cart1 = {
  x: 10,
  y: 10,
  width: 70,
  height: 85
}
const cart2 = {
  x: 90,
  y: 10,
  width: 90,
  height: 85
}
const cart3 = {
  x: 190,
  y: 10,
  width: 90,
  height: 85
}
const cart4 = {
  x: 600,
  y: 10,
  width: 90,
  height: 85
}
const cart5 = {
  x: 700,
  y: 10,
  width: 90,
  height: 85
}

function choosedefender() {

  let cart1stroke = 'black';
  let cart2stroke = 'black';
  let cart3stroke = 'black';
  let cart4stroke = 'black';
  let cart5stroke = 'black';

  if (collision(mouse, cart1) && mouse.clicked) {
    choosendefender = 1;
    if(opens == 1){
      Emir.play();
    }
  }
  else if (collision(mouse, cart2) && mouse.clicked) {
    choosendefender = 2;
    if(opens == 1){
      Hazir.play();
    }
  }
  else if (collision(mouse, cart3) && mouse.clicked) {
    choosendefender = 3;
    if(opens == 1){
      Emir.play();
    }
  }
  else if (collision(mouse, cart4) && mouse.clicked) {
    choosendefender = 4;
    if(opens == 1){
      Hazir.play();
    }
  }
  else if (collision(mouse, cart5) && mouse.clicked) {
    choosendefender = 5;
  }
  if (choosendefender == 1) {
    cart1stroke = 'gold';
    cart2stroke = 'black';
    cart3stroke = 'black';
    cart4stroke = 'black';
    cart5stroke = 'black';
  }
  else if (choosendefender == 2) {
    cart1stroke = 'black';
    cart2stroke = 'gold';
    cart3stroke = 'black';
    cart4stroke = 'black';
    cart5stroke = 'black';
  }
  else if (choosendefender == 3) {
    cart1stroke = 'black';
    cart2stroke = 'black';
    cart3stroke = 'gold';
    cart4stroke = 'black';
    cart5stroke = 'black';
  }
  else if (choosendefender == 4) {
    cart1stroke = 'black';
    cart2stroke = 'black';
    cart3stroke = 'black';
    cart4stroke = 'gold';
    cart5stroke = 'black';
  }
  else if (choosendefender == 5) {
    cart1stroke = 'black';
    cart2stroke = 'black';
    cart3stroke = 'black';
    cart4stroke = 'black';
    cart5stroke = 'gold';
  }

  else {
    cart1stroke = 'black';
    cart2stroke = 'black';
    cart3stroke = 'black';
    cart4stroke = 'black';
    cart5stroke = 'black';
  }

  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';

  ctx.fillRect(cart1.x, cart1.y, cart1.width, cart1.height);
  ctx.strokeStyle = cart1stroke;
  ctx.strokeRect(cart1.x, cart1.y, cart1.width, cart1.height);
  ctx.drawImage(def1, 0, 0, 258, 258, 5, -3, 100, 100);

  ctx.fillRect(cart2.x, cart2.y, cart2.width, cart2.height);
  ctx.strokeStyle = cart2stroke;
  ctx.strokeRect(cart2.x, cart2.y, cart2.width, cart2.height);
  ctx.drawImage(def2, 0, 0, 258, 258, 95, 10, 80, 80);

  ctx.fillRect(cart3.x, cart3.y, cart3.width, cart3.height);
  ctx.strokeStyle = cart3stroke;
  ctx.strokeRect(cart3.x, cart3.y, cart3.width, cart3.height);
  ctx.drawImage(def3, 0, 0, 258, 258, 195, 10, 80, 80);

  ctx.fillRect(cart4.x, cart4.y, cart4.width, cart4.height);
  ctx.strokeStyle = cart4stroke;
  ctx.strokeRect(cart4.x, cart4.y, cart4.width, cart4.height);
  ctx.drawImage(art, 0, 0, 258, 258, 600, 10, 80, 80);

  ctx.fillRect(cart5.x, cart5.y, cart5.width, cart5.height);
  ctx.strokeStyle = cart5stroke;
  ctx.strokeRect(cart5.x, cart5.y, cart5.width, cart5.height);
  ctx.drawImage(bunk, 0, 0, 258, 258, 705, 10, 80, 80);

}

function handledefenders() {
  for (let i = 0; i < defenders.length; i++) {
    defenders[i].update();
    defenders[i].draw();
    if (enemypositions.indexOf(defenders[i].y) !== -1) {
      defenders[i].shoot = true;
    }
    else {
      defenders[i].shoot = false;
    }
    for (let j = 0; j < enemies.length; j++) {
      if (defenders[i] && collision(defenders[i], enemies[j])) {
        enemies[j].movement = 0;
        defenders[i].health -= 1;
      }
      if (defenders[i] && defenders[i].health <= 0) {
        defenders.splice(i, 1);
        i--;
        enemies[j].movement = enemies[j].speed;
      }
    }
    if (gameover || loose) {
      for (let i = 0; i < defenders.length; i++) {
        defenders.splice(i, 1);
        i--;
      }
    }
  }
}

//Uyarılar 'Floating Massages'

class floatingmassage {
  constructor(value, x, y, size, color) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.lifeSpan = 0;
    this.color = color;
    this.opacity = 1;
  }
  update() {
    if (levelend == 1) {
      this.y -= 0.3;
    }
    else {
      this.y -= 0.3;
    }
    if (levelend == 1) {
      this.lifeSpan += 0.5;
    }
    else {
      this.lifeSpan += 1;
    }
    if (this.opacity > 0.05) {
      if (!(levelend == 1)) {
        this.opacity -= 0.05;
      }
    }
  }
  draw() {
    ctx.globalalpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.font = this.size + 'px Arial';
    ctx.fillText(this.value, this.x, this.y);
    ctx.globalalpha = 1;
  }
}
function handlemassages() {
  for (let i = 0; i < floatingmassages.length; i++) {
    floatingmassages[i].update();
    floatingmassages[i].draw();
    if (floatingmassages[i].lifeSpan >= 50 || del==1) {
      floatingmassages.splice(i, 1);
      i--;
    }
  }
}

//Düşmanlar 'Enemies'

class enemy {
  constructor(verticalposition) {
    this.x = canvas.width;
    this.y = verticalposition;
    this.width = cellsize - cellgap * 2;
    this.height = cellsize - cellgap * 2;
    if(keytolevel == 1){
      this.speed = Math.random() * 0.4 + 0.5;
    }
    else if(keytolevel == 2){
      this.speed = Math.random() * 0.6 + 0.5;
    }
    else if(keytolevel == 3){
      this.speed = Math.random() * 0.8 + 0.5;
    }
    this.movement = this.speed;
    this.selection = Math.floor(Math.random() * enemytypes.length);
    this.enemytype = enemytypes[this.selection];
    this.framex = 0;
    this.framey = 0;
    this.minframe = 0;
    this.maxframe = 7;
    this.spritewidth = 256;
    this.spriteheight = 256;
    if (this.selection == 0) {
      this.health = 100;
    }
    else if (this.selection == 1) {
      this.health = 200;
    }
    else if (this.selection == 2) {
      this.health = 250;
    }
    else {
      this.health = 100;
    }
    this.maxhealth = this.health;
  }
  update() {
    this.x -= this.movement;
    if (frame % 20 == 0) {
      if (this.framex < this.maxframe) {
        this.framex++;
      }
      else {
        this.framex = this.minframe;
      }
    }
  }
  draw() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(Math.floor(this.health), this.x + 25, this.y + 25);
    ctx.drawImage(this.enemytype, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
  }
}

function handleenemies() {

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();
    if (enemies[i].x < 0) {
      loose = true;
    }
    if (enemies[i].health <= 0) {
      let gainresourse = (enemies[i].maxhealth / 5);
      numberofresources += (gainresourse);
      score += (gainresourse);
      const index = enemypositions.indexOf(enemies[i].y);
      floatingmassages.push(new floatingmassage('+' + gainresourse + ' Kadar Hammadde Kazanıldı!', enemies[i].x, enemies[i].y, 20, 'Black'));
      floatingmassages.push(new floatingmassage('+' + gainresourse, 520, 40, 30, 'gold'));
      enemypositions.splice(index, 1);
      enemies.splice(i, 1);
      i--;
    }

    if (loose || gameover) {
      const index = enemypositions.indexOf(enemies[i].y);
      enemypositions.splice(index, 1);
      enemies.splice(i, 1);
      i--;
    }
  }

  if (frame % enemiesinterval == 0) {
    let verticalposition = Math.floor(Math.random() * 7 + 1) * cellsize + cellgap;
    enemies.push(new enemy(verticalposition));
    enemypositions.push(verticalposition);
    if (enemiesinterval > 200) { enemiesinterval -= 20; }
  }
}

//Kaynaklar 'Resources'

class resource {
  constructor() {
    this.x = Math.random() * (canvas.width - cellsize);
    this.y = (Math.floor(Math.random() * 7) + 1) * cellsize + 25;
    this.width = 40;
    this.height = 40;
    this.amount = miktar[Math.floor(Math.random() * miktar.length)];
    this.framex = 0;
    this.framey = 0;
    this.minframe = 0;
    this.maxframe = 3;
    this.spritewidth = 256;
    this.spriteheight = 256;
  }
  draw() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(this.amount, this.x, this.y);
    ctx.drawImage(Hammadde1, this.framex * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
  }
  update() {
    if (frame % 20 == 0) {
      if (this.framex < this.maxframe) {
        this.framex++;
      }
      else {
        this.framex = this.minframe;
      }
    }
  }
}

function handleresources() {
  if (frame % 500 === 0 && score < winningscore) {
    resources.push(new resource());
  }
  for (let i = 0; i < resources.length; i++) {
    resources[i].draw();
    resources[i].update();
    if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)) {
      numberofresources += resources[i].amount;
      floatingmassages.push(new floatingmassage(resources[i].amount + ' Kadar Hammadde Toplandı!', mouse.x, mouse.y, 20, 'purpule'));
      floatingmassages.push(new floatingmassage('+' + resources[i].amount, 520, 80, 30, 'gold'));
      resources.splice(i, 1);
      i--;
    }
  }
}

//Araçlar 'Utilities'

function handlegamestatus() {
  ctx.fillStyle = 'gold';
  ctx.font = '30px Arial';
  ctx.fillText('Skorunuz: ' + score, 290, 40);
  ctx.fillText('Hammadde: ' + numberofresources, 290, 80);
  ctx.font = '20px Arial';
  ctx.fillText('Taktiksel Avantaj: ' + numberofadvantages, 800, 40)

  if (selectlevel == 1) {
    winningscore = 200;
  }
  else if (selectlevel == 2) {
    winningscore = 500;
  }
  else if (selectlevel == 3) {
    winningscore = 1000;
  }
  if (score >= winningscore) {
    gameover = true;
    del = 1;
  }
}

//Defender Ekleme 'Adding Defender'

canvas.addEventListener('click', function () {
  const gridpositionx = mouse.x - (mouse.x % cellsize) + cellgap;
  const gridpositiony = mouse.y - (mouse.y % cellsize) + cellgap;
  if (gridpositiony < cellsize) { return; };
  for (let i = 0; i < defenders.length; i++) {
    if (defenders[i].x == gridpositionx && defenders[i].y == gridpositiony) {
      return;
    }
  }
  if (choosendefender == 1) {
    defender_Cost = 100;
    if (numberofresources >= defender_Cost) {
      defenders.push(new defender(gridpositionx, gridpositiony));
      numberofresources -= defender_Cost;
    }
    else {
      floatingmassages.push(new floatingmassage('Yeterli Miktarda Hammaddeniz Bulunmuyor!', mouse.x, mouse.y, 20, 'green'));
    }
  }
  else if (choosendefender == 2) {
    defender_Cost = 200;
    if (numberofresources >= defender_Cost) {
      defenders.push(new defender(gridpositionx, gridpositiony));
      numberofresources -= defender_Cost;
    }
    else {
      floatingmassages.push(new floatingmassage('Yeterli Miktarda Hammaddeniz Bulunmuyor!', mouse.x, mouse.y, 20, 'green'));
    }
  }
  else if (choosendefender == 3) {
    defender_Cost = 250;
    if (numberofresources >= defender_Cost) {
      defenders.push(new defender(gridpositionx, gridpositiony));
      numberofresources -= defender_Cost;
    }
    else {
      floatingmassages.push(new floatingmassage('Yeterli Miktarda Hammaddeniz Bulunmuyor!', mouse.x, mouse.y, 20, 'green'));
    }
  }
  else if (choosendefender == 4) {
    defender_Cost = 1;
    if (numberofadvantages >= defender_Cost) {
      defenders.push(new defender(gridpositionx, gridpositiony));
      numberofadvantages -= defender_Cost;
    }
    else {
      floatingmassages.push(new floatingmassage('Taktiksel Avantajlarınız Bulunmuyor!', mouse.x, mouse.y, 20, 'green'));
    }
  }
  else if (choosendefender == 5) {
    defender_Cost = 1;
    if (numberofadvantages >= defender_Cost) {
      defenders.push(new defender(gridpositionx, gridpositiony));
      numberofadvantages -= defender_Cost;
    }
    else {
      floatingmassages.push(new floatingmassage('Taktiksel Avantajlarınız Bulunmuyor!', mouse.x, mouse.y, 20, 'green'));
    }
  }
  else if (choosendefender == 0) {
    floatingmassages.push(new floatingmassage('Lütfen Bir Birlik Türü Seçiniz!', mouse.x, mouse.y, 20, 'blue'));
  }
});

//Objectif Submit Kısmı

const basla = {
  x: 480,
  y: 630,
  width: 80,
  height: 50
}
const geridon = {
  x: 580,
  y: 630,
  width: 80,
  height: 50
}

function objectifselect() {

  let baslas = 'black';
  let geridons = 'black';

  if (collision(mouse, basla) && mouse.clicked) {
    submit = 1;
  }
  else if (collision(mouse, geridon) && mouse.clicked) {
    submit = 2;
  }

  if (submit == 1) {
    baslas = 'gold';
    geridons = 'black';
  }
  else if (submit == 2) {
    baslas = 'black';
    geridons = 'gold';
  }
  else {
    baslas = 'black';
    geridons = 'black';
  }

  ctx.lineWidth = 2;
  ctx.fillStyle = 'greenyellow';

  if (gameover || loose) {
    basla.x = 700;
    basla.y = 130;

    geridon.x = 800;
    geridon.y = 130;

    ctx.fillRect(basla.x, basla.y, basla.width, basla.height);
    ctx.strokeStyle = baslas;
    ctx.strokeRect(basla.x, basla.y, basla.width, basla.height);

    ctx.fillStyle = 'red';
    ctx.font = '12px Arial';
    ctx.fillText('Yeniden Başla', 702, 160);
    ctx.fillStyle = 'greenyellow';

    ctx.fillRect(geridon.x, geridon.y, geridon.width, geridon.height);
    ctx.strokeStyle = geridons;
    ctx.strokeRect(geridon.x, geridon.y, geridon.width, geridon.height);
    ctx.fillStyle = 'red';
    ctx.font = '15px Arial';
    ctx.fillText('Geri Dön', 810, 160);
  }
  else {

    basla.x = 480;
    basla.y = 630;

    geridon.x = 580;
    geridon.y = 630;

    ctx.fillRect(basla.x, basla.y, basla.width, basla.height);
    ctx.strokeStyle = baslas;
    ctx.strokeRect(basla.x, basla.y, basla.width, basla.height);

    ctx.fillStyle = 'red';
    ctx.font = '15px Arial';
    ctx.fillText('Başla', 500, 660);
    ctx.fillStyle = 'greenyellow';

    ctx.fillRect(geridon.x, geridon.y, geridon.width, geridon.height);
    ctx.strokeStyle = geridons;
    ctx.strokeRect(geridon.x, geridon.y, geridon.width, geridon.height);
    ctx.fillStyle = 'red';
    ctx.font = '15px Arial';
    ctx.fillText('Geri Dön', 590, 660);
  }

}

function handleobjectif() {
  if (submit == 1) {
    submit = 0;
    choosendefender = 0;
    loose = false;
    gameover = false;
    animation();
  }
  else if (submit == 2) {
    submit = 0;
    keytolevel = 0;
    loose = false;
    gameover = false;
    levelhandle();
  }
  else if (submit == 0) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keytolevel == 1) {

      ctx.drawImage(ustbg, 0, 0, 1000, 100, 0, 0, 1000, 100);
      ctx.drawImage(bg, 0, 0, 1000, 700, 0, 100, 1000, 700);

      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, 1000, 800);

      ctx.drawImage(b1o, 200, 300, 500, 400);

    }
    else if (keytolevel == 2) {
      ctx.drawImage(ustbg2, 0, 0, 1000, 100, 0, 0, 1000, 100);
      ctx.drawImage(bg2, 0, 0, 1000, 700, 0, 100, 1000, 700);

      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, 1000, 800);

      ctx.drawImage(b2o, 200, 300, 500, 400);
    }
    else if (keytolevel == 3) {
      ctx.drawImage(ustbg3, 0, 0, 1000, 100, 0, 0, 1000, 100);
      ctx.drawImage(bg3, 0, 0, 1000, 700, 0, 100, 1000, 700);

      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, 1000, 800);

      ctx.drawImage(b3o, 200, 300, 500, 400);
    }

    requestAnimationFrame(handleobjectif);
  }
  seskontrol();
  objectifselect();
}

//Level sonu Kısmı

let k = 200;
let l = 0;
const massage1 = ['Normandiya sahillerinde güçlü direniş ile karşılaşan müttefik kuvvetleri',
  'Geri çekilmek zorunda kaldılar.', 'Operasyon başarısız olmuştu bu durum savaşın kaderini değiştirecek gibiydi.',
  'Bu operasyonun başarısızlığının acısı doğu cephesine yansıyacak!', 'Doğu cephesinde olacakları yaşamadan bilemeyiz!'];

const massage2 = ['Doğu cephesinde başarılı savunmamız ile karşılaşan mihver birlikteliği,',
  'Geri çekilmek zorunda kaldı.', 'Savunmanın başarılı bir şekilde yapılmış olması savaşın kaderini değiştirecek ölçüde önemli!',
  'Böylece doğu cephesindeki mihver ilerleyişi durdurulmuş oldu.', 'Çok Yaşa Doğunun Ayısı'];

const massage3 = ['Balkan cephesinde elastik savunmamız ile karşılaşan mihver birlikteliği,',
  'Geri çekilmek zorunda kaldı.', 'Savunmamızın başarılı bir şekilde yapılmış olması savaşın dönüm noktası olmuştur.',
  'Artık saldırı zamanı!!!', 'Hücüm!!!'];

function handlefinish() {

  if (submit == 1) {
    levelend = 0;
    submit = 0;
    choosendefender = 0;
    loose = false;
    gameover = false;
    score = 0;
    numberofresources = 300;
    numberofadvantages = 3;
    animation();
  }
  else if (submit == 2) {
    levelend = 0;
    submit = 0;
    keytolevel = 0;
    gameover = false;
    loose = false;
    score = 0;
    numberofresources = 300;
    numberofadvantages = 3;
    levelhandle();
  }
  else if (submit == 0) {

    choosendefender = 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    levelend = 1;

    if(loose == true){
      ctx.drawImage(b2s, 0, 0, 1000, 800);

      ctx.fillStyle = 'black';
      ctx.font = '50px Arial';
      ctx.fillText('Kaybettiniz!', 100, 100);
      ctx.font = '20px Arial';
      ctx.fillText('Seviye Skorunuz:' + score, 100, 130);

      ctx.fillText('Savaşın Kaderi Elinizdeydi Ancak Kaçırdınız!', 100, 200);

    }

    else if (keytolevel == 1) {

      ctx.drawImage(b1s, 0, 0, 1000, 800);

      ctx.fillStyle = 'black';
      ctx.font = '50px Arial';
      ctx.fillText('Seviye Tamamlandı!', 100, 100);
      ctx.font = '20px Arial';
      ctx.fillText('Seviye Skorunuz:' + score, 100, 130);

      if (fps % 100 == 0) {

        floatingmassages.push(new floatingmassage(massage1[l], 100, k, 20, 'black'));

        l++;
        k += 50;

        if (k > 400) {
          k = 200;
          l = 0;
        }
      }
    }

    else if (keytolevel == 2) {

      ctx.drawImage(b2s, 0, 0, 1000, 800);

      ctx.fillStyle = 'black';
      ctx.font = '50px Arial';
      ctx.fillText('Seviye Tamamlandı!', 100, 100);
      ctx.font = '20px Arial';
      ctx.fillText('Seviye Skorunuz:' + score, 100, 130);

      if (fps % 100 == 0) {

        floatingmassages.push(new floatingmassage(massage2[l], 100, k, 20, 'black'));

        l++;
        k += 50;

        if (k > 400) {
          k = 200;
          l = 0;
        }
      }
    }
    else if (keytolevel == 3) {

      ctx.drawImage(b3s, 0, 0, 1000, 800);

      ctx.fillStyle = 'black';
      ctx.font = '50px Arial';
      ctx.fillText('Seviye Tamamlandı!', 100, 100);
      ctx.font = '20px Arial';
      ctx.fillText('Seviye Skorunuz:' + score, 100, 130);

      if (fps % 100 == 0) {

        floatingmassages.push(new floatingmassage(massage3[l], 100, k, 20, 'black'));

        l++;
        k += 50;

        if (k > 400) {
          k = 200;
          l = 0;
        }
      }
    }

    requestAnimationFrame(handlefinish);
  }
  seskontrol();
  handlemassages();
  objectifselect();
  fps++;
}

//Nasıl Oynanır Ekranını Canvasa basan fonksiyon

function howtoplay() {
  if (howtp == 4) {
    howtp = 0;
    startingmenu();
  }
  else if (howtp == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(giris, 0, 0, 1000, 800, 0, 0, 1000, 800);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Nasıl Oynanıra Hoşgeldiniz:', 315, 80);

    requestAnimationFrame(howtoplay);
  }
  seskontrol();
  htp();
}

//Başlangıç Menusunu Canvasa basan fonksiyon

function startingmenu() {

  if (startformenu == 2) {
    startformenu = 0;
    levelhandle();
  }
  else if (startformenu == 1) {
    window.location = "https://github.com/BijanE";

  }
  else if (startformenu == 3) {
    window.location = "https://www.linkedin.com/in/bijan-etesam-37a8b0194/";

  }
  else if (startformenu == 4) {
    startformenu = 0;
    howtoplay();
  }
  else if (startformenu == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(giris, 0, 0, 1000, 800, 0, 0, 1000, 800);

    ctx.fillStyle = '#6cfcdf';
    ctx.font = '50px Arial';
    ctx.fillText('Oyuna Hoşgeldiniz', 295, 120);
    ctx.fillStyle = '#ff3200';
    ctx.font = '30px Arial';
    ctx.fillText("3. Dünya savaşında hangi silahların kullanılacağını bilmiyorum", 25, 350);
    ctx.fillText("ama 4. Dünya savaşında taş ve sopalar olacağını biliyorum.", 175, 400);

    requestAnimationFrame(startingmenu);
  }

  startmenu();
  seskontrol();

}

//Bölüm Seçimi kısmını Canvasa basan fonksiyon

function levelhandle() {

  if (selectlevel == 4) {
    selectlevel = 0;
    startingmenu();
  }
  else if (selectlevel != 0 && selectlevel != 4) {
    keytolevel = selectlevel;
    selectlevel = 0;
    handleobjectif();
  }
  else if (selectlevel == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(giris, 0, 0, 1000, 800, 0, 0, 1000, 800);
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText('Bir Bölüm Seçiniz:', 295, 120);

    requestAnimationFrame(levelhandle);
  }
  seskontrol();
  chooselevel();
}

//Oynanış kısmını Canvasa basan fonksiyon

function animation() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  submit = 0;

  if (keytolevel == 1) {
    ctx.drawImage(ustbg, 0, 0, 1000, 100, 0, 0, 1000, 100);
    ctx.drawImage(bg, 0, 0, 1000, 700, 0, 100, 1000, 700);
  }
  else if (keytolevel == 2) {
    ctx.drawImage(ustbg2, 0, 0, 1000, 100, 0, 0, 1000, 100);
    ctx.drawImage(bg2, 0, 0, 1000, 700, 0, 100, 1000, 700);
  }
  else if (keytolevel == 3) {
    ctx.drawImage(ustbg3, 0, 0, 1000, 100, 0, 0, 1000, 100);
    ctx.drawImage(bg3, 0, 0, 1000, 700, 0, 100, 1000, 700);
  }
  handlegamegrid();
  choosedefender();
  handleresources();
  handlegamestatus();
  handleenemies();
  handledefenders();
  handleprojectile();
  handlemassages();
  seskontrol();
  frame++;
  if (gameover || loose){
    del = 0;
    handlefinish();
  }
  else if ((!gameover)) {
    requestAnimationFrame(animation);
  }
}

//Çağırılan fonksiyon

startingmenu();

