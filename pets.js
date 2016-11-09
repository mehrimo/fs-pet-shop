'use strict';

var fs = require('fs');
var path = require('path');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];

if (cmd === 'read') {
fs.readFile('pets.json', 'utf8', function (err, data) {
  var pets = JSON.parse(data);

  if (err) {
    throw err;
  }

//get pet index code
  else if (index === undefined) {
        // var pets = dataP;
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

else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
