# Savon.by — Документация проекта для AI-агентов

> **Проект:** Статический сайт-визитка + каталог мыла ручной работы
> **Домен:** `https://savon.by/` (GitHub Pages → `https://r1f666.github.io/savon-by/`)
> **Репозиторий:** `https://github.com/r1f666/savon-by`
> **Технологии:** Чистый HTML5 + CSS3 + Vanilla JS, zero-build, статический деплой
> **Последнее обновление:** 2026-11-01

---

## 1. Структура проекта

```
savon-by/
├── index.html                    # Главная страница (hero + превью 3 товаров + блог + контакты)
├── catalog.html                  # Полный каталог (6 товаров с фильтрацией)
├── product-lav.html              # Детальная страница товара (план: product-hny, product-olv, product-alm, product-set, product-acc)
├── 404.html                      # Страница ошибки
├── blog/
│   ├── index.html                # Список статей блога
│   ├── article-1.html            # Как ухаживать за натуральным мылом
│   ├── article-2.html            # Подарочные наборы из мыла
│   └── article-3.html            # Натуральные масла для разных типов кожи
├── css/
│   └── style.css                 # Все стили (CSS custom properties, responsive, grid/flex)
├── js/
│   └── main.js                   # Фильтр каталога, аналитика целей (YM/GA placeholder)
├── img/
│   ├── apple-touch-icon.png      # Иконка для iOS
│   ├── og-image.png              # Open Graph изображение (1200x630)
│   └── products/                 # Изображения товаров
│       ├── lav/                  # Лавандовое мыло
│       │   ├── main-400.webp     # Превью (placeholder)
│       │   └── main-800.webp     # Высокое разрешение (placeholder)
│       ├── hny/                  # Медовое мыло
│       ├── olv/                  # Оливковое мыло
│       ├── alm/                  # Миндальное мыло
│       ├── set/                  # Подарочный набор
│       └── acc/                  # Мыльница/аксессуары
├── favicon.svg                   # SVG фавикон
├── site.webmanifest              # PWA manifest
├── sitemap.xml                   # SEO sitemap (6 URL)
├── robots.txt                    # Разрешение всем ботам
├── llm.txt                       # Документация для AI/LLM
├── CNAME                         # Домен: savon.by
├── _headers                      # Security headers + cache control
├── .github/
│   └── workflows/
│       └── pages.yml             # GitHub Actions: deploy on push to main
├── .gitignore                    # Исключает IDE, OS, SERVICE.STILANABELBY/
└── SERVICE.STILANABELBY/         # Другой проект (не отслеживается git)
```

---

## 2. Контактные данные и реквизиты

| Параметр | Значение |
|----------|----------|
| Телефон/Viber | `+375 29 649 87 75` |
| Email | `savonby@ya.ru` |
| Адрес | г. Минск, пр-т Дзержинского 131 |
| Способы заказа | Телефон/Viber, Email |
| Telegram | ❌ НЕ используется |
| Instagram | ❌ НЕ используется |

**Важно:** Все ссылки на Telegram/Instagram в коде — **устаревшие**. Заменить на Viber/Email.

---

## 3. Каталог товаров — контракт data-*

### 3.1 Список товаров

| Название | data-id | data-sku | data-cat | data-price |
|----------|---------|----------|----------|------------|
| Лавандовое мыло | `lav` | `1001` | `soap` | `15` |
| Медовое мыло | `hny` | `1002` | `soap` | `15` |
| Оливковое мыло | `olv` | `1003` | `soap` | `15` |
| Миндальное мыло | `alm` | `1004` | `soap` | `15` |
| Подарочный набор | `set` | `2001` | `set` | `45` |
| Мыльница / аксессуары | `acc` | `3001` | `acc` | `12` |

### 3.2 Обязательные атрибуты карточки

```html
<article class="card"
  data-id="lav"           <!-- латиница, уникальный ключ -->
  data-sku="1001"         <!-- строка цифр, диапазон: soap=1000-1999, set=2000-2999, acc=3000-3999 -->
  data-cat="soap"         <!-- enum: soap | set | acc -->
  data-name="Лавандовое мыло"  <!-- кириллица, для поиска/сортировки -->
  data-price="15"         <!-- число без "руб", пустое если "по запросу" -->
  data-tags="лаванда успокаивающее чувствительная-кожа"  <!-- пробелы -->
  data-img="/img/products/lav/main-400.webp"  <!-- путь к превью -->
  data-img-alt="Лавандовое мыло ручной работы">
```

### 3.3 Запрещено
- `data-sku` как число (должно быть строкой: `"1001"`, не `1001`)
- Кириллица в `data-id`
- `data-price="15 руб"` (только число)
- Пробелы в `data-sku`

