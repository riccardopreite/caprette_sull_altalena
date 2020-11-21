import Environment
import StandingSwing
import SeatedSwing
import math
import matplotlib.pylab as plt
import matplotlib.animation as ani

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

    def makeRange(self,value,listFrom,listTo):
        for i in range(0,len(listFrom),value) :
            listTo.append(listFrom[i])


    def setupFig(self,fig,ax1,pt,pt2,tempListT,tempListW,tempListPHI):

        ax1 = plt.subplot(2, 1, 1)
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.xlim(min(tempListPHI)*1.1,max(tempListPHI)*1.1)
        plt.ylim(min(tempListW)*1.1,max(tempListW)*1.1)
        pt, = ax1.plot([],[],'ko', markersize=2, c='r', marker='o')
        ax1 = plt.subplot(2, 1, 2)
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.xlim(min(tempListT)*1.1,max(tempListT)*1.1)
        plt.ylim(min(tempListPHI)*1.1,max(tempListPHI)*1.1)

        pt2, = ax1.plot([],[],'ko', markersize=2, c='r', marker='o')


    def animateGraph(self,swing):
        if(isinstance(swing, StandingSwing.StandingSwing)):
            name = "standing"
        elif(isinstance(swing,SeatedSwing.SeatedSwing)):
            name = "seated"

        fig = plt.figure(name)
        tempListT = []
        tempListW = []
        tempListPHI = []
        self.makeRange(int(len(swing.listRotation_t)/1000),swing.listRotation_t,tempListT)
        self.makeRange(int(len(swing.listRotation_w)/1000),swing.listRotation_w,tempListW)
        self.makeRange(int(len(swing.listRotation_phi)/1000),swing.listRotation_phi,tempListPHI)
        plt.style.use('ggplot')

        ax1 = plt.subplot(2, 1, 1)

        pt, = ax1.plot([],[],'-', markersize=3, c='r', marker='o',linewidth=1)

        ax1 = plt.subplot(2, 1, 2)

        pt2, = ax1.plot([],[],'-', markersize=3, c='r', marker='o',linewidth=1)
        self.setupFig(fig,ax1,pt,pt2,swing.listRotation_t,swing.listRotation_w,swing.listRotation_phi)
        def init ():
            pt.set_data([], [])
            return pt,

        def initTemp ():
            pt2.set_data([], [])
            return pt2,

        def animate(i):
            pt.set_data (tempListPHI[:i], tempListW[:i])
            return pt,
        def animateTemp(t):
            pt2.set_data (tempListT[:t], tempListPHI[:t])
            return pt,

        animator = ani.FuncAnimation(fig, animate, init_func=init, interval=1)
        animator2 = ani.FuncAnimation(fig, animateTemp, init_func=initTemp, interval=1)
        plt.show()
