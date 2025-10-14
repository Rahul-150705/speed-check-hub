from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import speedtest

app = FastAPI()

# Allow requests from your frontend (adjust port if needed)
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/speedtest")
def run_speedtest():
    st = speedtest.Speedtest()
    st.get_best_server()
    download = st.download() / 1_000_000  # Mbps
    upload = st.upload() / 1_000_000      # Mbps
    ping = st.results.ping
    return {
        "download_mbps": round(download, 2),
        "upload_mbps": round(upload, 2),
        "ping_ms": ping
    }

