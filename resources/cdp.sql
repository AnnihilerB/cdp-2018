DROP TABLE IF EXISTS users ;
CREATE TABLE users (id INTEGER(4)  AUTO_INCREMENT NOT NULL,
username VARCHAR(12),
password VARCHAR(20),
email VARCHAR(30),
PRIMARY KEY (id) ) ENGINE=InnoDB;

DROP TABLE IF EXISTS issues ;
CREATE TABLE issues (id_issue INTEGER(4)  AUTO_INCREMENT NOT NULL,
description_issue VARCHAR(50),
state_issue VARCHAR(20),
difficulty_issue INTEGER(4),
priority_issue INTEGER(4),
id_project INTEGER(4) NOT NULL,
PRIMARY KEY (id_issue) ) ENGINE=InnoDB;

DROP TABLE IF EXISTS tasks ;
CREATE TABLE tasks (id_task INTEGER(4)  AUTO_INCREMENT NOT NULL,
name_task VARCHAR(20),
state_task VARCHAR(20),
id INTEGER(4) NOT NULL,
id_issue INTEGER(4) NOT NULL,
id_sprint INTEGER(4) NOT NULL,
PRIMARY KEY (id_task) ) ENGINE=InnoDB;

DROP TABLE IF EXISTS sprints ;
CREATE TABLE sprints (id_sprint INTEGER(4)  AUTO_INCREMENT NOT NULL,
name_sprint VARCHAR(20),
state_sprint VARCHAR(20),
id_project INTEGER(4) NOT NULL,
PRIMARY KEY (id_sprint) ) ENGINE=InnoDB;

DROP TABLE IF EXISTS projects ;
CREATE TABLE projects (id_project INTEGER(4)  AUTO_INCREMENT NOT NULL,
name VARCHAR(20),
description VARCHAR(20),
sprint_duration VARCHAR(20),
deposit_url VARCHAR(50),
PRIMARY KEY (id_project) ) ENGINE=InnoDB;

ALTER TABLE issues ADD CONSTRAINT FK_issues_id_project FOREIGN KEY (id_project) REFERENCES projects (id_project);

ALTER TABLE tasks ADD CONSTRAINT FK_tasks_id FOREIGN KEY (id) REFERENCES users (id);
ALTER TABLE tasks ADD CONSTRAINT FK_tasks_id_issue FOREIGN KEY (id_issue) REFERENCES issues (id_issue);
ALTER TABLE tasks ADD CONSTRAINT FK_tasks_id_sprint FOREIGN KEY (id_sprint) REFERENCES sprints (id_sprint);
ALTER TABLE sprints ADD CONSTRAINT FK_sprints_id_project FOREIGN KEY (id_project) REFERENCES projects (id_project);

INSERT INTO users (username, password)
VALUES ('admin', 'pass');
