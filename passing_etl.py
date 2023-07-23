import mysql.connector
import pandas as pd
import glob

#Connecting to MySQL DB - local host
conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "root",
    database = "FANTASY_FOOTBALL"
)

#Create cursor object
cursor = conn.cursor()

#Load CSVs
all_files = glob.glob("passing*")

#Concatenate all files into one
df = pd.concat([pd.read_csv(f, on_bad_lines='skip') for f in all_files]) 

print(df)

""" 
#Truncate table before reloading
cursor.execute("TRUNCATE TABLE FANTASY_FOOTBALL.passing")

 #loop through the data frame
for i,row in df.iterrows():
    sql = "INSERT INTO FANTASY_FOOTBALL.players VALUES (%s,%s)"
    cursor.execute(sql, tuple(row))
    print("Record inserted")
    conn.commit()
 """
conn.close()

