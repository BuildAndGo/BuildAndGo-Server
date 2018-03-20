const { User, Inventory, Part, Type } = require('../server/db/models');
const db = require('../server/db');

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
        image: "https://s3.amazonaws.com/buildandgo-assets/basic-car-tire-wm.png"
    },
    {
        name: "piston",
        quantityNeeded: 1,
        image: "https://s3.amazonaws.com/buildandgo-assets/basic-car-piston-wm.png"
    },
    {
        name: "frame",
        quantityNeeded: 1,
        image: "https://s3.amazonaws.com/buildandgo-assets/basic-car-frame-wm.png"
    },
    {
        name: "engine",
        quantityNeeded: 1,
        image: "https://s3.amazonaws.com/buildandgo-assets/basic-car-engine-wm2.png"
    }

];

const parts = [
    {
        name: "Good-enough Tire",
        image: "../public/sources/basic-car-tire.png",
        points: 1,
        typeId: 1      
    },
    {
        name: "Good-enough Engine",
        image: "../public/sources/basic-car-engine.png",
        points: 1,
        typeId: 4      
    },
    {
        name: "Good-enough Frame",
        image: "../public/sources/basic-car-frame.png",
        points: 1,
        typeId: 3      
    },
    {
        name: "Good-enough Piston",
        image: "../public/sources/basic-car-piston.png",
        points: 1,
        typeId: 2      
    },
    {
        name: "Premium Tire",
        image: "../public/sources/premium-car-tire.png",
        points: 5,
        typeId: 1        
    }
];

async function seed() {
    console.log('Syncing Database baby');
    await db.sync({ force: true })
    console.log('db synced!')
    const fillUsers = await Promise.all(users.map(user => User.create(user)));
    const fillTypes = await Promise.all(types.map(types => Type.create(types)));
    const fillParts = await Promise.all(parts.map(part => Part.create(part)));

    const fillInventories = await Promise.all([
    Inventory.create({
        quantity: 1,
        userId: 1
    })
    .then(inventory => inventory.setParts([1]))
    ,
    Inventory.create({
        quantity: 1,
        userId: 2
    })
    .then(inventory => inventory.setParts([2, 4]))
    ])
}

seed()
.catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
