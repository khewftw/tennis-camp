# Промпты для картинок и видео

Под Nano Banana / Gemini (картинки) и Google Flow (видео). Промпты на английском — так модели точнее.

## Общие правила серии

Чтобы все картинки выглядели как одна фотосессия, в каждом промпте есть одинаковый стилевой хвост (`STYLE`). Не выкидывай его.

```
STYLE: editorial sports photography for a Moscow tennis coaching brand, late summer, shot on Sony A7 IV, Kodak Portra 400 color grade with slightly lifted blacks and fine film grain, true-to-life skin texture with pores and light sweat, adult amateur players aged 28–45 with Eastern European appearance, plain unbranded sportswear in white, black, navy and muted grey with no logos or text, cobalt-blue hard court with crisp white lines, optic-yellow tennis balls as the only saturated accent, natural candid moments, no posing to camera
```

Цвета бренда в кадре: синий корт, белые линии, жёлтые мячи. Одежда нейтральная. Так фото сядут на палитру сайта без цветокоррекции.

Тренер: его лицо не генерируем. Для кадров с тренером загружаешь его реальное фото как референс (Nano Banana держит лицо по референсу). Отзывы с фото — только реальные люди.

Пост-обработка: всё в webp, hero 2400px по ширине, карточки 1200px, галерея 1200px. Вырезку игрока — PNG → webp с альфой.

---

## 01. Hero desktop — `hero-desktop.webp`, 16:9

```json
{
  "file": "hero-desktop.webp",
  "aspect_ratio": "16:9",
  "subject": "close-up of a tennis player's white sneakers mid-step on the baseline of a cobalt-blue hard court, one optic-yellow ball rolling near the white line",
  "scene": "outdoor city court in Moscow, blurred silhouettes of residential high-rises and trees behind the fence",
  "camera": "ground-level angle, 35mm, f/2, focus on shoe and ball, background in heavy bokeh",
  "lighting": "low golden-hour sun from back-left, long shadows across the court, warm rim light on shoe edges, 4500K",
  "composition": "subject in lower right third, large calm negative space in upper and central area for a big headline, overall darker exposure (-0.7 EV) for text overlay",
  "avoid": ["logos on shoes", "text", "faces", "oversaturated blue", "HDR look", "plastic CGI surface"],
  "final_prompt": "Ground-level 35mm photograph of a tennis player's plain white sneakers mid-step on the white baseline of a cobalt-blue outdoor hard court in Moscow, a single optic-yellow tennis ball rolling beside the line, shallow depth of field f/2 with residential high-rises, trees and a chain-link fence dissolving into soft bokeh, low golden-hour sun from back-left casting long shadows across the textured acrylic court surface, warm rim light on the shoe edges, subject in the lower right third, wide calm negative space above and in the center, exposure slightly underexposed for headline overlay, fine dust particles in the light, visible grain of the court surface, STYLE"
}
```

## 02. Hero mobile — `hero-mobile.webp`, 9:16

```json
{
  "file": "hero-mobile.webp",
  "aspect_ratio": "9:16",
  "final_prompt": "Vertical 9:16 low-angle photograph from the court surface looking up at an adult male amateur tennis player tossing a ball for a serve, cobalt-blue hard court with white lines in the foreground bottom quarter, optic-yellow ball at the top of the toss against an evening Moscow sky with warm orange-to-pale-blue gradient, player's figure in the lower half, racket behind back, plain white t-shirt and black shorts with no logos, 28mm lens f/4, sun low behind the player creating strong rim light and a slight lens flare, large empty sky area in the upper-middle for headline text, slightly underexposed for text overlay, STYLE"
}
```

## 03. Видео для hero — `hero.mp4`, 16:9, 6–8 сек, Google Flow

```
Slow-motion cinematic loop, ground-level camera slowly dollying forward along the white baseline of a cobalt-blue outdoor hard court at golden hour in Moscow, an optic-yellow tennis ball bounces into frame, lands on the line kicking up a tiny puff of dust and rolls out of frame, a player's white sneakers step in and out of focus in the background, long warm shadows, soft bokeh of trees and apartment buildings behind the fence, Kodak Portra film grade, fine grain, 50fps slowed to 24fps, seamless loop, no text, no logos, calm and dark enough for headline overlay
```

