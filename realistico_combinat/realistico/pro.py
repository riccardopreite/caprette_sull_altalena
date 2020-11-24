import math
import madre

class Expert_Children(madre.Swing):
    def __init__(self, phi_, w_, length_, m1_, m2_, m3_, b_, c_, theta_, theta0_):
        super(Expert_Children, self).__init__(phi_, w_, length_)

        self.m1 = m1_
        self.m2 = m2_
        self.m3 = m3_
        self.b = b_
        self.c = c_
        self.theta = theta_
        self.theta0 = theta0_

        self.M = self.m1 + self.m2 + self.m3
        self.N = self.m2 * self.b - self.m3 * self.c

        self.I1 = self.M * self.length**2
        self.I2 = self.m2 * self.b**2 + self.m3 * self.c**2

        self.coordinates_upperBody = []
        self.coordinates_lowerBody = []
        self.coordinates_swing = []


    def set_theta(self, theta_):
        self.theta = theta_

    def get_totalmass(self):
        return self.M

    def get_N(self):
        return self.N
    
    def get_theta(self):
        return self.theta

    def calculate_I1(self):
        self.I1 = self.M * self.length**2

    def get_I1(self):
        return self.I1

    def get_I2(self):
        return self.I2


    #def w_realistic1(self, phi):
    #    #print(w0_square)
    #    TAN_THETA_NUM = self.N*math.sin(self.theta)
    #    TAN_THETA_DEN = self.M*self.length - self.N*math.cos(self.theta)
    #    THETA = math.atan(TAN_THETA_NUM / TAN_THETA_DEN)
    #    w0_square = self.g * ((self.M*self.length*math.cos(THETA)) - self.N*math.cos(THETA + self.theta)) / (self.I1 + self.I2 - 2*self.N*self.length*math.cos(self.theta))
    #    #print(w0_square)
    #    self.w_dot = -w0_square * math.sin(phi)
    #    return self.w_dot

    #def w_realistic2(self, phi):
    #    w0_square = self.g * ((self.M*self.length - self.N) / (self.I1 + self.I2 - 2*self.N*self.length))
    #    #print(w0_square)
    #    self.w_dot = -w0_square * math.sin(phi)
    #    return self.w_dot
        
    def w_realistic(self, phi):
        numeratore = (-self.M * self.length * self.g * math.sin(phi) + self.N * self.g * math.sin(self.theta + phi))
        denominatore = (self.I1 + self.I2 - 2 * self.length * self.N * math.cos(self.theta))
        self.w_dot = numeratore / denominatore
        return self.w_dot
