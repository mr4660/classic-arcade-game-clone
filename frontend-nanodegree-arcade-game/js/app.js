// Enemies our player must avoid
var Enemy = function(objNumber)     {
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';

   // Helpful Random number generator.
   this.RandomGen   = function(a, b, c)   {
      return a * Math.floor((Math.random() * b) + c);
   };

   // Track the enemy's instance number.
   this.objNumber   = objNumber;
   this.shotRock    = 000;

   // Used to set max and min values for allowed speeds and eventual sprite's direction the speed vector syste.
   this.maxAcceleration = 055;
   this.minAcceleration = 005;

   // Speed parameters to make images behave fidgety, reverse course, fly and dart forward.
   this.speed     = 000;
   this.speed_a   = 000;
   this.speed_b   = 000;
   this.speed_c   = 000;
   this.direction = 001;   // Randomly toggles between +1 (move forward) and -1 (move backward)

   // Define initial relative row and Y values, relative Y increment values for sprite movement, and maximum allowed Y values.
   this.maxYWidth = 503;
   this.yMultipFactor   = 083;
   if ( ( this.objNumber - 0 ) % 3 == 0 )    {
      // Place sprite on lowest brick floor
      this.row = 1;
   } else  {
      if ( ( this.objNumber - 1 ) % 3 == 0 )    {
         // Place sprite on middle brick floor
         this.row = 2;
      } else  {
         // Place sprite on top brick floor
         this.row = 3;
        }
     }
   this.y = ( this.row * this.yMultipFactor ) - 22.0;

   // Define initial relative col and X values, relative X increment values for sprite movement.
   this.xMultipFactor   = 101;
   this.col = 0;
   this.x = this.col * this.xMultipFactor;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.move = function(dt)    {
   // Insure only enemy sprites are continuously moved.
   if (this.sprite.indexOf('enemy') > -1 )      {

      // Insure sprite's x value hasn't fallen below the minimum value; when so, set to right edge.
      if (this.x < 0 )     {
         this.x = this.maxYWidth ;
      }

      // Insure sprite's x value hasn't exceeded the canvas's maximum; when so, set to left edge.
      if (this.x > this.maxYWidth   )     {
         this.x = this.xMultipFactor / 32;
         // 40% of the time, jump lanes.
         if ( this.RandomGen(1, 100, 1) > 60 )     {
            this.row = this.RandomGen(1, 3, 1);
            this.y = ( this.row * this.yMultipFactor ) - 22.0;
         }
      }

      // 20% of the time, randomly set speed vector.
      if ( this.RandomGen(1, 100, 1) > 80 )     {
         // 95% of the time, insure the direction is forward (produces twerky forward movement.
         if ( this.RandomGen(1, 100, 1) > 5 )     {
            // When sprite moves forward, it is at a scale of 100%
            this.direction = +1.00;
         } else {
            // When sprite reverses, do so at 300% magnitude.
            this.direction = -3.0;
         }

         // Randomly reset the speed vector's parameters to give appearance of jerky, normal animal, behaviors.
         // Multiplying the new majorTone by 130% gives appearance of lurching/flying behavior.
         this.maxAcceleration =  this.RandomGen(     1,  this.maxAcceleration * 1.3,   this.minAcceleration);
         this.speed_a   =  this.RandomGen(           1,  this.maxAcceleration,         this.minAcceleration);
         this.speed_b   =  this.RandomGen(           1,  this.maxAcceleration,         this.minAcceleration);
         this.speed_c   =  this.RandomGen(           1,  this.maxAcceleration,         this.minAcceleration);
         this.speed     =  this.RandomGen(this.speed_a,  this.speed_b,           this.speed_c);
      }

      // Now that we have randomized the direction and speed, reset the sprites X values.
      this.x = this.x + this.direction * (dt * this.speed);
   }

   // Insure only rocks are continuously moved.
   if (this.sprite.indexOf('Rock') > -1 )      {

      // Insure sprite's y value doesn't exceed the maximum height.
      if (this.y < this.maxYWidth )     {
         this.y =  this.y + (dt * this.speed);
      }
   }
};

Enemy.prototype.update = function(dt)     {
   // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
   this.move(dt);

   // 10% of the time, each enemy fires only 1 rock.
   if (this.sprite.indexOf('enemy') > -1)      {
      if ( this.RandomGen(1, 100, 1) > 90  && this.shotRock == 0)     {
         this.shotRock++;
         allRocks.push( new Rock(this) );
      }
   }
};

Enemy.prototype.checkCollisions = function()    {
   // Check for collisions.
   var xFactor = 4;
   var yFactor = 6;

   // TODO: add code to forcibly break out of the foreach loop which calls this
   // var collisionDetected = false;

   // Insure only enemy sprites and rocks are handled, since the Enemy.prototype object is used by player.prototype for delegation purposes.
   if (this.sprite.indexOf('enemy') > -1 || this.sprite.indexOf('Rock') > -1 )      {
      if (  player.x >= this.x - this.yMultipFactor/xFactor  &&  player.x <= this.x + this.yMultipFactor/xFactor
      &&    player.y >= this.y - this.xMultipFactor/yFactor  &&  player.y <= this.y + this.xMultipFactor/yFactor   )    {
         alert('Oww! Collision!!');

         // This is used by the player, to reset player's position to a harmless one.
         player.row = 4;
         player.y = (player.row * player.yMultipFactor) - player.yOffSet;

         // TODO: add code to forcibly break out of the foreach loop which calls this
         // collisionDetected = true;
      }
   }
   // TODO: add code to forcibly break out of the foreach loop which calls this
   // return collisionDetected;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function()    {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class.  This class requires an update(), render() and a handleInput() method.
var Rock = function(enemyParent)    {
    // Select an appropriate image
    this.sprite         = 'images/Rock.png';
    this.objNumber      = 1000 + enemyParent.objNumber;

    // Define the player's row and corresponding Y values.
    this.yOffSet        = enemyParent.yOffSet;
    this.yMultipFactor  = enemyParent.yMultipFactor;
    this.row            = enemyParent.row;
    this.rowMax         = enemyParent.rowMax;
    this.y              = enemyParent.y;

    // Define the player's col and corresponding X values.
    this.xOffSet        = enemyParent.xOffSet;
    this.xMultipFactor  = enemyParent.xMultipFactor;
    this.col            = enemyParent.col;
    this.colMax         = enemyParent.colMax;
    this.x              = enemyParent.x;
}

// Delegate player behaviors according to the Enemy prototype.
Rock.prototype = Object.create(Enemy.prototype);

// Insure the Player pseudoclass knows who its constructor is.
Rock.prototype.constructor = Rock;

// Now write your own player class.  This class requires an update(), render() and a handleInput() method.
var Player = function()    {
    // Select an appropriate image
    this.sprite = 'images/char-boy.png';

    // TODO: allow user to select any available sprite image

    // Define the player's row and corresponding Y values.
    this.yOffSet        = 013;
    this.yMultipFactor  = 083;
    this.row            = 005;
    this.rowMax         = 005;
    this.y              = (this.row * this.yMultipFactor) - this.yOffSet;

    // Define the player's col and corresponding X values.
    this.xOffSet        = 000;
    this.xMultipFactor  = 101;
    this.col            = 002;
    this.colMax         = 004;
    this.x              = (this.col * this.xMultipFactor) - this.xOffSet;
};

// Delegate player behaviors according to the Enemy prototype.
Player.prototype = Object.create(Enemy.prototype);

// Insure the Player pseudoclass knows who its constructor is.
Player.prototype.constructor = Player;

// Define the function which processes the Player's up, down, left, and right keyboard evetns.
Player.prototype.handleInput = function (keyPressSet)    {

   // Temporary variables
   var tmpVal = parseInt(keyPressSet[1]);
   var tmpRow = parseInt(this.row);
   var tmpCol = parseInt(this.col);

   // Handle the up and down keyboard events.
   if ( 'updown'.indexOf(keyPressSet[0]) > -1 )    {
      tmpRow += tmpVal;

      // Before updating the player's row and Y values, insure they are within the canvas's bounds.
      if ( tmpRow >= 0 && tmpRow <= this.rowMax )     {
         this.row = tmpRow;
         this.y = (tmpRow * this.yMultipFactor) - this.yOffSet;
      }
      //alert('handleInput1:: row=' + this.row + '; col=' + this.col + '; kP[0]=' + keyPressSet[0] + '; kP[1]=' + keyPressSet[1] + '; x=' + this.x + '; y=' + this.y);
   }

   // Handle the left and right keyboard events.
   if ( 'leftright'.indexOf(keyPressSet[0]) > -1 )    {
      tmpCol += tmpVal;

      // Before updating the player's col and X values, insure they are within the canvas's bounds.
      if ( tmpCol >= 0 && tmpCol <= this.colMax  )    {
      this.col = tmpCol;
      this.x = (tmpCol * this.xMultipFactor) - this.xOffSet;
      }
      //alert('handleInput2:: row=' + this.row + '; col=' + this.col + '; kP[0]=' + keyPressSet[0] + '; kP[1]=' + keyPressSet[1] + '; x=' + this.x + '; y=' + this.y);
   }
};

// Now instantiate your objects.  Place all enemy objects in an array called allEnemies Place the player object in a variable called player

// I chose to load 4 enemies even though as many as needed are possible, and 1 player.
var cntEnemies =4;
var allEnemies = [];
var allRocks = [];
for (var i = 0; i < cntEnemies; i++)      {
   allEnemies.push( new Enemy(i) );
}

// I chose  1 player.
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

// I modified the array to identify the direction which the sprite should move:  +1 for up/right, -1 for down/left.
document.addEventListener('keyup', function(e)     {
    var allowedKeys = {
        37: ['left',    -1],
        38: ['up',      -1],
        39: ['right',   +1],
        40: ['down',    +1]
    };

    player.handleInput(allowedKeys[e.keyCode]);
})
