const NUMBER_COLORS = 50
var colorBlue = "#21D4FD"
var colorPurple = "#B721FF"
var colors = generateColor(colorBlue, colorPurple, NUMBER_COLORS)

class CenterMass {
    constructor(ctx, showUpper, showLower) {
        this.ctx = ctx
        this.RADIUS = 2.5

        this.MAX_NUMBER_POINTS = 120
        this.counter = 0
        this.cm_list = []
        this.upper_list = []
        this.lower_list = []
        this.showUpper = showUpper
        this.showLower = showLower
    }

    show() {
        var POINT_OFFSET = 2

        this.cm_list.forEach(cm => {
            if (this.cm_list.indexOf(cm) % POINT_OFFSET == 0) {
                this.ctx.beginPath();
                this.ctx.arc(cm.x, cm.y, this.RADIUS, 0, 2 * Math.PI);
                this.ctx.fillStyle = "#" + colors[this.cm_list.indexOf(cm) % NUMBER_COLORS]
                this.ctx.fill()
            }
        })

        if (this.showUpper) {
            this.upper_list.forEach(cm => {
                if (this.cm_list.indexOf(cm) % POINT_OFFSET == 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(cm.x, cm.y, this.RADIUS, 0, 2 * Math.PI);
                    this.ctx.fillStyle = "#" + colors[this.upper_list.indexOf(cm) % NUMBER_COLORS]
                    this.ctx.fill()
                }
            })
        }

        if (this.showLower) {
            this.lower_list.forEach(cm => {
                if (this.cm_list.indexOf(cm) % POINT_OFFSET == 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(cm.x, cm.y, this.RADIUS, 0, 2 * Math.PI);
                    this.ctx.fillStyle = "#" + colors[this.lower_list.indexOf(cm) % NUMBER_COLORS]
                    this.ctx.fill()
                }
            })
        }
    }

    update(frame) {
        var nextPos = this.counter % this.MAX_NUMBER_POINTS

        var x = frame.cm["x"]
        var y = frame.cm["y"]
        var p = new Point(x, y)
        this.cm_list[nextPos] = p
        this.counter++

        if (this.showUpper) {
            var ux = frame.upperCM["x"]
            var uy = frame.upperCM["y"]
            var p = new Point(ux, uy)
            this.upper_list[nextPos] = p
        }

        if (this.showLower) {
            var lx = frame.lowerCM["x"]
            var ly = frame.lowerCM["y"]
            var p = new Point(lx, ly)
            this.lower_list[nextPos] = p
        }
    }
}