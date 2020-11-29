import madre
import noob
import normal
import pro
import utility

import math

def main():

    realistico = pro.Expert_Children(-0.3, 0.0, 2.5, 0.0, 1.0, 1.0, 0.6, 0.4, 1.50, 0.1)  
    utility.symplectic_realistic(realistico, 20)  
    realistico.phi = -0.3
    realistico.w = 0.0
    realistico.w_dot = 0.0
    utility.symplectic_combined(realistico, 20)  

    
    utility.plot_()


if __name__ == "__main__":
    main()
