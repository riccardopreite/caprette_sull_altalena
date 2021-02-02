import Environment
import StandingSwing
import SeatedSwing
import RealisticSwing
import Utility
import DrawSwing
import math
import matplotlib.pylab as plt
import matplotlib.animation as ani

def main():
    '''
    - get data from interface -> {data_enviroment}
    - declare generic SwingMotion: SwingMotion(data_enviroment)
    - declare specifiv subtype: SwingSubtype(SwingMotion)
    - calculate swing motion and save inside subtype: SwingSubtype.calculateSwing()
    - plot subtype: DrawPlot(swingSubtype)
    '''
    # get data from interface
    gravity = 9.81
    dissipativeForce = 0.
    initialSwingDegree = 0.01
    initialAngluarSpeed = 0.0
    maxOscillationDegree = 0.
    massBody = 10.
    heightBody = 1.
    massSwing = 3.
    ropeLength = 2.7
    swingMass = 0.0
    massUpper = 1.0
    massLower = 1.0
    bodyHeightUpper = 0.6
    bodyHeightLower = 0.4
    theta = 1.50
    theta0 = 0.1
    # TODO check environment values

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
    standingSwing = StandingSwing.StandingSwing(environment)
    seatedSwing = SeatedSwing.SeatedSwing(environment)
    realisticSwing = RealisticSwing.RealisticSwing(environment, massSwing, massUpper, massLower, bodyHeightUpper, bodyHeightLower, theta, theta0)
    # TODO multiple interfaces for simulations of multiple swings


    # declare specific subtype ==================================================================

    # calculate swing motion and update local variables =========================================
    no_simulationSteps = 20
    standingSwing.calculateSwingMotion("symplectic", no_simulationSteps)

    no_simulationSteps = 20
    seatedSwing.calculateSwingMotion('symplectic', no_simulationSteps)

    no_simulationSteps = 20
    realisticSwing.calculateSwingMotion("realistic", no_simulationSteps)

    no_simulationSteps = 20
    realisticSwing.calculateSwingMotion('combined', no_simulationSteps)





    # plots rotations variables =================================================================
    sleep_time = 0
    drawSwing = DrawSwing.DrawSwing(sleep_time)
    # print("STANDING SWING COORDINATES")
    # print(standingSwing.coordinates_swing)
    #
    #
    # print("SEATED SWING COORDINATES")
    # print(seatedSwing.coordinates_swing)
    # drawSwing.plotGraph(standingSwing)
    drawSwing.animateGraph(standingSwing)
    drawSwing.animateGraph(seatedSwing)
    Utility.plot_()

if __name__ == "__main__":
    main()
