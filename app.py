# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify
from config import username, password

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Define the database connection parameters
database_name = 'chicago_violent_crimes_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
violent_crimes = base.classes.violent_crimes

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/home")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage

# @app.route("/crimeCalendar")
# def crimeCalenderPage():

#    # Open a session, run the query, and then close the session again
#     session = Session(engine)
#     results = session.query(table.country, table.iso3, table.fighteraircraft).all()
#     session.close()


#     #webpage = render_template("other.html", title_we_want="Shirley")
#     return webpage

# @app.route("/arrestChart")
# def arrestChartPage():
    

#     # Open a session, run the query, and then close the session again
#     session = Session(engine)
#     results = session.query(table.country, table.iso3, table.fighteraircraft).all()
#     session.close()

  

#     # Return the jsonified result. 
#     return 

@app.route("/crimeMap")
def crimeMapPage():

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(violent_crimes.id, violent_crimes.date, violent_crimes.primary_type, violent_crimes.description, violent_crimes.arrest, violent_crimes.domestic,violent_crimes.district, violent_crimes.year, violent_crimes.latitude, violent_crimes.longitude).all()
    session.close()

    #Create a list of dictionaries, with each dictionary containing one row from the query
    map_all_crime_data = []
    
    for primary_type, arrest, district, latitude, longitude in results: 
        dict = {}
        dict ["primary_type"] = primary_type
        dict ["arrest"] = arrest
        dict ["district"] = district
        dict ["latitude"] = latitude
        dict ["longitude"] = longitude
        map_all_crime_data.append(dict)

    # Return jsonified results
    return jsonify(map_all_crime_data)


@app.route("/showData")
def crimeData():

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(violent_crimes.id, violent_crimes.date, violent_crimes.primary_type, violent_crimes.description, violent_crimes.arrest, violent_crimes.domestic,violent_crimes.district, violent_crimes.year, violent_crimes.latitude, violent_crimes.longitude).all()
    session.close()

    #CREATE A LIST OF DICTIONRARIES
    all_crime_data = []
    
    #Create a list of dictionaries, with each dictionary containing one row from the query
    for id, date, primary_type, description, arrest, domestic, district, year, latitude, longitude in results: 
        dict = {}
        dict ["id"] = id
        dict ["date"] = date
        dict ["primary_type"] = primary_type
        dict ["description"] = description
        dict ["arrest"] = arrest
        dict ["domestic"] = domestic
        dict ["district"] = district
        dict ["year"] = year
        dict ["latitude"] = latitude
        dict ["longitude"] = longitude
        all_crime_data.append(dict)

    # Return jsonified results
    return jsonify(all_crime_data)


# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)