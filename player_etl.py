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

#Truncate table before reloading
cursor.execute("TRUNCATE TABLE FANTASY_FOOTBALL.players")

 #loop through the data frame
for i,row in df.iterrows():
    sql = "INSERT IGNORE INTO FANTASY_FOOTBALL.players VALUES (%s,%s)"
    cursor.execute(sql, tuple(row))
    print("Record inserted")
    conn.commit()

conn.close()

