const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var birds = [];

var gameState = "onsling"
var score = 0;

function preload() {
    changeBg();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    pig1 = new Pig(810, 550);
    log1 = new Log(810,460,300, PI/2);

    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    pig3 = new Pig(810, 420);

    log3 =  new Log(810,380,300, PI/2);

    box5 = new Box(810,360,70,70);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(200,230);
    bird2 = new Bird(150,350);
    bird3 = new Bird(100,350);
    bird4 = new Bird(50,350);
    birds.push(bird4);
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:245});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);
    textSize(30);
    stroke("white");
    text( " SCORE " + score, 1000, 200 );
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();
    pig3.score();
    pig1.score();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    
    slingshot.display();    
}

function mouseDragged(){
    if(gameState !== "released"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x : mouseX , y : mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body.position, {x : 5 , y : -5}) 
        return false;    
    }
     
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState = "released";
    return false;
    }
    function keyPressed(){
        if(keyCode===32 && gameState === "released"){
           slingshot.attach(birds[birds.length-1].body);
           Matter.Body.setPosition(birds[birds.length-1].body,{x : 200 , y : 230});
           gameState = "onsling";
           bird.trajectory = [];
        }
        }

   async function changeBg(){
        var respond = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
        var rJSON = await respond.json();
        var dateTime = rJSON.datetime;
        //console.log(dateTime);
        var hour = dateTime.slice(11,13);
        if(hour > 6  &&  hour < 21){
            bg = "sprites/bg.png";
        }
        else{
            bg = "sprites/bg2.jpg";
        } 
        backgroundImg = loadImage(bg);
     }
    