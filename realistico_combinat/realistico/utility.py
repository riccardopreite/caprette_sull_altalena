# -*- coding: utf-8 -*-
import madre
import noob
import normal
import pro

import math
import matplotlib.pylab as plt

#liste vuote che conterranno phi, vel. angolare e tempo passato
standing = [[], [], []]  #tempo, phi, vel angolare
seated = [[], [], []]
realistic = [[], [], []]

#incrementoelf.m1 = m1_
      
dt = 0.001

def symplectic_standing(standing_children, tf):
    t = 0.0
    #tempo finale dato alla funzione
    phi = standing_children.get_phi() #phi iniziale    w = standing_children.get_w() #w iniziale
    w = standing_children.get_w() #w iniziale
    s2 = 0. #per il simplettico
    counter = 1
 
    lstand = standing_children.get_length_stand()
    lsquat = standing_children.get_length() #serve per fare i salti

    fout1 = open("standing.txt", "w")
    fout1.write("Time(s) \t Phi(rad) \t Angular velocity (rad/s)")
    fout1.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

    standing[0].append(t) #aggiungo i primi termini alla lista
    standing[1].append(phi)
    standing[2].append(w)

    while t <= tf:
        t += dt
        phi = phi + w * dt * 0.5
        s2 = standing_children.w_standing(phi)
        w +=  dt * s2
        phi += dt * w * 0.5
        fout1.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

        standing[0].append(t) #riaggiorno le liste
        standing[1].append(phi)
        standing[2].append(w)

        #se angolo piccolo (cioè prima negativo e poi positivo, o viceversa) allora fai il salto
        if (phi >= 0 and standing[1][counter-1] < 0) or (phi <= 0 and standing[1][counter-1] > 0):
            w = (lsquat/lstand)**2 * w
            standing_children.set_length(lstand)

        #se velocità angolare piccola (cioè sono agli estremi e quindi prima vel angolare negativa
        #e poi positiva, o viceversa) allora fai il salto inverso
        if (w >= 0 and standing[2][counter-1] < 0) or (w <= 0 and standing[2][counter-1] > 0):
            w = (lstand/lsquat)**2 * w
            standing_children.set_length(lsquat)
            

        counter += 1

        
    fout1.close()
    standing_children.set_phi_w(phi, w)
    print("in piedi, tempo (s), phi (rad), w (rad/s): " + str(tf) + " " + str(standing_children.get_phi()) + " " + str(standing_children.get_w()))

def symplectic_seated(seated_children, tf):
    t = 0.0
    #tempo finale dato alla funzione
    phi = seated_children.get_phi() #phi iniziale
    w = seated_children.get_w() #w iniziale

    a = seated_children.get_a()
    l = seated_children.get_length()
    omega = a**2 / (a**2 + l**2)
    delta_phi = omega * math.pi / 2 #incremento angolo
    print(delta_phi)
    #print(delta_phi)

    s2 = 0. #per simplettico

    counter = 1 #per le liste

    fout2 = open("seated.txt", "w")
    fout2.write("Time(s) \t Phi(rad) \t Angular velocity (rad/s)")
    fout2.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

    seated[0].append(t) #aggiungo i primi termini alla lista
    seated[1].append(phi)
    seated[2].append(w)

    while t <= tf:
        t += dt
        phi = phi + w * dt * 0.5
        s2 = seated_children.w_seated(phi)
        w +=  dt * s2
        phi += dt * w * 0.5
        fout2.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

        seated[0].append(t) #aggiungo altri punti alla lista
        seated[1].append(phi)
        seated[2].append(w)

        #se prima la velocità è negativa e poi diventa positiva (cioè sta tornando indietro) allora 
        #diminuisci l angolo che significa che in valore assoluto aumenta

        if (w >= 0 and seated[2][counter-1] < 0):
            phi -= delta_phi
            #print("primo salto", phi, seated[1][counter-1])

        #se prima la velocità è positiva e poi diventa negativa (cioè sta andando avanti) allora 
        #aumenta l'angolo

        if (w <= 0 and seated[2][counter-1] > 0):
            phi += delta_phi
            #print("secondo salto", phi, seated[1][counter-1])

        counter += 1

	
    fout2.close()
    seated_children.set_phi_w(phi, w)
    print("seduto, tempo (s), phi (rad), w (rad/s): " + str(tf) + " " + str(seated_children.get_phi()) + " " + str(seated_children.get_w()))
    #print(tf, seated_children.get_phi(), seated_children.get_w())

