const remote = require("@electron/remote")
const workarea = remote.screen.getAllDisplays()[0].workArea

class Water{
    constructor(){
        this._img = document.createElement("img");
        this._img.src = "img/Water.png"
        this._img.width = Math.random() * 3 + 1

        this.x = Math.random() * workarea.width
        this.y = Math.random() * 5 - 40
        this.speedY = (Math.random() + 25)
        
        this.move()
        setInterval(() => {
            if(this._img.parentNode){
                this._img.parentNode.removeChild(this._img)
            }
        }, 1000);
    }

    get img(){
        return this._img
    }

    move() {
        this.y += this.speedY
        this.rotation += this.speedRotation
        this.img.style.transform = `translate(${this.x}px,${this.y}px)`

        if(this.x > workarea.width || this.x < 0 || this.y > workarea.height){
            if(this._img.parentNode){
                this._img.parentNode.removeChild(this._img)
            }
        }else{
            requestAnimationFrame(()=>this.move())
        }
    }
}

module.exports = Water