const {User, Inventory, Part, Type} = require('../server/db/models');
const db = require('../server/db/db');

const users = [
    {
        id: 1,
        email: "danielle@howard.com",
        password: "thisisapassword",
    },
    {
        id: 2,
        email: "sarah@wooten.com",
        password: "lovingNYC",
    },
    {
        id: 3,
        email: "eunji@song.com",
        password: "livinginqueens",
    },
    {
        id: 4,
        email: "ana@sanchez.com",
        password: "intheheights",
    }
];

const inventories = [
    {
        id: 1, 
        quantity: 1,
        userId: 1
    },
    {
        id: 2, 
        quantity: 1,
        userId: 2
    },
    {
        id: 3, 
        quantity: 1,
        userId: 3
    },
    {
        id: 4, 
        quantity: 1,
        userId: 4
    }

];

const types = [
    {
        id: 1,
        name: "tire",
        quantityNeeded: 4,
        image: "../public/sources/basic-car-tire.png"
    },
    {
        id: 2,
        name: "piston",
        quantityNeeded: 1,
        image: "../public/sources/basic-car-piston.png"
    },
    {
        id: 3,
        name: "frame",
        quantityNeeded: 1,
        image: "../public/sources/basic-car-frame.png"
    },
    {
        id: 3,
        name: "engine",
        quantityNeeded: 1,
        image: "../public/sources/basic-car-engine.png"
    }

];

const parts = [
    {
        id: 1,
        name: "Good-enough Tire",
        image: "../public/sources/basic-car-tire.png",
        points: 1,
        
    },
    {
        id: 2,
        name: "Good-enough Engine",
        image: "../public/sources/basic-car-engine.png",
        points: 1,
        
    },
    {
        id: 3,
        name: "Good-enough Frame",
        image: "../public/sources/basic-car-frame.png",
        points: 1,
    },
    {
        id: 4,
        name: "Good-enough Piston",
        image: "../public/sources/basic-car-piston.png",
        points: 1,
    },
    {
        id: 5,
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