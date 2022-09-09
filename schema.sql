CREATE TABLE `todos` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `todos_index_2` (`name`)
);

CREATE TABLE `todo_items` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `details` varchar(255) DEFAULT NULL,
    `todos_name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `todo_items_relation_1` (`todos_name`),
    CONSTRAINT `todo_items_relation_1` FOREIGN KEY (`todos_name`) REFERENCES `todos` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
);