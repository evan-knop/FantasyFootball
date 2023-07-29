import requests, time
import pandas as pd
from bs4 import BeautifulSoup
from string import ascii_uppercase

base_url = "https://www.pro-football-reference.com/players/"
player_url_list = []

#Loop through every letter in the alphabet
for letter in ascii_uppercase:
    current_url = base_url + letter

    #Prevent FB ref from blocking us
    time.sleep(5)

    page = requests.get(current_url)
    soup = BeautifulSoup(page.content, "html.parser")

    players = soup.find_all("p")

    for player in players:
        if "2022" in player.getText():
            player_url_list.append(player.find("a")['href'])
