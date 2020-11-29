import madre
import math

class Seated_Children(madre.Swing):

    def __init__(self, phi_, w_, length_, a_):
        super(Seated_Children, self).__init__(phi_, w_, length_)
        self.a = a_

    def set_a(self, a_):
        self.a = a_

    def get_a(self):
        return self.a

    def w_seated(self, phi):
        self.w_dot = - ((self.g * self.length) / (self.length**2 + self.a**2)) * math.sin(phi)
        return self.w_dot