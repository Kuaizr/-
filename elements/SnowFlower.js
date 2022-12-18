const remote = require("@electron/remote")
const workarea = remote.screen.getAllDisplays()[0].workArea

class SnowFlower{
    constructor(){
        this._img = document.createElement("img");
        this._img.src = "img/snowflower.png"
        this._img.width = Math.random() * 8 + 2

        this.x = Math.random() * workarea.width
        this.y = Math.random() - 20
        this.speedX = (Math.random() + 1)*(Math.random() > 0.5 ? 1 : -1)
        this.speedY = (Math.random() + 1)
        this.rotation = 0
        this.speedRotation = (Math.random() + 1)*(Math.random() > 0.5 ? 1 : -1)
        
        this.move()
        setInterval(() => {
            if(this._img.parentNode){
                this._img.parentNode.removeChild(this._img)
            }
        }, 15000);
    }

    get img(){
        return this._img
    }

    move() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.speedRotation
        this.img.style.transform = `translate(${this.x}px,${this.y}px) rotate(${this.rotation}deg)`

        if(this.x > workarea.width || this.x < 0 || this.y > workarea.height){
            if(this._img.parentNode){
                this._img.parentNode.removeChild(this._img)
            }
        }else{
            requestAnimationFrame(()=>this.move())
        }
    }
}

module.exports = SnowFlower