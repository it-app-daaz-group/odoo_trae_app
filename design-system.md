# 📘 Design System Documentation

**Theme:** Blue & Slate Professional Dashboard
**Stack Target:** Next.js + Tailwind CSS + Component-based Architecture

---

# 1. 🎯 Design Principles

### 1.1 Core Values

* **Clarity First** → Informasi harus cepat terbaca
* **Efficiency** → UI fokus ke task management / dashboard usage
* **Consistency** → Semua komponen pakai token design system
* **Professional Tone** → warna clean, minim visual noise

### 1.2 Interaction Principles

* Semua elemen interaktif punya:

  * hover state
  * active state
  * focus ring
* Feedback visual maksimal < 150ms

---

# 2. 🎨 Color System

## 2.1 Primary Palette – Blue

| Token    | Hex     | Usage                   |
| -------- | ------- | ----------------------- |
| blue-50  | #EFF6FF | background hover ringan |
| blue-100 | #DBEAFE | card highlight          |
| blue-500 | #3B82F6 | secondary action        |
| blue-600 | #2563EB | primary button          |
| blue-700 | #1D4ED8 | hover primary           |
| blue-900 | #1E3A8A | heading accent          |

👉 Rules:

* Primary button = blue-600
* Hover primary = blue-700
* Background selected item = blue-50

---

## 2.2 Neutral – Slate

| Token     | Hex     | Usage          |
| --------- | ------- | -------------- |
| slate-50  | #F8FAFC | page bg        |
| slate-100 | #F1F5F9 | card bg        |
| slate-300 | #CBD5E1 | border         |
| slate-500 | #64748B | secondary text |
| slate-700 | #334155 | body text      |
| slate-900 | #0F172A | heading        |

---

## 2.3 Semantic Colors

| Type    | Hex     |
| ------- | ------- |
| Success | #10B981 |
| Warning | #FACC15 |
| Danger  | #EF4444 |

---

# 3. ✍️ Typography

## Font

Primary Font: **Inter**

## Type Scale

| Style   | Size | Weight |
| ------- | ---- | ------ |
| Display | 36px | 700    |
| H1      | 32px | 700    |
| H2      | 24px | 600    |
| H3      | 20px | 600    |
| Body    | 16px | 400    |
| Small   | 14px | 400    |
| Tiny    | 12px | 500    |

Rules:

* Line height = 1.5
* Heading spacing = 0.02em

---

# 4. 📐 Spacing & Layout

## Grid System

* Base unit = **8px**
* Padding:

  * card = 24px
  * section = 32px
* gap antar element:

  * small = 8px
  * medium = 16px
  * large = 24px

---

## Container Width

| Device  | Max Width |
| ------- | --------- |
| Desktop | 1280px    |
| Tablet  | 768px     |
| Mobile  | 100%      |

---

# 5. 🧩 Component System

---

## 5.1 Button

### Radius

```
border-radius: 8px
```

### Height

| Size | Height |
| ---- | ------ |
| sm   | 32px   |
| md   | 40px   |
| lg   | 48px   |

### Padding

```
px-4 py-2
```

### Variants

| Type      | Style                  |
| --------- | ---------------------- |
| Primary   | bg-blue-600 text-white |
| Secondary | border slate-300       |
| Ghost     | transparent            |

### State

* hover → blue-700
* active → scale 0.98
* focus → ring-blue-500

---

## 5.2 Input Field

```
border-radius: 8px
height: 40px
padding: 12px 16px
border: slate-300
```

Focus:

```
border-blue-600
ring-2 blue-100
```

Disabled:

```
bg-slate-100
text-slate-400
```

---

## 5.3 Badge

```
radius: 999px
padding: 4px 8px
font-size: 12px
```

Variants:

* primary
* success
* warning
* error
* neutral

---

## 5.4 Card

```
background: white
border: slate-200
radius: 12px
padding: 24px
shadow: sm
```

---

## 5.5 Table

Header:

```
font-weight: 600
background: slate-50
```

Row hover:

```
background: blue-50
```

Row height:

```
56px
```

---

## 5.6 Sidebar

Width:

```
260px
```

Item:

```
height: 44px
radius: 8px
padding-left: 16px
```

Active:

```
bg-blue-50
text-blue-600
```

---

# 6. 🎛 Interaction Guidelines

Hover Animation:

```
transition: 150ms ease
```

Click:

```
transform scale(0.98)
```

Focus Ring:

```
outline none
ring 2px blue-500
```

---

# 7. 🧠 Development Rules

### Jangan:

* hardcode color
* hardcode spacing
* inline style kecuali dynamic

### Wajib:

* pakai design token
* pakai component wrapper

---

# 9. 📌 Accessibility Rules

* contrast minimal WCAG AA
* focus visible wajib
* aria-label untuk icon button
