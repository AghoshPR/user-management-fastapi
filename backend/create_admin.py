from app.database import SessionLocal
from app.models import User
from app.auth import hash_password

db = SessionLocal()

email = input("Enter admin email: ")
password = input("Enter admin password")

existing_admin = db.query(User).filer(User.role == "admin").first()

if existing_admin:
    print("Admin already Exists")

else:

    admin = User(
        username = "admin",
        email=email,
        password=hash_password(password)
        role="admin",
        is_active = True
    )
    db.add(admin)
    db.commit()
    print("Admin created successfully")