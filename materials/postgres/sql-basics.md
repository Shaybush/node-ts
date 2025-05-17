# 📘 PostgreSQL Basics – SQL Commands & Examples

A quick reference for beginners learning PostgreSQL. Includes essential commands with examples.

---

## 🧠 1. Connecting to PostgreSQL

```bash
psql -U your_username -d your_database
```

---

## 🏗️ 2. Create a Database

```sql
CREATE DATABASE school;
```

---

## 🔗 3. Connect to a Database

```bash
\c school
```

---

## 📋 4. Create a Table

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  grade VARCHAR(10)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  course_name VARCHAR(100)
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id)
);
```

---

## 📝 5. Insert Data

```sql
INSERT INTO students (name, age, grade) VALUES
('Alice', 20, 'A'),
('Bob', 22, 'B'),
('Charlie', 21, 'A');

INSERT INTO courses (course_name) VALUES
('Math'),
('Science'),
('History');

INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1);
```

---

## 🔍 6. Select Data

```sql
SELECT * FROM students;
SELECT name, grade FROM students WHERE age > 20;
```

---

## ✏️ 7. Update Data

```sql
UPDATE students
SET grade = 'A+'
WHERE name = 'Bob';
```

---

## ❌ 8. Delete Data

```sql
DELETE FROM students WHERE age < 21;
```

---

## 🔎 9. Filtering Results

```sql
SELECT * FROM students WHERE grade = 'A';
SELECT * FROM students WHERE name LIKE 'A%';
```

---

## 📊 10. Sorting Results

```sql
SELECT * FROM students ORDER BY age DESC;
```

---

## 🎚️ 11. Limit & Offset

```sql
SELECT * FROM students LIMIT 5;
SELECT * FROM students LIMIT 5 OFFSET 5;
```

---

## 📈 12. Aggregate Functions

```sql
SELECT COUNT(*) FROM students;
SELECT AVG(age) FROM students;
SELECT MAX(age) FROM students;
```

---

## 🧮 13. Group By

```sql
SELECT grade, COUNT(*) FROM students GROUP BY grade;
```

---

## 🔗 14. Joins – Examples

### 🔄 Inner Join: Students with their courses

```sql
SELECT s.name AS student, c.course_name
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;
```

**Example Output:**

```
 student | course_name
---------+-------------
 Alice   | Math
 Alice   | Science
 Bob     | History
 Charlie | Math
```

---

### 🔁 Left Join: All students and their courses (if any)

```sql
SELECT s.name AS student, c.course_name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c ON e.course_id = c.id;
```

**Example Output:**

```
 student | course_name
---------+-------------
 Alice   | Math
 Alice   | Science
 Bob     | History
 Charlie | Math
```

(If there were a student not enrolled in any course, they would appear with `NULL` in course_name.)

---

### 🔄 Right Join: All courses and students enrolled (if any)

```sql
SELECT s.name AS student, c.course_name
FROM courses c
RIGHT JOIN enrollments e ON c.id = e.course_id
RIGHT JOIN students s ON e.student_id = s.id;
```

**Example Output:**

```
 student | course_name
---------+-------------
 Alice   | Math
 Alice   | Science
 Bob     | History
 Charlie | Math
```

(If there were a course without any enrollment, it would appear with `NULL` in student.)

---

### 🚫 Full Outer Join: Show all students and courses, even unmatched

```sql
SELECT s.name AS student, c.course_name
FROM students s
FULL OUTER JOIN enrollments e ON s.id = e.student_id
FULL OUTER JOIN courses c ON e.course_id = c.id;
```

**Example Output:**

```
 student | course_name
---------+-------------
 Alice   | Math
 Alice   | Science
 Bob     | History
 Charlie | Math
 NULL    | Geography
 Dave    | NULL
```

(Shows all combinations, including unmatched students and unmatched courses.)

---

## 🗑️ 15. Drop Table / Database

```sql
DROP TABLE students;
DROP DATABASE school;
```

---

✅ **Tip**: Use `\d` to list tables and `\d table_name` to describe a table.

💡 **Bonus**: Use `\h` in `psql` to get help for SQL commands.