### 3.4 Видимая разметка карточки (порядок)
1. `<a class="card__media" href="/product-<id>.html">` с `<img>`
2. `<p class="card__sku">Арт. <span data-sku-text>1001</span></p>`
3. `<h3><a href="/product-<id>.html">Название</a></h3>`
4. `<p>Краткое описание (1-2 строки)</p>`
5. `<p class="card__price">15 руб.</p>`
6. `<a class="btn btn--primary" href="viber://...">Заказать в Viber</a>`

### 3.5 Требования к `<img>`
- `src`, `srcset` (400w, 800w), `sizes="(max-width:620px) 100vw, 33vw"`
- `width="400" height="400"` (обязательно для CLS)
- `alt` — осмысленный, на русском
- `loading="lazy"` — для карточек ниже первого экрана
- `decoding="async"`
- Пути: `/img/products/<id>/<role>-<width>.<ext>`

### 3.6 Кнопка заказа
- Viber-ссылка: `viber://chat?number=%2B375296498775&text=Хочу заказать: {название} (арт. {sku})`
- `data-goal` — уникальная цель: `order_lav`, `order_hny`, `order_olv`, `order_alm`, `order_set`, `order_acc`

---

## 4. SEO и мета-данные

### 4.1 Canonical URLs
- Главная: `https://savon.by/`
- Каталог: `https://savon.by/catalog.html`
- Блог: `https://savon.by/blog/`
- Статьи: `https://savon.by/blog/article-1.html` и т.д.
- Товары: `https://savon.by/product-<id>.html`

### 4.2 Schema.org (JSON-LD)
- **Store** на главной: name, telephone, email, address, hasOfferCatalog
- **Product** на детальной странице: name, sku, description, offers (price, currency, availability, seller)
- **Article** на страницах блога: headline, datePublished, author, description

### 4.3 Open Graph
- `og:image`: `https://savon.by/img/og-image.png` (1200x630)
- `og:locale`: `ru_RU`
- `og:site_name`: `Savon.by`

---

## 5. Сортировка и поиск (JS-контракт)

### 5.1 Фильтр (main.js)
- Использует `data-cat` + `card.hidden`
- Фильтры: `all`, `soap`, `set`, `acc`

### 5.2 Сортировка (catalog.js — план)
- По цене: `Number(card.dataset.price)`
- По названию: `card.dataset.name.localeCompare('ru')`
- По артикулу: `Number(card.dataset.sku)`
- По новинкам: `card.dataset.date` (YYYY-MM-DD)

### 5.3 Поиск (catalog.js — план)
```javascript
const searchable = (card.dataset.name + ' ' + card.dataset.tags + ' ' + card.dataset.sku).toLowerCase();
searchable.includes(term.toLowerCase());
```

**Важно:** Ни одно поле не вычисляется из других в JS.

---

## 6. Изображения товаров

### 6.1 Структура папок
```
img/products/<id>/
├── main-400.webp    # Превью (обязательно)
├── main-800.webp    # Высокое разрешение (обязательно)
└── main-1200.webp   # Для OG/детальной страницы (план)
```

### 6.2 Формат
- **WebP** — обязательный формат
- JPG — только фолбэк, если WebP недоступен
- Оригиналы > 1200px **не коммитить**

### 6.3 Placeholder-файлы
Созданы placeholder-файлы (текстовые .webp) в `/img/products/*/main-400.webp` и `main-800.webp`. Заменить на реальные фото.

---

## 7. GitHub Pages — деплой

### 7.1 GitHub Actions
- Файл: `.github/workflows/pages.yml`
- Триггер: push на `main`
- Артефакт: весь репозиторий (`path: "."`)
- Исключён `SERVICE.STILANABELBY/` из отслеживания git

### 7.2 DNS (domain.by)
4 A-записи для `savon.by`:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 7.3 CNAME
Файл `CNAME` в корне: `savon.by`

---

## 8. CSS — система переменных

```css
:root {
  --chalk: #F6F7F3;   /* фон */
  --white: #fff;
  --ink: #22302A;     /* текст */
  --muted: #55645B;   /* приглушённый текст */
  --line: #DADFD6;    /* границы */
  --sage: #DCE6DA;    /* акцент секций */
  --green: #2F4A3A;   /* основной цвет (кнопки, заголовки) */
  --lav: #A58FCB;     /* лаванда (акцент) */
  --honey: #E3A72F;   /* мёд (акцент) */
  --r: 14px;          /* border-radius */
  --font: 'Onest', system-ui, sans-serif;
  --head: 'Philosopher', Georgia, serif;
}
```

