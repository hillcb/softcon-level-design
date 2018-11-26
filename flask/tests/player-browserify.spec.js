(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.player = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Character Class
|------------------------------------------------------------------------------
|
| This file contains the Character prototype (the javascript equivalent of a
| class). Character is the super of Player, NPC, and Enemy. It contains data
| about character status (e.g. health, speed), as well as methods for moving
| and interacting with the game's physics.
|
|------------------------------------------------------------------------------
*/

const Element = require('./element.js');
const Vector = require('./utility.js');

function Character(loc, max, hea, stat, hbox, url, size, spd, mvspd, grav){

    if((spd instanceof Vector) && (typeof mvspd === "number") &&
      (typeof grav === "number")&&  (typeof stat === "boolean") &&
      (typeof max === "number") && (typeof hea ==="number")){
        Element.call(this, loc, url, size, hbox);
        this.maxHealth = max; //maximum health
	      this.health=hea; //int health
	      this.status =stat; //true for alive, false for dead
        this.speed = spd; //for moving
        this.moveSpeed = mvspd; //tells how fast it moves
        this.gravity = grav;
    }
    else return {};
}

Character.prototype = Object.create(Element.prototype);

/*
|--------------------------------------------------------------------------
| Getter and setter functions for the Character prototype (the javascript
| version of class methods).
|--------------------------------------------------------------------------
*/

// Getter for position
Character.prototype.getPosition = function(){
	return this.position;
}

// Setter for position
Character.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

// Getter for maxHealth
Character.prototype.getMaxHealth = function(){
    return this.maxHealth;
}

// Setter for maxHealth
Character.prototype.setMaxHealth = function(amount){
    if(typeof amount === "number"){
        this.maxHealth = amount;
    }
}

// Getter for health
Character.prototype.getHealth = function(){
    return this.health;
}

// Setter for health
Character.prototype.setHealth = function(amount){
    if(typeof amount === "number"){
        this.health= amount;
    }
}

// Getter for status
Character.prototype.getStatus = function(){
    return this.status;
}

// Setter for status
Character.prototype.setStatus = function(s){
    if(typeof s === 'boolean'){
        this.status = s;
    }
}

// Getter for speed
Character.prototype.getSpeed = function(){
    return this.speed;
}

// Setter for speed
Character.prototype.setSpeed = function(spd){
    if(spd instanceof Vector){
        this.speed =spd;
    }
}

// Getter for movementSpeed
Character.prototype.getMovementSpeed = function() {
    return this.moveSpeed;
}

// Setter for movementSpeed
Character.prototype.setMovementSpeed = function(ms){
    if(typeof ms === "number"){
        this.moveSpeed = ms;
    }
}

// Getter for gravity
Character.prototype.getGravity = function () {
    return this.gravity;
}

// Setter for gravity
Character.prototype.setGravity = function(g) {
    if(typeof g === "number"){
        this.gravity = g;
    }
}

/*
|--------------------------------------------------------------------------
| Movement-related functions for the Character prototype, wherein much of
| the physics calculations are performed.
|--------------------------------------------------------------------------
*/

// Calculates the hypothetical next x position of a Character given a direction
// in which the character is trying to move.
Character.prototype.newXPos = function(step, dir) {
  this.speed.x = 0
  if (dir == "right") this.speed.x = this.moveSpeed;
  if (dir == "left")  this.speed.x -= this.moveSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next x position of a Character is legal, and if so,
// updates its position.
Character.prototype.moveX = function(newPos, obstacle) {
  if(obstacle != null) {
      if(obstacle.getSolid() == 0){
          this.position = newPos;
        }
   }
   else{
       this.position = newPos;
     }
}

// Calculates the hypothetical next y position of a character based on gravity
Character.prototype.newYPos = function(step) {
  this.speed.y += step * this.gravity;

  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.position.plus(motion);
  return newPos;
};

// Checks if a hypothetical next y position of a Character is legal, and if so,
// updates its position; if it hits the ground stops its motion; if it is on
// ground and jumps, updates its speed to allow the jump on the next game loop.
Character.prototype.moveY = function(newPos, obstacle, up) {
  var jumpSpeed = 70;
  if(obstacle != null) {
      if(obstacle.getSolid() == 1){
          newPos.x = this.position.x
          if (up && this.speed.y > 0){
              this.speed.y = -jumpSpeed;
          } else
              this.speed.y = 0;
      }
    } else
          this.position = newPos;
};

module.exports = Character;

},{"./element.js":3,"./utility.js":6}],2:[function(require,module,exports){
function Effect(title){
    if (title == 'heal' || title == 'damage'){
    this.effect = title;
    this.isActive = false;
  }
  else{
    return {};
  }
}

Effect.prototype.Effect = function(bool, title){
    /*if(typeof bool != "boolean"){
      return {};
    }*/
    if (title == 'heal' || title == 'damage'){
    this.isActive = bool;
    this.effect = title;
  }
  else{
    return {};
  }
}

Effect.prototype.activate = function(){
    this.isActive = true;
}

Effect.prototype.deactivate = function(){
    this.isActive = false;
}

Effect.prototype.getIsActive = function(){
    return this.isActive;
}

Effect.prototype.setEffect = function(effect){
    this.effect = effect;
}

Effect.prototype.getEffect = function(){
    return this.effect;
}

module.exports = Effect;

},{}],3:[function(require,module,exports){
const Vector = require('./utility.js');

/*Element prototype */
/*note: pos, scl, hitbox are vectors with x and y values */

function Element(pos, url, sz, hbox){
	if(((pos instanceof Vector) && (typeof url === 'string')) && ((sz instanceof Vector) && (hbox instanceof Vector))){
		this.position = pos; 
		this.sprite = url; //url to image file
		this.size = sz; //scale to resize image dimensions
		this.hitbox = hbox;
	} else {
		return {};
	}
}

Element.prototype.getPosition = function(){
	return this.position;
}

Element.prototype.setPosition = function(pos){
	if(pos instanceof Vector){
		this.position = pos;
	}
}

Element.prototype.getSprite = function(){
	return this.sprite;
}

Element.prototype.setSprite = function(url){
	if(typeof url === 'string'){
		this.sprite = url;
	}
}

Element.prototype.getSize = function(){
	return this.size;
}

Element.prototype.setSize = function(scl){
	if (scl instanceof Vector){
		this.size = scl;
	}
}

Element.prototype.getHitbox = function(){
	return this.hitbox;
}

Element.prototype.setHitbox = function(hbx){
	if(hbx instanceof Vector){
		this.hitbox = hbx;
	}
}

module.exports = Element;
},{"./utility.js":6}],4:[function(require,module,exports){
/* Item Prototype */

var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
const Element = require('./element.js');

function Item(pos, url, sz, hbox, col, eff){
    Element.call(this, pos, url, sz, hbox);
    this.collected = col;
    this.effect = eff;
}

Item.prototype.Item = function(){  
        //create enemy with loc = (0,0), no sprite
        // status = 1, collected = false, and effect = damage
        Element.call(this, vector(0,0), icon2, vector(50,50), vector(50,50));
        this.collected = false;
        this.effect = "damage";
};

Item.prototype.setEffect= function(eft){
    this.effect = eft;
};

Item.prototype.getEffect=function(){
    return this.effect;
};

Item.prototype.getCollected= function(){
    return this.collected;
};

Item.prototype.setCollected= function(b){
    this.collected = b;
};

module.exports = Item;
},{"./element.js":3}],5:[function(require,module,exports){
/*Player Prototype
Note: location is a vector with x and y*/
const Item = require('./item.js');
const Character = require('./character.js');
const Vector = require('./utility.js');

function Player(loc, max, hea, stat, itm, inv, hbox, url, size, speed, mvspd, grav){
    Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspd, grav);
    this.equippedItem = itm;
    this.inventory = inv;
}

Player.prototype = Object.create(Character.prototype);

//empty constructor. void
// Player.prototype.Player = function(){
//     //create enemy with loc = (0,0), maxhealth = 10
//     // health = 10, status = 1, item = null, size 50x50, speed 10x10

//     Character.call(this, vector(0,0), 10, 10, 1, vector(50,50), vector(33,13));
//     this.equippedItem = null;
//     this.inventory = [];
// }  

Player.prototype.getInventory= function(){
    return this.inventory;
}

Player.prototype.setInventory = function(arr)
{
    this.inventory = arr;
}

//gets OwnedItem. 
Player.prototype.getEquippedItem= function(){
    //return owned item
    return this.equippedItem;
}

//set owned item and return 1. return 0 for non-item input
Player.prototype.setEquippedItem = function(itm){
    //set owned item to itm
    // set item.collected to be true
    if(itm instanceof Item){
        this.inventory.push(this.equippedItem);
        this.equippedItem = itm;
        itm.collected = true;
    }
}

Player.prototype.useItem = function(){
    if((this.equippedItem.getEffect())["effect"] == "heal"){
        this.health = this.maxHealth;
        this.equippedItem= null;
    }
    else if ((this.equippedItem.getEffect())["effect"] == "damage"){ 
        //swing sword or whatever
    }
    else {
        this.equippedItem.getEffect().activate();
    }
}

Player.prototype.pickUpItem = function(){
    // to be called when player collides with item
}

module.exports = Player;

},{"./character.js":1,"./item.js":4,"./utility.js":6}],6:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}],7:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Player Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Player class.
| We test input for each method. Thorough testing on the constructor is used
| to verify input to all methods that are not setter methods. Since Player is
| a subclass of Character, any constructor input or setter methods that are
| input-validated in Character are not re-tested here.
|
|------------------------------------------------------------------------------
*/

