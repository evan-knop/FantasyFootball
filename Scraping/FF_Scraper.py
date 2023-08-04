import requests, time
import pandas as pd
from bs4 import BeautifulSoup

base_url = "https://www.pro-football-reference.com/years/"
#years_to_pull = ['2017', '2018', '2019', '2020', '2021', '2022']
years_to_pull = ['2022']
#stats_to_pull = ['passing', 'rushing', 'receiving']
stats_to_pull = ['passing']

for year in years_to_pull:
    for stat in stats_to_pull:
        current_URL = base_url + year + "/" + stat + ".htm"
        page = requests.get(current_URL)
        #Make sure we are not spamming the site
        time.sleep(5)

        soup = BeautifulSoup(page.content, "html.parser")

        results = soup.find("tbody")
        data_rows = results.find_all("tr")

        'Parse data into tables'
        i=0    
        player_stats = [[]]
        player_info = [[]]

        for j in range(len(data_rows)):
            pstats = data_rows[j].findAll('td')
            for i in range(len(pstats)):
                if i == 0:
                    player_stats[j].append(pstats[0]['data-append-csv'])
                    player_info[j].append(pstats[0]['data-append-csv'])
                    player_info[j].append(pstats[0].getText().replace('*', '').replace('+',''))
                    i+=1 
                elif i >=1 and i<=5:
                    player_stats[j].append(pstats[i].getText().replace('*', '').replace('+',''))
                    player_info[j].append(pstats[i].getText().replace('*', '').replace('+',''))
                    i+=1
                else:
                    player_stats[j].append(pstats[i].getText().replace('*', '').replace('+',''))
                    i+=1
            j+=1
            player_stats.append([])
            player_info.append([])
        
        'Add year column to end of stats data sets'
        for row in player_stats:
            row.append(year)   
        'Add year column to end of player data sets'
        for row in player_info:
            row.append(year)

        'Create CSVs for stats'
        df = pd.DataFrame(player_stats)
        df.to_csv("CSVs/" + stat + "_" + year + ".csv", index = False)

        'Create CSV for player info'
        df = pd.DataFrame(player_info)
        df.to_csv("CSVs/PlayerInfo_" + year + ".csv", index = False)