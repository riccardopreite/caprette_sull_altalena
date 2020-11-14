import altalena
import utility
import math

#L = 160cm
#17cm h, 19cm base (2*a)

def main():
    standing_man = altalena.Altalena(2.7, 0.001, 0.0) #lunghezza filo, phi, vel angolare
    utility.symplectic_standing(standing_man, 20)


    swing = altalena.Altalena(2.5, 0.4, 0.0, 0.5)
    utility.symplectic_seated(swing, 20)


    realistico = altalena.Altalena(2.5, 0.1, 0.0, 0., 0.1, 1., 1., 0.4, 0.6, math.pi/2)  
    utility.symplectic_realistic(realistico, 20)  
    
    utility.plot_()


if __name__ == "__main__":
    main()
