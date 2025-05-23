## 🧩 מה זה Docker Compose?

**Docker Compose** הוא כלי שמאפשר להגדיר ולהריץ מספר קונטיינרים יחד בעזרת קובץ YAML אחד (`docker-compose.yml`).

במקום להריץ כל קונטיינר בנפרד, פשוט כותבים את כל השירותים בקובץ אחד והמערכת תרים את כולם במקביל.

### ✨ יתרונות:

- הגדרה קלה ונוחה לאפליקציות מרובות שירותים
- תמיכה ב־Volumes, Networks ותלויות בין שירותים
- מתאים מאוד לפיתוח מקומי וסביבות CI/CD

### 📄 דוגמה בסיסית:

```yaml
version: "3"

services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```

🔧 להרצה:

```bash
docker-compose up
```

### 🧠 מתי כדאי להשתמש?

- בפרויקטים עם מספר רכיבים (Frontend, Backend, DB)
- כשרוצים סביבת פיתוח עקבית
- כשרוצים להרים ולכבות הכל בפקודה אחת (`up/down`)
