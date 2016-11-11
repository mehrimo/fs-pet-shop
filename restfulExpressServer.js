'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//====== Get full pet list =====

app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        var pets = JSON.parse(data);
        res.send(pets);
    });
});

//====== Get pet by index =====

app.get('/pets/:index', function(req, res) {
  // console.log('index test string');
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        var pets = JSON.parse(data);
        // res.send(pets);

        var index = Number.parseInt(req.params.index);
        if (index < 0 || index >= pets.length || Number.isNaN(index)) {
            return res.sendStatus(404);
        }
        res.send(pets[index]);
    });
});

//====== Create pet =====

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        var pets = JSON.parse(data);
        // res.send(pets);

        var pet = req.body;
        if (!pet) {
            return res.sendStatus(400);
        }
        pets.push(pet);
        var strData = JSON.stringify(pets);
        console.log(strData);
        //pets stringify writeFile
        fs.writeFile(petsPath, strData, function(err) {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
            console.log(pet);
        res.send(pet);
    });
  });
});

//====== Update pet by index =====

app.put('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);
  var kind = req.body.kind;
  var age = req.body.age;
  var name = req.body.name;
  var pets;

  var pet = {
      "age": age,
      "kind": kind,
      "name": name
  };

  fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        console.log(err.stack);
        return res.sendStatus(500);
      }
      pets = JSON.parse(data);

      if (index < 0 || index >= pets.length || Number.isNaN(index)) {
          return res.sendStatus(404);
      }

      if (kind && age && name) {

          pets[index] = pet;

          pets = JSON.stringify(pets);

          fs.writeFile(petsPath, pets, function(writeErr) {
              if (writeErr) {
                  throw writeErr;
              }
          });
          res.send(pet);
      } else {
          return res.sendStatus(400);
      }
      });
    });

//====== Delete pet by index =====

app.delete('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);
  var pets;
  var petSplice;
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
          console.error(err.stack);
          return res.sendStatus(500);
      }

      pets = JSON.parse(petsJSON);

      if (Number.isNaN(index) || index < 0 || index >= pets.length) {
          return res.sendStatus(404);
      } else {
          petSplice = pets.splice(index, 1)[0];
          pets = JSON.stringify(pets);

      }
      fs.writeFile(petsPath, pets, function(writeErr) {
          if (writeErr) {
              throw writeErr;
          }
      });
      res.send(petSplice);

  });

});

app.listen(port, function() {
    console.log('Listening on port', port);
});

module.exports = app;
