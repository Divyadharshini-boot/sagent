# Quick Reference: Role-Based Access Control

## 🔐 User Roles

### LIBRARIAN ⭐
**Full access to book management**
- ✅ Add new books
- ✅ Delete books from library
- ✅ Mark books as DAMAGED
- ✅ Borrow books
- ✅ View all books and categories

### STAFF 👨‍💼
**Limited read-only access**
- ✅ Borrow AVAILABLE books
- ✅ View books and categories
- ❌ Cannot add books
- ❌ Cannot delete books
- ❌ Cannot mark as damaged
- ❌ Cannot borrow DAMAGED books

### STUDENT 👨‍🎓
**Limited read-only access**
- ✅ Borrow AVAILABLE books
- ✅ View books and categories
- ❌ Cannot add books
- ❌ Cannot delete books
- ❌ Cannot mark as damaged
- ❌ Cannot borrow DAMAGED books

---

## 📚 Book Status

| Status | Meaning | Can Borrow | Visible |
|--------|---------|:----------:|:-------:|
| **AVAILABLE** | Ready to borrow | ✅ | ✅ |
| **DAMAGED** | Not available | ❌ | ✅ |
| **BORROWED** | Currently checked out | ❌ | ✅ |

---

## 🎯 Librarian Actions

### Add a Book
1. Login as LIBRARIAN
2. Go to any department
3. Click **"➕ Add New Book"** button
4. Fill in: Title, Author, Category
5. Click **"Add Book"**
6. Book created with status = **AVAILABLE**

### Mark Book as Damaged
1. Login as LIBRARIAN
2. Go to department containing the book
3. Find the book in the list
4. Click **"🔧 Damage"** button
5. Confirm the action
6. Book status changes to **DAMAGED**
7. No one can borrow it anymore

### Delete Book
1. Login as LIBRARIAN
2. Go to department containing the book
3. Click **"🗑️ Delete"** button
4. Confirm deletion
5. Book is removed from library

---

## 🎓 Student/Staff Actions

### Borrow a Book
1. Login as STUDENT or STAFF
2. Go to a department
3. Click on an **AVAILABLE** book
4. Click **"Borrow"**
5. Confirm on next screen
6. Book borrowed successfully

### Why Can't I Borrow?
- ❌ Book is **DAMAGED** → Cannot borrow damaged books
- ❌ Book is **BORROWED** → Already checked out by someone
- ❌ Not enough permissions → Only librarians can override

---

## 📋 Test Credentials

```
Email: divya@gmail.com
Password: 12345
Role: LIBRARIAN ⭐

Email: arjun@gmail.com
Password: 12345
Role: STUDENT 👨‍🎓

Email: rajesh@gmail.com
Password: 12345
Role: STAFF 👨‍💼
```

---

## 🛠️ How It Works

### Frontend Validation
- Checks user role before showing buttons
- Disables actions for unauthorized users
- Shows clear error messages

### Backend Validation (🔒 SECURE)
- Validates role on every request
- Returns HTTP 403 if unauthorized
- Cannot be bypassed

---

## 🚀 Example Workflow

### As LIBRARIAN:
```
1. Login ✅
2. Navigate to "Science" department
3. Click "Add New Book" ✅ (button visible)
4. Add "Physics Book" by "Einstein"
5. Book created with status = AVAILABLE
6. You can borrow it: ✅
7. Mark as DAMAGED: ✅ (if needed)
8. Delete it: ✅ (when done)
```

### As STUDENT:
```
1. Login ✅
2. Navigate to "Science" department
3. Look for "Add New Book" ❌ (button NOT visible)
4. See "Physics Book" with AVAILABLE status
5. Click book and Borrow ✅
6. Cannot mark as DAMAGED ❌
7. Cannot delete ❌
8. If book marked DAMAGED: Cannot borrow ❌
```

---

## ⚠️ Important Notes

### Damaged Books
- Only LIBRARIANS can mark books as damaged
- Damaged books appear with ⚠️ **DAMAGED** badge
- **NO ONE** can borrow damaged books
- Click on damaged book shows warning
- LIBRARIAN can delete damaged books

### Security
- Role validation happens on BACKEND 🔒
- Frontend buttons are just for UX
- Cannot bypass by removing buttons
- All requests include role header

---

## 🔍 Troubleshooting

### "Add Book button not showing"
- ✅ Make sure you're logged in as LIBRARIAN
- ✅ Check user role in top right (Welcome, Name (ROLE))

### "Can't borrow this book"
- ✅ Check book status - is it AVAILABLE?
- ✅ Is it marked DAMAGED? ⚠️
- ✅ Is it already BORROWED?

### "Access Denied error"
- ✅ You don't have permission for this action
- ✅ Only LIBRARIANS can add/delete/mark books
- ✅ Try with different account

### Backend not running?
- ✅ Check if port 8080 is listening
- ✅ Start backend: `mvn spring-boot:run`
- ✅ Check MySQL is running

---

## 📞 Support

For issues with role-based access:
1. Check your user role in navbar
2. Verify backend is running (port 8080)
3. Try logging out and back in
4. Check browser console for errors (F12)

---

**Status: ✅ Role-Based Access Control Active**
