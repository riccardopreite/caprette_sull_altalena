class CenterMass {
    constructor(ctx, showUpper, showLower){
        this.ctx = ctx
        this.RADIUS = 5

        this.MAX_NUMBER_POINTS = 150
        this.counter = 0
        this.cm_list = []
        this.upper_list = []
        this.lower_list = []
        this.showUpper = showUpper
        this.showLower = showLower
    }

    show(){
        // TODO handle color shades
        this.cm_list.forEach(cm => {
            // console.log(cm)
            ctx.beginPath();
            //if counter > 200 diminuisci radius || diminuisci frequenza disegno punti
            ctx.arc(cm.x, cm.y, this.RADIUS, 0, 2 * Math.PI);
            // ctx.fillStyle = colors[this.cm_list.indexOf(cm)]
            ctx.fillStyle = "blue"
            ctx.fill()
        })

        if(this.showUpper){
            this.upper_list.forEach(cm => {
                // console.log(cm)
                ctx.beginPath();
                ctx.arc(cm.x, cm.y, this.RADIUS, 0, 2 * Math.PI);
                // ctx.fillStyle = colors[this.cm_list.indexOf(cm)]
                ctx.fillStyle = "green"
                ctx.fill()
            })
        }

        if(this.showLower){
            this.lower_list.forEach(cm => {
                // console.log(cm)
                ctx.beginPath();
                ctx.arc(cm.x, cm.y, this.RADIUS, 0, 2 * Math.PI);
                // ctx.fillStyle = colors[this.cm_list.indexOf(cm)]
                ctx.fillStyle = "orange"
                ctx.fill()
            })
        }
    }

    update(frame){
        var nextPos = this.counter % this.MAX_NUMBER_POINTS

        var x = frame.cm["x"]
        var y = frame.cm["y"]
        var p = new Point(x,y)
        this.cm_list[nextPos] = p
        this.counter++

        if(this.showUpper){
            var ux = frame.upperCM["x"]
            var uy = frame.upperCM["y"]
            var p = new Point(ux,uy)
            this.upper_list[nextPos] = p
        }

        if(this.showLower){
            var lx = frame.lowerCM["x"]
            var ly = frame.lowerCM["y"]
            var p = new Point(lx,ly)
            this.lower_list[nextPos] = p
        }
    }
}
