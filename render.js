const SnowFlower = require("./elements/SnowFlower")
const Water = require("./elements/Water")


setInterval(() => {
    for(let i = 0; i < 10; i++){
        document.body.appendChild(new Water().img)
    }
}, 100);