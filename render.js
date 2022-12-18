const SnowFlower = require("./elements/SnowFlower")
const Water = require("./elements/Water")

const request = require("request")
const cheerio = require("cheerio")

let tianqi = "晴"
const url = "https://tianqi.moji.com/weather/china/hunan/taoyuan-county"

function getweathertips(url) {
     return new Promise((resolve,reject)=>{
        request(url,(error,res,body)=>{
         if (!error) {
         let html = res.body || "";
            let $ =cheerio.load(html)
            let temp = $('.wea_weather em').text().trim()+'℃'
            let desc = $('.wea_weather b').text().trim()
            let water = $('.wea_about span').text().trim()
            let win = $('.wea_about em').text().trim()
            let tips = $('.wea_tips em').text().trim()
            if(desc.search("雨") != -1){
                tianqi = "雨"
            }

            if(desc.search("雪") != -1){
                tianqi = "雪"
            }

        } else {
            reject(error)
        }
     })
     })
    }
setInterval(() => {
    getweathertips(url)
}, 60*1000);
    

setInterval(() => {
    if(tianqi == "雨"){
        for(let i = 0; i < 10; i++){
            document.body.appendChild(new Water().img)
        }
    }

    if(tianqi == "雪"){
        for(let i = 0; i < 10; i++){
            document.body.appendChild(new SnowFlower().img)
        }
    }
    
}, 100);