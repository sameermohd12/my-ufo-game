const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;

var button,button2,button3;

var mute_btn;

var fr;

var bk_song;
var air;


function preload()
{
  bg_img = loadImage('background.png.webp');
  food = loadImage('melon.png');
  
  bk_song = loadSound('sound1.mp3');
  air = loadSound('air.wav');
}
function setup() 
{
  createCanvas(1000,800);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  

  //  button2.mouseClicked(drop2);
 
  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(1000,height,width,20);
  
 
  
  blower = createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(body,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  
  Engine.update(engine);
  ground.show();

  drawSprites();

  
  
   if(collide(fruit,star,20)==true)
   {
     star.visible = false;
     star_display.changeAnimation('one');
   }

   if(collide(fruit,star2,40)==true)
   {
     star2.visible= false;
     star_display.changeAnimation('two');
   }   
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
 
  fruit_con_2.dettach();
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}


