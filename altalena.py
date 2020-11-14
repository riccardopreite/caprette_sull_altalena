import math
g = 9.81

class Altalena:
    w_dot = 0.
    I1 = I2 = M = N = 0.

    def __init__(self, length_, phi_, w_, a_=0.0, m1_=0.0, m2_=0.0, m3_=0.0, b_=0.0, c_=0.0, theta_=0.0):
        self.length = length_
        self.phi = phi_
        self.w = w_
        self.a = a_
        self.m1 = m1_
        self.m2 = m2_    
        self.m3 = m3_
        self.b = b_
        self.c = c_
        self.theta = theta_

        self.M = self.m1 + self.m2 + self.m3
        self.N = self.m3 * self.c - self.m2 * self.b
        
        self.I1 = self.M * self.length**2
        self.I2 = self.m2 * self.b**2 + self.m3 * self.c**2



    def set_phi(self, phi_):
        self.phi = phi_
    
    def set_w(self, w_):
        self.w = w_

    def set_phi_w(self, phi_, w_):
        self.phi = phi_
        self.w = w_

    def set_length(self, length_):
        self.length = length_
    
    def set_a(self, a_):
        self.a = a_

    def set_theta(self, theta_):
        self.theta = theta_

    def get_totalmass(self):
        return self.M

    def get_N(self):
        return self.N

    def get_I2(self):
        return self.I2
    
    def get_a(self):
        return self.a
    
    def get_length(self):
        return self.length
    
    def get_phi(self):
        return self.phi
    
    def get_w(self):
        return self.w
    
    def phi_dot(self, w_):
        self.w = w_
        return self.w
    
    def w_standing(self, phi):
        self.w_dot = -(g / self.length) * math.sin(phi)
        return self.w_dot

    def w_seated(self, phi):
        self.w_dot = - ((g * self.length) / (self.length**2 + self.a**2)) * math.sin(phi)
        return self.w_dot
    
    def w_realistic(self, phi):
        numeratore = (-self.M * self.length * g * math.sin(phi) - self.N * g * math.sin(self.theta + phi))
        denominatore = (self.I1 + self.I2 + 2 * self.length * self.N * math.cos(self.theta))
        self.w_dot = numeratore / denominatore
        return self.w_dot