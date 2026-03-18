-- create databse with name portfolio

create table users(
	id int primary key,
	name varchar(50),
	password varchar(200)
);

create table description(
	id int primary key,
	userid int,
	description varchar(2000),
	foreign key (userid) references users(id)
)

create table skills(
	id int primary key,
	userid int,
	skills varchar(2000),
	foreign key (userid) references users(id)
)

create table contact(
	id int primary key,
	userid int,
	contact varchar(2000),
	foreign key (userid) references users(id)
)