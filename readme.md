Напишите EventEmitter в виде "напоминалки" событий, к​оторая имеет следующий функционал:
 
1. Можно добавлять/удалять события:
 
                ...
                                addEvent('Встреча', ’14.09.17 09:00’); // в конкретную дату и время
                ...
                                addEvent(‘День космонавтики’, ’12.04’); // каждый год
                …
                                removeEvent(‘День карася');
                …

                …
2. На каждое событие можно подписаться/отписаться. Во время подписки можно указать время напоминания до события (например, за 2 дня). Праздники по умолчанию напоминаются в 09:00 (а не в 00:00). 

...
.subscribe('Новый год', function(){
alert('Всех с Новым Годом!');
});
...
.subscribe('День космонавтики', function(){
console.log('Приготовить речь ко дню космонавтики');
}, 2); // за два дня
.subscribe('День космонавтики', function(){
console.log('Купить скафандр');
}, 7); // нотификация за неделю
.unsubscibe('Новый год'); // удалили событие
...

3. Если зашли позже нотификации (т.е. есть пропущенные) - должно выдавать сообщение 

    "Пропущенные события:"
    
        'Поход в магазин' - 12.10.16 16:00
        'День рожденья Барсика' - 10.10

4. Данные должны где то храниться (например, localStorage)

5. Когда наступает реальная дата события, напоминать точно в указанную дату и в указанное время всех подписчиков
6. Реализация может быть ваша (вверху примеры написаны для наглядности)
 
Уровень 2:
                Уровень 1 + Создать UI для пользования (ваша фантазия), с помощью которого можно добавлять/удалять активности, отображать напоминания