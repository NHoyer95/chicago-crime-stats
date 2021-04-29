create table violent_crimes_db (
	Date date primary key, 
	Primary_Type varchar,
	Description varchar, 
	Arrest boolean,
	Domestic boolean,
	District int,
	Year int,
	Latitude float,
	Longitude float
);

select * from violent_crimes_db;