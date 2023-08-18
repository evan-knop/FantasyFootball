import mysql.connector
import pandas as pd
import glob, time

#Connecting to MySQL DB - local host
conn = mysql.connector.connect(
    host = "us-cdbr-east-06.cleardb.net",
    user = "bcbe4cc26f9210",
    password = "545df820",
    database = "heroku_59ca7044a5a301e"
)
#Create cursor
cursor = conn.cursor()

#Load CSVs
all_files = glob.glob("CSVs/PlayerInfo*.csv")

#Concatenate all files into one
df = pd.concat([pd.read_csv(f, on_bad_lines='skip') for f in all_files]) 

#Change nan values to None
df = df.where((pd.notnull(df)), None)
df = df.fillna(0)

#Truncate table before reloading
#cursor.execute("TRUNCATE TABLE heroku_59ca7044a5a301e.players")

 #loop through the data frame
for i,row in df.iterrows():
    #Skip the empty rows from scraping header rows off of FBRef
    if len(row[0]) <= 4:
        continue
    sql = "INSERT IGNORE INTO heroku_59ca7044a5a301e.players VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, tuple(row))
    
    print("Record inserted")
    conn.commit()

conn.close()

