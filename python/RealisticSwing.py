import math
from . import Environment

class RealisticSwing(Environment.Environment):
    I2 = N = totalMass =I1 = swingMass = bodyHeightUpper = bodyHeightLower = massUpper = massLower = degreeBodyRotation = 0.
    swingMotion = None
    def __init__(self, environment, swingMass, massUpper, massLower,bodyHeightUpper,bodyHeightLower, theta, theta0):
        self.environment = environment
        self.coordinates_upperBody = []
        self.coordinates_lowerBody = []
        self.coordinates_swing = []
        self.swingMass = swingMass # massa swing
        self.theta = theta # angolo theta quando bambino è circa steso
        self.theta0 = theta0 # angolo theta0 quando bambino è circa dritto
        # retreive heigth from parent
        # calculate heigth retreived
        self.bodyHeightUpper = bodyHeightUpper
        self.bodyHeightLower = bodyHeightLower
        # retreive mass from parent
        # calculate mass retreived
        self.massUpper = massUpper
        self.massLower = massLower
        self.totalMass = self.swingMass + self.massUpper + self.massLower # massa totale
        self.N = self.massUpper * self.bodyHeightUpper - self.massLower * self.bodyHeightLower #Nome semplificato

        self.I1 = self.totalMass * self.environment.ropeLength**2 # momento d'inerzia I1
        self.I2 = self.massUpper * self.bodyHeightUpper**2 + self.massLower * self.bodyHeightLower**2 # mom d'inerzia I2


        self.frame_listRealistic = []
        self.frame_listCombined = []
        self.bodyCM_listRealistic = []
        self.bodyCM_listCombined = []

    def calculateSwingMotion(self,integrationMethode,steps):
        if integrationMethode == "realistic":
            self.environment.utils.symplectic_realistic(self,steps)
        elif integrationMethode == "combined":
            self.environment.utils.symplectic_combined(self,steps)

    def calculate_I1(self):
        self.I1 = self.totalMass * self.environment.ropeLength**2 # momento d'inerzia I1

    def w_realistic(self, phi): # equazione del moto
        numeratore = (-self.totalMass * self.environment.ropeLength * self.environment.gravity * math.sin(phi) + self.N * self.environment.gravity * math.sin(self.theta + phi))
        denominatore = (self.I1 + self.I2 - 2 * self.environment.ropeLength * self.N * math.cos(self.theta))
        self.w_dot = numeratore / denominatore
        return self.w_dot
