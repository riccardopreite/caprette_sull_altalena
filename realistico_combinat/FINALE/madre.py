class Swing:
    w_dot = 0 #acc angolare
    g = 9.81
    def __init__(self, phi_, w_, length_):
        self.length = length_
        self.phi = phi_
        self.w = w_

    def phi_dot(self, w_):
        self.w = w_
        return self.w

    def set_length(self, length_):
        self.length = length_

    def set_phi(self, phi_):
        self.phi = phi_
    
    def set_w(self, w_):
        self.w = w_

    def set_phi_w(self, phi_, w_):
        self.phi = phi_
        self.w = w_

    def get_length(self):
        return self.length

    def get_w(self):
        return self.w

    def get_phi(self):
        return self.phi


