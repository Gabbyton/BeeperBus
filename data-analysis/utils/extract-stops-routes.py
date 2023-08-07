import os
import json
from itertools import chain

import pandas as pd
import numpy as np

import matplotlib.pyplot as plt

class Vehicle:
    route_name: str
    encoded_polyline: str
    lat: float
    long: float
    color: str
    stops: list
    route_id: int
    # TODO: add vehicle ID
    
    def __init__(self, data):
        self.route_name = data["Description"]
        self.encoded_polyline = data["EncodedPolyline"]
        self.lat = data["MapLatitude"]
        self.long = data["MapLongitude"]
        self.color = data["MapLineColor"]
        self.stops = data["Stops"]
        self.route_id = data["RouteID"]

class Stop:

    name: str
    line: str
    lat: float
    long: float
    heading: int
    route_id: int
    route_stop_id: int
    next_stop_est: int

    def __init__(self, data):
        self.name = data["SignVerbiage"]
        self.line = data["Line1"]
        self.lat = data["Latitude"]
        self.long = data["Longitude"]
        self.heading = data["Heading"]
        self.route_id = data["RouteID"]
        self.route_stop_id = data["RouteStopID"]
        self.next_stop_est = data["SecondsToNextStop"]

if __name__ == "__main__":

    with open('data/shuttle_stops_with_routes.txt', 'r') as file:
        data = json.load(file)

    vehicles = list(map(Vehicle, data))

    for vehicle in vehicles:
        vehicle.stops = list(map(Stop, vehicle.stops)) 

    vehicle_data = list(map(vars, vehicles))
    all_stops = [vehicle.stops for vehicle in vehicles]
    all_stops = list(map(vars, chain(*all_stops)))

    vehicle_df = pd.DataFrame(vehicle_data)
    vehicle_df = vehicle_df.drop('stops', axis="columns")
    stop_df =pd.DataFrame(all_stops)

    vehicle_df.to_csv("data/vehicle_df.csv")
    stop_df.to_csv("data/stop_df.csv")
