-- create databse with name portfolio

create table users(
	id int primary key,
	name varchar(50),
	password varchar(200)
);

create table description(
	id int primary key,
	userid int,
	description text,
	foreign key (userid) references users(id)
)

create table skills(
	id int primary key,
	userid int,
	skills varchar(2000),
	foreign key (userid) references users(id)
)

create table contacts(
	id int primary key,
	userid int,
	contacrType varchar(2000),
	contactValue varchar text,
	foreign key (userid) references users(id)
)

create table projects(
	id int primary key,
	userid int,
	title varchar(200),
	description text,
	foreign key (userid) references users(id)
)	