from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- import this

app = Flask(__name__)
CORS(app)  # <-- add this line to enable CORS for all routes

# Sample advice data
advice_data = [
    "Track your expenses to understand where your money goes.",
    "Create a budget and stick to it.",
    "Reduce discretionary spending, such as eating out or entertainment.",
    "Save money by cooking at home and bringing lunch to work.",
    "Automate savings by setting up regular transfers to a savings account.",
    "Review and cancel unnecessary subscriptions.",
    "Consider using public transportation or carpooling to save on fuel costs.",
    "Shop with a list to avoid impulse purchases.",
    "Invest in energy-efficient appliances to reduce utility bills.",
    "Negotiate better rates for services like insurance and internet."
]

@app.route('/api/advice', methods=['GET'])
def get_advice():
    import random
    advice = random.choice(advice_data)
    return jsonify({"advice": advice})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=10000)
