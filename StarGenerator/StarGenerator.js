var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
      //Created by EvanSweet. Every line of code is essential for making the program work! finished:6/3/2016
//A star function made for making stars appear on the screen that are movable created in less than 182 lines of code. 
//Press 'z' ,'x' , and 'r' for unknown things to happen! Or use the arrow key to move!
//Make the amount of stars that appear on the screen per layer of stars. Also space star density.
var starAmount = 120;
//set the speeds for each layer of stars
var SpeedForeground = 5;
var SpeedForeground2 = 4;
var SpeedBackground = 3.5;

//Creates the stars.
var Stars = function(x,y,starSize,speed,starsGridSize,Fill) {
    this.x = x;
    this.y = y;
    this.starSize = starSize;
    this.speed = speed;
    this.Fill = color(random(0,255),random(0,255),random(0,255));
    this.starsGridSize = starsGridSize;
};

//Draw the stars using the stars function.
Stars.prototype.draw = function() {
    fill(this.Fill);
    noStroke();
    ellipse(this.x,this.y,this.starSize,this.starSize);
};
//Move the stars when the arrow keys are pressed, using the stars function.
Stars.prototype.move = function() {
    if(keyIsPressed)
    {
        switch(keyCode)
        {
            case UP:
                this.y +=  this.speed;
                break;
                
            case DOWN:
                this.y -=  this.speed;
                break;
                
            case LEFT:
                this.x +=  this.speed;
                break;
                
            case RIGHT:
                this.x -=  this.speed;
                break;
        }
        if(key.toString() === 'z')
        {
            var m = 0.1;
            this.starSize += m;
            m += 0.15;
        }
        if(key.toString() === 'x')
        {
            var m2 = 0.1;
            this.starSize -= m2;
            m2 += 0.15;
        }
    }
};

//Move the stars back to the screen if they get off of the mark, using the stars function.
Stars.prototype.wrap = function() {
    if(keyIsPressed)
    {
        if(this.y > this.starsGridSize + this.starSize / 2)
        {
            this.y = 0;
            this.x = random(0,this.starsGridSize);
        }
        if(this.y < 0 - this.starSize / 2)
        {
            this.y = this.starsGridSize;
            this.x = random(0,this.starsGridSize);
        }
        if(this.x > this.starsGridSize + this.starSize / 2)
        {
            this.x = 0;
            this.y = random(0,this.starsGridSize);
        }
        if(this.x < 0 - this.starSize / 2)
        {
            this.x = this.starsGridSize;
            this.y = random(0,this.starsGridSize);
        }
    }
};
Stars.prototype.warp = function() {
    var warpSpeed = this.speed / 2;
    var warpAccel = 0.5;
    warpSpeed += warpAccel;
    if(this.x < 200)
    {
       this.x -= warpSpeed;
       this.y -= warpSpeed;
    }
    if(this.x > 200)
    {
        this.x += warpSpeed;
        this.y += warpSpeed;
    }
    if(this.y < 200)
    {
        this.y -= warpSpeed;
        this.x += warpSpeed;
    }
    if(this.y > 200)
    {
        this.y += warpSpeed;
        this.x -= warpSpeed;
    }
};
//Create arrays to create stars in.
var starsForeground = [];
var starsForeground2 = [];
var starsBackground = [];
//Make the stars in the arrays.
for(var i = 0; i < starAmount; i++)
{
    starsForeground[i] = new Stars(random(0, 425), random(0, 425), 4 , SpeedForeground, 425);
    starsForeground2[i] = new Stars(random(0, 425), random(0, 425), 3.5 , SpeedForeground2, 425);
    starsBackground[i] = new Stars(random(0, 425), random(0, 425), 3 , SpeedBackground, 425);
}
//Call a draw function for the program.
var speedtake = 2;
draw = function() {
    //Create a background. 
    background(25,25,25);
    //Do something if a keyIsPressed.
    if(keyIsPressed)
    {
       //The key r is pressed to regenerate the stars.
       if(key.toString() === 'r')
       {  
            for(var i = 0; i < starAmount; i++)
            {
            starsForeground[i] = new Stars(random(0, 425), random(0, 450), 4 , SpeedForeground, 425);
        starsForeground2[i] = new Stars(random(0, 425), random(0, 450), 4 , SpeedForeground2, 425);
            starsBackground[i] = new Stars(random(0, 425), random(0, 450), 3 , SpeedBackground , 425);
           }
       }
       if(key.toString() === 'w')
       {  
            for(var i = 0; i < starAmount; i++)
            {
                starsBackground[i].warp();
                starsForeground[i].warp();
                starsForeground2[i].warp();
            }
       }
       
       if(key.toString() === 's')
       {  
            for(var i = 0; i < starAmount; i++)
            {
                if(starsBackground[i].x < i)
                {
                starsBackground[i].x -= speedtake;
                starsBackground[i].y -= speedtake;
                starsForeground[i].x -= speedtake;
                starsForeground2[i].x -= speedtake;
                //starsForeground[i].y -= speedtake;
                //starsForeground2[i].y -= speedtake;
                }
                if(starsBackground[i].x > i)
                {
                starsBackground[i].x += speedtake;
                starsBackground[i].y += speedtake;
                starsForeground[i].x += speedtake;
                starsForeground2[i].x += speedtake;
                //starsForeground[i].y += speedtake;
               // starsForeground2[i].y += speedtake;
                }
                if(starsBackground[i].y < i)
                {
                starsBackground[i].y -= speedtake;
                starsBackground[i].x += speedtake;
                starsForeground[i].x += speedtake;
                starsForeground2[i].x += speedtake;
                //starsForeground[i].y -= speedtake;
                //starsForeground2[i].y -= speedtake;
                }
                if(starsBackground[i].y > i)
                {
                starsBackground[i].y += speedtake;
                starsBackground[i].x -= speedtake;
                starsForeground[i].x -= speedtake;
                starsForeground2[i].x -= speedtake;
                //starsForeground[i].y += speedtake;
               // starsForeground2[i].y += speedtake;
                }   
                
                //starsBackground[i].starSize += speedtake;
                //starsForeground[i].starSize += speedtake;
                //starsForeground2[i].starSize += speedtake;
            }
       }
    }
    for(var i = 0; i < starAmount; i++)
    { 
    //Call the draw, move and wrap functions for the stars. back layer.
    starsBackground[i].draw();
    starsBackground[i].move();
    starsBackground[i].wrap();
    //Call the draw, move and wrap functions for the stars. middle layer.
    starsForeground2[i].draw();
    starsForeground2[i].move();
    starsForeground2[i].wrap();
    //Call the draw, move and wrap functions for the stars. front layer.
    starsForeground[i].draw();
    starsForeground[i].move();
    starsForeground[i].wrap();
    }
    
};
//Just Less than 182 line of code!

    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});