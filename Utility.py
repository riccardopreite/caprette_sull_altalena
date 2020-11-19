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
        phi = standingSwing.environment.initialPerturbationDegree 
        # staring angularSpeed
        w = standingSwing.environment.initialAngluarSpeed 
        # barycenter standing and squat
        lstand = standingSwing.barycenterStanding
        lsquat = standingSwing.barycenterSquat

        # intial conditions
        standingSwing.listRotation_t.append(t)
        standingSwing.listRotation_phi.append(phi)
        standingSwing.listRotation_w.append(w)
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
            foutStanding.write("\n" + str(t) + "\t" + str(phi) + "\t" + str(w))   

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
                w = (lstand/lsquat)**2 * standingSwing.listRotation_w[stepCounter-1] 
                # change body position 
                standingSwing.currentBarycenter = lsquat

            stepCounter += 1


        foutStanding.close()

        # final values
        standingSwing.environment.angularSpeed = w
        standingSwing.environment.perturbationDegree = phi

        print("Standing, time (s), phi (rad), w (rad/s): " + 
        str(steps) + " " + str(standingSwing.environment.perturbationDegree) + " " + 
        str(standingSwing.environment.angularSpeed))

     
     '''
     Given a seatedSwing obj and the simulation steps, sets interal obj lists
     with calculated values
     @seatedSwing (seatedSwing)
     @steps (int) = number of simulations steps
     @return = null, set internal seatedSwing variables
     '''
     # TODO HARD-CODED VALUES ????????????????????????????????????????????
     # OMEGA ?????????????
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
        phi = seatedSwing.environment.initialPerturbationDegree 
        # staring angularSpeed
        w = seatedSwing.environment.initialAngluarSpeed 
        # a is equal to half of the height
        a = seatedSwing.bodySegment
        l = seatedSwing.environment.ropeLength
        # degree of Rotation Body 
        omega = a**2 / (a**2 + l**2) 
        # angular increasing 
        delta_phi = omega * math.pi / 2

        # intial conditions
        seatedSwing.listRotation_t.append(t)
        seatedSwing.listRotation_phi.append(phi)
        seatedSwing.listRotation_w.append(w)
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
            foutSeated.write("\n" + str(t) + "\t" + str(phi) + "\t" + str(w))


            # invert swing motion, 2 cases:
            # 1. backwards motion - increase in absolute value the angle
            backwards = (w >= 0 and seatedSwing.listRotation_w[stepCounter-1] < 0)
            if backwards:
                phi -= delta_phi

            #se prima la velocità è positiva e poi diventa negativa (cioè sta andando avanti) allora
            #aumenta l'angolo
            # 2. forward motion - decrease in absolute value the angle
            forward = (w <= 0 and seatedSwing.listRotation_w[stepCounter-1] > 0)
            if forward:
                phi += delta_phi

            stepCounter += 1

        # final values
        seatedSwing.environment.angularSpeed = w
        seatedSwing.environment.perturbationDegree = phi

        foutSeated.close()
        print("seduto, tempo (s), phi (rad), w (rad/s): " + 
        str(steps) + " " + str(seatedSwing.environment.perturbationDegree) + " " +
        str(seatedSwing.environment.angularSpeed))

    

# ======================= RUNGEKUTA 4 METHODS =======================================
