import requests
import re
import pandas as pd
from bs4 import BeautifulSoup

base_url = "https://www.pro-football-reference.com/years/"
years_to_pull = ['2020', '2021', '2022']
stats_to_pull = ['passing', 'rushing', 'receiving']

for year in years_to_pull:
    for stat in stats_to_pull:
        current_URL = base_url + year + "/" + stat + ".htm"
        page = requests.get(current_URL)

        soup = BeautifulSoup(page.content, "html.parser")

        results = soup.find("tbody")
        data_rows = results.find_all("tr")

        row_data = [[td.getText() for td in data_rows[i].findAll('td')]
                    for i in range(len(data_rows))]
        
        df = pd.DataFrame(row_data)
        df.to_csv(stat + "_" + year + ".csv", index = False)


#URL = "https://www.pro-football-reference.com/years/2022/receiving.htm"
""" page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find("tbody")
data_rows = results.find_all("tr")

row_data = [[td.getText() for td in data_rows[i].findAll('td')]
                    for i in range(len(data_rows))]
 """
""" # create the dataframe
passing = pd.DataFrame(row_data)
# export dataframe to a CSV 
passing.to_csv("receiving.csv", index=False) """