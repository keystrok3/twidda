
DROP DATABASE IF EXISTS diaryentries;

CREATE DATABASE diaryentries;

USE diaryentries;


DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    body VARCHAR(255) NOT NULL,
    time_posted timestamp,
    edited boolean DEFAULT 0,
    PRIMARY KEY (post_id)
);

DROP TABLE IF EXISTS edits;

CREATE TABLE edits (
    edit_id INT AUTO_INCREMENT,
    post_id INT,
    title_change VARCHAR(100),
    body_change VARCHAR(255),
    time_edited timestamp,
    PRIMARY KEY (edit_id),
    FOREIGN KEY (post_id) REFERENCES posts (post_id)
);