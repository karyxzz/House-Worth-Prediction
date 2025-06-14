from flask import Flask, request, jsonify, render_template
import json
import pickle
import numpy as np
from aqi_service import get_coordinates, get_aqi_data

app = Flask(__name__)

# Load model and columns
model = pickle.load(open("model.pickle", "rb"))
with open("columns.json") as f:
    data_columns = json.load(f)["data_columns"]


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/columns.json')
def get_columns():
    return jsonify({"data_columns": data_columns})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    total_sqft = float(data['total_sqft'])
    bath = int(data['bath'])
    bhk = int(data['bhk'])
    location = data['location'].lower()

    x = np.zeros(len(data_columns))
    x[0] = total_sqft
    x[1] = bath
    x[2] = bhk
    if location in data_columns:
        loc_index = data_columns.index(location)
        x[loc_index] = 1

    predicted_price = model.predict([x])[0]
    return jsonify({'estimated_price': round(predicted_price, 2)})


@app.route("/api/air-quality", methods=["GET"])
def air_quality():
    location = request.args.get("location")
    if not location:
        return jsonify({"error": "Location is required"}), 400

    coords = get_coordinates(location)
    if not coords:
        return jsonify({"error": "Coordinates not found for location"}), 404

    lat, lon = coords
    aqi_data = get_aqi_data(lat, lon)

    return jsonify(aqi_data)


if __name__ == '__main__':
    app.run(debug=True)
