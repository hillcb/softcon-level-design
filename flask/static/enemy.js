/*Enemy Prototype
Note: location is a vector with x and y*/
const Character = require('./character.js');

function Enemy(loc, max, hea, stat, dmg, hbox, url, size, speed, mvspeed, grav){
    t = typeof dmg
    if (t === "number") {
        Character.call(this, loc, max, hea, stat, hbox, url, size, speed, mvspeed, grav);
        this.damage = dmg;
    }
    else {
        return {}
    }
}

Enemy.prototype = Object.create(Character.prototype);

//empty constructor. void
Enemy.prototype.Enemy = function(){
    //create enemy with loc = (0,0), maxhealth = 10
    // health = 10, status = 1, damage = 1
    Character.call(this, vector(0,0), 10, 10, 1, new vector(50,50), null, new vector(50,50));
    this.damage = 1;
}  

//gets damage. return int damage
Enemy.prototype.getDamage = function(){
    //get damage amount
    return this.damage;
}

//set int damage
Enemy.prototype.setDamage = function(amount){
    //set damage to amount
        t = typeof amount
        if (t === "number"){
            this.damage = amount;
        }
        else{
            return {}
        }
}


module.exports = Enemy;
