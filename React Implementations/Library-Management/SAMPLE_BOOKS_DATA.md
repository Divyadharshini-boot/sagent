# Sample Books Data - Ready to Insert into Database

Use this SQL to insert the books you provided into the `library_management` database:

```sql
-- Delete existing data (optional)
DELETE FROM books;

-- Insert sample books
INSERT INTO books (title, author, category, isbn, status) VALUES
(
  'Java Programming',
  'James Gosling',
  'Programming',
  '978-0-134685-997',
  'AVAILABLE'
),
(
  'Spring Boot in Action',
  'Craig Walls',
  'Framework',
  '978-1-617292-957',
  'DAMAGED'
),
(
  'Effective Java',
  'Joshua Bloch',
  'Programming',
  '978-0-134686-194',
  'DAMAGED'
),
(
  'Clean Code',
  'Robert C. Martin',
  'Software Engineering',
  '978-0-132350-884',
  'AVAILABLE'
),
(
  'Design Patterns',
  'Erich Gamma',
  'Architecture',
  '978-0-201633-610',
  'AVAILABLE'
),
(
  'Data Structures and Algorithms',
  'Mark Allen Weiss',
  'Computer Science',
  '978-0-201361-209',
  'AVAILABLE'
),
(
  'Head First Java',
  'Kathy Sierra',
  'Programming',
  '978-0-596004-656',
  'AVAILABLE'
),
(
  'Microservices with Spring',
  'Rajesh RV',
  'Microservices',
  '978-1-491950-538',
  'AVAILABLE'
),
(
  'Hibernate in Practice',
  'Christian Bauer',
  'ORM',
  '978-1-617292-995',
  'AVAILABLE'
),
(
  'Database System Concepts',
  'Abraham Silberschatz',
  'Database',
  '978-0-078022-154',
  'AVAILABLE'
);

-- Verify insertion
SELECT COUNT(*) as total_books FROM books;
SELECT * FROM books ORDER BY category, title;
```

---

## Data Structure

Each book record contains:
- **id** - Auto-generated primary key
- **title** - Book name
- **author** - Author name
- **category** - Department/Category (used for filtering)
- **isbn** - ISBN number (optional)
- **status** - AVAILABLE, DAMAGED, or LOST

---

## Books by Category

### Programming (3 books)
1. Java Programming - James Gosling - AVAILABLE
2. Effective Java - Joshua Bloch - DAMAGED
3. Head First Java - Kathy Sierra - AVAILABLE

### Framework (1 book)
1. Spring Boot in Action - Craig Walls - DAMAGED

### Software Engineering (1 book)
1. Clean Code - Robert C. Martin - AVAILABLE

### Architecture (1 book)
1. Design Patterns - Erich Gamma - AVAILABLE

### Computer Science (1 book)
1. Data Structures and Algorithms - Mark Allen Weiss - AVAILABLE

### Microservices (1 book)
1. Microservices with Spring - Rajesh RV - AVAILABLE

### ORM (1 book)
1. Hibernate in Practice - Christian Bauer - AVAILABLE

### Database (1 book)
1. Database System Concepts - Abraham Silberschatz - AVAILABLE

---

## Import Instructions

1. Open MySQL Workbench or MySQL CLI
2. Run `USE library_management;`
3. Copy and paste the INSERT statements above
4. Execute the query
5. Verify with: `SELECT * FROM books;`

---

## Alternative - JSON Format

If you want to insert via API, here's the JSON format:

```json
{
  "books": [
    {
      "id": 1,
      "title": "Java Programming",
      "author": "James Gosling",
      "category": "Programming",
      "isbn": "978-0-134685-997",
      "status": "AVAILABLE"
    },
    {
      "id": 2,
      "title": "Spring Boot in Action",
      "author": "Craig Walls",
      "category": "Framework",
      "isbn": "978-1-617292-957",
      "status": "DAMAGED"
    },
    {
      "id": 3,
      "title": "Effective Java",
      "author": "Joshua Bloch",
      "category": "Programming",
      "isbn": "978-0-134686-194",
      "status": "DAMAGED"
    },
    {
      "id": 4,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "category": "Software Engineering",
      "isbn": "978-0-132350-884",
      "status": "AVAILABLE"
    },
    {
      "id": 5,
      "title": "Design Patterns",
      "author": "Erich Gamma",
      "category": "Architecture",
      "isbn": "978-0-201633-610",
      "status": "AVAILABLE"
    },
    {
      "id": 6,
      "title": "Data Structures and Algorithms",
      "author": "Mark Allen Weiss",
      "category": "Computer Science",
      "isbn": "978-0-201361-209",
      "status": "AVAILABLE"
    },
    {
      "id": 7,
      "title": "Head First Java",
      "author": "Kathy Sierra",
      "category": "Programming",
      "isbn": "978-0-596004-656",
      "status": "AVAILABLE"
    },
    {
      "id": 8,
      "title": "Microservices with Spring",
      "author": "Rajesh RV",
      "category": "Microservices",
      "isbn": "978-1-491950-538",
      "status": "AVAILABLE"
    },
    {
      "id": 9,
      "title": "Hibernate in Practice",
      "author": "Christian Bauer",
      "category": "ORM",
      "isbn": "978-1-617292-995",
      "status": "AVAILABLE"
    },
    {
      "id": 10,
      "title": "Database System Concepts",
      "author": "Abraham Silberschatz",
      "category": "Database",
      "isbn": "978-0-078022-154",
      "status": "AVAILABLE"
    }
  ]
}
```

---

## Notes

- Books with status "DAMAGED" cannot be borrowed in the frontend
- Only books with status "AVAILABLE" show the Borrow button
- The category field is case-sensitive in queries
- When user adds a new book via backend API, it will appear immediately in frontend
- Similarly, when new member registers via frontend, it saves in database

---

## Testing the Integration

After you:
1. ✅ Set up MySQL database
2. ✅ Insert these books
3. ✅ Create Spring Boot backend
4. ✅ Run both frontend and backend

You should be able to:
1. ✅ See all 8 categories on Department page
2. ✅ Click each category and see books
3. ✅ See DAMAGED books disabled for borrowing
4. ✅ Borrow AVAILABLE books
5. ✅ See borrow record in database

Happy testing! 🎉
