from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..dependencies import get_db


router = APIRouter(prefix="/admin", tags=["Admin"])

# Admin login
@router.post("/login")
def admin_login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user or user.role != "admin":
        raise HTTPException(status_code=403, detail="Not admin")

    if not auth.verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_token({"id": user.id, "role": "admin"})

    return {"access_token": token}

# Get all user

@router.get("/users")
def get_users(db:Session = Depends(get_db)):
    return db.query(models.User).all()


# Create User
@router.post("/users")
def create_user(user:schemas.UserCreate,db:Session = Depends(get_db)):
    new_user = models.User(
        username=user.username,
        email=user.email,
        password=auth.hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    return {"message":"User Created"}

# Delete User

@router.delete("/users/{user_id}")
def delete_user(user_id:int,db:Session=Depends(get_db)):
    user=db.query(models.User).get(user_id)
    if not user:
        raise HTTPException(404)
    db.delete(user)
    db.commit()
    return {"message":"Deleted"}

# Block and Unblock
@router.patch("/users/{user_id}")
def toggle_user(user_id:int,db:Session=Depends(get_db)):
    user=db.query(models.User).get(user_id)
    user.is_active=not user.is_active
    db.commit()

    return {"status":user.is_active}