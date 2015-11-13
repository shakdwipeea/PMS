CREATE TABLE block (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

CREATE TABLE prisoner (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  date_of_joining VARCHAR(255),
  date_of_release VARCHAR(255),
  block_id INT,
  FOREIGN KEY (block_id) REFERENCES block(id)
);

CREATE TABLE crime (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  severity INT
);

CREATE TABLE visitors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  date_of_visit VARCHAR(255),
  duration VARCHAR(255),
  prisoner_id INT,
  FOREIGN KEY (prisoner_id) REFERENCES prisoner(id)
);

CREATE TABLE officers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  block_id INT,
  FOREIGN KEY (block_id) REFERENCES  block(id)
);

CREATE TABLE jailor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  date_of_employment VARCHAR(255),
  date_of_retirement VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  prisoner_id VARCHAR(255)
);

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  author_name VARCHAR(255),
  prisoner_id INT,
  FOREIGN KEY (prisoner_id) REFERENCES prisoner(id)
);

CREATE TABLE prescription (
  id INT PRIMARY KEY  AUTO_INCREMENT,
  disease_name VARCHAR(255),
  date VARCHAR(255),
  prisoner_id INT,
  FOREIGN KEY (prisoner_id) REFERENCES prisoner(id)
);

CREATE TABLE crime_committed (
  prisoner_id INT,
  FOREIGN KEY (prisoner_id) REFERENCES prisoner(id),
  crime_id INT,
  FOREIGN KEY (crime_id) REFERENCES  crime(id)
);

CREATE TABLE prescription_prisoner (
  prescription_id INT,
  FOREIGN KEY (prescription_id) REFERENCES prescription(id),
  prisoner_id INT,
  FOREIGN KEY (prisoner_id) REFERENCES prisoner(id)
);
