import requests
import weibullBot
import csv

def weatherBot(latitude, longitude):
    url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=windspeed_10m&current_weather=true&windspeed_unit=ms&timezone=America%2FSao_Paulo&past_days=90'
    response = requests.get(url)

    data = response.json()

    currentWeather = data["current_weather"]
    windSpeed_array = data["hourly"]["windspeed_10m"]
    time = data["hourly"]["time"]

    averageSpeed = sum(windSpeed_array) / len(windSpeed_array)
    averageSpeed_formatado = "{:.1f}".format(averageSpeed)

    windSpeed = [x for x in windSpeed_array if x != 0.0]

    params = weibullBot.weibullBot(windSpeed)

    final_result = {
        "averageSpeed": averageSpeed_formatado,
        "currentWeather": currentWeather,
        "time": time,
        "parameters": {
            "K": format(params["K"], '.5f'),
            "A": format(params["A"], '.5f')
        },
        "windSpeed": windSpeed
    }

    return final_result