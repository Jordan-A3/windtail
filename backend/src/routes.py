from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask import send_from_directory

from src import weatherBot
import powerCalculatorBot
import capacityFactorBot

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST'])
@cross_origin()
def homepage():
    body_data = request.get_json()

    latitude = body_data['latitude']
    longitude = body_data['longitude']

    response = weatherBot.weatherBot(latitude, longitude)

    return jsonify(response)

@app.route('/power-calculator', methods=['POST'])
@cross_origin()
def power_calculator():
    body_data = request.get_json()

    Vv = body_data['Vv']
    Vi = body_data['Vi']
    Vn = body_data['Vn']
    Vf = body_data['Vf']
    Pn = body_data['Pn']

    powerCalculatorResponse = powerCalculatorBot.powerCalculatorBot(Vi, Vn, Vf, Pn, Vv)
    # capacityFactorResponse = capacityFactorBot.capacityFactorBot(epot, Pn)

    response = {
        "power": powerCalculatorResponse,
        # "capacity": capacityFactorResponse
    }

    return jsonify(response)

@app.route('/graphic/prob.png')
def get_prob_image():
    return send_from_directory('graphic', 'prob.png')

@app.route('/graphic/power3d.png')
def get_power3d_image():
    return send_from_directory('graphic', 'power3d.png')

@app.route('/graphic/power2d.png')
def get_power2d_image():
    return send_from_directory('graphic', 'power2d.png')

app.run(host='0.0.0.0')