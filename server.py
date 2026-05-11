from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

# Allow React frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Server running"}


@app.get("/em-wave")
def get_em_wave(frame: int = 0):

    x = np.linspace(0, 4*np.pi, 900)

    phase = x - frame * 0.08

    electric = np.sin(phase)
    magnetic = np.sin(phase)

    x0 = 2*np.pi
    ey = np.sin(x0 - frame * 0.08)
    bz = np.sin(x0 - frame * 0.08)
    sx = 1.2

    return {
        "x": x.tolist(),
        "electric": electric.tolist(),
        "magnetic": magnetic.tolist(),
        "x0": float(x0),
        "ey": float(ey),
        "bz": float(bz),
        "sx": float(sx),
    }

@app.get("/qm-wave")
def get_wave(frame: int = 0):
    x = np.linspace(-36, 36, 850)

    sigma = 4.4
    k0 = 1.75
    x0 = -13
    omega = 0.08
    phase_speed = 1.6

    time = frame * omega

    spread = np.sqrt(1 + (time / sigma**2)**2)
    width = sigma * spread
    center = x0 + 0.9 * k0 * time

    envelope = np.exp(-((x - center)**2) / (2 * width**2))
    envelope /= envelope.max()

    phase = k0 * (x - center) - phase_speed * 0.5 * (k0**2) * time

    real = envelope * np.cos(phase)
    imag = envelope * np.sin(phase)
    probability = envelope**2

    return {
        "x": x.tolist(),
        "real": real.tolist(),
        "imag": imag.tolist(),
        "envelope": envelope.tolist(),
        "probability": probability.tolist(),
        "center": center,
    }
