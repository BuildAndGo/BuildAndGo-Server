const {User, Inventory, Part, Type} = require('../server/db/models');
const db = require('../server/db/db');

const users = [
    {
        email: "danielle@howard.com",
        password: "thisisapassword",
    },
    {
        email: "sarah@wooten.com",
        password: "lovingNYC",
    },
    {
        email: "eunji@song.com",
        password: "livinginqueens",
    },
    {
        email: "ana@sanchez.com",
        password: "intheheights",
    }
];

const inventories = [
    {
        quantity: 1,
        userId: 1
    },
    { 
        quantity: 1,
        userId: 2
    },
    {
        quantity: 1,
        userId: 3
    },
    {
        quantity: 1,
        userId: 4
    }

];

const types = [
    {
        name: "tire",
        quantityNeeded: 4,
        image: "../public/sources/basic-car-tire.png"
    },
    {
        name: "piston",
        quantityNeeded: 1,
        image: "../public/sources/basic-car-piston.png"
    },
    {
        name: "frame",
        quantityNeeded: 1,
        image: "../public/sources/basic-car-frame.png"
    },
    {
        name: "engine",
        quantityNeeded: 1,
        image: "../public/sources/basic-car-engine.png"
    }

];

const parts = [
    {
        name: "Good-enough Tire",
        image: "../public/sources/basic-car-tire.png",
        points: 1,
        
    },
    {
        name: "Good-enough Engine",
        image: "../public/sources/basic-car-engine.png",
        points: 1,
        
    },
    {
        name: "Good-enough Frame",
        image: "../public/sources/basic-car-frame.png",
        points: 1,
    },
    {
        name: "Good-enough Piston",
        image: "../public/sources/basic-car-piston.png",
        points: 1,
    },
    {
        name: "Premium Tire",
        image: "../public/sources/premium-car-tire.png",
        points: 5,
        
    }
];


function buildingUsers() {
  return Promise.all(users.map(user => User.create(user)));
}

function buildingInventories(){
  return Promise.all(inventories.map(inventories => Inventory.create(inventories)));
}

function buildingParts (){
  return Promise.all(parts.map(parts => Part.create(parts)));
}

function buildingTypes (){
    return Promise.all(types.map(types => Type.create(types)));
  }

  function buildingParts (){
  return Promise.all(parts.map(parts => Part.create(parts)));
}

function seed(){
  return buildingUsers()
  .then(() => buildingInventories())
  .then(() => buildingTypes())
  .then(() => buildingParts());
}

console.log('Syncing Database');

db.sync({force: true})
.then(() => {
  console.log('Seeding database');
  return seed();
})
.then(() => console.log('Seeding Successful'))
.catch(err => {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(() => {
  db.close();
  return null;
});
