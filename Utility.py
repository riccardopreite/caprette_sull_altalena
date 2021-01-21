import math
import matplotlib.pylab as plt
realistic = [[], [], []]
combinato = [[], [], []]
class Utility:

     def __init__(self):
        # starting simulation time
        self.time = 0

        # time increment
        self.deltaTime = 0.001


# ======================= SYMPLECTIC METHODS =======================================


    #====================STANDIND===================================================
     '''
     Given a standingSwing obj and the simulation steps, sets interal obj lists
     with calculated values
     @standingSwing (StandingSwing)
     @steps (int) = number of simulations steps
     @return = null, set internal standingSwing variables
     '''
     def symplectic_standing(self,standingSwing, steps):
        # Aux =====================================================================
        # prev_angularAcceleration = s2
        prev_angularAcceleration = 0.
        stepCounter = 1
        foutStanding = open("standing.txt", "w")
        foutStanding.write("Time(s)\tPhi(rad)\tAngular velocity (rad/s)")

        # variable setpup ==========================================================
        # starting time
        t = 0.0
        # starting angle
        phi = standingSwing.environment.initialSwingDegree
        # staring angularSpeed
        w = standingSwing.environment.initialAngluarSpeed
        # barycenter standing and squat
        lstand = standingSwing.barycenterStanding
        lsquat = standingSwing.barycenterSquat

        # intial conditions
        standingSwing.listRotation_t.append(t)
        standingSwing.listRotation_phi.append(phi)
        standingSwing.listRotation_w.append(w)

        #MODIFICHE COORDINATE

        #COORD BODY
        x = standingSwing.currentBarycenter * math.sin(phi)
        y = -standingSwing.currentBarycenter * math.cos(phi)
        coord = (x, y)

        #COORD SWING
        x1 = standingSwing.environment.ropeLength*math.sin(phi)
        y1 = -(standingSwing.environment.ropeLength*math.cos(phi))
        coord1 = (x1,y1)

        standingSwing.coordinates.append(coord)
        standingSwing.coordinates_swing.append(coord1)

        foutStanding.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))


        # updating cycle ============================================================
        while t <= steps:
            # variables update
            t += self.deltaTime
            phi = phi + w * self.deltaTime * 0.5
            prev_angularAcceleration = standingSwing.get_angularAcceleration(phi)
            w +=  self.deltaTime * prev_angularAcceleration
            phi += self.deltaTime * w * 0.5

            # update list and file
            standingSwing.listRotation_t.append(t)
            standingSwing.listRotation_phi.append(phi)
            standingSwing.listRotation_w.append(w)

            #MODIFICHE COORDINATE BODY

            x = standingSwing.currentBarycenter * math.sin(phi)
            y = -standingSwing.currentBarycenter * math.cos(phi)
            coord = (x, y)
            standingSwing.coordinates.append(coord)

            # MODIFICHE COORDINATE SWING

            x1 = standingSwing.environment.ropeLength*math.sin(phi)
            y1 = -(standingSwing.environment.ropeLength*math.cos(phi))
            coord1 = (x1,y1)
            standingSwing.coordinates_swing.append(coord)

            foutStanding.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

            # invert swing directions 2 cases:
            # 1. pass vertical angle (descending or ascending)
            startAscendingPhase = (phi >= 0 and standingSwing.listRotation_phi[stepCounter-1] < 0)
            startDescendingPhase = (phi <= 0 and standingSwing.listRotation_phi[stepCounter-1] > 0)
            if startAscendingPhase or startDescendingPhase:
                w = (lsquat/lstand)**2 * standingSwing.listRotation_w[stepCounter-1]
                # change body position
                standingSwing.currentBarycenter = lstand


            # 2. reach max speed or reach min speed
            reachTop = (w >= 0) and (standingSwing.listRotation_w[stepCounter-1] < 0)
            reachBottom = (w <= 0) and (standingSwing.listRotation_w[stepCounter-1] > 0)
            if reachTop or reachBottom:
                # change body position
                standingSwing.currentBarycenter = lsquat

            stepCounter += 1


        foutStanding.close()

        # final values
        standingSwing.environment.angularSpeed = w
        standingSwing.environment.swingDegree = phi

        print("Standing, time (s), phi (rad), w (rad/s): " +
        str(steps) + " " + str(standingSwing.environment.swingDegree) + " " +
        str(standingSwing.environment.angularSpeed))


     '''
     Given a seatedSwing obj and the simulation steps, sets interal obj lists
     with calculated values
     @seatedSwing (seatedSwing)
     @steps (int) = number of simulations steps
     @return = null, set internal seatedSwing variables
     '''
    #====================SEATED===================================================
     def symplectic_seated(self,seatedSwing,steps):
        # Aux ==================================================================
        prev_angularAcceleration = 0.
        stepCounter = 1
        foutSeated = open("seated.txt", "w")
        foutSeated.write("Time(s)\tPhi(rad)\tAngular velocity (rad/s)")


        # variable setpup =======================================================
        # starting time
        t = 0.0
        # starting angle
        phi = seatedSwing.environment.initialSwingDegree
        # staring angularSpeed
        w = seatedSwing.environment.initialAngluarSpeed
        # a is equal to half of the height
        a = seatedSwing.bodySegment
        l = seatedSwing.environment.ropeLength
        #MODIFICHE: starting body rotation angle
        theta = seatedSwing.degreeBodyRotation
        # angular increasing
        delta_phi = (a**2 / (a**2 + l**2)) * seatedSwing.degreeBodyRotation

        # intial conditions
        seatedSwing.listRotation_t.append(t)
        seatedSwing.listRotation_phi.append(phi)
        seatedSwing.listRotation_w.append(w)

        # TODO coordinates seated <=============================
        # x,y
        #MODIFICHE COORDINATE SEATED:

        #UPPER BODY
        x1 = seatedSwing.environment.ropeLength*math.sin(phi) - seatedSwing.bodySegment*math.sin(phi + seatedSwing.degreeBodyRotation)
        y1 = -(seatedSwing.environment.ropeLength*math.cos(phi)) + seatedSwing.bodySegment*math.cos(phi + seatedSwing.degreeBodyRotation)

        #LOWER BODY
        x2 = seatedSwing.environment.ropeLength*math.sin(phi) + seatedSwing.bodySegment*math.sin(phi + seatedSwing.degreeBodyRotation)
        y2 = -(seatedSwing.environment.ropeLength*math.cos(phi)) - seatedSwing.bodySegment*math.cos(phi + seatedSwing.degreeBodyRotation)

        #SWING
        x3 = seatedSwing.environment.ropeLength*math.sin(phi)
        y3 = -(seatedSwing.environment.ropeLength*math.cos(phi))
        coord_up = (x1, y1)
        coord_down = (x2, y2)
        coord_swing = (x3, y3)

        seatedSwing.coordinates_upperBody.append(coord_up)
        seatedSwing.coordinates_lowerBody.append(coord_down)
        seatedSwing.coordinates_swing.append(coord_swing)


        foutSeated.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))


        # updating cycle ========================================================
        while t <= steps:

            t += self.deltaTime
            phi = phi + w * self.deltaTime * 0.5
            prev_angularAcceleration = seatedSwing.get_angularAcceleration(phi)
            w +=  self.deltaTime * prev_angularAcceleration
            phi += self.deltaTime * w * 0.5

            seatedSwing.listRotation_t.append(t)
            seatedSwing.listRotation_phi.append(phi)
            seatedSwing.listRotation_w.append(w)

             # TODO coordinates seated <=============================
             # x,y
            #MODIFICHE COORDINATE SEATED:

            #  SE VA AVANTI SETTARE L'ANGOLO DI ROTAZIONE AD UN CERTO THETA (vel angolare negativa)
            # THETA VALE PI GRECO MEZZI IN QUESTO CASO MA PENSO SIA PIÙ BELLO LASCIARLO COSÌ
            if(w <= 0):
                seatedSwing.degreeBodyRotation = theta
            else:
                seatedSwing.degreeBodyRotation = 0.
            # SE VA INIDETRO SETTARE L'ANGOLO A ZERO (VEL ANGOLARE POSITIVA)

            #CALCOLO COORD SEATED

            #UPPER BODY
            x1 = seatedSwing.environment.ropeLength*math.sin(phi) - seatedSwing.bodySegment*math.sin(phi + seatedSwing.degreeBodyRotation)
            y1 = -(seatedSwing.environment.ropeLength*math.cos(phi)) + seatedSwing.bodySegment*math.cos(phi + seatedSwing.degreeBodyRotation)

            #LOWER BODY
            x2 = seatedSwing.environment.ropeLength*math.sin(phi) + seatedSwing.bodySegment*math.sin(phi + seatedSwing.degreeBodyRotation)
            y2 = -(seatedSwing.environment.ropeLength*math.cos(phi)) - seatedSwing.bodySegment*math.cos(phi + seatedSwing.degreeBodyRotation)

            #SWING
            x3 = seatedSwing.environment.ropeLength*math.sin(phi)
            y3 = -(seatedSwing.environment.ropeLength*math.cos(phi))

            coord_up = (x1, y1)
            coord_down = (x2, y2)
            coord_swing = (x3, y3)

            seatedSwing.coordinates_upperBody.append(coord_up)
            seatedSwing.coordinates_lowerBody.append(coord_down)
            seatedSwing.coordinates_swing.append(coord_swing)



            foutSeated.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))


            # invert swing motion, 2 cases:
            # 1. backwards motion - increase in absolute value the angle
            backwards = (w >= 0 and seatedSwing.listRotation_w[stepCounter-1] < 0)
            if backwards:
                # lean back
                seatedSwing.degreeBodyRotation = 0
                phi -= delta_phi

            # 2. forward motion - decrease in absolute value the angle
            forward = (w <= 0 and seatedSwing.listRotation_w[stepCounter-1] > 0)
            if forward:
                # lean forward
                seatedSwing.degreeBodyRotation = math.pi/2
                phi += delta_phi

            stepCounter += 1

        # final values
        seatedSwing.environment.angularSpeed = w
        seatedSwing.environment.swingDegree = phi

        foutSeated.close()
        print("seduto, tempo (s), phi (rad), w (rad/s): " +
        str(steps) + " " + str(seatedSwing.environment.swingDegree) + " " +
        str(seatedSwing.environment.angularSpeed))

    #====================REALISTIC===================================================
     def symplectic_realistic(self,realistic_children, steps):
         t = 0.0
         #phi iniziale
         phi = realistic_children.environment.initialSwingDegree
         #w iniziale
         w = realistic_children.environment.initialAngluarSpeed
         # a is equal to half of the height
         l = realistic_children.environment.ropeLength

         N = realistic_children.N # QUANTITÀ CHIAMATA N PER SEMPLICITÀ
         b = realistic_children.bodyHeightUpper # lunghezze del corpo (b & c)
         c = realistic_children.bodyHeightLower

         I1 = realistic_children.I1   #momenti d'inerzia del corpo (I1 e I2)
         I2 = realistic_children.I2

         theta = realistic_children.theta # angolo theta grande: quando bambino è circa steso
         theta0 = realistic_children.theta0 # angolo theta piccolo: quando bambino è circa dritto

         diff_theta = theta - theta0 # differenza tra i due angoli

         NUM = I1 - I2 # numeratore della frazione che moltiplica arctangete
         DEN = ((I1 + I2)**2 - 4*N**(2)*l**(2))**(1/2) # denominatore della fraz. che moltiplica arctangente

         NUM_TAN = I1 + I2 + 2*N*l # numeratore dell'arctangente
         DEN_TAN = I1 + I2 - 2*N*l # denominatore dell'arctangente
         ARG_TAN = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta/2) # argoemtno arcotangente con theta, quano bambino è circa steso
         ARG_TAN0 = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta0/2) # argomento arcotangente con theta0, bambino è circa dritto

         DIFF_TAN = (NUM/DEN)*(math.atan(ARG_TAN) - math.atan(ARG_TAN0)) # differenza tra arcotangente
         delta_phi = abs(-diff_theta/2 + DIFF_TAN) # DELTA PHI FINALE !

         s2 = 0. #per simplettico

         counter = 1 #per le liste

         #COORDINATE:
         #UPPER BODY
         x1 = l*math.sin(phi) - b*math.sin(phi + realistic_children.theta)
         y1 = -l*math.cos(phi) + b*math.cos(phi + realistic_children.theta)

         #LOWER BODY
         x2 = l*math.sin(phi) + c*math.sin(phi + realistic_children.theta)
         y2 = -l*math.cos(phi) - c*math.cos(phi + realistic_children.theta)

         #SWING
         x3 = l*math.sin(phi)
         y3 = -l*math.cos(phi)
         coord_up = (x1, y1)
         coord_down = (x2, y2)
         coord_swing = (x3, y3)

         realistic_children.coordinates_upperBody.append(coord_up)
         realistic_children.coordinates_lowerBody.append(coord_down)
         realistic_children.coordinates_swing.append(coord_swing)

         fout3 = open("realistic.txt", "w")
         fout3.write("Time(s) \t Phi(rad) \t Angular velocity (rad/s)")
         fout3.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

         realistic[0].append(t) #aggiungo i primi termini alla lista
         realistic[1].append(phi)
         realistic[2].append(w)

         while t <= steps:
             t += self.deltaTime

             #SETTO L'ANGOLO: SE W > 0 BAMBINO VA AVANTI (ANGOLO THETA CIRCA 90 GRADI)
             if(w >= 0):
                 realistic_children.theta = theta
             else:
                 realistic_children.theta = theta0

             phi = phi + w * self.deltaTime * 0.5
             s2 = realistic_children.w_realistic(phi)
             w +=  self.deltaTime * s2
             phi += self.deltaTime * w * 0.5


             #SALTO SU ASSE X:
             if(w <= 0 and realistic[2][counter-1] > 0):
                 phi += delta_phi

             elif(w >= 0 and realistic[2][counter-1] < 0):
                 phi -= delta_phi

             #COORDINATE:

             #UPPER BODY
             x1 = l*math.sin(phi) - b*math.sin(phi + realistic_children.theta)
             y1 = -l*math.cos(phi) + b*math.cos(phi + realistic_children.theta)

             #LOWER BODY
             x2 = l*math.sin(phi) + c*math.sin(phi + realistic_children.theta)
             y2 = -l*math.cos(phi) - c*math.cos(phi + realistic_children.theta)

             #SWING
             x3 = l*math.sin(phi)
             y3 = -l*math.cos(phi)
             coord_up = (x1, y1)
             coord_down = (x2, y2)
             coord_swing = (x3, y3)

             realistic_children.coordinates_upperBody.append(coord_up)
             realistic_children.coordinates_lowerBody.append(coord_down)
             realistic_children.coordinates_swing.append(coord_swing)

             realistic[0].append(t) #aggiungo altri punti alla lista
             realistic[1].append(phi)
             realistic[2].append(w)

             fout3.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))


             counter += 1


         fout3.close()
         realistic_children.environment.phi = phi
         realistic_children.environment.w = w
         print("realistico, tempo (s), phi (rad), w (rad/s): " + str(steps) + " " + str(realistic_children.environment.phi) + " " + str(realistic_children.environment.w))
         #print(tf, seated_children.get_phi(), seated_children.get_w())

        #====================COMBINED===================================================
     def symplectic_combined(self,realistic_children, steps):
         t = 0.0
         #phi iniziale
         phi = realistic_children.environment.initialSwingDegree
         #w iniziale
         w = realistic_children.environment.initialAngluarSpeed
          # a is equal to half of the height
         l = realistic_children.environment.ropeLength

         N = realistic_children.N # QUANTITÀ CHIAMATA N PER SEMPLICITÀ
         b = realistic_children.bodyHeightUpper # lunghezze del corpo (b & c)
         c = realistic_children.bodyHeightLower

         I1 = realistic_children.I1   #momenti d'inerzia del corpo (I1 e I2)
         I2 = realistic_children.I2

         theta = realistic_children.theta # angolo theta grande: quando bambino è circa steso
         theta0 = realistic_children.theta0 # angolo theta piccolo: quando bambino è circa dritto

         #CONDIZIONE DI SALTO SU ASSE X:
         diff_theta = theta - theta0 # differenza tra i due angoli

         NUM = I1 - I2 # numeratore della frazione
         DEN = ((I1 + I2)**2 - 4*N**(2)*l**(2))**(1/2) # denominatore della frazione

         NUM_TAN = I1 + I2 + 2*N*l # numeratore dell'arcotangente
         DEN_TAN = I1 + I2 - 2*N*l # denominatore dell'arcotangente
         ARG_TAN = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta/2) # argomento arcotangete con theta grande
         ARG_TAN0 = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta0/2) # argomento arcotangente con theta piccolo

         DIFF_TAN = (NUM/DEN)*(math.atan(ARG_TAN) - math.atan(ARG_TAN0)) # differenza data dall'arcotangete

         delta_phi = abs(-diff_theta/2 + DIFF_TAN) # DELTA PHI FINALE !

         #CONDIZIONE DI SALTO SU ASSE Y:
         SALTO_Y = (I1+I2-2*l*N*math.cos(theta)) / (I1+I2-2*l*N*math.cos(theta0))
         s2 = 0. #per simplettico

         counter = 1 #per le liste

         #COORDINATE:

         #UPPER BODY
         x1 = l*math.sin(phi) - b*math.sin(phi + realistic_children.theta)
         y1 = -l*math.cos(phi) + b*math.cos(phi + realistic_children.theta)

         #LOWER BODY
         x2 = l*math.sin(phi) + c*math.sin(phi + realistic_children.theta)
         y2 = -l*math.cos(phi) - c*math.cos(phi + realistic_children.theta)

         #SWING
         x3 = l*math.sin(phi)
         y3 = -l*math.cos(phi)
         coord_up = (x1, y1)
         coord_down = (x2, y2)
         coord_swing = (x3, y3)

         realistic_children.coordinates_upperBody.append(coord_up)
         realistic_children.coordinates_lowerBody.append(coord_down)
         realistic_children.coordinates_swing.append(coord_swing)

         fout3 = open("combined.txt", "w")
         fout3.write("Time(s) \t Phi(rad) \t Angular velocity (rad/s)")
         fout3.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

         combinato[0].append(t) #aggiungo i primi termini alla lista
         combinato[1].append(phi)
         combinato[2].append(w)

         while t <= steps:
             t += self.deltaTime
             #SETTO L'ANGOLO DI THETA PER PRIMA COSA:
             if(w >= 0 and phi <= 0): # BAMBINO VA IN AVANTI: PRIMO QUARTO
                 realistic_children.theta = theta0
             elif(w >= 0 and phi <= 0):# BAMBINO VA IN AVANTI: SECONDO QUARTO DI CICLO
                 realistic_children.theta = theta
             elif(w <= 0 and phi >= 0): #BAMBINO VA IN INDIETRO: PRIMO QUARTO
                 realistic_children.theta = theta0
             else: #BAMBINO VA IN INDIETRO: ULTIMO QUARTO QUARTO DI CICLO
                 realistic_children.theta = theta

             phi = phi + w * self.deltaTime * 0.5
             s2 = realistic_children.w_realistic(phi)
             w +=  self.deltaTime * s2
             phi += self.deltaTime * w * 0.5

             # SALTO SU ASSE Y:
             if(phi >= 0 and combinato[1][counter-1] < 0):
                 w = SALTO_Y * w
             elif(phi <= 0 and combinato[1][counter-1] > 0):
                 w = SALTO_Y * w

             # SALTO SU ASSE X:
             if(w <= 0 and combinato[2][counter-1] > 0):
                 phi -= delta_phi
             elif(w >= 0 and combinato[2][counter-1] < 0):
                 phi -= delta_phi

             #COORDINATE:

             #UPPER BODY
             x1 = l*math.sin(phi) - b*math.sin(phi + realistic_children.theta)
             y1 = -l*math.cos(phi) + b*math.cos(phi + realistic_children.theta)

             #LOWER BODY
             x2 = l*math.sin(phi) + c*math.sin(phi + realistic_children.theta)
             y2 = -l*math.cos(phi) - c*math.cos(phi + realistic_children.theta)

             #SWING
             x3 = l*math.sin(phi)
             y3 = -l*math.cos(phi)
             coord_up = (x1, y1)
             coord_down = (x2, y2)
             coord_swing = (x3, y3)

             realistic_children.coordinates_upperBody.append(coord_up)
             realistic_children.coordinates_lowerBody.append(coord_down)
             realistic_children.coordinates_swing.append(coord_swing)

             combinato[0].append(t) #aggiungo altri punti alla lista
             combinato[1].append(phi)
             combinato[2].append(w)

             fout3.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

             counter += 1


         fout3.close()
         realistic_children.environment.phi = phi
         realistic_children.environment.w = w
         print("combinato, tempo (s), phi (rad), w (rad/s): " + str(steps) + " " + str(realistic_children.environment.phi) + " " + str(realistic_children.environment.w))
         #print(tf, seated_children.get_phi(), seated_children.get_w())

     # ======================= RUNGEKUTTA 4 METHODS  =======================================

     def rk4(self,realistic_children, steps):
         c_14 = 1. / 6.
         c_23 = 2. / 6.
         t = 0.0
         phi = realistic_children.get_phi()
         w = realistic_children.get_w()
         k1 = k2 = k3 = k4 = l1 = l2 = l3 = l4 = 0

         l = realistic_children.get_length()
         N = realistic_children.get_N()

         I1 = realistic_children.get_I1()
         I2 = realistic_children.get_I2()

         theta = realistic_children.get_theta()
         NUM = I1 - I2
         DEN = ((I1 + I2)**2 - 4*N**(2)*l**(2))**(1/2)

         NUM_TAN = I1 + I2 + 2*N*l
         DEN_TAN = I1 + I2 - 2*N*l
         ARG_TAN = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta/2)

         delta_phi = abs(-theta/2 + (NUM/DEN)*math.atan(ARG_TAN))

         counter = 1

         realistic[0].append(t) #aggiungo i primi termini alla lista
         realistic[1].append(phi)
         realistic[2].append(w)

         #print(k1, k2, l1, l2, w, phi)
         fout = open("pendolum.txt", "w")
         fout.write("Time(s) \t Phi(rad) \t Angular velocity (rad/s)")
         fout.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))


         while t <= steps:
             t += self.deltaTime
             if(w <= 0):
                 if(realistic[2][counter-2] > 0):
                     #print(phi)
                     phi += delta_phi
                     #print(phi, counter)
                 k1 = self.deltaTime * realistic_children.phi_dot(w) #0
                 l1 = self.deltaTime * realistic_children.w_realistic1(phi) #-g/l phi *self.deltaTime
                #print(str(phi + 0.5 * k1))
                 k2 = self.deltaTime * realistic_children.phi_dot(w + 0.5 * l1)
                 l2 = self.deltaTime * realistic_children.w_realistic1(phi + 0.5 * k1)
                 k3 = self.deltaTime * realistic_children.phi_dot(w + 0.5 * l2)
                 l3 = self.deltaTime * realistic_children.w_realistic1(phi + 0.5 * k2)
                 k4 = self.deltaTime * realistic_children.phi_dot(w + l3) #l3
                 l4 = self.deltaTime * realistic_children.w_realistic1(phi + k3)

                 #valutazioni di w e phi
                 phi += c_14 * (k1 + k4) + c_23 * (k3 + k2)
                 w += c_14 * (l1 + l4) + c_23 * (l3 + l2)

                 realistic[0].append(t) #aggiungo i primi termini alla lista
                 realistic[1].append(phi)
                 realistic[2].append(w)

             else:
                 if(realistic[2][counter-2] > 0):
                  #print(phi)
                     phi -= delta_phi
                    #print(phi, counter)
                     k1 = self.deltaTime * realistic_children.phi_dot(w) #0
                     l1 = self.deltaTime * realistic_children.w_realistic2(phi) #-g/l phi *self.deltaTime
                 #print(str(phi + 0.5 * k1))
                     k2 = self.deltaTime * realistic_children.phi_dot(w + 0.5 * l1)
                     l2 = self.deltaTime * realistic_children.w_realistic2(phi + 0.5 * k1)
                     k3 = self.deltaTime * realistic_children.phi_dot(w + 0.5 * l2)
                     l3 = self.deltaTime * realistic_children.w_realistic2(phi + 0.5 * k2)
                     k4 = self.deltaTime * realistic_children.phi_dot(w + l3) #l3
                     l4 = self.deltaTime * realistic_children.w_realistic2(phi + k3)

                     #valutazioni di w e phi
                     phi += c_14 * (k1 + k4) + c_23 * (k3 + k2)
                     w += c_14 * (l1 + l4) + c_23 * (l3 + l2)

                     realistic[0].append(t) #aggiungo i primi termini alla lista
                     realistic[1].append(phi)
                     realistic[2].append(w)

                 fout.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))
                 counter += 1

             realistic_children.set_phi_w(phi, w)
             #print(a.w, a.phi)


             fout.close()
             #print(phi, w)
             print("Il punto si trova ora a", steps, realistic_children.get_phi(), realistic_children.get_w())


def plot_():

     plt.style.use('ggplot')
     plt.figure("combinato")
     ax1 = plt.subplot(2, 1, 1)
     #plt.grid(color='gray', linestyle='solid')
     ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
     ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
     plt.scatter(combinato[1], combinato[2], s=2, c='r', marker='o')

     ax1 = plt.subplot(2, 1, 2)
     #plt.grid(color='gray', linestyle='solid')
     ax1.set_xlabel(r'$time (s)$', fontsize=12)
     ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
     plt.scatter(combinato[0], combinato[1], s=2, c='r', marker='o')


     plt.figure("realistic")
     ax1 = plt.subplot(2, 1, 1)
     #plt.grid(color='gray', linestyle='solid')
     ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
     ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
     plt.scatter(realistic[1], realistic[2], s=2, c='r', marker='o')

     ax1 = plt.subplot(2, 1, 2)
     #plt.grid(color='gray', linestyle='solid')
     ax1.set_xlabel(r'$time (s)$', fontsize=12)
     ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
     plt.scatter(realistic[0], realistic[1], s=2, c='r', marker='o')

         #print(plt.style.available)

     plt.show()
