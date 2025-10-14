from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from passlib.hash import bcrypt

# --------- Database Connection ---------
db = mysql.connector.connect(
    host="localhost",         # or your DB host
    user="root",              # your DB username
    password="rahul18",  # your DB password
    database="speedcheck_db"
)
cursor = db.cursor(dictionary=True)

# --------- FastAPI App ---------
app = FastAPI(title="SpeedCheck Hub Backend")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------- Request Schemas ---------
class User(BaseModel):
    email: EmailStr
    password: str

# --------- Signup Endpoint ---------
@app.post("/signup")
def signup(user: User):
    try:
        cursor.execute("SELECT * FROM users WHERE email=%s", (user.email,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already exists")

        hashed_password = bcrypt.hash(user.password)
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (%s, %s)",
            (user.email, hashed_password)
        )
        db.commit()
        return {"message": "User created successfully"}

    except Exception as e:
        print("Error in signup:", e)
        raise HTTPException(status_code=500, detail=str(e))


# --------- Login Endpoint ---------
@app.post("/login")
def login(user: User):
    cursor.execute("SELECT * FROM users WHERE email=%s", (user.email,))
    db_user = cursor.fetchone()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not bcrypt.verify(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful"}
