create database nodeTest;

use nodeTest;

create table users(
	id int Primary key not null AUTO_INCREMENT,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    gender varchar(10) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    mobile numeric not null 
);

select * from users;

select * from mysql.user;