import mysql.connector
import pandas as pd

#Connecting to MySQL DB - local host
conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "root",
    database = "FANTASY_FOOTBALL"
)
#Load CSV
df = pd.read_csv("PlayerInfo.csv")

cursor = conn.cursor()

#Change nan values to None
df = df.where((pd.notnull(df)), None)
df = df.fillna(0)

#Truncate table before reloading
cursor.execute("TRUNCATE TABLE FANTASY_FOOTBALL.players")

 #loop through the data frame
for i,row in df.iterrows():
    #Skip the empty rows from scraping header rows off of FBRef
    if len(row[0]) <= 4:
        continue
    sql = "INSERT IGNORE INTO FANTASY_FOOTBALL.players VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, tuple(row))
    print("Record inserted")
    conn.commit()

conn.close()

