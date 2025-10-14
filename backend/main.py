from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from passlib.hash import bcrypt

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rahul18",
    database="speedcheck_db"
)

cursor = db.cursor(dictionary=True)

@app.post("/signup")
async def signup(email: str = Form(...), password: str = Form(...)):
    hashed_password = bcrypt.hash(password)
    try:
        cursor.execute(
            "INSERT INTO users (email, password) VALUES (%s, %s)",
            (email, hashed_password)
        )
        db.commit()
        return {"message": "User registered successfully!"}
    except mysql.connector.IntegrityError:
        return {"error": "Email already exists!"}

@app.post("/login")
async def login(email: str = Form(...), password: str = Form(...)):
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    if user and bcrypt.verify(password, user["password"]):
        return {"message": "Login successful!"}
    return {"error": "Invalid email or password"}