## 04. Игрок-вырезка — `player-cutout.webp`, 3:4

Генерируешь на чистом чёрном фоне, потом вырезаешь (remove.bg или Photoshop). Для блока «Форматы», по центру тёмной секции.

```json
{
  "file": "player-cutout.webp",
  "aspect_ratio": "3:4",
  "final_prompt": "Full-body studio sports photograph of an athletic adult male amateur tennis player, around 32, mid forehand swing with body rotated and racket just after contact, determined focused expression, short dark hair, plain navy t-shirt, white shorts, white sneakers, no logos, isolated on a pure seamless black background, hard white rim light from both sides outlining the silhouette and racket, soft key light from front-left at 45 degrees, visible fabric wrinkles and sweat on forearms, 70mm lens f/8, sharp from head to toe, a single optic-yellow tennis ball frozen near the racket strings, clean edges suitable for cutout, STYLE"
}
```

## 05–08. Форматы — 4:5

`format-solo.webp`
```
Candid 4:5 photograph of a tennis coach feeding a ball from a wire ball basket to an adult woman student around 30 practicing a forehand on a cobalt-blue outdoor hard court, coach in the foreground slightly out of focus seen from behind shoulder, student sharp in the midground mid-swing with concentration on her face, optic-yellow balls scattered on the court, late afternoon side light, 50mm f/2.8, STYLE
```

`format-pair.webp`
```
Candid 4:5 photograph of two adult friends, a man and a woman around 35, high-fiving over the tennis net after a rally on a cobalt-blue outdoor hard court, genuine laughter, rackets in hands, sweat on foreheads, shot from the side at net height, background trees and fence softly blurred, warm evening light, 50mm f/2.5, motion slightly caught in hands, STYLE
```

`format-group.webp`
```
Candid 4:5 photograph of a small group of four adult amateur tennis players aged 28–45 doing a volley drill at the net on a cobalt-blue hard court, yellow training cones and a ball basket on the court, coach's arm pointing into frame from the edge, players in different moments of the drill, natural uneven spacing, overcast soft daylight, 35mm f/4, STYLE
```

`format-camp.webp`
```
Candid 4:5 photograph of eight adult tennis players at the end of a camp day sitting and standing near the net on a cobalt-blue outdoor court at sunset, towels on shoulders, water bottles, someone laughing mid-sentence, relaxed tired happy mood, warm backlight with lens flare, silhouettes partially rim-lit, 35mm f/2.8, STYLE
```

## 09–10. Кэмпы — 4:3

`camp-moscow.webp`
```
Wide 4:3 photograph of an adult tennis camp in Moscow: several courts side by side on a cobalt-blue hard surface, groups of amateur players drilling on each court, coaches feeding balls, ball baskets and cones, Moscow residential towers and green park trees in the distance, high vantage point from a stadium stand or small tower, clear late-summer morning light, 35mm f/5.6, STYLE
```

`camp-away.webp`
```
Wide 4:3 photograph of an outdoor red clay tennis court at a southern resort, mountains covered with green forest in the background, a few palm trees and cypress trees along the fence, adult amateur players mid-rally, clay dust rising from a sliding step, warm soft morning sunlight, 35mm f/5.6, plain unbranded sportswear, optic-yellow balls, film grain, no logos, no text
```

## 11. Тренер в деле — `coach-action.webp`, 4:5 (с референсом)

Прикладываешь 2–3 реальных фото тренера.

```
Use the attached reference photos of the coach and keep his face, hairstyle and body type identical. Candid 4:5 editorial photograph of this coach on a cobalt-blue outdoor hard court explaining a forehand grip to an adult student, holding the student's racket and showing the grip with his hand, smiling while talking, coach sharp in focus, student partially out of frame on the left, plain black t-shirt with no logos, afternoon side light, 50mm f/2, STYLE
```

Для главного фото тренера в блоке «Тренер» лучше живая фотосессия. Если её нет — тот же промпт, но портрет по пояс, взгляд в сторону, ракетка на плече.

## 12. Фон отзывов — `reviews-bg.webp`, 16:9

```
Moody 16:9 photograph of an empty cobalt-blue outdoor hard court at blue hour, net in the midground, court floodlights just switched on creating soft pools of warm light, a few optic-yellow balls resting near the net, city lights of Moscow blurred in the background, low-contrast dark image suitable for text overlay, 35mm f/2.8, fine grain, no people, no text
```

