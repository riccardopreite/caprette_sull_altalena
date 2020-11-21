import math

class Utility:

     def __init__(self):
        # starting simulation time
        self.time = 0

        # time increment
        self.deltaTime = 0.001


# ======================= SYMPLECTIC METHODS =======================================
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



# ======================= RUNGEKUTTA 4 METHODS  =======================================
