'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];

if (cmd === 'read') {
fs.readFile(petsPath, 'utf8', function (err, data) {

  var pets = JSON.parse(data);

  if (err) {
    throw err;
  }

//get pet index code
  else if (index === undefined) {
        console.log(pets);
        process.exit(1);
      }

  else if (index > pets.length - 1 || index < 0) {
        console.error(`Usage: ${node} ${file} INDEX`);
        process.exit(1);
     }

      console.log(index);
      var pet = pets;
      console.log(pet[index]);
//get pet index code
});
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
  if (readErr) {
    throw readErr;
  }

    var pets = JSON.parse(data);
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    if (!age && !kind && !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    // else if (index < JSON.parse(data).length) {
    //   var pets = JSON.parse(data);

    pets[index] = {
      "age": parseInt(age),
      "kind": kind,
      "name": name
    };

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pets[index]);
  });
  });
}




else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
