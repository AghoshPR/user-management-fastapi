from fastapi import APIRouter,Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models,schemas,auth
from ..dependencies import get_db

router = APIRouter(prefix="/user",tags=["user"])

@router.post("/register")
def register(user: schemas.UserCreate,db:Session = Depends(get_db)):

    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400,detail="Email exists")
    
    new_user = models.User(
        username=user.username,
        email=user.email,
        password=auth.hash_password(user.password),
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message":"User Created"}

@router.post("/login")
def login(data: schemas.UserLogin,db:Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user or not auth.verify_password(data.password,user.password):
        raise HTTPException(status_code=401,detail="Invalid credentials")
    
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Blocked user")

    token = auth.create_token({"id":user.id,"role":user.role})

    return {"access_token":token,"role":user.role}
    