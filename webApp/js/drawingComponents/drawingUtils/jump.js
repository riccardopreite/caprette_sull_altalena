const DECIMAL_PRECISION = 4

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
            "t:" + Number(this.prevFrame.t).toFixed(DECIMAL_PRECISION) + "->" + Number(this.nextFrame.t).toFixed(DECIMAL_PRECISION),
            "phi:" + Number(this.prevFrame.phi).toFixed(DECIMAL_PRECISION) + "->" + Number(this.nextFrame.phi).toFixed(DECIMAL_PRECISION),
            "w:" + Number(this.prevFrame.w).toFixed(DECIMAL_PRECISION) + "->" + Number(this.nextFrame.w).toFixed(DECIMAL_PRECISION),
            this.prevFrame.bodyPosition + "->" + this.nextFrame.bodyPosition
        )
        log.join(" - ")
        return log
    }
}