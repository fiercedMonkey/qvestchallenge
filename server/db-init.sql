BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS `training` (
    `id` INTEGER PRIMARY KEY, `name` TEXT NOT NULL, `description` TEXT, `lecturer` INTEGER NOT NULL, `price` TEXT NOT NULL, `updatedAt` INTEGER DEFAULT NULL, `createdAt` INTEGER NOT NULL, FOREIGN KEY (`lecturer`) REFERENCES `lecturers` (`id`)
);

CREATE TABLE IF NOT EXISTS `lecturers` (
    `id` INTEGER PRIMARY KEY, `firstName` TEXT NOT NULL, `lastName` TEXT, `updatedAt` INTEGER DEFAULT NULL, `createdAt` INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS `appointment` (
    `id` INTEGER PRIMARY KEY, `training` INTEGER NOT NULL, `startDate` INTEGER NOT NULL, `endDate` INTEGER NOT NULL, `updatedAt` INTEGER DEFAULT NULL, `createdAt` INTEGER NOT NULL, FOREIGN KEY (`training`) REFERENCES `training` (`id`)
);

INSERT
    OR IGNORE INTO lecturers (
        firstName, lastName, createdAt
    )
VALUES (
        'John', 'Doe', '1715096820'
    );

INSERT
    OR IGNORE INTO training (
        name, description, lecturer, price, createdAt
    )
VALUES (
        'Challenge Training', 'Training Description', 1, '100', 1715096820
    );

INSERT
    OR IGNORE INTO appointment (
        training, startDate, endDate, createdAt
    )
VALUES (1, 1715096820, 1715196820, 1715096820),
(1, 1715096820, 1715196820, 1715096820);

COMMIT;