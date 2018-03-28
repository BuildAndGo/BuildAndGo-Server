const { User, Inventory, Part, Type } = require('../server/db/models');
const db = require('../server/db');

const users = [
    {
        email: "danielle@howard.com",
        password: "1234",
    },
    {
        email: "sarah@wooten.com",
        password: "1234",
    },
    {
        email: "eunji@song.com",
        password: "1234",
    },
    {
        email: "ana@sanchez.com",
        password: "1234",
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
        name: "GudYears Tire",
        image: "../public/images/300inferiorTire.png",
        points: 1,
        typeId: 1,
        quantity: 4
    },
    {
        name: "DOT Competition Tire",
        image: "../public/images/300racingTire.png",
        points: 5,
        typeId: 1,
        quantity: 4
    },
    {
        name: "Diesel Engine",
        image: "../public/images/300inferiorengine.jpg",
        points: 1,
        typeId: 4
    },
    {
        name: "Bugatten Engine",
        image: "../public/images/300superiorEngine.png",
        points: 5,
        typeId: 4
    },
    {
        name: "Sedan Frame",
        image: "../public/images/300frame.png",
        points: 1,
        typeId: 3
    },
    {
        name: "Racing Frame",
        image: "../public/images/300frame.png",
        points: 5,
        typeId: 3
    },
    {
        name: "Crosshead Piston",
        image: "../public/images/300crossheadPiston.png",
        points: 1,
        typeId: 2
    },
    {
        name: "Slipper Piston",
        image: "../public/images/300slipperPiston.png",
        points: 1,
        typeId: 2
    }
];

async function seed() {
    console.log('Syncing Database baby');
    await db.sync({ force: true })
    console.log('db synced!')
    const fillUsers = await Promise.all(users.map(user => User.create(user)));
    const fillTypes = await Promise.all(types.map(types => Type.create(types)));
    const fillParts = await Promise.all(parts.map(part => Part.create(part)))
    const fillUser1 = await Promise.all(fillParts.map(part => fillUsers[0].addPart(part, { through: { quantity: 1 } })))
    const fillUser2 = await Promise.all(fillParts.slice(2).map(part => fillUsers[1].addPart(part, { through: { quantity: 1 } })))
    const fillUser3 = await Promise.all(fillParts.map(part => fillUsers[2].addPart(part, { through: { quantity: 1 } })))
    const fillUser4 = await Promise.all(fillParts.slice(1).map(part => fillUsers[3].addPart(part, { through: { quantity: 1 } })))
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
