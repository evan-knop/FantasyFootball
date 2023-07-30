import requests, time
import pandas as pd
from bs4 import BeautifulSoup
from string import ascii_uppercase

""" base_url = "https://www.pro-football-reference.com/players/"
player_url_list = []

#Loop through every letter in the alphabet
for letter in ascii_uppercase:
    current_url = base_url + letter

    #Prevent FB ref from blocking us
    time.sleep(10)

    page = requests.get(current_url)
    soup = BeautifulSoup(page.content, "html.parser")

    players = soup.find_all("p")

    for player in players:
        if "2022" in player.getText():
            player_url_list.append(player.find("a")['href'])

'Create CSVs for stats'
df = pd.DataFrame(player_url_list)
df.to_csv("CSVs/PlayerURLList.csv", index = False)
 """

base_url = "https://www.pro-football-reference.com/"
player_data = pd.read_csv('CSVs/PlayerURLList.csv', header = 0)  

player_list = player_data.values.tolist()

for player in player_list:
    current_url = base_url + player[0]

    page = requests.get(current_url)
    soup = BeautifulSoup(page.content, "html.parser")

    player_divs = soup.find("div", id='meta')
    photo_div = player_divs.find_all(class_='media-item')
    player_info = player_divs.find_all(class_='players', id='info')

    i=1 
    #Prevent FB ref from blocking us
    time.sleep(7)

