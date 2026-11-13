# Savon.by — Документация проекта для AI-агентов

> **Проект:** Статический сайт-визитка + каталог мыла ручной работы
> **Домен:** `https://savon.by/` (GitHub Pages → `https://r1f666.github.io/savon-by/`)
> **Репозиторий:** `https://github.com/r1f666/savon-by`
> **Технологии:** Jekyll 4.3, Ruby 3.2, GitHub Pages, zero-build deploy
> **Последнее обновление:** 2026-11-13

---

## 1. Структура проекта (Jekyll)

```
savon-by/
├── _config.yml                   # Конфигурация Jekyll (title, url, plugins)
├── Gemfile                       # Ruby-зависимости (jekyll, minima, plugins)
├── index.html                    # Главная страница (layout: default)
├── catalog.html                  # Каталог (layout: default)
├── product-lav.html              # Детальная страница товара (layout: default)
├── 404.html                      # Страница ошибки (статическая)
├── _layouts/
│   ├── default.html              # Базовый layout (header, nav, footer, dock)
│   └── post.html                 # Layout для статей блога
├── _posts/                       # Markdown-статьи блога
│   ├── 2026-11-13-chto-delat-esli-mylo-zaplakalo.md
│   ├── 2026-10-15-kak-uhazhivat-za-naturalnym-myлом.md
│   ├── 2026-09-20-podarochnye-nabory-iz-myla.md
│   └── 2026-08-10-naturalnye-masla-dlya-raznyh-tipov-kozhi.md
├── blog/
│   └── index.html                # Blog listing (Liquid: {% for post in site.posts %})
├── css/
│   └── style.css                 # Все стили (CSS custom properties, responsive)
├── js/
│   └── main.js                   # Фильтр каталога, аналитика целей
├── img/
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   └── products/
│       ├── lav/
│       │   ├── main-400.webp
│       │   └── main-800.webp
│       ├── hny/
│       ├── olv/
│       ├── alm/
│       ├── set/
│       └── acc/
├── favicon.svg
├── site.webmanifest
├── robots.txt
├── _headers                      # Security headers + cache control
├── CNAME                         # Домен: savon.by
├── llm.txt                       # Документация для AI/LLM
├── .github/
│   └── workflows/
│       └── pages.yml             # GitHub Actions: Ruby setup → jekyll build → deploy
├── .gitignore                    # Исключает _site/, .jekyll-cache/, Gemfile.lock
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
1. `<a class="card__media" href="/product-<id>/">` с `<img>`
2. `<p class="card__sku">Арт. <span data-sku-text>1001</span></p>`
3. `<h3><a href="/product-<id>/">Название</a></h3>`
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

### 4.1 Canonical URLs (Jekyll permalinks)
- Главная: `https://savon.by/`
- Каталог: `https://savon.by/catalog/`
- Блог: `https://savon.by/blog/`
- Статьи: `https://savon.by/blog/<slug>/` (Jekyll генерирует папки)
- Товары: `https://savon.by/product-<id>/`

### 4.2 Schema.org (JSON-LD)
- **Store** на всех страницах: name, telephone, email, address, hasOfferCatalog
- **Product** на детальной странице: name, sku, description, offers (price, currency, availability, seller)
- **Article** на страницах блога: headline, datePublished, author, description

### 4.3 Open Graph
- `og:image`: `https://savon.by/img/og-image.png` (1200x630)
- `og:locale`: `ru_RU`
- `og:site_name`: `Savon.by`

---

## 5. Jekyll — архитектура

### 5.1 Layouts
- `_layouts/default.html` — базовый layout с header, nav, footer, dock
- `_layouts/post.html` — наследует default, добавляет breadcrumbs + CTA

### 5.2 Blog
- Статьи в `_posts/` в формате `YYYY-MM-DD-slug.md`
- Blog listing в `blog/index.html` с Liquid: `{% for post in site.posts %}`
- Автоматическая генерация RSS через `jekyll-feed`
- Автоматическая генерация sitemap через `jekyll-sitemap`

### 5.3 Plugins
- `jekyll-feed` — генерация RSS
- `jekyll-sitemap` — генерация sitemap.xml
- `jekyll-seo-tag` — SEO мета-теги
- `minima` — базовая тема (отключена, используем custom layouts)

### 5.4 CSS
- Стили в `css/style.css` (не в `_sass/`, для простоты)
- CSS custom properties в `:root`
- Responsive: `@media (max-width: 900px)` и `@media (max-width: 620px)`

### 5.5 JS
- `js/main.js` — фильтр каталога, аналитика целей
- Подключается через `<script src="/js/main.js" defer></script>`

---

## 6. Сортировка и поиск (JS-контракт)

### 6.1 Фильтр (main.js)
- Использует `data-cat` + `card.hidden`
- Фильтры: `all`, `soap`, `set`, `acc`

### 6.2 Сортировка (catalog.js — план)
- По цене: `Number(card.dataset.price)`
- По названию: `card.dataset.name.localeCompare('ru')`
- По артикулу: `Number(card.dataset.sku)`
- По новинкам: `card.dataset.date` (YYYY-MM-DD)

