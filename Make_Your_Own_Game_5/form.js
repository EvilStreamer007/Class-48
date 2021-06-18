class Form{
    constructor(){
        this.input= createInput("Enter Your UserName");
        this.button = createButton("Click here to Continue");
        this.greeting = createElement('h2');
        this.greeting1 = createElement('h3');
        this.title = createElement('h1');
        this.start = createButton("   Click here to Start   ");
        this.next = createButton(" Click Here To Continue ");
        this.retry = createButton(" Retry! ");
    }
    hide(){
        this.greeting.hide();
        this.greeting1.hide();
        this.button.hide();
        this.input.hide();
        this.start.hide();
        this.title.hide();
    }

    Next(){
        this.next.position(displayWidth/2 - 500,displayHeight/2+250); 
        this.next.mousePressed(()=>{
            gameState = 2
            this.next.hide();
            alien.x = 650;
            alien.y = 300;
        })
    }

    Retry(){
        this.retry.position(displayWidth/2 - 250,displayHeight/2+250); 
        this.retry.mousePressed(()=>{
            gameState = 2
            explosion.visible = false;
            this.retry.hide();
        })
    }
    
    display(){

        this.title.html("Space Rush");
        this.title.position(displayWidth/2-150, 0);

        
        this.input.position(displayWidth/2-150,displayHeight/2-180)
        this.button.position(displayWidth/2-150,displayHeight/2-160);

        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
      
            var name = this.input.value();
            
            this.greeting.html("Welcome " + name + "!");
            this.greeting1.html("Alien Specimen A31 has escaped from Planet Xena, Objective 1 is to chase it down and bring it back!!", 100,100);        
            this.greeting.position(displayWidth/2-250, displayHeight/2-180);
            this.greeting1.position(250,displayHeight/2-140);

            this.start.position(displayWidth/2, displayHeight/2+100);
            
            this.start.mousePressed(()=>{
                gameState = 1            
            })           
        });
        
        
    }   
}