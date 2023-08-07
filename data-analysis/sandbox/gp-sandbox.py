"""Placeholder docstring"""  # TODO: add docstring

import json
from itertools import chain

import pandas as pd


class Vehicle:
    """Placeholder docstring"""  # TODO: add docstring

    route_name: str
    encoded_polyline: str
    lat: float
    long: float
    color: str
    stops: list
    route_id: int
    # TODO: add vehicle ID

    def __init__(self, input_data) -> None:
        self.route_name = input_data["Description"]
        self.encoded_polyline = input_data["EncodedPolyline"]
        self.lat = input_data["MapLatitude"]
        self.long = input_data["MapLongitude"]
        self.color = input_data["MapLineColor"]
        self.stops = input_data["Stops"]
        self.route_id = input_data["RouteID"]


class Stop:
    """Placeholder docstring"""  # TODO: add docstring

    name: str
    line: str
    lat: float
    long: float
    heading: int
    route_id: int
    route_stop_id: int
    next_stop_est: int

    def __init__(self, input_data) -> None:
        self.name = input_data["SignVerbiage"]
        self.line = input_data["Line1"]
        self.lat = input_data["Latitude"]
        self.long = input_data["Longitude"]
        self.heading = input_data["Heading"]
        self.route_id = input_data["RouteID"]
        self.route_stop_id = input_data["RouteStopID"]
        self.next_stop_est = input_data["SecondsToNextStop"]


def main() -> None:
    with open("data/shuttle_stops_with_routes.txt", "r", encoding="utf-8") as file:
        data = json.load(file)

    vehicles = list(map(Vehicle, data))

    for vehicle in vehicles:
        vehicle.stops = list(map(Stop, vehicle.stops))

    vehicle_data = list(map(vars, vehicles))
    all_stops = [vehicle.stops for vehicle in vehicles]
    all_stops = list(map(vars, chain(*all_stops)))

    vehicle_df = pd.DataFrame(vehicle_data).drop("stops", axis="columns")
    stop_df = pd.DataFrame(all_stops)

    vehicle_df.to_csv("data/vehicle_df.csv")
    stop_df.to_csv("data/stop_df.csv")


if __name__ == "__main__":
    main()
