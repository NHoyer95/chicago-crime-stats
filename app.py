# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# importing config for username and password
import config


# Define the database connection parameters
database_name = 'chicago_violent_crimes_db' 
connection_string = f'postgresql://{config.username}:{config.password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
table = base.classes.violent_crimes

# Instantiate the Flask application. 
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


@app.route("/crimeCalendar")
def crimeCalenderPage():

   # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.date, table.primary_type, table.description, table.arrest).all()
    session.close()

    return jsonify(results)
    #webpage = render_template("viz1.html")
    #return webpage


@app.route("/arrestChart")
def arrestChartPage():
    
    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.date, table.primary_type, table.description, table.arrest).all()
    session.close()

    # Return the jsonified result. 
    return jsonify(results)
    #webpage = render_template("viz2.html")
    #return webpage


@app.route("/crimeMap")
def crimeMapPage():

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.date, table.primary_type, table.latitude, table.longitude).all()
    session.close()

    # Return something.. 
    return jsonify(results)
    #webpage = render_template("viz3.html")
    #return webpage


@app.route("/rawData")
def crimeData():

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.id, table.date, table.primary_type, table.description, 
    table.description, table.arrest, table.domestic, table.domestic, table.year, table.latitude, table.longitude).all()
    
    session.close()

    # Return something.. 
    return jsonify(results)
    #webpage = render_template("rawdata.html")
    #return webpage


@app.route("/aboutUs")
def teamPage():

    # Return something.. 
    webpage = render_template("team.html")
    return webpage


# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)