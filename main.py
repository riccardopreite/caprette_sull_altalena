import SwingMotion
import StandingSwing
import SeatedSwing
import RealisticSwing
import Utility
import DrawSwing
import math

def main():
    #DRAW INITIAL INTERFACE
    #GET DATA FROM INTERFACE
    swingMotion = SwingMotion









    standing_man = altalena.Altalena(2.7, 0.01, 0.0) #lunghezza filo, phi, vel angolare
    utility.symplectic_standing(standing_man, 20)
    #L = 160cm
    #17cm h, 19cm base (2*a)

    swing = altalena.Altalena(2.5, 0.5, 0.0, 0.5)
    utility.symplectic_seated(swing, 30)

    #utility.plot_()

    realistico = altalena.Altalena(2.5, 0.2, 0.0, 0., 0.0, 1., 1., 0.4, 0.6, math.pi/2)
    utility.symplectic_realistic(realistico, 5)
    utility.plotrealistic()

if __name__ == "__main__":
    main()
