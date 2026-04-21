# Day 5: Code Review Challenge — Weather Dashboard

## 1. Overview

The Weather Dashboard fetches current weather and forecast data from the OpenWeatherMap API. It supports:

- Searching by city
- Geolocation lookup
- Unit toggle (°C/°F)
- Search history persistence
- Dynamic background changes based on weather conditions

---

## 2. Strengths

- ✅ **API integration**: Uses OpenWeatherMap endpoints correctly.
- ✅ **Async/await with error handling**: Wraps fetch calls in `try/catch`.
- ✅ **User experience**: Loading indicators, error messages, and search history.
- ✅ **Feature completeness**: Current weather, 5‑day forecast, geolocation, unit toggle.

---

## 3. Issues Found

- ❌ **Inline styling for background**: `body.style.backgroundColor` instead of CSS classes.
- ❌ **Global state variable (`isCelcius`)**: Could cause bugs if multiple components need unit state.
- ❌ **Mixed concerns**: Fetching, rendering, and storage logic are tightly coupled.
- ❌ **Forecast grouping**: Only takes the first entry per day, which may not represent daily averages.
- ❌ **Hard‑coded DOM queries**: Multiple `document.getElementById` calls scattered throughout.

---

## 4. Suggested Improvements

- Use **CSS classes** for background themes instead of inline styles.
- Encapsulate unit state in a dedicated settings object or context.
- Split responsibilities:
    - `fetchWeather(city)` → API logic
    - `renderWeather(data)` → DOM updates
    - `saveSearch(city)` → localStorage
- Improve forecast logic by averaging daily temperatures or picking midday entries.
- Cache DOM elements at the top of the script to avoid repeated lookups.

---

## 5. Before vs After Comparison

| Aspect              | Before (Buggy/Weak)                                | After (Refactored/Improved)                              |
| ------------------- | -------------------------------------------------- | -------------------------------------------------------- |
| Background styling  | Inline: `body.style.backgroundColor = '#87CEEB'`   | CSS classes: `body.className = condition.toLowerCase()`  |
| Unit toggle state   | Global `let isCelcius = true;`                     | Encapsulated in `settings.units` object                  |
| Separation of logic | Fetch, render, and storage mixed together          | Split into `fetchWeather`, `renderWeather`, `saveSearch` |
| Forecast grouping   | First entry per day only                           | Average or midday entry for more accurate daily forecast |
| DOM queries         | Multiple scattered `document.getElementById` calls | Cached DOM references at top of file                     |

---

## 6. Sample Refactor

**Before**

````js
function setBackground(condition) {
  const body = document.body;
  switch (condition.toLowerCase()) {
    case 'clear':
      body.style.backgroundColor = '#87CEEB';
      break;
    case 'clouds':
      body.style.backgroundColor = '#A9A9A9';
      break;
    case 'rain':
      body.style.backgroundColor = '#4682B4';
      break;
    default:
      body.style.backgroundColor = '#87CEEB';
  }
}

**After**
```js
function setBackground(condition) {
  document.body.className = condition.toLowerCase();
}

/* CSS */
body.clear { background-color: #87CEEB; }
body.clouds { background-color: #A9A9A9; }
body.rain { background-color: #4682B4; }


## 7. Lesson Learned
Using CSS classes improves maintainability and separates style from logic.

Encapsulating unit state avoids global variable bugs.

Separating concerns makes the code easier to extend and debug.

Improving forecast logic ensures more accurate daily summaries.

Code reviews help identify subtle issues even in working apps, reinforcing professional best practices.
````