### 6.3 Поиск (catalog.js — план)
```javascript
const searchable = (card.dataset.name + ' ' + card.dataset.tags + ' ' + card.dataset.sku).toLowerCase();
searchable.includes(term.toLowerCase());
```

**Важно:** Ни одно поле не вычисляется из других в JS.

---

## 7. Изображения товаров

### 7.1 Структура папок
```
img/products/<id>/
├── main-400.webp    # Превью (обязательно)
├── main-800.webp    # Высокое разрешение (обязательно)
└── main-1200.webp   # Для OG/детальной страницы (план)
```

### 7.2 Формат
- **WebP** — обязательный формат
- JPG — только фолбэк, если WebP недоступен
- Оригиналы > 1200px **не коммитить**

### 7.3 Placeholder-файлы
Созданы placeholder-файлы (текстовые .webp) в `/img/products/*/main-400.webp` и `main-800.webp`. Заменить на реальные фото.

---

## 8. GitHub Pages — деплой

### 8.1 GitHub Actions
- Файл: `.github/workflows/pages.yml`
- Триггер: push на `main`
- Steps:
  1. `actions/checkout@v4`
  2. `ruby/setup-ruby@v1` → `bundler-cache: true`
  3. `actions/jekyll-build-pages@v1` → `source: ./`, `destination: ./_site`
  4. `actions/upload-pages-artifact@v3` → `path: ./_site`
  5. `actions/deploy-pages@v4`

### 8.2 DNS (domain.by)
4 A-записи для `savon.by`:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 8.3 CNAME
Файл `CNAME` в корне: `savon.by`

---

## 9. CSS — система переменных

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

### 9.1 Ключевые классы
- `.wrap` — контейнер (max-width: 1120px, margin-inline: auto)
- `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--small`, `.btn--light`, `.btn--outline`
- `.card`, `.card__media`, `.card__img`, `.card__sku`, `.card__body`, `.card__price`
- `.chips`, `.chip` — фильтр каталога
- `.grid` — сетка товаров (3 колонки → 2 → 1)
- `.breadcrumbs`, `.breadcrumbs__sep`, `.breadcrumbs__current`
- `.blog-card`, `.blog-card__excerpt`, `.blog-card__link`
- `.dock` — нижняя навигация (мобильная)

### 9.2 Адаптивность
- `@media (max-width: 900px)` — 2 колонки, скрытое меню
- `@media (max-width: 620px)` — 1 колонка, dock-навигация

---

## 10. JS — main.js

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

### 10.1 Placeholder для аналитики
```javascript
var YM_ID = 0;  // Вставить номер Яндекс.Метрики
```

---

## 11. Правила для AI-агентов

### 11.1 Запрещено
- ❌ Коммитить оригиналы изображений > 1200px
- ❌ Менять `data-id`/`data-sku` существующих товаров
- ❌ Выдумывать новые товары сверх списка (раздел 3.1)
- ❌ Коммитить/пушить без запроса
- ❌ Рефакторить `style.css` целиком — только точечные классы
- ❌ Трогать `.github/workflows/pages.yml` без согласования
- ❌ Использовать Telegram/Instagram ссылки — только Viber/Email
- ❌ Создавать файлы вне `_posts/` для блога

### 11.2 Обязательно
- ✅ Сохранять UTF-8 кодировку, только кириллица в видимом тексте
- ✅ Синхронизировать `data-id`/`data-sku` между `catalog.html` и `index.html`
- ✅ Не ломать фильтр в `js/main.js` (data-cat + card.hidden)
- ✅ Использовать `viber://chat?number=%2B375296498775` для заказов
- ✅ Включать артикул в Viber-ссылку: `text=Хочу заказать: {название} (арт. {sku})`
- ✅ Валидный HTML (открывается, не ломает сетку .grid)
- ✅ Использовать Jekyll-конвенции: `_layouts/`, `_posts/`, `blog/index.html`

### 11.3 Конвенции именования
- `data-id`: латиница, нижний регистр, краткий (`lav`, `hny`, `olv`, `alm`, `set`, `acc`)
- `data-sku`: строка цифр, 4 символа
- Файлы: kebab-case (`product-lav.html`, `style.css`)
- Папки: lowercase (`blog/`, `css/`, `js/`, `img/`)
- Статьи: `YYYY-MM-DD-slug.md` в `_posts/`

---

## 12. Быстрый чек-лист перед коммитом

- [ ] Все ссылки на Telegram/Instagram заменены на Viber/Email
- [ ] Viber-ссылки содержат артикул в text=
- [ ] data-id/data-sku уникальны и соответствуют таблице (раздел 3.1)
- [ ] data-sku — строка цифр, не число
- [ ] data-price — число, не "15 руб"
- [ ] <img> имеет src, srcset, sizes, width, height, alt, loading, decoding
- [ ] Ссылки ведут на /product-<id>/ (Jekyll permalinks)
- [ ] Видимый артикул «Арт. 1001» присутствует
- [ ] Русский текст читается, нет кракозябр
- [ ] Валидный HTML, сетка не сломана
- [ ] Статьи в `_posts/` с правильным YAML-фронтматтом
- [ ] Не коммитить оригиналы изображений > 1200px

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
*Миграция на Jekyll завершена: 2026-11-13*
