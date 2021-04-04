INSERT INTO teacher_entity ("name", "surname", "patronymic") VALUES
    ('Куров', 'Андрей', 'Владимирович'),
    ('Тассов', 'Кирилл', 'Леонидович');

INSERT INTO course_entity ("department", "degree", "year") VALUES
    ('IU7', 'Bachelor', 2017);

INSERT INTO group_entity ("number", "courseId") VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1);

INSERT INTO profile_entity ("name", "surname") VALUES
    ('Kolya', 'Ko');

INSERT INTO user_entity ("username", "password", "profileId", "groupId") VALUES
    ('john', 'changeme', 1, 5);

INSERT INTO queue_entity ("nameSubject", "nameTeacher", "dateCreate", "timeCreate", "description", "creatorId") VALUES
    ('Планирование Эксперимента','Куров', '11.02.1873', '14:33', 'Description1',1),
    ('Программирование на Си', 'Ломовской', '11.02.2010', '14:33', 'Description1', 1),
    ('ТИСД', 'Силантьева,Барышникова', '11.02.1873', '14:33', 'Description1', 1);

INSERT INTO request_entity ("isActive", "userId", "queueId") VALUES
    (True, 1, 1),
    (True, 1, 2),
    (True, 1, 3);

INSERT INTO queue_entity_groups_group_entity ("queueEntityId", "groupEntityId") VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5);

