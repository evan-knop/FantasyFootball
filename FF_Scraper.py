import requests
import re
import pandas as pd
from bs4 import BeautifulSoup

base_url = "https://www.pro-football-reference.com/years/"
years_to_pull = ['2020', '2021', '2022']
stats_to_pull = ['passing', 'rushing', 'receiving']

passing_columns = ['']
rushing_columns = ['player_name', 'team', 'age', 'pos', 'games_played', 'games_started',
                    'attempts', 'rushing_yards', 'rushing_tds', 'first_downs', 'longest_run', 
                    'yards_per_carry', 'yards_per_game', 'fumbles']
receiving_columns = ['']
player_columns = ['player_id', 'player_name']

for year in years_to_pull:
    for stat in stats_to_pull:
        current_URL = base_url + year + "/" + stat + ".htm"
        page = requests.get(current_URL)

        soup = BeautifulSoup(page.content, "html.parser")

        results = soup.find("tbody")
        data_rows = results.find_all("tr")

        'Parse Player info for players table'
        player_info = []
        for row in data_rows:
            if row.find('td'):
                player_info = player_info + ([((row.find('td')['data-append-csv'], row.find('td').getText()
                                                                    .replace('*', '').replace('+','')))])
        
                


        'Parse stats for individual stats tables'
        row_data = [[td.getText() for td in data_rows[i].findAll('td')]
                    for i in range(len(data_rows))]
        
        'Create CSVs for stats'
        df = pd.DataFrame(row_data)
        df.to_csv(stat + "_" + year + ".csv", index = False)

        'Create CSV for player info'
        df = pd.DataFrame(player_info)
        df.to_csv("PlayerInfo.csv", index = False)