### 8.1 Ключевые классы
- `.wrap` — контейнер (max-width: 1120px, margin-inline: auto)
- `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--small`, `.btn--light`, `.btn--outline`
- `.card`, `.card__media`, `.card__img`, `.card__sku`, `.card__body`, `.card__price`
- `.chips`, `.chip` — фильтр каталога
- `.grid` — сетка товаров (3 колонки → 2 → 1)
- `.breadcrumbs`, `.breadcrumbs__sep`, `.breadcrumbs__current`
- `.blog-card`, `.blog-card__excerpt`, `.blog-card__link`
- `.product-card`, `.product-card__image`, `.product-card__body`, `.product-card__section`
- `.dock` — нижняя навигация (мобильная)

### 8.2 Адаптивность
- `@media (max-width: 900px)` — 2 колонки, скрытое меню
- `@media (max-width: 620px)` — 1 колонка, dock-навигация

---

## 9. JS — main.js

```javascript
// Инициализация
document.documentElement.classList.add('js');

// Динамический год в футере
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Фильтр каталога (chips → cards)
// data-filter="all|soap|set|acc" → card.hidden

// Аналитика целей
// data-goal="order_lav" → window.ym(YM_ID, 'reachGoal', goal)
// data-goal="order_lav" → window.gtag('event', goal)
```

### 9.1 Placeholder для аналитики
```javascript
var YM_ID = 0;  // Вставить номер Яндекс.Метрики
```

---

## 10. Файлы для создания (план)

| Файл | Статус | Описание |
|------|--------|----------|
| `product-hny.html` | ❌ План | Медовое мыло (арт. 1002) |
| `product-olv.html` | ❌ План | Оливковое мыло (арт. 1003) |
| `product-alm.html` | ❌ План | Миндальное мыло (арт. 1004) |
| `product-set.html` | ❌ План | Подарочный набор (арт. 2001) |
| `product-acc.html` | ❌ План | Мыльница (арт. 3001) |
| `blog/article-4.html` | ❌ План | Следующая статья блога |
| `products.json` | ❌ План | JSON-список товаров (отдельная задача) |

---

## 11. Правила для AI-агентов

### 11.1 Запрещено
- ❌ Добавлять сборщики/зависимости (npm, webpack, и т.д.)
- ❌ Менять `data-id`/`data-sku` существующих товаров
- ❌ Выдумывать новые товары сверх списка (раздел 3.1)
- ❌ Коммитить/пушить без запроса
- ❌ Рефакторить `style.css` целиком — только точечные классы
- ❌ Создавать `products.json` (это план, отдельная задача)
- ❌ Трогать `.github/workflows/pages.yml` без согласования
- ❌ Использовать Telegram/Instagram ссылки — только Viber/Email

### 11.2 Обязательно
- ✅ Сохранять UTF-8 кодировку, только кириллица в видимом тексте
- ✅ Синхронизировать `data-id`/`data-sku` между `catalog.html` и `index.html`
- ✅ Не ломать фильтр в `js/main.js` (data-cat + card.hidden)
- ✅ Обновлять `sitemap.xml` при появлении новых страниц
- ✅ Обновлять `llm.txt` при изменениях структуры
- ✅ Использовать `viber://chat?number=%2B375296498775` для заказов
- ✅ Включать артикул в Viber-ссылку: `text=Хочу заказать: {название} (арт. {sku})`
- ✅ Валидный HTML (открывается, не ломает сетку .grid)

### 11.3 Конвенции именования
- `data-id`: латиница, нижний регистр, краткий (`lav`, `hny`, `olv`, `alm`, `set`, `acc`)
- `data-sku`: строка цифр, 4 символа
- Файлы: kebab-case (`product-lav.html`, `style.css`)
- Папки: lowercase (`blog/`, `css/`, `js/`, `img/`)

---

## 12. Быстрый чек-лист перед коммитом

- [ ] Все ссылки на Telegram/Instagram заменены на Viber/Email
- [ ] Viber-ссылки содержат артикул в text=
- [ ] data-id/data-sku уникальны и соответствуют таблице (раздел 3.1)
- [ ] data-sku — строка цифр, не число
- [ ] data-price — число, не "15 руб"
- [ ] <img> имеет src, srcset, sizes, width, height, alt, loading, decoding
- [ ] Ссылки ведут на /product-<id>.html (обе: обёртка и h3)
- [ ] Видимый артикул «Арт. 1001» присутствует
- [ ] Русский текст читается, нет кракозябр
- [ ] Валидный HTML, сетка не сломана
- [ ] sitemap.xml обновлён при добавлении страниц
- [ ] llm.txt обновлён при изменениях структуры

---

## 13. Полезные ссылки

- **GitHub:** https://github.com/r1f666/savon-by
- **GitHub Pages:** https://r1f666.github.io/savon-by/
- **Домен:** https://savon.by/
- **Viber:** +375 29 649 87 75
- **Email:** savonby@ya.ru
- **Регистратор:** https://domain.by/

---

*Документ создан для обеспечения консистентности при работе с проектом различными AI-агентами.*
