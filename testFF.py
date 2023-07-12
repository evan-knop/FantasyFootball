import requests
import re
import pandas as pd
from bs4 import BeautifulSoup

stat_cat_URLs_22 = ["https://www.pro-football-reference.com/years/2022/passing.htm", 
                    "https://www.pro-football-reference.com/years/2022/rushing.htm",
                    "https://www.pro-football-reference.com/years/2022/receiving.htm"
                    ]

URL = "https://www.pro-football-reference.com/years/2022/receiving.htm"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find("tbody")
0
data_rows = results.find_all("tr")

row_data = [[td.getText() for td in data_rows[i].findAll('td')]
                    for i in range(len(data_rows))]

# create the dataframe
passing = pd.DataFrame(row_data)
# export dataframe to a CSV 
passing.to_csv("receiving.csv", index=False)