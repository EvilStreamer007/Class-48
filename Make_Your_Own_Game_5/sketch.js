var gameState = 0;

var player;
var player_animation;

var player_left;
var player_right;

var player_weapon;
var missile_image;

var player_life1;
var player_life2;
var player_life3;
var player_lifes;

var Playerweapon_Group;

var alien;
var alien_image;

var Alienbomb_Group;

var alien_bomb;
var bomb_image;

var alien_life1;
var alien_life2;
var alien_life3;
var alien_lifes;

var invisible_ground;

var bg_img1;
var bg_img2;
var bg_img3;

var wasd;
var wasd_image;

var weapon;
var weapon_image;

var form1;

var test_bg;

var Edge_right;
var Edge_right;

var explosion;
var explosion_image;

var life_1;
var life_2;
var life_3;

var next;
var retry;

var player_counter = 0;
var alien_counter = 0;

var meteor;
var meteor_image;
var asteroid_Group;

function preload(){
    player_animation = loadAnimation("images/player_1.png","images/player_1.png","images/player_2.png","images/player_2.png");
    player_left = loadAnimation("images/player1_left.png","images/player2_left.png");
    player_right = loadAnimation("images/player1_right.png","images/player2_right.png");
    player_lifes = loadAnimation("images/player_1.png","images/player_2.png");

    alien_image = loadImage("images/enemy.png");
    alien_lifes = loadImage("images/enemy.png");

    bg_img1 = loadImage("images/start_bg.jpg");
    bg_img2 = loadImage("images/chase_bg.jpg");
    bg_img3 = loadImage("images/end_bg.jpg");

    wasd_image = loadImage("images/controls.png");
    weapon_image = loadImage("images/weapon.png");

    bomb_image = loadImage("images/enemy_bomb.png");
    missile_image = loadImage("images/player_missile.png");
    explosion_image = loadImage("images/explosion.png");

    meteor_image = loadImage("images/meteor.png")
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    
    test_bg = createSprite(displayWidth/2, -displayHeight*4+685,displayWidth, displayHeight*5)
    test_bg.addImage(bg_img2)
    test_bg.visible = false;

    player = createSprite(650,630,10,10);
    player.addAnimation("test",player_animation);
    player.addAnimation("left",player_left);
    player.addAnimation("right",player_right);
    player.visible = false;

    player_life1 = createSprite(displayWidth-150,40,10,10);
    player_life1.scale = 0.3;
    player_life1.visible = false;
    player_life1.addAnimation("life",player_lifes);
    
    player_life2 = createSprite(displayWidth-90,40,10,10);
    player_life2.scale = 0.3;
    player_life2.visible = false;
    player_life2.addAnimation("life",player_lifes);
    
    player_life3 = createSprite(displayWidth-30,40,10,10);
    player_life3.scale = 0.3;
    player_life3.visible = false;
    player_life3.addAnimation("life",player_lifes);

    Playerweapon_Group = createGroup();
    asteroid_Group = createGroup();
    
    alien = createSprite(1300,100,10,10);
    alien.addImage("test",alien_image);
    alien.scale = 0.6;

    /*alien_bomb = createSprite(alien.x,alien.y+20,10,10);
    alien_bomb.addImage(bomb_image);
    alien_bomb.scale = 0.3;
    alien_bomb.visible = false;*/

    Alienbomb_Group = createGroup();

    alien_life1 = createSprite(displayWidth-150,100,10,10);
    alien_life1.visible = false;
    alien_life1.addImage("live",alien_lifes);
    alien_life1.scale = 0.1;

    alien_life2 = createSprite(displayWidth-90,100,10,10)
    alien_life2.visible = false;
    alien_life2.addImage("live",alien_lifes);
    alien_life2.scale = 0.1;

    alien_life3 = createSprite(displayWidth-30,100,10,10)
    alien_life3.visible = false;
    alien_life3.addImage("live",alien_lifes);
    alien_life3.scale = 0.1;

    wasd = createSprite(120,95,10,10);
    wasd.addImage("controls",wasd_image);
    wasd.scale = 0.3;

    weapon = createSprite(120,40,10,10);
    weapon.addImage("weapon",weapon_image);

    //create an invisible ground...for the spaceship to rest
    invisible_ground = createSprite(625,720,4000,10);
    invisible_ground.visible = false;

    explosion = createSprite(player.x,player.y,0,0);
    explosion.addImage("explode",explosion_image);
    explosion.scale = 0.7;
    explosion.visible = false;

    form1 = new Form();

}