## 13. Текстура корта — `court-texture.webp`, 16:9

Для фонов, промо-плашек, креативов.

```
Top-down flat-lay macro photograph of a cobalt-blue acrylic hard court surface with visible sandy micro-texture, a crisp white painted line crossing diagonally from lower left to upper right, a single optic-yellow tennis ball in the upper right third casting a soft shadow, even soft daylight, no perspective distortion, 50mm macro f/8, subtle wear on the paint line
```

## 14–19. Галерея — 1:1 или 4:5

`gallery-01.webp` — `Extreme close-up of tennis racket strings with an optic-yellow ball pressed into them at the moment of impact, strings deformed, fuzz fibers of the ball visible, blurred cobalt-blue court behind, 100mm macro f/4, fast shutter, STYLE`

`gallery-02.webp` — `Ground-level macro photograph of an optic-yellow tennis ball touching the white line on a cobalt-blue hard court, tiny puff of dust, razor-thin depth of field, low sun from the side, 100mm macro f/2.8, STYLE`

`gallery-03.webp` — `Wire basket full of optic-yellow tennis balls standing at the net post on a cobalt-blue court, net shadow pattern on the ground, late afternoon hard light, 35mm f/4, STYLE`

`gallery-04.webp` — `Silhouette of a tennis net and posts against a warm orange sunset sky over Moscow residential buildings, court in shadow, a few balls on the ground, 35mm f/5.6, STYLE`

`gallery-05.webp` — `Indoor tennis hall in winter with a cobalt-blue hard court under bright white LED lights, two adult players rallying, large windows with snow outside, high vantage point, 28mm f/4, STYLE`

`gallery-06.webp` — `Candid group photo of adult tennis camp participants laughing on the court at sunset, some holding rackets up, arms around each other, slight motion blur, warm backlight, 35mm f/2.8, STYLE`

---

## 20. Креативы под рекламу

Текст на картинку не просим у модели. Генерируем фото с пустой зоной под текст, текст ставим в Figma шрифтами сайта (Unbounded + Onest, ball на ink).

Требования площадок (проверь актуальные в кабинетах перед заливкой):
- Яндекс.Директ: 1:1 (от 450×450) и 16:9 (от 1080×607)
- VK Ads: 1:1, 4:5, 9:16

`ad-square-camp` (1:1, пустая зона слева)
```
Square 1:1 photograph of an adult amateur tennis player around 35 hitting a backhand on a cobalt-blue outdoor hard court at golden hour, player positioned in the right third, left half of the frame is clean cobalt-blue court surface with one white line, suitable for placing a headline, strong warm rim light, optic-yellow ball near the racket, 50mm f/2.8, STYLE
```

`ad-story-lesson` (9:16, пустая зона сверху и снизу)
```
Vertical 9:16 photograph shot from above at 45 degrees of a tennis coach's hand holding out a racket and an optic-yellow ball towards the viewer, point-of-view invitation gesture, cobalt-blue hard court with white lines filling the background, top third and bottom quarter of the frame calm and uncluttered for text, soft evening light, 35mm f/4, STYLE
```

`ad-feed-pair` (4:5)
```
Vertical 4:5 photograph of two adult friends walking off a cobalt-blue tennis court after a match, rackets over shoulders, one laughing and pointing back at the court, shot from behind at a slight angle, warm sunset backlight, upper third calm sky for text, 35mm f/2.8, STYLE
```

`ad-wide-direct` (16:9)
```
Wide 16:9 photograph of a cobalt-blue outdoor hard court in Moscow at golden hour, an adult amateur player in the right third mid-forehand, left 55% of the frame clean court and soft blurred trees for a headline, optic-yellow ball in the air, 35mm f/4, STYLE
```

---

## Чек после генерации

- Руки и пальцы на ракетке (главный брак у генераторов) — перегенерируй кадр, если пальцев не пять или хват неестественный.
- Струны и сетка: без каши и лишних ячеек.
- Никаких логотипов на одежде и обуви.
- Мяч жёлтый, а не зелёный и не лаймовый.
- Синий корт один и тот же оттенок по всей серии. Если уплыл — подтяни в Lightroom по HSL.
