# 🐳 איך Docker בנוי

Docker היא מערכת לניהול והרצה של קונטיינרים, והיא בנויה ממספר שכבות ורכיבים אשר עובדים יחד כדי לספק סביבת הרצה מבודדת, יעילה וקלה לניהול.

---

## 📦 1. Docker CLI (ממשק שורת הפקודה)

זהו הכלי שבו אנחנו משתמשים להפעלת פקודות Docker. לדוגמה:

```bash
docker run redis
```

ה-CLI מתקשר עם ה-Docker Daemon דרך UNIX socket (`/var/run/docker.sock`) או דרך HTTP API.

---

## 🔧 2. Docker Daemon (`dockerd`)

ה-Daemon הוא התהליך הראשי שרץ ברקע ואחראי על:

- יצירת וניהול קונטיינרים
- בניית והרצת Images
- ניהול Volumes ו-Networks
- שמירה על Metadata
- תקשורת עם Docker Hub או registry פרטי

📁 לדוגמה: כשיוצרים Volume, הוא נשמר בנתיב:

```
/var/lib/docker/volumes/
```

---

## 🧱 3. Docker Objects (אובייקטים במערכת)

ה-Daemon מנהל כמה סוגים של אובייקטים:

| אובייקט        | תיאור                                     |
| -------------- | ----------------------------------------- |
| **Images**     | תבניות לקריאה בלבד של קונטיינרים          |
| **Containers** | מופעים רצים של Images                     |
| **Volumes**    | אחסון מתמשך שנשמר גם לאחר שהקונטיינר נמחק |
| **Networks**   | מאפשרים תקשורת בין קונטיינרים             |

---

## ⚙️ 4. Docker Runtime (containerd + runc)

שכבת ההרצה בפועל של הקונטיינרים מחולקת לשני רכיבים עיקריים:

### 🧪 containerd

- containerd הוא runtime ברמה גבוהה שנכתב על ידי Docker ומנוהל כיום כפרויקט עצמאי של CNCF.
- הוא אחראי על ניהול כל מחזור החיים של הקונטיינרים:
  - הורדת Images מ-Registry
  - יצירה, הרצה, עצירה והשמדה של קונטיינרים
  - ניהול אחסון (Storage), רשת (Networking) ועוד
- Docker Daemon משתמש ב-containerd כדי לבצע פעולות בפועל מאחורי הקלעים.

📌 ניתן להשתמש ב-containerd גם בלי Docker – למשל ב-Kubernetes (במקום Docker).

### 🧬 runc

- runc הוא הרכיב הנמוך ביותר, והוא אחראי על **ההרצה בפועל** של קונטיינרים במערכת ההפעלה.
- הוא מממש את תקן ה-OCI (Open Container Initiative) ומשתמש ב:
  - Linux namespaces (לבידוד בין קונטיינרים)
  - cgroups (לניהול משאבים)
- runc מופעל על ידי containerd והוא זה שיוצר את תהליך הקונטיינר עצמו (`init`).

🔁 שרשרת הריצה:

```
Docker CLI → Docker Daemon → containerd → runc → Container
```

---

## 🕸️ 5. Docker Networking (רשתות)

Docker תומך במספר סוגי רשתות:

- `bridge` – ברירת מחדל (רשת פנימית)
- `host` – שימוש ברשת של ה-Host
- `overlay` – רשת בין כמה מכונות (בשימוש עם Swarm)
- `none` – ללא רשת כלל

ה-Daemon מנהל את יצירת הרשתות וחיבור הקונטיינרים אליהן.

---

## 🐝 6. Docker Swarm (אופציונלי)

Swarm הוא כלי ה-Orchestration המובנה של Docker שמאפשר:

- הרצת קונטיינרים על פני מספר שרתים (Nodes)
- ניהול שירותים (Services)
- ביצוע Scale אוטומטי
- איזון עומסים (Load Balancing)

🔧 פקודת התחלה:

```bash
docker swarm init
```

---

## 🔄 7. Docker Engine (המנוע המרכזי)

המונח **Docker Engine** מתייחס למערכת כולה:

- Docker CLI
- Docker Daemon
- containerd + runc
- ניהול קונטיינרים, Images, Volumes, Networks
- (אופציונלי) Swarm

---

## 🔍 תרשים זרימה כללי

```
[ Docker CLI ]
      ↓
[ Docker Daemon ]
      ↓
[ containerd ]
      ↓
[ runc ]
      ↓
[ Container ]
```
