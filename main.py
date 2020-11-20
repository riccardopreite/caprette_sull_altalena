import Environment
import StandingSwing
import SeatedSwing
#import RealisticSwing
import Utility
import DrawSwing
import math

def main():
    ''' 
    - get data from interface -> {data_enviroment}
    - declare generic SwingMotion: SwingMotion(data_enviroment)
    - declare specifiv subtype: SwingSubtype(SwingMotion)
    - calculate swing motion and save inside subtype: SwingSubtype.calculateSwing()
    - plot subtype: DrawPlot(swingSubtype)   
    '''
    # get data from interface
    # TODO multiple interfaces for simulations of multiple swings
    gravity = 9.81
    dissipativeForce = 0.
    initialSwingDegree = 0.01
    initialAngluarSpeed = 0.0
    maxOscillationDegree = 0.
    massBody = 10.
    heightBody = 1.
    massSwing = 3.
    ropeLength = 2.7
    # TODO chech environment values

    # declare generic enviroment configuration =================================================
    environment = Environment.Environment(
    gravity,
    dissipativeForce,
    initialSwingDegree,
    initialAngluarSpeed,
    maxOscillationDegree,
    massBody,
    heightBody,
    massSwing,
    ropeLength)

    # declare specific subtype ==================================================================
    standingSwing = StandingSwing.StandingSwing(environment)
    seatedSwing = SeatedSwing.SeatedSwing(environment)


    # calculate swing motion and update local variables =========================================
    no_simulationSteps = 20
    standingSwing.calculateSwingMotion("symplectic", no_simulationSteps)

    no_simulationSteps = 30
    seatedSwing.calculateSwingMotion('symplectic', no_simulationSteps)

  

    # plots rotations variables =================================================================
    sleep_time = 0
    drawSwing = DrawSwing.DrawSwing(sleep_time) 

    drawSwing.plotGraph(standingSwing)
    drawSwing.plotGraph(seatedSwing)



    
if __name__ == "__main__":
    main()