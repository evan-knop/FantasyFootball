import mysql.connector
import pandas as pd
import glob

#Connecting to MySQL DB - local host
conn = mysql.connector.connect(
    host = "x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user = "ocodf96j5psl63w2",
    password = "sp56qfrb5yqhxg5o",
    database = "xojsllvnlgwf8y03"
)

#Create cursor object
cursor = conn.cursor()

#Load CSVs
all_files = glob.glob("CSVs/receiving*.csv")

#Concatenate all files into one
df = pd.concat([pd.read_csv(f, on_bad_lines='skip') for f in all_files]) 

#Change nan values to None
df = df.where((pd.notnull(df)), None)
df = df.fillna(0)

#Truncate table before reloading
cursor.execute("TRUNCATE TABLE xojsllvnlgwf8y03.receiving")

 #loop through the data frame
for i,row in df.iterrows():
    #Skip the empty rows from scraping header rows off of FBRef
    if len(row[0]) <= 4:
        continue
    sql = "INSERT INTO xojsllvnlgwf8y03.receiving VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, tuple(row))
    print("Record inserted")
    conn.commit()

conn.close()

