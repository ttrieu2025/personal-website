import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from mpl_toolkits.mplot3d import Axes3D

# ==========================================
# Electromagnetic Wave Visualization
# ==========================================

# Wave parameters
num_points =  1500
x = np.linspace(0, 4*np.pi, num_points)

# Figure setup
fig = plt.figure(figsize=(14, 7), facecolor='black')
ax = fig.add_subplot(111, projection='3d', facecolor='black')

# Axis limits
ax.set_xlim(0, 4*np.pi)
ax.set_ylim(-1.5, 1.5)
ax.set_zlim(-1.5, 1.5)

# Clean appearance
ax.set_xticks([])
ax.set_yticks([])
ax.set_zticks([])

for axis in [ax.xaxis, ax.yaxis, ax.zaxis]:
    axis.pane.fill = False
    axis.pane.set_edgecolor('none')

ax.grid(False)

# Labels
ax.set_xlabel("")
ax.set_ylabel("")
ax.set_zlabel("")

# Better viewing angle
ax.view_init(elev=20, azim=-70)

# ------------------------------------------
# Main animation function
# ------------------------------------------

def animate(frame):

    ax.cla()

    # Re-apply styling after clearing
    ax.set_xlim(0, 4*np.pi)
    ax.set_ylim(-1.5, 1.5)
    ax.set_zlim(-1.5, 1.5)

    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_zticks([])

    ax.grid(False)

    for axis in [ax.xaxis, ax.yaxis, ax.zaxis]:
        axis.pane.fill = False
        axis.pane.set_edgecolor('none')

    ax.set_facecolor("black")

    # --------------------------------------
    # Wave phase
    # --------------------------------------

    phase = frame * 0.10

    # Electric field (vertical Y)
    y_e = np.sin(x - phase)

    # Magnetic field (depth Z)
    z_b = np.sin(x - phase)

    # --------------------------------------
    # Plot waves
    # --------------------------------------

    # E field wave
    ax.plot(
        x,
        y_e,
        np.zeros_like(x),
        color='cyan',
        linewidth=3,
        label='E'
    )

    # B field wave
    ax.plot(
        x,
        np.zeros_like(x),
        z_b,
        color='magenta',
        linewidth=3,
        label='B'
    )

    # Propagation axis
    ax.plot(
        x,
        np.zeros_like(x),
        np.zeros_like(x),
        color='white',
        alpha=0.25,
        linewidth=1
    )

    # --------------------------------------
    # Dynamic vectors
    # --------------------------------------

    idx = int((frame * 3) % num_points)

    x0 = x[idx]

    Ey = y_e[idx]
    Bz = z_b[idx]

    # E vector
    ax.quiver(
        x0, 0, 0,
        0, Ey, 0,
        color='cyan',
        linewidth=3,
        arrow_length_ratio=0.15
    )

    # B vector
    ax.quiver(
        x0, 0, 0,
        0, 0, Bz,
        color='magenta',
        linewidth=3,
        arrow_length_ratio=0.15
    )

    # Poynting vector S = E × B
    Sx = Ey * Bz

    ax.quiver(
        x0, 0, 0,
        Sx, 0, 0,
        color='yellow',
        linewidth=4,
        arrow_length_ratio=0.08
    )

    # --------------------------------------
    # Labels
    # --------------------------------------

    ax.text(
        x0,
        Ey,
        0,
        "E",
        color='cyan',
        fontsize=14
    )

    ax.text(
        x0,
        0,
        Bz,
        "B",
        color='magenta',
        fontsize=14
    )

    ax.text(
        x0 + Sx,
        0,
        0,
        "S",
        color='yellow',
        fontsize=14
    )

    # Fixed camera angle
    ax.view_init(elev=20, azim=-70)

    return []


ani = animation.FuncAnimation(
    fig,
    animate,
    frames=5000,
    interval=16,
    blit=False
)

plt.tight_layout()
plt.show()