(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.database = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.database = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * database.js - database utility functions
 * Software Construction - Autumn 2018
 * Christian Hill
 * Marjorie Antohi
 * 
 */

/*
|------------------------------------------------------------------------------
| Database
|------------------------------------------------------------------------------
|
| This file contains the Database utility functions.
|
|------------------------------------------------------------------------------
*/


const HTTP_OK = "200";
const HTTP_CREATED = "201";
const HTTP_BADREQUEST = "400";
const HTTP_NOTFOUND = "404";
const HTTP_CONFLICT = "409";

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
// const AWS_URL = "http://127.0.0.1:5000/";
const SUCCESS_MSG = "BACKEND RUNNING";

//store a grid, which is a JSON, in the database
function storeGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
<<<<<<< HEAD
        throw new Error("invalid JSON given");
=======
        throw "invalid JSON given";
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
    }
    var success;
    try {
        success = $.ajax({
            type: "POST",
            url: AWS_URL + "api/v1/add-grid/",
            data: JSON.stringify(gridJSON),
            contentType: "application/json",
            dataType: "text",
            success: function(data) {
                console.log("Success: stored [" + data + "] in database.");
                alert("Success: grid successfully stored.");
            },
            failure: function(errMsg) {
                console.log("failure: couldn't store grid");
                alert("Error: operation could not be performed.");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if (status == HTTP_CONFLICT) {
                    console.log("Error: HTTP CONFLICT (" + HTTP_CONFLICT + ")");
                    alert("That title is taken; please choose another name.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

// checks if the database is running
async function isRunning() {
    var success;
    try {
        success = await $.ajax({
            type: "GET",
            dataType: "text",
<<<<<<< HEAD
            url: AWS_URL + "api/v1/backend-up/", 
=======
            url: AWS_URL + "api/v1/backend-up", 
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
            success: function(data) {
                alert("Backend is running");
                console.log("success: backend is running");
            },
            failure: function(errMsg) {
                console.log("failure: backend cannot be reached");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("error: " + textStatus);
            }
        });
    } catch(err) {
        console.log(err);
        return false;
    }
    return success==SUCCESS_MSG;
}

async function deleteGrid(title) {
    if(title.length <= 0 || title == null) {
<<<<<<< HEAD
        throw new Error("invalid title given");
=======
        throw "invalid title given";
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
    }
    var success;
    try {
        success = await $.ajax({
            type: "GET",
            async: true,
            url: AWS_URL + "api/v1/delete-grid/" + title,
            success: function(data) {
                alert("Success: grid successfully deleted.");
                console.log("success: deleted grid in DB via success callback");
            },
            failure: function(errMsg) {
                alert("Sorry, something went wrong. The grid was not deleted.");
                console.log("failure: didn't delete item");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                if (status == HTTP_NOTFOUND) {
                    alert("Error: the grid was not found.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

//update a grid that is already in the database
async function updateGrid(gridJSON) {
    if(!validJSON(gridJSON)) {
<<<<<<< HEAD
        throw new Error("invalid JSON given");
=======
        throw "invalid JSON given";
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
    }
    try {
        var success = await $.ajax({
            type: "POST",
            url: AWS_URL + "api/v1/update-grid/",
            data: JSON.stringify(gridJSON),
            contentType: "application/json",
            dataType: "text",
            success: function(data) {
                console.log("success: updated the following grid in DB: " + data);
                console.log(data);
            },
            failure: function(errMsg) {
                console.log("failure: couldn't store grid");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if (status == HTTP_NOTFOUND) {
                    console.log("Error: HTTP NOTFOUND (" + HTTP_NOTFOUND + ")");
                    alert("Error: the grid was not found.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

//retrieve a grid from the database using its title
async function getByTitle(title) {
    if(title.length == 0) {
<<<<<<< HEAD
        throw new Error("invalid title given");
=======
        throw "invalid title given";
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
    }
    var grid;
    try {
        grid = await $.ajax({
            type: "GET",
            url: AWS_URL + "api/v1/search-grid/" + title,
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                console.log("success: found item with title " + title + " in DB");
            },
            failure: function(errMsg) {
                console.log("failure: didn't find item in DB");
            }, 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if (status == HTTP_NOTFOUND) {
                    console.log("Error: HTTP NOTFOUND (" + HTTP_NOTFOUND + ")");
                    alert("Error: the grid was not found.");
                } else if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The title could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
    } catch(error) {
        console.log(error);
    }
    if(grid == null) {
<<<<<<< HEAD
        throw new Error("didn't retrieve grid with title [" + title + "]");
=======
        throw "didn't retrieve grid with title [" + title + "]";
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
    }
    return grid;
}

//return all the titles of the levels stored in the database
async function getAllTitles() {
    var titles;
    try {
        titles = await $.ajax({
            type: "GET",
            url: AWS_URL + "api/v1/query-all-titles/",
            contentType: "application/json",
            // dataType: "json",
            success: function(data) {
                console.log("success! found the following titles:");
                console.log(data);
                // titles = data;
            },
            failure: function(errMsg) {
                console.log("failure: couldn't retrieve titles")
                // titles = null;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status
                if(status == HTTP_BADREQUEST) {
                    console.log("Error: HTTP BADREQUEST (" + HTTP_BADREQUEST + ")");
                    alert("Sorry, something went wrong. The titles could not be retrieved; please try again.");
                } else {
                    console.log("Error: unspecified error (" + status + ")");
                    console.log("Error textStatus: " + textStatus);
                    alert("Error: operation could not be performed.");
                }
            }
        });
    } catch(err) {
        console.log(err);
    }
    if(titles == null) {
<<<<<<< HEAD
        throw new Error("didn't retrieve titles");
=======
        throw "didn't retrieve titles";
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
    }
    return titles;
}


//function to check if a JSON is valid to store in the database
function validJSON(myJSON) {
    myJSON = JSON.parse(myJSON);
    if(myJSON.type == 'string') {
        myJSON = JSON.parse(myJSON);
    }
    try {
        var myTitle = myJSON["title"]
        var myData = myJSON["data"]
        if(myTitle.length == 0 || myData.length == 0) {
            return false;
        }
        if(typeof myData != 'string') {
            return false;
        }
    }
    catch(err) {
        console.log(err)
        return false;
    }
    return true;
}

module.exports.storeGrid = storeGrid;
module.exports.getByTitle = getByTitle;
module.exports.getAllTitles = getAllTitles;
module.exports.validJSON = validJSON;
module.exports.updateGrid = updateGrid;
module.exports.isRunning = isRunning;
module.exports.deleteGrid = deleteGrid;
},{}]},{},[1])(1)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
/*
|------------------------------------------------------------------------------
| Tests for Database
|------------------------------------------------------------------------------
|
| This file contains tests for the Database.
| We test valid and invalid input for information to be stored in the Databse.
| The two necessary fields for JSONs to be stored in the Database are  
| "title" and "data", so the existence and validity of these fields are tested.
|
|------------------------------------------------------------------------------
*/

/*
    |--------------------------------------------------------------------------
    | Valid JSON Tests
    |--------------------------------------------------------------------------
    */
const Database = require('../static/database-browserify.js');
// const jasmine = require('../../node_modules/jasmine-core/lib/jasmine-core/');
// const jasmine = require('../../node_modules/jasmine-ajax');
// const jasmine = require('../../spec/helpers/mock-ajax.js')

const AWS_URL = "http://softcon-leveldesign.us-east-1.elasticbeanstalk.com/";
// const AWS_URL = "http://127.0.0.1:5000/";

const ISRUNNING_URL    = "api/v1/backend-up/";
const STOREGRID_URL    = "api/v1/add-grid/";
const DELETEGRID_URL   = "api/v1/delete-grid/";
const UPDATEGRID_URL   = "api/v1/update-grid/"
const GETGRID_URL      = "api/v1/search-grid/";
const GETALLTITLES_URL = "api/v1/query-all-titles/";

describe('Valid JSON Tests', function() {
    var validJSON1 = JSON.stringify(JSON.parse('{ "title" : "mytitle1", "data" : "my data 1" }'));
    var validJSON2 = JSON.stringify(JSON.parse('{ "title" : "mytitle2", "data" : "my data 12" }'));
    var validJSON3 = JSON.stringify(JSON.parse('{ "title" : "mytitle3", "data" : "my data 123" }'));

    var invalidJSON1 = JSON.stringify(JSON.parse('{ "title" : "", "data" : "my data 123" }'));
    var invalidJSON2 = JSON.stringify(JSON.parse('{ "title" : "mytitle3", "data" : "" }'));
    var invalidJSON3 = JSON.stringify(JSON.parse('{ "title" : "", "data" : "" }'));
    var invalidJSON4 = JSON.stringify(JSON.parse('{ "notatitle" : "bad title", "notdata" : "bad data" }'));
    var invalidJSON5 = JSON.stringify(JSON.parse('{ "title" : "atitle", "data" : 123456789 }'));
    var invalidJSON6 = JSON.stringify(JSON.parse('{ "title" : "anothertitle", "data" : 0}'));

    it('should test that a given JSON with nonempty title and data fields is treated as valid', function() {
        expect(Database.validJSON(validJSON1)).toBeTruthy();
        expect(Database.validJSON(validJSON2)).toBeTruthy();
        expect(Database.validJSON(validJSON3)).toBeTruthy();
    });
    it('should test that a given JSON has title and data fields', function(){
        expect(Database.validJSON(invalidJSON4)).toBeFalsy();
    });
    it('should test that a given JSON does not have an empty data field', function() {
        expect(Database.validJSON(invalidJSON2)).toBeFalsy();
        expect(Database.validJSON(invalidJSON3)).toBeFalsy();
    });
    it('should test that a given JSON does not have an empty title field', function(){
        expect(Database.validJSON(invalidJSON1)).toBeFalsy();
        expect(Database.validJSON(invalidJSON3)).toBeFalsy();
    });
    it('should test that a given JSON does not have an incorrectly filled data field', function() {
        expect(Database.validJSON(invalidJSON5)).toBeFalsy();
        expect(Database.validJSON(invalidJSON6)).toBeFalsy();
    });
});


/*
    |--------------------------------------------------------------------------
    | Tests for Storing Information in the Database and
    | Retrieving Information from the Database
    |--------------------------------------------------------------------------
    */

describe('REST API Tests', function() {
    /*
     * The beforeEach and afterEach functions act as helpers to setup and
     * teardown, respectively, to reset the AJAX connection creation - a step
     * that is necessary when using Jasmine as a testing suite.
     */
    beforeEach(function() {
        jasmine.Ajax.install();
    });
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    // tests to make sure the database is running
    describe('isRunning() tests', function() {
        it('should test if the backend is running with barebones AJAX call', function() {
            var doneFn = jasmine.createSpy("success");
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                  doneFn(this.responseText);
                }
            };
            xhr.open("GET", AWS_URL+ ISRUNNING_URL);
            xhr.send();

            expect(jasmine.Ajax.requests.mostRecent().url).toBe(AWS_URL + ISRUNNING_URL);
            expect(doneFn).not.toHaveBeenCalled();

            jasmine.Ajax.requests.mostRecent().respondWith({
                "status" : 200,
                "contentType" : "application/json",
                "responseText" : "SUCCESS: backend is running" 
            });
            expect(doneFn).toHaveBeenCalledWith('SUCCESS: backend is running');
        });
        it('should test if the backend is running with database.js function call', function() {
            var doneFn = jasmine.createSpy("success");
            expect(Database.isRunning()).toBeTruthy();
            expect(doneFn).not.toHaveBeenCalled();
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(AWS_URL + ISRUNNING_URL);
            expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
        });
    });

    // testing adding different grids to the database
    describe('storeGrid() tests', function() {
        it('should test adding a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var testGrid = {
                "title" : "unitTestTestGrid",
                "data" : "myfakedata123"
            };
            expect(Database.storeGrid(JSON.stringify(testGrid))).toBeTruthy();
            thisRequest = jasmine.Ajax.requests.mostRecent();
            expect(thisRequest.url).toBe(AWS_URL + STOREGRID_URL);
            expect(doneFn).not.toHaveBeenCalled();
            expect(thisRequest.method).toBe("POST");
<<<<<<< HEAD
=======
            thisRequest.respondWith({
                "status" : 200,
                "responseText" : "SUCCESS: backend is running" 
            });
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(AWS_URL + "api/v1/add-grid/");
        });
        it('should test adding a grid which *is* already in the database', function() {
            var callbackResult;
            function testCB(data) {
                callbackResult = data;
                console.log("callbackResult is now [" + data + "]");
            }
            var newTestGrid = {
                "title" : "newUnitTestTestGrid",
                "data" : "myfakedata123"
            };
            Database.storeGrid(testGrid, testCB);
            expect(doneFn).not.toHaveBeenCalled();
            expect($.ajax.calls.mostRecent().method).toBe("POST");
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(AWS_URL + "api/v1/add-grid/");
            Database.storeGrid(testGrid, testCB);
            expect(doneFn).not.toHaveBeenCalled();
            expect($.ajax.calls.mostRecent().method).toBe("POST");
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(AWS_URL + "api/v1/add-grid/");
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
        });
        it('should test adding a bad grid', function() {
            var doneFn = jasmine.createSpy("success");
            var badTestGrid = {
                "notATitle" : "badTitle",
                "notData" : "notData"
            };
<<<<<<< HEAD
            expect(function() {
                Database.storeGrid(JSON.stringify(badTestGrid))
            }).toThrowError();
            expect(doneFn).not.toHaveBeenCalled();
=======
            Database.storeGrid(badTestGrid);
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
        });
    });

    // testing deleting different grids from database
    describe('deleteGrid() tests', function() {
        it('should test deleting a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var deleteGrid = {
                "title" : "unitTestDeleteGrid",
                "data" : "mydata123"
            };
<<<<<<< HEAD
            expect(Database.storeGrid(JSON.stringify(deleteGrid))).toBeTruthy();
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + STOREGRID_URL);
            expect(Database.deleteGrid(deleteGrid.title)).toBeTruthy();
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + DELETEGRID_URL + deleteGrid.title);
            expect(doneFn).not.toHaveBeenCalled();
=======
            Database.storeGrid(deleteGrid, testCB);
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(AWS_URL + "api/v1/add-grid/");
            Database.deleteGrid(deleteGrid.title);
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(AWS_URL + "api/v1/delete-grid/" + deleteGrid.title);
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
        });
        it('should test deleting a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var badDeleteGridTitle = "titleOfGridWhichIsNotInDatabase";
<<<<<<< HEAD
            Database.deleteGrid(badDeleteGridTitle).then(function(result) {
                expect(result).toBeFalsy();
                doneFn();
            });
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + DELETEGRID_URL + badDeleteGridTitle);
            expect(doneFn).not.toHaveBeenCalled();
=======
            Database.deleteGrid(badDeleteGridTitle);
            expect($.ajax.calls.mostRecent().args[0]["url"]).toEqual(AWS_URL + "api/v1/delete-grid/" + badDeleteGridTitle);
>>>>>>> 69b77466dd336c30a47e5033494f2413cebe80c3
        });
        it('should test deleting a grid given an empty string title', function() {
            var doneFn = jasmine.createSpy("success");
            var emptyTitle = "";
            Database.deleteGrid(emptyTitle).then(function(result) {
                expect(result).toBeFalsy();
                done();
            });
            expect(doneFn).not.toHaveBeenCalled();
        });
    });

    // testing updating different grids in database
    describe('updateGrid() tests', function() {
        it('should update a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var updateTestGrid = {
                "title" : "newUnitTestUpdateGrid",
                "data" : "myfakedata123"
            };
            var updateTestGrid2 = {
                "title" : "newUnitTestUpdateGrid2",
                "data" : "myfakedata123"
            };
            Database.storeGrid(JSON.stringify(updateTestGrid));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/add-grid/");
            Database.updateGrid(JSON.stringify(updateTestGrid));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/update-grid/");
            Database.updateGrid(JSON.stringify(updateTestGrid2));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/update-grid/");
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should attempt to update a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var updateTestGrid = {
                "title" : "updateTestGridWhichIsNotInDatabase",
                "data" : "myfakedata123"
            };
            Database.updateGrid(JSON.stringify(updateTestGrid));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/update-grid/");
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should attempt to update a grid with invalid data', function() {
            var doneFn = jasmine.createSpy("success");
            var badUpdateTestGrid = {
                "nottitle" : "updateTestGridWhichIsNotInDatabase",
                "notdata" : "myfakedata123"
            };
            expect(Database.updateGrid(JSON.stringify(badUpdateTestGrid))).toThrowError();
            expect(doneFn).not.toHaveBeenCalled();
        });
    });

    // testing retrieving different grids from database
    describe('getByTitle() tests', function() {
        it('should retrieve a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var addTestGrid = {
                "title" : "addTestGrid",
                "data" : "myfakedata123"
            };
            Database.addGrid(JSON.stringify(addTestGrid));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/add-grid/");
            Database.getBytTitle(addTestGrid.title);
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/search-grid/" + addTestGrid.title);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should retrieve a grid which is *not* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var badAddTestGrid = {
                "title" : "badAddTestGrid",
                "data" : "myfakedata123"
            };
            Database.getBytTitle(JSON.stringify(badAddTestGrid.title));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/search-grid/" + badAddTestGrid.title);
            expect(doneFn).not.toHaveBeenCalled();
        });
        it('should attempt to retrieve a grid which *is* in the database', function() {
            var doneFn = jasmine.createSpy("success");
            var emptyTitle = "";
            Database.getByTitle(JSON.stringify(emptyTitle));
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/search-grid/" + emptyTitle);
            expect(doneFn).not.toHaveBeenCalled();
        });
    });
    describe('getAllTitles() tests', function() {
        it('should get titles from the database', function() {
            var doneFn = jasmine.createSpy("success");
            Database.getAllTitles();
            expect(jasmine.Ajax.requests.mostRecent().url).toEqual(AWS_URL + "api/v1/query-all-titles/");
            expect(doneFn).not.toHaveBeenCalled();
        });
    });
});
},{"../static/database-browserify.js":1}]},{},[2])(2)
});
