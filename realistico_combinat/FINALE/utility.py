# -*- coding: utf-8 -*-
import madre
import noob
import normal
import pro

import math
import matplotlib.pylab as plt

#liste vuote che conterranno phi, vel. angolare e tempo passato

realistic = [[], [], []]
combinato = [[], [], []]

#incrementoelf.m1 = m1_
      
dt = 0.001

def symplectic_realistic(realistic_children, tf):
    t = 0.0
    #tempo finale dato alla funzione
    phi = realistic_children.get_phi() #phi iniziale
    w = realistic_children.get_w() #w iniziale

    l = realistic_children.get_length()
    N = realistic_children.get_N() # QUANTITÀ CHIAMATA N PER SEMPLICITÀ
    b = realistic_children.b # lunghezze del corpo (b & c)
    c = realistic_children.c

    I1 = realistic_children.get_I1()   #momenti d'inerzia del corpo (I1 e I2)
    I2 = realistic_children.get_I2()

    theta = realistic_children.get_theta() # angolo theta grande: quando bambino è circa steso
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

    while t <= tf:
        t += dt

        #SETTO L'ANGOLO: SE W > 0 BAMBINO VA AVANTI (ANGOLO THETA CIRCA 90 GRADI)
        if(w >= 0):
            realistic_children.set_theta(theta)
        else: 
            realistic_children.set_theta(theta0)

        phi = phi + w * dt * 0.5
        s2 = realistic_children.w_realistic(phi)
        w +=  dt * s2
        phi += dt * w * 0.5


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
    realistic_children.set_phi_w(phi, w)
    print("realistico, tempo (s), phi (rad), w (rad/s): " + str(tf) + " " + str(realistic_children.get_phi()) + " " + str(realistic_children.get_w()))
    #print(tf, seated_children.get_phi(), seated_children.get_w())

def symplectic_combined(realistic_children, tf):
    t = 0.0
    #tempo finale dato alla funzione
    phi = realistic_children.get_phi() #phi iniziale
    w = realistic_children.get_w() #w iniziale

    l = realistic_children.get_length()
    N = realistic_children.get_N() # QUANTITÀ CHIAMATA N PER SEMPLICITÀ
    b = realistic_children.b # LUNGHEZZE DEL CORPO (b & c)
    c = realistic_children.c 

    I1 = realistic_children.get_I1() #MOMENTI D'INERZIA I1 E I2
    I2 = realistic_children.get_I2()

    theta = realistic_children.theta #angolo grande (circa 90 gradi)
    theta0 = realistic_children.theta0 # angolo piccolo (circa 0 gradi)

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

    while t <= tf:
        t += dt
        #SETTO L'ANGOLO DI THETA PER PRIMA COSA:
        if(w >= 0 and phi <= 0): # BAMBINO VA IN AVANTI: PRIMO QUARTO
            realistic_children.set_theta(theta0)
        elif(w >= 0 and phi <= 0):# BAMBINO VA IN AVANTI: SECONDO QUARTO DI CICLO
            realistic_children.set_theta(theta)
        elif(w <= 0 and phi >= 0): #BAMBINO VA IN INDIETRO: PRIMO QUARTO
            realistic_children.set_theta(theta0)
        else: #BAMBINO VA IN INDIETRO: ULTIMO QUARTO QUARTO DI CICLO
            realistic_children.set_theta(theta)

        phi = phi + w * dt * 0.5
        s2 = realistic_children.w_realistic(phi)
        w +=  dt * s2
        phi += dt * w * 0.5

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
    realistic_children.set_phi_w(phi, w)
    print("combinato, tempo (s), phi (rad), w (rad/s): " + str(tf) + " " + str(realistic_children.get_phi()) + " " + str(realistic_children.get_w()))
    #print(tf, seated_children.get_phi(), seated_children.get_w())


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


def rk4(realistic_children, tf):
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


    while t <= tf:
        t += dt
        if(w <= 0):
            if(realistic[2][counter-2] > 0):
                #print(phi)
                phi += delta_phi
                #print(phi, counter)
            k1 = dt * realistic_children.phi_dot(w) #0
            l1 = dt * realistic_children.w_realistic1(phi) #-g/l phi *dt
            #print(str(phi + 0.5 * k1))
            k2 = dt * realistic_children.phi_dot(w + 0.5 * l1)
            l2 = dt * realistic_children.w_realistic1(phi + 0.5 * k1)
            k3 = dt * realistic_children.phi_dot(w + 0.5 * l2)
            l3 = dt * realistic_children.w_realistic1(phi + 0.5 * k2)
            k4 = dt * realistic_children.phi_dot(w + l3) #l3
            l4 = dt * realistic_children.w_realistic1(phi + k3)

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
            k1 = dt * realistic_children.phi_dot(w) #0
            l1 = dt * realistic_children.w_realistic2(phi) #-g/l phi *dt
            #print(str(phi + 0.5 * k1))
            k2 = dt * realistic_children.phi_dot(w + 0.5 * l1)
            l2 = dt * realistic_children.w_realistic2(phi + 0.5 * k1)
            k3 = dt * realistic_children.phi_dot(w + 0.5 * l2)
            l3 = dt * realistic_children.w_realistic2(phi + 0.5 * k2)
            k4 = dt * realistic_children.phi_dot(w + l3) #l3
            l4 = dt * realistic_children.w_realistic2(phi + k3)

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
    print("Il punto si trova ora a", tf, realistic_children.get_phi(), realistic_children.get_w())


