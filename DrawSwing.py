import Environment 
import StandingSwing 
import SeatedSwing
import math
import matplotlib.pylab as plt

'''
FLAVIO 
0 = time
1 = phi
2 = w

'''

class DrawSwing:
    def __init__(self, sleepTime):
        self.sleepTime = sleepTime

    '''
    Given a genericSwing obj, plots its phi, w and t
    @genericSwing (generic swing obj) 
    @return = null, plots variables
    '''
    # TODO FIX MAKE IT GENERIC, SWITCH ON OBJ TYPE
    def plotGraph(self, genericSwing):
        plt.style.use('ggplot')

        if(isinstance(genericSwing, StandingSwing.StandingSwing)):
            plt.figure("standing")
        elif(isinstance(genericSwing,SeatedSwing.SeatedSwing)):
            plt.figure("seated")

        ax1 = plt.subplot(2, 1, 1)
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.scatter(genericSwing.listRotation_phi, genericSwing.listRotation_w, s=2, c='r', marker='o')

        ax1 = plt.subplot(2, 1, 2)
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.scatter(genericSwing.listRotation_t, genericSwing.listRotation_phi, s=2, c='r', marker='o')

        plt.show()

