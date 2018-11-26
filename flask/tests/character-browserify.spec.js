(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.character = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./element.js":2,"./utility.js":4}],2:[function(require,module,exports){
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
},{"./utility.js":4}],3:[function(require,module,exports){
/*Environment prototype*/
/*note: Environment has flag for whether its solid or not*/
const Element = require('./element.js');

function Environment(solid, pos, url, scale, hbox){
  if (typeof solid == "boolean") {
      Element.call(this, pos, url, scale, hbox);
      this.solid = solid;
  }
  else
      return {};
}

Environment.prototype = Object.create(Element.prototype);

Environment.prototype.Environment = function(){
    Element.call(this, new vector(0,0), null, new vector(50,50), new vector (50,50));
    this.solid= true;
}

Environment.prototype.getSolid = function(){
    return this.solid;
}

Environment.prototype.setSolid = function(bool){
  if (typeof solid == "boolean"){
      this.solid = bool;
  }
}

module.exports = Environment;

},{"./element.js":2}],4:[function(require,module,exports){
/*Vector class */
function Vector(x,y){
	this.x=x;
	this.y=y;
}

Vector.prototype.plus = function(vec) {
	return new Vector (this.x + vec.x, this.y + vec.y);
}

module.exports = Vector;
},{}],5:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Character Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Character class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Vector = require('../static/utility.js');
const Character = require('../static/character.js');
const Environment = require('../static/environment.js');