var Player = require('../static/player.js');
var Item = require('../static/item.js');
var Vector = require('../static/utility.js');
var Effect = require('../static/effect.js');

describe('Player', function() {
    let testPlayer;
    let testItem;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testItem = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2),
                            new Vector(2,2), true, new Effect('heal'));
        testItem2 = new Item(new Vector(2,2), 'dummy_url', new Vector(2,2),
                            new Vector(2,2), true, new Effect('damage'));
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [testItem],
                                new Vector(12,12), 'dummy_url', new Vector(3,3),
                                new Vector(0,0), 50, 80);
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Test Full Constructor
    it('should create a new player with loc (1,1), maxhealth 20 health 0, status 0, item testItem', function() {
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
        expect(testPlayer.getLocation()).toEqual(new Vector(1,1));
        expect(testPlayer.getMaxHealth()).toEqual(20);
        expect(testPlayer.getHealth()).toEqual(0);
        expect(testPlayer.getStatus()).toEqual(0);
    });

    // Test Invalid Input Constructor
    it('should return an empty object due to invalid equippedItem', function() {
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, "fake_item", [testItem],
                              new Vector(12,12), 'dummy_url', new Vector(3,3),
                              new Vector(0,0), 50, 80);
        expect(testPlayer).toEqual({});
    });

    it('should return an empty object due to invalid Inventory', function() {
        testPlayer = new Player(new Vector(1,1), 20, 0, 0, testItem, [10,13,15],
                              new Vector(12,12), 'dummy_url', new Vector(3,3),
                              new Vector(0,0), 50, 80);
        expect(testPlayer).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Setter and Getter Tests
    |--------------------------------------------------------------------------
    */

    //test setInventory and getInventory
    it('should set Inventory to a test Item and get Inventory', function() {
        testPlayer.setInventory([testItem2]);
        expect(testPlayer.getInventory()).toEqual([testItem2]);
    })

    it('should fail to set Inventory due to an Inventory composed of non-Items', function() {
        testPlayer.setInventory(["sword", "dried fruit", "water bottle", "hat"]);
        expect(testPlayer.getInventory()).toEqual([testItem]);
    })

    it('should fail to set Inventory due to an Inventory that is not a list', function() {
        testPlayer.setInventory("sword");
        expect(testPlayer.getInventory()).toEqual([testItem]);
    })

    //test setEquippedItem
    it('should set equippedItem to testItem2', function() {
        testPlayer.setEquippedItem(testItem2);
        expect(testPlayer.getEquippedItem()).toEqual(testItem2);
    });

    it('should fail to set equippedItem due to invalid input', function() {
        testPlayer.setEquippedItem('blah');
        expect(testPlayer.getEquippedItem()).toEqual(testItem);
    });

    /*
    |--------------------------------------------------------------------------
    | Use Item Tests
    |--------------------------------------------------------------------------
    */

    // test damage effect in useItem
    it('should active the effect of equippedItem', function(){
        testEnemy = new Enemy(new Vector(1,1), 20, 0, 0, 5, new Vector(10,10),
                              new Vector(10,10));
        testPlayer.setEquippedItem(testItem);
        testPlayer.useItem();
        expect(testEnemy.getHealth()).toEqual(testEnemy.getMaxHealth());
        expect(testEnemy.getHealth()).toEqual(20);
        expect(testEnemy.getEquippedItem()).toEqual(null);
        expect(testItem.getEffect().getIsActive()).toBeTruthy();
    });

    //test heal effect in useItem
    it('should test heal', function() {
        testPlayer.setEquippedItem(testItem);
        testPlayer.useItem();
        expect(testPlayer.getHealth()).toEqual(testPlayer.getMaxHealth());
        expect(testPlayer.getHealth()).toEqual(20);
        expect(testPlayer.getEquippedItem()).toEqual(null);
        expect(testItem.getEffect().getIsActive()).toBeTruthy();
    });

    // set items position to be relative to the player, add the item to inventory,
    // and set equipped item
    it('should pick up item', function(){
        testPlayer.pickUpItem(testItem2);
        expect(testPlayer.getEquippedItem().toEqual(testItem2));
        expect(testPlayer.getEquippedItem().getPosition().x).toEqual(11);
        expect(testPlayer.getEquippedItem().getPosition().y).toEqual(6);
        expect(testPlayer.getInventory()).toEqual([testItem, testItem2]);
    });
});

},{"../static/effect.js":2,"../static/item.js":4,"../static/player.js":5,"../static/utility.js":6}]},{},[7])(7)
});