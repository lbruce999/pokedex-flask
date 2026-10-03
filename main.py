import requests
from flask import Flask, render_template

app = Flask(__name__)


# render html file
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/pokemon/<pokemonUserInput>")
def search_pokemon(pokemonUserInput):
    url = f"https://pokeapi.co/api/v2/pokemon/{pokemonUserInput}"
    payload = {}
    files = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    pokemon = response.json()
    return create_pokemon_object(pokemon)


def create_pokemon_object(pokemon):
    # list of dicts
    abilities = pokemon['abilities']
    # Ability list
    ability_name = []

    # variables for items needed
    id = int(pokemon['id'])  # integer
    name = pokemon['name']  # text
    height = int(pokemon['height'])  # integer
    weight = int(pokemon['weight'])  # integer
    base_experience = int(pokemon['base_experience'])
    sprites = pokemon['sprites']['other']['home']['front_default']
    for ability in abilities:  # Each ability names dictionary
        ability_name.append(ability["ability"]["name"])

    pokemon_object = {
        'pokemon_id': id,
        'pokemon_name': name,
        'height': height,
        'weight': weight,
        'abilities': ability_name,
        'base_experience': base_experience,
        'sprites': sprites
    }
    return pokemon_object
