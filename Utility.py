import math
import matplotlib.pylab as plt

INDEX_TIME = 0
INDEX_PHI = 1
INDEX_W = 2
class Utility:
    time = deltaTime = 0
    seated = [[], [], []]
    standing = [[], [], []]
    realistic = [[], [], []]
    def __init__(self):
        self.deltaTime = 0.001


    def symplectic_standing(self,swing,steps):
        t = 0.0
        #tempo finale dato alla funzione
        #phi = swing.swingMotion.get_phi(); #phi iniziale
        phi = swing.swingMotion.initialPerturbationDegree #phi iniziale
        w = swing.swingMotion.initialAngluarSpeed #w iniziale
        s2 = 0. #per il simplettico
        counter = 1

        lstand = swing.barycenterStanding
        lsquat = swing.barycenterSquat #serve per fare i salti

        fout1 = open("standing.txt", "w")
        fout1.write("Time(s)\tPhi(rad)\tAngular velocity (rad/s)")

        # self.standing.append((t,phi,w))
        self.standing[0].append(t) #aggiungo i primi termini alla lista
        self.standing[1].append(phi)
        self.standing[2].append(w)

        while t <= steps:
            phi = phi + w * self.deltaTime * 0.5
            s2 = swing.angularAccelerationStanding(phi)
            w +=  self.deltaTime * s2
            phi += self.deltaTime * w * 0.5
            fout1.write("\n" + str(t) + "\t" + str(phi) + "\t" + str(w))
            # self.standing.append((t,phi,w))
            self.standing[0].append(t) #riaggiorno le liste
            self.standing[1].append(phi)
            self.standing[2].append(w)

            if (phi >= 0 and self.standing[INDEX_PHI][counter-1] < 0) or (phi <= 0 and self.standing[INDEX_PHI][counter-1] > 0):
                w = (lsquat/lstand)**2 * self.standing[INDEX_W][counter-1]
                #print("salto")


            if (w >= 0 and self.standing[INDEX_W][counter-1] < 0) or (w <= 0 and self.standing[INDEX_W][counter-1] > 0):
                w = (lstand/lsquat)**2 * self.standing[INDEX_W][counter-1]
                #print("torno indietro")

            t += self.deltaTime
            counter += 1

        fout1.close()
        swing.swingMotion.angularSpeed = w
        swing.swingMotion.perturbationDegree = phi
        print("in piedi, tempo (s), phi (rad), w (rad/s): " + str(steps) + " " + str(swing.swingMotion.perturbationDegree) + " " + str(swing.swingMotion.angularSpeed))

    def symplectic_seated(self,swing,steps):
        t = 0.0
        #tempo finale dato alla funzione
        phi = swing.swingMotion.initialPerturbationDegree #phi iniziale
        w = swing.swingMotion.initialAngluarSpeed #w iniziale

        a = swing.bodySegment
        l = swing.swingMotion.ropeLength
        omega = a**2 / (a**2 + l**2) #degreeBodyRotation
        delta_phi = omega * math.pi / 2 #incremento angolo

        s2 = 0. #per simplettico

        counter = 1 #per le liste

        fout2 = open("seated.txt", "w")
        fout2.write("Time(s)\tPhi(rad)\tAngular velocity (rad/s)")

        self.seated[0].append(t) #aggiungo i primi termini alla lista
        self.seated[1].append(phi)
        self.seated[2].append(w)

        while t <= steps:
            phi = phi + w * self.deltaTime * 0.5
            s2 = swing.w_seated(phi)
            w +=  self.deltaTime * s2
            phi += self.deltaTime * w * 0.5
            fout2.write("\n" + str(t) + "\t" + str(phi) + "\t" + str(w))

            self.seated[0].append(t) #aggiungo altri punti alla lista
            self.seated[1].append(phi)
            self.seated[2].append(w)

            #se prima la velocità è negativa e poi diventa positiva (cioè sta tornando indietro) allora
            #diminuisci l angolo che significa che in valore assoluto aumenta

            if (w >= 0 and self.seated[2][counter-1] < 0):
                phi -= delta_phi
                #print("primo salto", phi, seated[1][counter-1])

            #se prima la velocità è positiva e poi diventa negativa (cioè sta andando avanti) allora
            #aumenta l'angolo

            if (w <= 0 and self.seated[2][counter-1] > 0):
                phi += delta_phi
                #print("secondo salto", phi, seated[1][counter-1])

            t += self.deltaTime
            counter += 1


        fout2.close()
        swing.swingMotion.angularSpeed = w
        swing.swingMotion.perturbationDegree = phi
        print("seduto, tempo (s), phi (rad), w (rad/s): " + str(steps) + " " + str(swing.swingMotion.perturbationDegree) + " " + str(swing.swingMotion.angularSpeed))

        pass
    def symplectic_realistic(self,swing):
        pass
    def rungeKuta_4_standing(self,swing):
        pass
    def rungeKuta_4_seated(self,swing):
        pass
    def rungeKuta_4_realistic(self,swing):
        pass


    def plot_(self):

        plt.style.use('ggplot')

        plt.figure("standing")
        ax1 = plt.subplot(2, 1, 1)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.scatter(self.standing[1], self.standing[2], s=10, c='r', marker='o')

        ax1 = plt.subplot(2, 1, 2)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.scatter(self.standing[0], self.standing[1], s=10, c='r', marker='o')


        plt.figure("seated")
        ax1 = plt.subplot(2, 1, 1)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.scatter(self.seated[1], self.seated[2], s=10, c='r', marker='o')

        ax1 = plt.subplot(2, 1, 2)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.scatter(self.seated[0], self.seated[1], s=10, c='r', marker='o')

        #print(plt.style.available)

        plt.show()
    def plot_Standing(self):

        plt.style.use('ggplot')

        plt.figure("standing")
        ax1 = plt.subplot(2, 1, 1)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.scatter(self.standing[INDEX_PHI], self.standing[INDEX_W], s=10, c='r', marker='o')

        ax1 = plt.subplot(2, 1, 2)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.scatter(self.standing[INDEX_TIME], self.standing[INDEX_PHI], s=10, c='r', marker='o')
        plt.show()

    def plot_Seated(self):

        plt.figure("seated")
        ax1 = plt.subplot(2, 1, 1)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.scatter(self.seated[INDEX_PHI], self.seated[INDEX_W], s=10, c='r', marker='o')

        ax1 = plt.subplot(2, 1, 2)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.scatter(self.seated[INDEX_TIME], self.seated[INDEX_PHI], s=10, c='r', marker='o')

        print(plt.style.available)

        plt.show()

    def plotrealistic(self):

        plt.style.use('ggplot')

        plt.figure("realistic")
        ax1 = plt.subplot(2, 1, 1)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
        ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
        plt.scatter(self.realistic[1], self.realistic[2], s=10, c='r', marker='o')

        ax1 = plt.subplot(2, 1, 2)
        #plt.grid(color='gray', linestyle='solid')
        ax1.set_xlabel(r'$time (s)$', fontsize=12)
        ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
        plt.scatter(self.realistic[0], self.realistic[1], s=10, c='r', marker='o')

        plt.show()
