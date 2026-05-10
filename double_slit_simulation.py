import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# ==========================================
# Double-Slit Schrodinger Wave Visualization
# ==========================================

# Naturalized units for visualization:
# hbar = 1, m = 1. The plotted field is the
# probability density |psi_1 + psi_2|^2.

grid_x = 320
grid_y = 180
x = np.linspace(-4, 4, grid_x)
y = np.linspace(-2.4, 2.4, grid_y)
X, Y = np.meshgrid(x, y)

source_x = -3.5
source_y1 = -0.82
source_y2 = 0.82
k = 8.5
omega = 0.065
spread = 0.13

fig, ax = plt.subplots(figsize=(12, 6), facecolor="black")
ax.set_facecolor("black")
ax.set_xticks([])
ax.set_yticks([])

for spine in ax.spines.values():
    spine.set_visible(False)

image = ax.imshow(
    np.zeros_like(X),
    extent=[x.min(), x.max(), y.min(), y.max()],
    origin="lower",
    cmap="magma",
    vmin=0,
    vmax=1,
    interpolation="bilinear",
)

# Barrier and slits
barrier_x = -2.2
slit_gap = 0.82
slit_height = 0.28
ax.plot([barrier_x, barrier_x], [-2.4, -slit_gap - slit_height], color="white", alpha=0.45, linewidth=3)
ax.plot([barrier_x, barrier_x], [-slit_gap + slit_height, slit_gap - slit_height], color="white", alpha=0.45, linewidth=3)
ax.plot([barrier_x, barrier_x], [slit_gap + slit_height, 2.4], color="white", alpha=0.45, linewidth=3)

# Detection screen
ax.plot([3.25, 3.25], [-2.4, 2.4], color="white", alpha=0.22, linewidth=2)


def wavefunction(frame):
    time = frame * omega
    r1 = np.sqrt((X - source_x) ** 2 + (Y - source_y1) ** 2)
    r2 = np.sqrt((X - source_x) ** 2 + (Y - source_y2) ** 2)
    envelope = np.exp(-spread * (X + 1.8) ** 2)

    psi_1 = envelope * np.exp(1j * (k * r1 - time)) / np.sqrt(r1 + 0.25)
    psi_2 = envelope * np.exp(1j * (k * r2 - time)) / np.sqrt(r2 + 0.25)
    probability = np.abs(psi_1 + psi_2) ** 2

    probability[X < source_x] = 0
    return np.clip(probability * 0.26, 0, 1)


def animate(frame):
    image.set_data(wavefunction(frame))
    return [image]


ani = animation.FuncAnimation(
    fig,
    animate,
    frames=5000,
    interval=16,
    blit=True,
)

plt.tight_layout()
plt.show()
