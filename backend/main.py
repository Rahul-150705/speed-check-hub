from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import speedtest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
