INSERT INTO teacher_entity ("name", "surname", "patronymic") VALUES
    ('Куров', 'Андрей', 'Владимирович'),
    ('Тассов', 'Кирилл', 'Леонидович');

INSERT INTO course_entity ("department", "degree", "year") VALUES
    ('ИУ7', 'Bachelor', 2017);

INSERT INTO group_entity ("number", "courseId", "groupName") VALUES
    (1, 1, 'ИУ7-81Б'),
    (2, 1, 'ИУ7-82Б'),
    (3, 1, 'ИУ7-83Б'),
    (4, 1, 'ИУ7-84Б'),
    (5, 1, 'ИУ7-85Б'),
    (6, 1, 'ИУ7-86Б');

INSERT INTO profile_entity ("name", "surname", "patronymic") VALUES
    ('Kolya', 'Ko', 'KK'),
    ('Andrey', 'Ko', 'KK'),
    ('Olga', 'Ko', 'KK');

INSERT INTO user_entity ("username", "password", "profileId", "groupId") VALUES
    ('john', 'changeme', 1, 5),
    ('andrey', 'hi', 2, 5),
    ('olga', 'changeme', 3, 5);

INSERT INTO queue_entity ("nameSubject", "nameTeacher", "dateCreate", "timeCreate", "description", "creatorId") VALUES
    ('Планирование Эксперимента', 'Куров', '11.02.1873', '14:33', 'Description1', 1),
    ('Очередь', 'О', '11.02.1873', '14:33', 'Оч', 2);

INSERT INTO request_entity ("isActive", "userId", "queueId") VALUES
    (True, 1, 1);

INSERT INTO queue_entity_groups_group_entity ("queueEntityId", "groupEntityId") VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 1);
