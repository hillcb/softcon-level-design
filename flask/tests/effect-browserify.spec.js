(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.effect = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Effect Class
|------------------------------------------------------------------------------
|
| This file contains tests for the Effect class.
| We test valid and invalid input for each method. Thorough testing on
| the constructor is used to verify input to all methods that are not
| setter methods.
|
|------------------------------------------------------------------------------
*/

const Effect = require('../static/effect.js');

describe('Effect', function(){
    let testEffect;

    /*
    |--------------------------------------------------------------------------
    | beforeEach: makes an instance of the class to use for tests. Makes a new
    | version of this test instance before every test, clearing out any
    | modifications to the default data.
    |--------------------------------------------------------------------------
    */

    beforeEach(function(){
        testEffect = new Effect('heal');
    })

    /*
    |--------------------------------------------------------------------------
    | Constructor Tests
    |--------------------------------------------------------------------------
    */

    // test full constructor
    it('should construct a default effect', function(){
        expect((testEffect).getIsActive()).toBeFalsy();
        expect((testEffect).getEffect()).toEqual('heal');
    });

    // test invalid input
    it('should return null Effect because of integer input for title', function(){
      testEffect= new Effect(4);
      expect(testEffect).toEqual({});
    });

    it ('should return null Effect because of bad string input for title', function(){
      testEffect= new Effect('twerk');
      expect(testEffect).toEqual({});
    });

    it ('should return null Effect because of bad booleam input', function(){
      testEffect = new Effect('hello', 'heal');
      expect(testEffect).toEqual({});
    });

    /*
    |--------------------------------------------------------------------------
    | Getter and Setter Tests
    |--------------------------------------------------------------------------
    */

    it('should get and set the title', function(){
        testEffect.setEffect('damage');
        expect((testEffect).getEffect()).toEqual('damage');
    });

    it('should fail to set the title because of bad string input for title', function(){
        testEffect.setEffect('fake_news');
        expect((testEffect).getEffect()).toEqual('heal');
    });

    it('should fail to set the title because of invalid input', function(){
        testEffect.setEffect(800);
        expect((testEffect).getEffect()).toEqual('heal');
    });

    /*
    |--------------------------------------------------------------------------
    | Activation Method Tests
    |--------------------------------------------------------------------------
    */

    it('should activate the effect', function(){
        (testEffect).activate();
        expect((testEffect).getIsActive()).toBeTruthy();
    });

    it('should deactivate the effect', function(){
        (testEffect).activate();
        (testEffect).deactivate();
        expect((testEffect).getIsActive()).toBeFalsy();
    });
});

},{"../static/effect.js":1}]},{},[2])(2)
});