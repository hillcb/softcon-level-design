(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.database = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

// const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
const AWS_URL = "http://127.0.0.1:5000/";

function storeGrid(gridJSON, cb) {
    console.log('gridJSON: ' + gridJSON);
    if(!validJSON(gridJSON)) {
        console.log('invalid json given');
        return false;
    }
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/add-grid/",
        data: JSON.stringify(gridJSON),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("success: stored the following grid in DB: " + data);
            alert("Success: stored the following grid in DB");
            success = true;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't store grid");
            alert("failure: couldn't store grid");
            success = false;
        }
    });
}

function isRunning(cb) {
    $.ajax({
        type: "GET",
        url: AWS_URL,
        success: function(data) {
            console.log("success: backend is running");
            cb(data);
        },
        failure: function(errMsg) {
            console.log("failure: backend cannot be reached");
        }
    });
}

function deleteGrid(title, cb) {
    console.log('title is: '+ title);
    var success = false;
    if(title.length == 0) {
        return false;
    }
    $.ajax({
        type: "GET",
        async: false,
        url: AWS_URL + "api/v1/delete-grid/" + title,
        success: function(data) {
            console.log("success: deleted grid wwith title " + title + " in DB");
            success = true;
        },
        failure: function(errMsg) {
            alert("failure: didn't delete item with title: " + title);
        }
    });
    return success;
}

function updateGrid(gridJSON, cb) {
    console.log('gridJSON is: ' + gridJSON);
    success = false;
    if(!validJSON(gridJSON)) {
        return success;
    }
    $.ajax({
        type: "POST",
        url: AWS_URL + "api/v1/update-grid/",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(gridJSON),
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log("success: updated the following grid in DB: " + data);
            console.log(data);
            success = true;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't store grid");
            success = false;
        }
    });
}

function getByTitle(title, cb) {
    console.log('title is: '+ title);
    if(title.length == 0) {
        return false;
    }
    var grid;
    $.ajax({
        type: "GET",
        url: AWS_URL + "api/v1/search-grid/" + title,
        contentType: "application/json",
        dataType: "json",
        async: false,
        success: function(data) {
            alert("success! found item with title " + title + " in DB");
            console.log(data);
            grid = data;
        },
        failure: function(errMsg) {
            alert("failure: didn't find item in DB");
            return null;
        }
    });
    return grid;
}

function getAllTitles(cb) {
    $.ajax({
        type: "GET",
        url: AWS_URL + "/api/v1/query-all-titles/",
        contentType: "application/json",
        success: function(data) {
            console.log("success! found the following titles:");
            console.log(data);
            return data;
        },
        failure: function(errMsg) {
            console.log("failure: couldn't retrieve titles")
            return null;
        }
    });
}

function validJSON(myJSON) {
    myJSON = JSON.parse(myJSON);
    console.log("validJSON: myJSON: " + myJSON);
    console.log("validJSON: myJSON type: " + myJSON.type);
    if(myJSON.type == 'string') {
        console.log("validJSON: given a string");
        myJSON = JSON.parse(myJSON);
    }
    try {
        var myTitle = myJSON["title"]
        var myData = myJSON["data"]
        if(myTitle.length == 0 || myData.length == 0) {
            console.log("validJSON: field(s) are length 0");
            return false;
        }
        if(typeof myData != 'string') {
            console.log("validJSON: data isn't a string");
            return false;
        }
    }
    catch(err) {
        console.log("validJSON: caught error");
        console.log(err)
        return false;
    }
    return true;
}

// module.exports.storeGrid = storeGrid;
// module.exports.getByTitle = getByTitle;
// module.exports.getAllTitles = getAllTitles;
// module.exports.validJSON = validJSON;

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
module.exports.getAllTitles = getAllTitles;
module.exports.validJSON = validJSON;
module.exports.updateGrid = updateGrid;
module.exports.isRunning = isRunning;
module.exports.deleteGrid = deleteGrid;
},{}]},{},[1])(1)
});