describe('Character', function() {
    let testCharacter;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testCharacter = new Character(new Vector(1,1), 20, 10, true,
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, 40);
    });

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // Full Constructor Tests
    it('should create a new character with fiven specs', function() {
        expect(testCharacter.getPosition()).toEqual(new Vector(1,1));
        expect(testCharacter.getMaxHealth()).toEqual(20);
        expect(testCharacter.getHealth()).toEqual(10);
        expect(testCharacter.getStatus()).toBeTruthy();
        expect(testCharacter.getHitbox()).toEqual(new Vector(50,50));
        expect(testCharacter.getSprite()).toEqual('url');
        expect(testCharacter.getSize()).toEqual(new Vector(50,50));
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,0));
        expect(testCharacter.getMovementSpeed()).toEqual(60);
        expect(testCharacter.getGravity()).toEqual(40);
    });

    // Invalid Input Constructor Tests
    it('should return an empty object due to invalid max health', function() {
        testCharacter = new Character(new Vector(0,0), "bad", 10,
                                      true, new Vector(50,50),
                                      'url', new Vector(50,50),
                                      new Vector(0,0), 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid health', function() {
        testCharacter = new Character(new Vector(0,0), 20, "bad", true,
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid status', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, "bad",
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid speed', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, true,
                                       new Vector(50,50), 'url',
                                       new Vector(50,50), "bad", 60, 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid movement speed', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, true,
                                       new Vector(50,50), 'url',
                                       new Vector(50,50),
                                       new Vector(0,0), "bad", 40);
        expect(testCharacter).toEqual({});
    });

    it('should return an empty object due to invalid gravity', function() {
        testCharacter = new Character(new Vector(0,0), 20, 10, true,
                                      new Vector(50,50), 'url',
                                      new Vector(50,50),
                                      new Vector(0,0), 60, "bad");
        expect(testCharacter).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    // setMaxHealth and getMaxHealth Tests
    it('should set the characters max health to 30', function() {
        testCharacter.setMaxHealth(30);
        expect(testCharacter.getMaxHealth()).toEqual(30);
    });

    it('should fail to set the max health due to invalid input', function() {
        testCharacter.setMaxHealth('p');
        expect(testCharacter.getMaxHealth()).toEqual(20);
    });

    // setHealth and getHealth Tests
    it('should set the characters health to 5', function() {
        testCharacter.setHealth(5);
        expect(testCharacter.getHealth()).toEqual(5);
    });

    it('should fail to set the health due to invalid input', function() {
        testCharacter.setHealth('one');
        expect(testCharacter.getHealth()).toEqual(10);
    });

    // setStatus and getStatus Tests
    it('should set the charaters status to false', function() {
        testCharacter.setStatus(false);
        expect(testCharacter.getStatus()).toBeFalsy();
    });

    it('should fail to set the status due to invalid input', function() {
        testCharacter.setStatus("bad");
        expect(testCharacter.getStatus()).toEqual(true);
    });

    // setSpeed and getSpeed Tests
    it('should set the charaters speed to vector 100,100', function() {
        testCharacter.setSpeed(new Vector(100,100));
        expect(testCharacter.getSpeed()).toEqual(new Vector(100,100));
    });

    it('should fail to set the speed due to invalid input', function() {
        testCharacter.setSpeed("bad");
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,0));
    });

    // setMovementSpeed and getMovementSpeed Tests
    it('should set movement speed to 100', function() {
        testCharacter.setMovementSpeed(100);
        expect(testCharacter.getMovementSpeed()).toEqual(100);
    });

    it('should fail to set Movement speed due to invalid input', function(){
        testCharacter.setMovementSpeed("bad");
        expect(testCharacter.getMovementSpeed()).toEqual(60);
    });

    // setGravity and getGravity Tests
    it('should set gravity to 100', function(){
        testCharacter.setGravity(100);
        expect(testCharacter.getGravity()).toEqual(100);
    });

    it('should fail to set gravity due to invalid input', function(){
        testCharacter.setGravity("bad")
        expect(testCharacter.getGravity()).toEqual(40);
    });

    /*
    |--------------------------------------------------------------------------
    | Movement Tests
    |--------------------------------------------------------------------------
    */

    // newXPos Tests
    it('should make newXpos with step 1 and dir right', function(){
        expect(testCharacter.newXPos(1,'right')).toEqual(new Vector(61,1));
    });

    it('should make newXpos with step 1 and dir right', function(){
        expect(testCharacter.newXPos(1,'left')).toEqual(new Vector(-59,1));
    });

    // moveX Tests
    it('should move x to newpos because of null obstacle', function(){
        testCharacter.moveX(new Vector(61,1),null);
        expect(testCharacter.getPosition()).toEqual(new Vector(61,1));
    });

    it('should move x to newpos because of non-solid obstacle', function(){
        testEnvironment = new Environment(false, new Vector(1,1), null,
                                          new Vector(50,10),
                                          new Vector(20,50));
        testCharacter.moveX(new Vector(61,1), testEnvironment);
        expect(testCharacter.getPosition()).toEqual(new Vector(61,1));
    });

    it('should not move x to newpos because of solid obstacle', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveX(new Vector(61,1), testEnvironment);
        expect(testCharacter.getPosition()).toEqual(new Vector(1,1));
    });

    // newYPos Tests
    it('should make newYpos with step 1 ', function(){
        expect(testCharacter.newYPos(1)).toEqual(new Vector(1,41));
    });

    it('should make newYpos with step 5 ', function(){
        expect(testCharacter.newYPos(5)).toEqual(new Vector(1,1001));
    });

    // moveY Tests
    it('should move y to newpos because of null obstacle', function(){
        newPos = new Vector(1,41);
        testCharacter.moveY(newPos, null, true);
        expect(testCharacter.getPosition()).toEqual(newPos);
    });

    it('should move y to newpos because of non-solid obstacle', function(){
        testEnvironment =  new Environment(false, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        newPos = new Vector(1,41);
        testCharacter.moveY(newPos, testEnvironment, true);
        expect(testCharacter.getPosition()).toEqual(newPos);
    });

    it('should not move y to newpos because of solid obstacle and should set yspeed to 0', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveY(new Vector(1,41), testEnvironment, false);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 1));
    });

    it('should not move y to newpos because of solid obstacle and should set yspeed to 0', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.moveY(new Vector(1,41), testEnvironment, false);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 1));
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,0));
    });

    it('should not move y to newpos because of solid obstacle and should set yspeed to -70', function(){
        testEnvironment =  new Environment(true, new Vector(1,1), null,
                                           new Vector(50,10),
                                           new Vector(20,50));
        testCharacter.setSpeed(new Vector(0,10));
        testCharacter.moveY(new Vector(1,41), testEnvironment, true);
        expect(testCharacter.getPosition()).toEqual(new Vector(1, 1));
        expect(testCharacter.getSpeed()).toEqual(new Vector(0,-70));
    });
});

},{"../static/character.js":1,"../static/environment.js":3,"../static/utility.js":4}]},{},[5])(5)
});