### Веб-приложение по созданию очередей для сдачи ЛР

#### Wiki documentation [RU] : [wiki](https://github.com/sh-k-ls/lab-queue/wiki/Documentation)

# lab-queue 
### Тема проекта: Веб-приложение по формированию электронной очереди для сдачи лабораторных работ (ЛР). 

### Команда разработчиков
Кондрашова Ольга Павловна (ИУ7-85Б, email: ol.kondraschowa@gmail.com)   
<img src="https://github.com/sh-k-ls/lab-queue/blob/master/team-images/oljakon.jpg" width="100">  
 
Шестовских Николай Александрович (ИУ7-85Б email: shest1999@gmail.com)

<img src="https://github.com/sh-k-ls/lab-queue/blob/master/team-images/P10216-162846(1).jpg" width="100">   

Коротков Андрей Владимирович (ИУ7-85Б, email: akorotkov1234@yandex.ru)   
<img src="https://github.com/sh-k-ls/lab-queue/blob/master/team-images/kuso4egdobra.JPG" width="100">

### Технологический стек
* Front-end: HTML5, CSS3, TypeScript, Angular
* Back-end: TypeScript, NestJS + PostgreSQL
* CodeStyle: TSLint
* Инструмент для разработки: WebStorm, DataGrip
* Баг-трекер: GitHub

# ТЗ
## Цель работы
Реализовать веб-приложение, позволяющее формировать очередь для сдачи ЛР.

Задачи, которые необходимо реализовать, для достижения поставленной цели: 
1. Спроектировать интерфейс веб-приложения
2. Спроектировать архитектуру веб-приложения
3. Составить API запросы к back-end'у
4. Реализовать веб-приложения с mock-запросами к back-end'у
5. Спроектировать и реализовать базу данных 
6. Реализовать back-end сервер

## Требования к программному обеспечению (ПО)
Веб-приложение должно реализовывать следующий функционал:
1. авторизация
2. создание/удаление очереди (указывается для какой группы/потока создается очередь)
3. изменение параметров созданной очереди
4. добавление в очередь
5. удаление из очереди
6. уведомление о том, что очередь для сдачи ЛР подходит
7. подтверждение сдачи ЛР (другой пользователь может отметить сдавшего)
8. подписывание на создание очередей в определенной группе/потоке

## Требования к техническому обеспечению
Для использования ПО у пользователя веб-приложения должен быть установлен веб-браузер Google Chrome версии 88.0.4324.

## Риски
При создании ПО возможна частичная реализация его функциональности из-за нехватки времени, в этом случае следующие пункты могут быть не реализованы:
1. уведомление о том, что очередь для сдачи ЛР подходит
2. подписывание на создание очередей в определенной группе/потоке

### Риск 1

| Свойство       | Описание                             |
| ---------------|--------------------------------------|
| Приоритет      | 2                                    |
| Риск           | Заболеет один из членов команды      |
| Состояние      | Анализ                               |  
| Вероятность    | Средняя                              |  
| Урон           | Значительный                         | 
| Воздействие    | Высокое                              | 
| Тип стратегии  | Принятие                             | 
| Стратегия      | Другой член команды помогает сделать работу заболевшего| 
| Ответственный  | Кондрашова Ольга, Коротков Андрей, Шестовских Николай  | 


### Риск 2

| Свойство       | Описание                             |
| ---------------|--------------------------------------|
| Приоритет      | 1                                    |
| Риск           | Нехватка времени из-за нагруженности другими проектами|
| Состояние      | Анализ                               |  
| Вероятность    | Высокая                              |  
| Урон           | Значительный                         | 
| Воздействие    | Высокое                              | 
| Тип стратегии  | Принятие                             | 
| Стратегия      | Сокращение второстепенного функционала| 
| Ответственный  | Кондрашова Ольга, Коротков Андрей, Шестовских Николай  | 


### Риск 3

| Свойство       | Описание                             |
| ---------------|--------------------------------------|
| Приоритет      | 3                                    |
| Риск           | Взаимодействие с неизвестными технологиями|
| Состояние      | Анализ                               |  
| Вероятность    | Средняя                              |  
| Урон           | Низкий                               | 
| Воздействие    | Низкое                               | 
| Тип стратегии  | Понижение                            | 
| Стратегия      | Поиск в Google, вопросы к членам команды| 
| Ответственный  | Кондрашова Ольга, Коротков Андрей, Шестовских Николай  | 
