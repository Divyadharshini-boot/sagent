# ✅ Backend Connection Checklist

## Step-by-Step Setup Instructions

### Phase 1: Backend Code Updates ✓

- [ ] Update `MemberController.java` with `/api/members` endpoints
- [ ] Update `BookController.java` with `/api/books` endpoints  
- [ ] Add `BorrowController.java` with `/api/borrows` endpoints
- [ ] Update `MemberService.java` with `loginMember()` method
- [ ] Update `MemberRepository.java` with `findByEmail()` method
- [ ] Add `BorrowService.java` with borrow/return logic
- [ ] Update `Member.java` entity with proper annotations
- [ ] Verify all controllers have `@CrossOrigin` with ports 3001 & 3000

### Phase 2: Database Setup ✓

- [ ] Create database: `CREATE DATABASE library_management;`
- [ ] Run migrations (Hibernate will create tables automatically)
- [ ] Insert members data (10 sample members)
- [ ] Insert books data (10 sample books)
- [ ] Verify data with: `SELECT COUNT(*) FROM members;`

### Phase 3: Configuration ✓

- [ ] Update `application.properties`:
  ```properties
  server.port=8080
  spring.datasource.url=jdbc:mysql://localhost:3306/library_management
  spring.datasource.username=root
  spring.datasource.password=root
  ```
- [ ] Verify database credentials are correct
- [ ] Check MySQL is running on port 3306

### Phase 4: Start Backend ✓

- [ ] Open terminal in your Spring Boot project
- [ ] Run: `mvn spring-boot:run`
- [ ] Wait for: "Started LibrarymanagementApplication"
- [ ] Verify no errors in console

### Phase 5: Frontend Configuration ✓

- [ ] Verify `apiService.js` has correct URL:
  ```javascript
  const API_BASE_URL = "http://localhost:8080/api";
  ```
- [ ] Check that frontend is running on port 3001
- [ ] Verify no CORS errors in browser console

### Phase 6: Testing ✓

#### Test Backend API Directly
```bash
# Test if backend is running
curl http://localhost:8080/api/books

# Test login
curl -X POST http://localhost:8080/api/members/login \
  -H "Content-Type: application/json" \
  -d '{"email":"divya@gmail.com","password":"12345"}'

# Expected response:
# {"id": 1, "name": "Divya", "email": "divya@gmail.com", "role": "STUDENT", "regNo": "LIB1"}
```

#### Test Frontend
1. Open `http://localhost:3001`
2. Click "Register here"
3. Create new account with email & password
4. Should see success message
5. Then login with those credentials
6. Should see departments page with 6 categories
7. Click on any category
8. Should see books from that category
9. Click on any available book
10. Click "Borrow This Book"
11. Confirm borrowing
12. Should see success page

---

## 🔴 If Registration/Login Fails

### Troubleshooting Checklist

1. **Backend Not Running?**
   - [ ] Check if Spring Boot process is running
   - [ ] Look for port 8080 in use
   - [ ] Check console for startup errors

2. **Database Issue?**
   - [ ] MySQL service running? (`services.msc` on Windows)
   - [ ] Database created? (`SHOW DATABASES;`)
   - [ ] Tables exist? (`SHOW TABLES;`)
   - [ ] Members table has data? (`SELECT * FROM members;`)

3. **CORS Error?**
   - [ ] Browser console shows CORS error?
   - [ ] Check controller has `@CrossOrigin` annotation
   - [ ] Includes both `localhost:3001` and `localhost:3000`

4. **API Endpoint Mismatch?**
   - [ ] Controller path is `/api/members`?
   - [ ] Login endpoint is `/api/members/login`?
   - [ ] Register endpoint is `/api/members/register`?

5. **MemberService/Repository Missing Methods?**
   - [ ] `loginMember()` method exists?
   - [ ] `findByEmail()` in repository?
   - [ ] Methods are public?

---

## 📋 Files to Update/Create

### In Your Spring Boot Project

**Modified Files:**
1. `MemberController.java` → Add all endpoints
2. `BookController.java` → Add category endpoint
3. `MemberService.java` → Add loginMember() method
4. `MemberRepository.java` → Add findByEmail() method
5. `Member.java` → Add table annotations
6. `application.properties` → Update DB config

**New Files to Create:**
1. `BorrowController.java` → New file
2. `BorrowService.java` → New file

---

## 🧪 Quick Test Commands

### Terminal 1: Start Backend
```bash
cd C:\path\to\your\librarymanagement
mvn spring-boot:run
```

### Terminal 2: Test API (use curl or Postman)
```bash
# Get all books
curl http://localhost:8080/api/books

# Login
curl -X POST http://localhost:8080/api/members/login \
  -H "Content-Type: application/json" \
  -d '{"email":"divya@gmail.com","password":"12345"}'
```

### Terminal 3: Start Frontend
```bash
cd C:\Users\divya\library-frontend
npm start
```

---

## 📊 Expected API Responses

### POST /api/members/login
**Request:**
```json
{
  "email": "divya@gmail.com",
  "password": "12345"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Divya",
  "email": "divya@gmail.com",
  "role": "STUDENT",
  "regNo": "LIB1"
}
```

### GET /api/books
**Response:**
```json
[
  {
    "id": 1,
    "title": "Java Programming",
    "author": "James Gosling",
    "category": "Programming",
    "status": "AVAILABLE"
  },
  ...
]
```

### GET /api/books/category/Programming
**Response:**
```json
[
  {
    "id": 1,
    "title": "Java Programming",
    "author": "James Gosling",
    "category": "Programming",
    "status": "AVAILABLE"
  },
  ...
]
```

---

## ✨ Success Checklist

When everything is working, verify:

- [ ] Backend running on port 8080
- [ ] Frontend running on port 3001
- [ ] Can register new member
- [ ] Can login with credentials
- [ ] Department page shows 6 categories
- [ ] Can click category and see books
- [ ] Can click book and see details
- [ ] Can borrow book
- [ ] See success page with borrowing details
- [ ] No errors in browser console
- [ ] No errors in backend console

---

## 🎉 You're Done!

Once all checkboxes are checked, your Library Management System is fully connected and operational!

### What Works:
✅ User registration  
✅ User login  
✅ View departments/categories  
✅ View books by category  
✅ View book details  
✅ Borrow books  
✅ Track borrowing in database  

### Data Flow:
Frontend → API Calls → Spring Boot Backend → MySQL Database → Response back to Frontend

---

## 📞 Need Help?

Refer to these files:
- **Setup Guide:** `FRONTEND_BACKEND_CONNECTION_GUIDE.md`
- **Troubleshooting:** `QUICK_TROUBLESHOOTING.md`
- **API Reference:** `API_QUICK_REFERENCE.md`
