import madre
import noob
import normal
import pro
import utility

import math

def main():
    standing_man = noob.Standing_Child(0.15, 0.0, 2.7, 2.3) #phi, w, squat, stand
    utility.symplectic_standing(standing_man, 20)


    swing = normal.Seated_Children(0.5, 0.0, 2.5, 0.5) #phi, w, length, a
    utility.symplectic_seated(swing, 20)


    realistico = pro.Expert_Children(0.3, 0.0, 2.5, 0.0, 1.0, 1.0, 0.4, 0.6, 1.5, 0.1)  
    utility.symplectic_realistic(realistico, 20)  

    #utility.rk4(realistico, 20)
    
    utility.plot_()


if __name__ == "__main__":
    main()
