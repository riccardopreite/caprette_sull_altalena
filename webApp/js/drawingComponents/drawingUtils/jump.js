const DECIMAL_PRECISION = 2

class Jump {
    constructor(prevFrame, nextFrame){
        this.prevFrame = prevFrame
        this.nextFrame = nextFrame
    }


    /**
     * @returns {String} log: log string (without line break)
     * ES. t:0.000->0.001 - phi:0.05->0.12 - w:"0.32"->"0.56" - standing->seated
     */
    toString(){
        var log = []
        log.push(
            "t:" + this.prevFrame.t + "->" + this.nextFrame.t,
            "phi:" + this.prevFrame.phi.toFixed(DECIMAL_PRECISION) + "->" + this.nextFrame.phi.toFixed(DECIMAL_PRECISION),
            "w:" + this.prevFrame.w.toFixed(DECIMAL_PRECISION) + "->" + this.nextFrame.w.toFixed(DECIMAL_PRECISION),
            this.prevFrame.bodyPosition + "->" + this.nextFrame.bodyPosition
        )
        log.join(" - ")
        return log
    }
}