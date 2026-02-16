# Quick Troubleshooting Guide

## ❌ Registration Failed / Login Failed

### Possible Causes & Solutions

#### 1. Backend Not Running
**Error:** `Failed to fetch` or `Network error`

**Solution:**
```bash
# Make sure Spring Boot is running
mvn spring-boot:run
# Should see: "Started LibrarymanagementApplication in X seconds"
```

#### 2. Wrong Database Credentials
**Error:** `Hibernate: could not prepare statement`

**Solution:**
In `application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=root
```
Update with your MySQL credentials

#### 3. CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
Add this to your controller:
```java
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
```

#### 4. Members Table Empty
**Error:** `Login failed` even with correct credentials

**Solution:**
Insert sample data:
```sql
INSERT INTO members (name, email, password, role) VALUES
('Divya', 'divya@gmail.com', '12345', 'STUDENT');
```

#### 5. MemberRepository Missing findByEmail
**Error:** `Method findByEmail not found`

**Solution:**
Update your MemberRepository:
```java
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
}
```

#### 6. MemberService Missing loginMember
**Error:** `loginMember method not found`

**Solution:**
Add this method to MemberService:
```java
public Member loginMember(String email, String password) {
    Member member = memberRepository.findByEmail(email);
    if (member != null && member.getPassword().equals(password)) {
        return member;
    }
    return null;
}
```

---

## 🔍 How to Debug

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Note the endpoint that failed

### Check Backend Logs
In your IDE or terminal where Spring Boot is running, you'll see logs like:
```
2024-02-14 10:30:45 DEBUG - POST /api/members/login
2024-02-14 10:30:46 ERROR - Login failed: Invalid email or password
```

### Test Endpoint with Curl
```bash
# Test if backend is running
curl http://localhost:8080/api/books

# Test login
curl -X POST http://localhost:8080/api/members/login \
  -H "Content-Type: application/json" \
  -d '{"email":"divya@gmail.com","password":"12345"}'
```

### Check Database Data
```sql
-- Check if members exist
SELECT * FROM members;

-- Check if books exist
SELECT * FROM books;

-- Check if table exists
SHOW TABLES;
```

---

## 📊 Verification Checklist

Before testing, verify:

- [ ] Spring Boot running on 8080?
  ```bash
  curl http://localhost:8080
  ```

- [ ] MySQL running and database created?
  ```sql
  USE library_management;
  SHOW TABLES;
  ```

- [ ] Members data inserted?
  ```sql
  SELECT COUNT(*) FROM members;
  ```

- [ ] Books data inserted?
  ```sql
  SELECT COUNT(*) FROM books;
  ```

- [ ] Frontend running on 3001?
  ```bash
  npm start
  ```

- [ ] API URLs correct in `apiService.js`?
  ```javascript
  const API_BASE_URL = "http://localhost:8080/api";
  ```

---

## 🆘 Still Having Issues?

### Step-by-Step Debug

1. **Check Backend is Running**
   ```bash
   # Terminal 1
   mvn spring-boot:run
   # Wait for "Started LibrarymanagementApplication"
   ```

2. **Test Backend Directly**
   ```bash
   # Terminal 2 (or Postman)
   curl http://localhost:8080/api/books
   # Should return JSON array of books
   ```

3. **Check Frontend Console**
   - F12 in browser
   - See exact error message
   - Check Network tab for failed requests

4. **Verify Database**
   ```sql
   mysql -u root -p
   USE library_management;
   SELECT * FROM members LIMIT 1;
   SELECT * FROM books LIMIT 1;
   ```

5. **Check application.properties**
   - Port: 8080 ✓
   - Database URL: `localhost:3306/library_management` ✓
   - Username: `root` ✓
   - Password: correct ✓

6. **Restart Everything**
   - Stop Spring Boot (Ctrl+C)
   - Stop Frontend (Ctrl+C)
   - Start Spring Boot again
   - Start Frontend again

---

## 📱 Test Credentials

Use these to test login:

| Email | Password | Role |
|-------|----------|------|
| divya@gmail.com | 12345 | STUDENT |
| anu@gmail.com | anu123 | STUDENT |
| admin@library.com | admin123 | LIBRARIAN |

---

## 🎯 Success Indicators

When everything works, you should see:

1. **Registration Page** - Form loads without errors
2. **Login** - Can login with valid credentials
3. **Department Page** - Shows 6 departments with book counts
4. **Book List** - Shows 10 books fetched from database
5. **Borrow** - Can borrow books and see success message
6. **Database** - New records appear in `borrow_transaction` table

---

## 🔧 Need More Help?

Check these files:
- Backend setup: `FRONTEND_BACKEND_CONNECTION_GUIDE.md`
- API reference: `API_QUICK_REFERENCE.md`
- Frontend code: Look in `src/services/apiService.js`