function draw(){
    background("cyan");

    if(gameState === 0){
        form1.display()
    }

    if(gameState === 1){
        background(bg_img1);
        form1.hide();
        form1.Next();
        explosion.visible = false;
        
        alien_life1.visible = false;
        alien_life2.visible = false;
        alien_life3.visible = false;

        player_life1.visible = false;
        player_life2.visible = false;
        player_life3.visible = false;

        //next = createButton(" Click Here To Start The Game ");
        //next.position(100,700,10,10);

        alien.velocityY = 5;
        alien.velocityX = -5;
        //alien.collide(invisible_ground);

        if(alien.isTouching(invisible_ground)){
            alien.velocityX = 0;
            alien.velocityY = 0;
            //console.log("its working!");
        }
        
        drawSprites();    
    }
    
     if(gameState === 2){

         alien.velocityX = 0;
         alien.velocityY = -9.5;

         player.visible = true;
         player.y = camera.position.y + 200;
         
         explosion.y = camera.position.y + 200;

         if(frameCount % 50 === 0){
             alien.x = random(15,displayWidth-120);
             alien_bomb = createSprite(alien.x,alien.y+20,10,10);
             alien_bomb.addImage(bomb_image);
             alien_bomb.scale = 0.3;
             alien_bomb.velocityY = 8
             alien_bomb.debug = true
             Alienbomb_Group.add(alien_bomb);
             Alienbomb_Group.lifetime = 300;
         }

         weapon.y = camera.position.y - 410;
         wasd.y = camera.position.y - 355; 

         player_life1.y = camera.position.y - 410;
         player_life1.visible = true;
         player_life2.y = camera.position.y - 410;
         player_life2.visible = true;
         player_life3.y = camera.position.y - 410;
         player_life3.visible = true;

         alien_life1.y = camera.position.y + 330;
         alien_life1.visible = true;
         alien_life2.y = camera.position.y + 330;
         alien_life2.visible = true;
         alien_life3.y = camera.position.y + 330;
         alien_life3.visible = true;
                 
         test_bg.visible = true;
         
         Edge_left = createSprite(0,100,5,10000);
         Edge_left.y = camera.position.y - 200;
         Edge_left.visible = false;

         Edge_right = createSprite(displayWidth,100,5,10000);
         Edge_right.y = camera.position.y - 200;
         Edge_right.visible = false;
 
        Controls();
       
       if(Alienbomb_Group.collide(player)){
            player_counter = player_counter + 1;
            PlayerLife_Counter(); 
        }

        /*if(Alienbomb_Group.collide(alien)){
           alien_counter = alien_counter + 1;
           AlienLife_Counter();
        }*/
        
        player.collide(Edge_left);
        player.collide(Edge_right);
        
      drawSprites();    
    }
    
    if(gameState === 3){
        Controls();
        player.visible = true;
        player_life1.visible = true;
        player_life2.visible = true;
        player_life3.visible = true;

        if(frameCount % 5 === 0){
            meteor = createSprite(1300,0,10,10);
            meteor.addImage("rock",meteor_image);
            asteroid_Group.add(meteor);
        }
    }

}

function Controls(){
    if(keyDown("a")){
        player.x = player.x - 10;
        player.changeImage("left",player_left);
        player.scale = 1.8;
     }

     if(keyDown("w")){
         player.y = player.y - 11;
         camera.position.y = camera.position.y-11;
     }

     if(keyDown("d")){
        player.x = player.x + 10;
        player.changeImage("right",player_right);
        player.scale = 1.8;
     }

     if(keyWentUp("a") || keyWentUp("d")){
        player.changeAnimation("test",player_animation);
        player.scale = 1;
     }
    
    //attempted to make a delay in the possibilty of spawning missile
    //if(frameCount % 5 === 0){
         if(keyDown("space")){
             player_weapon = createSprite(player.x+120,player.y,10,10);
             player_weapon.addImage("missile",missile_image);
             player_weapon.scale = 0.5;
             player_weapon.velocityY = -15;
             Playerweapon_Group.add(player_weapon);
             Playerweapon_Group.lifetime = 300;
         }   
     //}

     if(keyDown("g")){
         gameState = 3;
     }
}

function PlayerLife_Counter(){
        explosion.visible = true;
        explosion.x = player.x;
        explosion.y = player.y;
        player.visible = false;
        Alienbomb_Group.destroyEach();

        if(player_counter === 1){
           player_life1.destroy();
           form1.Retry();
        }

        if(player_counter === 2){
            player_life2.destroy();
            form1.Retry();
         }

         if(player_counter === 3){
            player_life3.destroy();
            /*test_bg.visible = false;
            alien.x = 1300;
            alien.y = 100;
            gameState = 1;*/
            form1.Retry();
         }
         
        //form1.Retry();
    
}

function AlienLife_Counter(){
    explosion.visible = true;
    //explosion.x = alien.x;
    //explosion.y = alien.y;
    alien.visible = false;
    Alienbomb_Group.destroyEach();

    if(alien_counter === 1){
       alien_life1.destroy();
    }

    if(alien_counter === 2){
        alien_life2.destroy();
     }

     if(alien_counter === 3){
        alien_life3.destroy();
     }
     
    form1.Retry();

}