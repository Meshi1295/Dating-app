select * from users_info
select * from login 
select * from messages
select username_to, count (username_to) from messages where username_from = 'amiri' group by username_to

select * from messages where username_from = 'zivi' and  username_to = 'amiri' union
select * from messages where username_from = 'amiri' and  username_to = 'zivi'

order by message_date
 

create table messages (
  mes_id serial ,
	messege text,
	username_from varchar(50),
	username_to varchar(50),
	message_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 


create table users_info(
  user_id serial PRIMARY KEY,
	firstname text not null,
	lastname text not null,
	email text not null,
	username text UNIQUE,
	password text not null,
	profileimg text,
	last_login date,
	phone text	
);

create table login (
	login_id INTEGER NOT NULL,
	username text NOT NULL,
	password text NOT NULL,
	 PRIMARY KEY (login_id),
	  CONSTRAINT fk_login_id FOREIGN KEY (login_id) REFERENCES users_info ( user_id) ON DELETE CASCADE  
)


ALTER TABLE users_info
ADD about_myself text