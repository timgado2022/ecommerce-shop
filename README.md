# Armenian Home Store 

## Project Progress 

07.03.2023 - created this project, added nest.js, prisma. In prisma added the User model, also said to work Beekeeper Studio to connect it to PostgreSQL. Ended the day with the fact that it failed to connect to PostgreSQL. 


08.03.2023 - started fixing my mistake, it turns out that when I downloaded postgres to windows, I put it on port 5000, not 5432, this was my mistake, and then when I corrected it, everything worked, and beekeeper studio created me a table with the data that I had in schema.prisma, also today added auth, in auth.controller. ts(in the folder auth) added @Post inside which register, which returns this.authService.register(), and in auth.service. ts wrote the logic itself register, which returns name: "example_name", also to check if the request went through, I connected insomnia, added there folder auth and inside this folder there are 3 posts with names: auth/login/access-token; auth/register/auth/login, worked today with auth/register, I wrote in json folder: {test values email and password}, and in environment wrote url, where the link to the site is(localhost:4200/api) and token, fixed the errors and everything worked for me(in preview the logic that I wrote in auth.servise.ts(to have it return me name)                        



(ru: 



07.03.2023 - создала данный проект, добавила в него nest.js, prisma. В prisma добавила модель User, также сказала для работы Beekeeper Studio, чтобы соединить его с PostgreSQL. Закончила этот день на том, что не удалось соединиться с PostgreSQL. 
08.03.2023 - начала устранять свою ошибку, оказывается, когда я скачивала postgres на windows, я его поставила на порту 5000, а не на 5432, в этом была моя ошибка, и тогда, когда я ее исправила, у меня все заработало, и beekeeper studio создала мне таблицу с данными, которые были у меня в schema.prisma, также сегодня добавила auth, в auth.controller.ts(в папке auth) добавила @Post внутри которого register, который возвращает this.authService.register(), а в auth.service.ts написана сама логика register, который возвращает name: "example_name", также чтобы проверить прошел ли запрос, я подключила insomnia, добавила там папку auth и внутри этой папки есть 3 post с названиями: auth/login/access-token; auth/register/auth/login, работала сегодня с auth/register, написала в json папке: {тестовые значения email и password}, а в environment написала url, там, где находится ссылка на сайт(localhost:4200/api) и token, устранила ошибки и у меня все заработало(в preview высветилось логика, которую я написала в auth.servise.ts(чтобы он мне вернул name)


)

