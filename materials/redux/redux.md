# Redux vs Redux Toolkit - Comparison with Examples

---

# ✨ הבדלים בין Redux ל-Redux Toolkit

**ברידוקס הרגיל** (Redux) היה צורך:

- איימוטאביליטי ידני של state.
- בכל פעולה צריכים לפצל את ה-state באופן ידני.
- היתה חובה להשתמש ב-spread operator כדי לא לשנות את האובייקט המקורי.

**ברידוקס טולקיט** (Redux Toolkit):

- ניתן לשנות state בצורה ישירה.
- מאחורי הקלעים משתמשים בספריית Immer ששומרת על איימוטאביליטי.
- קוד קצר, פשוט, וקריא יותר.

---

# 📖 Redux רגיל - דוגמה

## 1. יצירת Action

```javascript
// actions.js
export const increment = () => ({
  type: "INCREMENT",
});

export const updateName = (newName) => ({
  type: "UPDATE_NAME",
  payload: newName,
});
```

## 2. יצירת Reducer (immutability ידני)

```javascript
// reducer.js
const initialState = {
  counter: 0,
  user: {
    name: "",
  },
};

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "UPDATE_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    default:
      return state;
  }
}
```

---

# 🚀 Redux Toolkit - דוגמה

## 1. יצירת Slice

```javascript
// appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  user: {
    name: "",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increment(state) {
      state.counter += 1;
    },
    updateName(state, action) {
      state.user.name = action.payload;
    },
  },
});

export const { increment, updateName } = appSlice.actions;
export default appSlice.reducer;
```

---

# ✨ סיכום הבדלים

| נושא         | Redux רגיל         | Redux Toolkit        |
| ------------ | ------------------ | -------------------- |
| יצירת Action | ידנית              | אוטומטית ב-Slice     |
| שינוי state  | עם פיצול ידני      | שינוי ישיר דרך immer |
| קריאות קוד   | verbose            | concise              |
| תחזוקה       | קשה                | פשוטה                |
| טעויות       | סיכוי גבוה לטעויות | מוגן עם Immer        |

---

# 📦 מה זה Immer?

**Immer** היא ספרייה שמאפשרת:

- לבצע שינויים באובייקטים ובמערכים "כאילו" הם משתנים ישירות.
- בפועל יוצרת עותק חדש ושומרת על immutability.
- משתמשת ב-Proxy של JavaScript כדי לעקוב אחרי השינויים.

### דוגמה ל-Immer

```javascript
import { produce } from "immer";

const baseState = {
  counter: 0,
  user: {
    name: "Alice",
  },
};

const nextState = produce(baseState, (draft) => {
  draft.counter += 1;
  draft.user.name = "Bob";
});

console.log(nextState);
// { counter: 1, user: { name: 'Bob' } }
console.log(baseState);
// { counter: 0, user: { name: 'Alice' } }
```

---

# 🧠 מושגים חשובים

### Reducer

פונקציה שמקבלת את ה-state הנוכחי ואת ה-action שנשלח, ומחזירה עותק חדש של state בהתאם לפעולה שהתבצעה. היא טהורה (pure function) ולא משנה את ה-state המקורי.

### Action

אובייקט רגיל שמכיל לפחות תכונה אחת שנקראת type (וגם יכול להכיל payload). הוא מתאר "מה קרה" באפליקציה.

### Store

האובייקט המרכזי שמכיל את כל ה-state של האפליקציה במקום אחד. דרכו קוראים או משדרגים את ה-state באמצעות dispatch ל-actions.

### Selector

פונקציה שמקבלת את כל ה-state ומחזירה ממנו חתיכה ספציפית שרוצים להשתמש בה בקומפוננטה. משמשת להפרדה בין לוגיקת הנתונים לבין הצגת הנתונים.

---

# 📚 מושגים נוספים שאפשר להזכיר:

- **Middleware**: פונקציה שיושבת בין dispatch ל-reducer, ומשמשת לביצוע פעולות צדדיות (כגון קריאות API).
- **Thunk**: סוג של Middleware שמאפשר לבצע פעולות אסינכרוניות לפני dispatch ל-action רגיל.
- **Slice** (ב-Redux Toolkit): מקבץ של state, reducers ו-actions תחת קובץ אחד.
- **Dispatch**: הקריאה בפועל לשליחת פעולה (action) ל-store.

---

# 📊 תרשים זרימה: איך Redux עובד?

```
Component (משתמש שולח פעולה)
    ↓
Dispatch (שולח Action)
    ↓
Action (אובייקט type + payload)
    ↓
Reducer (מחשב State חדש)
    ↓
Store (מאחסן את ה-State המעודכן)
    ↓
Selector (שולף חלקים מה-State)
    ↓
Component (מקבל מידע מה-State ומרנדר)
```

---
