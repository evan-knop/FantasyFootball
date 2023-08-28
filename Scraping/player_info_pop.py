import shutil
import requests, time
import pandas as pd
import re
from bs4 import BeautifulSoup

base_url = "https://www.pro-football-reference.com/"
player_data = pd.read_csv('/Users/evan/Documents/_CODE/FantasyFootball/CSVs/PlayerURLList.csv', header = 0)  
player_info_array = [[]]

player_list = player_data.values.tolist()

i=0

for i in range(len(player_list)):
    current_url = base_url + player_list[i][0]

    page = requests.get(current_url)
    soup = BeautifulSoup(page.content, "html.parser")

    player_divs = soup.find("div", id='meta')
    if player_divs.find_all(class_='media-item'):
        photo_div = player_divs.find_all(class_='media-item')
    player_info = player_divs.getText()

    #Split text into array
    player_info = player_info.splitlines()
    
    #Scrape Player Name
    player_info_array[i].append(player_info[4])

    #Scrape College
    player_info_array[i].append(re.sub(r"[\n\t\s]*", "", player_info[28]))

    #Scrape Draft Info
    if len(player_info) >= 46:
        player_info_array[i].append(player_info[45])

    #Scrape Player Photo
    if player_divs.find_all('img'):
        photo = player_divs.find_all('img')[0]
        url_ext = photo.attrs['src']

    r = requests.get(url_ext, stream=True) 
    if r.status_code == 200:                     
     with open("./Scraping/photos/" + player_info[4] + ".jpg", 'wb') as f: 
        r.raw.decode_content = True
        shutil.copyfileobj(r.raw, f)

    player_info_array[i].append('<img src="' + player_info[4] + '.jpg"/>')

    #Go to next line in array it
    player_info_array.append([])
    print(str(i+1) + " completed")
    i+=1
    #Prevent FB ref from blocking us
    time.sleep(6)

'Create CSVs for stats'
df = pd.DataFrame(player_info_array)
df.to_csv("CSVs/PlayerGeneralInfo.csv", index = False)