import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("AMBEE_API_KEY")


def get_coordinates(location_name):
    with open("location_coordinates.json") as f:
        locations = json.load(f)
    print(location_name)
    return locations.get(location_name)


def get_aqi_data(lat, lon):
    url = f"https://api.ambeedata.com/latest/by-lat-lng?lat={lat}&lng={lon}"
    headers = {
        "x-api-key": API_KEY,
        "Content-type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        data = response.json()
        if "stations" in data and data["stations"]:
            station = data["stations"][0]
            aqi = station.get("AQI", 0)
            pollutants = station.get("pollutants", {})
            pollution_level = classify_aqi(aqi)
            return {
                "city": station.get("placeName", "Unknown"),
                "country": station.get("countryCode", "Unknown"),
                "aqi": aqi,
                "pollution_level": pollution_level,
                "pollutants": pollutants
            }
        else:
            return {"error": "No air quality data found."}
    except Exception as e:
        return {"error": str(e)}


def classify_aqi(aqi):
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Fair"
    elif aqi <= 150:
        return "Moderate"
    elif aqi <= 200:
        return "Poor"
    else:
        return "Very Poor"
