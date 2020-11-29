import madre
import math

class Standing_Child(madre.Swing):
    def __init__(self, phi_, w_, length_squat_, length_stand_):
        super(Standing_Child, self).__init__(phi_, w_, length_squat_)
        self.length_stand = length_stand_

    def set_length_stand(self, length_stand_):
        self.lenght_stand = length_stand_

    def get_length_stand(self):
        return self.length_stand

    def w_standing(self, phi):
        self.w_dot = -(self.g / self.length) * math.sin(phi)
        return self.w_dot

