from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace "*" with your frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------
# MySQL connection function
# ------------------------------
def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "rahul18"),
        database=os.getenv("DB_NAME", "authdb")
    )

# ------------------------------
# Signup endpoint
# ------------------------------
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

# ------------------------------
# Login endpoint
# ------------------------------
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
        @app.get("/speed")
def get_speed():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        download = st.download() / 1_000_000
        upload = st.upload() / 1_000_000
        ping = st.results.ping
        return {"download": round(download, 2), "upload": round(upload, 2), "ping": round(ping, 2)}
    except Exception as e:
        return {"error": str(e)}

    return {"message": "Login successful", "name": existing["name"]}
