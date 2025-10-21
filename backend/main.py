from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend connection (React usually runs on port 5173 or 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "rahul18"),
        database=os.getenv("DB_NAME", "authdb")
    )

@app.post("/signup")
def signup(user: dict):
    name = user.get("name")
    email = user.get("email")
    password = user.get("password")

    if not name or not email or not password:
        raise HTTPException(status_code=400, detail="All fields are required")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Check if user exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing = cursor.fetchone()
    if existing:
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # Insert user into DB
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, hashed_pw)
    )
    db.commit()
    db.close()

    return {"message": "Signup successful"}
    @app.post("/login")
def login(user: dict):
    email = user.get("email")
    password = user.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    db = get_db()
    cursor = db.cursor(dictionary=True)

    # Check if user exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing = cursor.fetchone()
    db.close()

    if not existing:
        raise HTTPException(status_code=404, detail="User not found")

    # Check password
    if not bcrypt.checkpw(password.encode("utf-8"), existing["password"].encode("utf-8")):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {"message": "Login successful", "name": existing["name"]}

