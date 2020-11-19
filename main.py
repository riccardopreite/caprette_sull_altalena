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
    gravity = 9.81
    dissipativeForce = 0.
    initialPerturbationDegree = 0.01
    initialAngluarSpeed = 0.0
    maxOscillationDegree = 0.
    massBody = 10.
    heightBody = 1.
    massSwing = 3.
    ropeLength = 2.7

    swingMotion = SwingMotion.SwingMotion(gravity,dissipativeForce,initialPerturbationDegree,initialAngluarSpeed,maxOscillationDegree,massBody,heightBody,massSwing,ropeLength)
    print("NMAIN")
    print(swingMotion.gravity)
    standingSwing = StandingSwing.StandingSwing(swingMotion)

    ropeLength = 2.5
    initialPerturbationDegree = 0.5
    initialAngluarSpeed = 0.0
    swingMotion2 = SwingMotion.SwingMotion(gravity,dissipativeForce,initialPerturbationDegree,initialAngluarSpeed,maxOscillationDegree,massBody,heightBody,massSwing,ropeLength)

    seatedSwing = SeatedSwing.SeatedSwing(swingMotion2,0) #perchè non utilizzare il costruttore della classe madre invece che passargli un oggetto madre?
    standingSwing.swingStanding("symplectic",20)
    seatedSwing.swingSeated("symplectic",30)

    realisticSwing = RealisticSwing.RealisticSwing(swingMotion,0)

    utils = Utility.Utility()

    utils.plot_()





if __name__ == "__main__":
    main()


















    #lunghezza filo, phi, vel angolare, a?, massa1, mass2, massa3, segmento1,segmento2, angolotheta
    #standing_man = altalena.Altalena(2.7, 0.01, 0.0)
    # utility.symplectic_standing(standing_man, 20)
    # #L = 160cm
    # #17cm h, 19cm base (2*a)
    # swing = altalena.Altalena(2.5, 0.5, 0.0, 0.5)
    # utility.symplectic_seated(swing, 30)
    # #utility.plot_()
    # #(self, length_, phi_, w_, a_=0.0, m1_=0.0, m2_=0.0, m3_=0.0, b_=0.0, c_=0.0, theta_=0.0):
    # realistico = altalena.Altalena(2.5, 0.2, 0.0, 0., 0.0, 1., 1., 0.4, 0.6, math.pi/2)
    # utility.symplectic_realistic(realistico, 5)
