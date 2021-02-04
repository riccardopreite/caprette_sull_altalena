class CenterMass {
    constructor(ctx, showUpper, showLower){
        this.ctx = ctx
        this.RADIUS = 5

        this.MAX_NUMBER_POINTS = 200
        this.cm_list = []
        this.upper_list = []
        this.lower_list = []
        this.showUpper = showUpper
        this.showLower = showLower

        // remove
        var x = canvas.width/2
        var y = canvas.height/4
        var p = new Point(x,y)

        var ux = canvas.width/2
        var uy = canvas.height/8
        var up = new Point(ux,uy)

        var lx = canvas.width/2
        var ly = canvas.height/3
        var lp = new Point(lx,ly)

        // console.log(p.x)
        this.cm_list.push(p)
        this.upper_list.push(up)
        this.lower_list.push(lp)
    }

    show(){
        // TODO handle color shades
        ctx.save()
        this.cm_list.forEach(cm => {
            // console.log(cm)
            ctx.beginPath();
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
        ctx.restore()
    }

    update(frame){
        var x = frame.cm["x"]
        var y = frame.cm["y"]
        var p = new Point(x,y)
        this.cm_list[this.cm_list.length % this.MAX_NUMBER_POINTS] = p

        if(this.showUpper){
            var ux = frame.upperCM["x"]
            var uy = frame.upperCM["y"]
            var p = new Point(ux,uy)
            this.upper_list[this.upper_list.length % this.MAX_NUMBER_POINTS] = p
        }

        if(this.showLower){
            var lx = frame.lowerCM["x"]
            var ly = frame.lowerCM["y"]
            var p = new Point(lx,ly)
            this.lower_list[this.lower_list.length % this.MAX_NUMBER_POINTS] = p
        }
    }
}