def symplectic_realistic(realistic_children, tf):
    t = 0.0
    #tempo finale dato alla funzione
    phi = realistic_children.get_phi() #phi iniziale
    w = realistic_children.get_w() #w iniziale

    l = realistic_children.get_length()
    N = realistic_children.get_N()

    I1 = realistic_children.get_I1()
    I2 = realistic_children.get_I2()

    theta = realistic_children.get_theta()
    theta0 = realistic_children.theta0

    diff_theta = theta - theta0

    NUM = I1 - I2
    DEN = ((I1 + I2)**2 - 4*N**(2)*l**(2))**(1/2)

    NUM_TAN = I1 + I2 + 2*N*l
    DEN_TAN = I1 + I2 - 2*N*l
    ARG_TAN = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta/2)
    ARG_TAN0 = (NUM_TAN / DEN_TAN)**(1/2) * math.tan(theta0/2)

    DIFF_TAN = (NUM/DEN)*(math.atan(ARG_TAN) - math.atan(ARG_TAN0))
    delta_phi = abs(-diff_theta/2 + DIFF_TAN)

    print(delta_phi)

    s2 = 0. #per simplettico

    counter = 1 #per le liste

    fout3 = open("realistic.txt", "w")
    fout3.write("Time(s) \t Phi(rad) \t Angular velocity (rad/s)")
    fout3.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))


    realistic[0].append(t) #aggiungo i primi termini alla lista
    realistic[1].append(phi)
    realistic[2].append(w)

    while t <= tf:
        t += dt

        if(w <= 0):
            realistic_children.set_theta(theta)
        else: 
            realistic_children.set_theta(theta0)

        phi = phi + w * dt * 0.5
        s2 = realistic_children.w_realistic1(phi)
        w +=  dt * s2
        phi += dt * w * 0.5

        if(w <= 0 and realistic[2][counter-1] > 0):
            phi += delta_phi

        elif(w >= 0 and realistic[2][counter-1] < 0):
            phi -= delta_phi

        fout3.write("\n" + str.format('{0:.8f}', t) + "\t" + str.format('{0:.8f}' , phi) + "\t" + str.format('{0:.8f}' , w))

        realistic[0].append(t) #aggiungo altri punti alla lista
        realistic[1].append(phi)
        realistic[2].append(w)

        counter += 1

	
    fout3.close()
    realistic_children.set_phi_w(phi, w)
    print("realistico, tempo (s), phi (rad), w (rad/s): " + str(tf) + " " + str(realistic_children.get_phi()) + " " + str(realistic_children.get_w()))
    #print(tf, seated_children.get_phi(), seated_children.get_w())


def plot_():

    plt.style.use('ggplot')

    plt.figure("standing")
    ax1 = plt.subplot(2, 1, 1)
    #plt.grid(color='gray', linestyle='solid')
    ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
    ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
    plt.scatter(standing[1], standing[2], s=2, c='r', marker='o')

    ax1 = plt.subplot(2, 1, 2)
    #plt.grid(color='gray', linestyle='solid')
    ax1.set_xlabel(r'$time (s)$', fontsize=12)
    ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
    plt.scatter(standing[0], standing[1], s=2, c='r', marker='o')


    plt.figure("seated")
    ax1 = plt.subplot(2, 1, 1)
    #plt.grid(color='gray', linestyle='solid')
    ax1.set_xlabel(r'$phi (rad)$', fontsize=12)
    ax1.set_ylabel(r'$w (rad/s)$', fontsize=12, labelpad = 25, rotation=0)
    plt.scatter(seated[1], seated[2], s=2, c='r', marker='o')

    ax1 = plt.subplot(2, 1, 2)
    #plt.grid(color='gray', linestyle='solid')
    ax1.set_xlabel(r'$time (s)$', fontsize=12)
    ax1.set_ylabel(r'$phi (rad)$', fontsize=12,labelpad = 25, rotation=0)
    plt.scatter(seated[0], seated[1], s=2, c='r', marker='o')

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


