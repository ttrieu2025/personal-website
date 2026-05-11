import numpy as np
import matplotlib.pyplot as plt

# ==========================================
# 1D Gaussian Wave Packet Schrodinger Simulation
# ==========================================

# Naturalized units for visualization:
# hbar = 1, m = 1. A one-dimensional Gaussian
# wave packet is shown as a complex 3D spiral:
# x-position, Re(psi), and Im(psi).

# Wave parameters
num_points = 850
x_min = -36
x_max = 36
x = np.linspace(x_min, x_max, num_points)

x0 = -13
sigma = 4.4
k0 = 1.75
omega = 0.08
radius_scale = 1.0
phase_speed = 1.6
max_frame = 700
pause_at_end_frames = 45

# Projection offsets
y_floor = -1.55
z_floor = -1.15
z_back = 1.65
x_side = x_min

# Figure setup
fig = plt.figure(figsize=(14, 7), facecolor='black')
ax = fig.add_subplot(111, projection='3d', facecolor='black')

# Axis limits
ax.set_xlim(x_min, x_max)
ax.set_ylim(y_floor, 1.8)
ax.set_zlim(-1.8, z_back)

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
ax.view_init(elev=19, azim=-64)


# ------------------------------------------
# Schrodinger wave packet
# ------------------------------------------

def wave_packet(frame):

    time = frame * omega

    # Free-particle Gaussian packet in hbar = m = 1 units.
    spread = np.sqrt(1 + (time / sigma ** 2) ** 2)
    width = sigma * spread
    center = x0 + 0.9 * k0 * time

    envelope = np.exp(-((x - center) ** 2) / (2 * width ** 2))
    envelope = envelope / envelope.max()

    phase = k0 * (x - center) - phase_speed * 0.5 * (k0 ** 2) * time
    psi = envelope * np.exp(1j * phase)
    probability = envelope ** 2

    return psi, envelope, probability, center


# ------------------------------------------
# Static scene
# ------------------------------------------

def plot_edge(xs, ys, zs, color, alpha):

    ax.plot(
        xs,
        ys,
        zs,
        color=color,
        alpha=alpha,
        linewidth=0.8
    )


def draw_box():

    x0_box, x1_box = x_min, x_max
    y0_box, y1_box = y_floor, 1.65
    z0_box, z1_box = z_floor, z_back

    # Back rectangle
    plot_edge([x0_box, x1_box], [y1_box, y1_box], [z0_box, z0_box], 'cyan', 0.22)
    plot_edge([x0_box, x1_box], [y1_box, y1_box], [z1_box, z1_box], 'cyan', 0.22)
    plot_edge([x0_box, x0_box], [y1_box, y1_box], [z0_box, z1_box], 'cyan', 0.22)
    plot_edge([x1_box, x1_box], [y1_box, y1_box], [z0_box, z1_box], 'cyan', 0.22)

    # Floor rectangle
    plot_edge([x0_box, x1_box], [y0_box, y0_box], [z0_box, z0_box], 'yellow', 0.26)
    plot_edge([x0_box, x1_box], [y1_box, y1_box], [z0_box, z0_box], 'yellow', 0.18)
    plot_edge([x0_box, x0_box], [y0_box, y1_box], [z0_box, z0_box], 'yellow', 0.26)
    plot_edge([x1_box, x1_box], [y0_box, y1_box], [z0_box, z0_box], 'yellow', 0.26)

    # Left side rectangle
    plot_edge([x0_box, x0_box], [y0_box, y1_box], [z0_box, z0_box], 'magenta', 0.26)
    plot_edge([x0_box, x0_box], [y0_box, y1_box], [z1_box, z1_box], 'magenta', 0.26)
    plot_edge([x0_box, x0_box], [y0_box, y0_box], [z0_box, z1_box], 'magenta', 0.26)
    plot_edge([x0_box, x0_box], [y1_box, y1_box], [z0_box, z1_box], 'magenta', 0.26)


draw_box()

# Static baselines
ax.plot(
    x,
    np.zeros_like(x),
    np.zeros_like(x),
    color='cyan',
    alpha=0.72,
    linewidth=2.4
)

ax.plot(
    x,
    np.full_like(x, y_floor),
    np.full_like(x, z_floor),
    color='yellow',
    alpha=0.7,
    linewidth=1.8
)

# Animated artists
main_line, = ax.plot([], [], [], color='cyan', linewidth=3, alpha=0.98)
glow_line, = ax.plot([], [], [], color='white', linewidth=0.7, alpha=0.2)
back_projection, = ax.plot([], [], [], color='magenta', linewidth=2.3, alpha=0.86)
floor_projection, = ax.plot([], [], [], color='yellow', linewidth=2.8, alpha=0.96)
side_projection, = ax.plot([], [], [], color='cyan', linewidth=2.7, alpha=0.95)

envelope_y_top, = ax.plot([], [], [], color='cyan', linewidth=1.3, alpha=0.28)
envelope_y_bottom, = ax.plot([], [], [], color='cyan', linewidth=1.3, alpha=0.28)
envelope_z_top, = ax.plot([], [], [], color='magenta', linewidth=1.3, alpha=0.24)
envelope_z_bottom, = ax.plot([], [], [], color='magenta', linewidth=1.3, alpha=0.24)
motion_line, = ax.plot([], [], [], color='white', linewidth=2.5, alpha=0.65)


# ------------------------------------------
# Main animation function
# ------------------------------------------

def animate(frame):

    # --------------------------------------
    # Wave function values
    # --------------------------------------

    psi, envelope, probability, center = wave_packet(frame)

    real_part = np.real(psi) * radius_scale
    imaginary_part = np.imag(psi) * radius_scale
    envelope = envelope * radius_scale

    # --------------------------------------
    # Update wave packet
    # --------------------------------------

    main_line.set_data_3d(x, real_part, imaginary_part)
    glow_line.set_data_3d(x, real_part, imaginary_part)

    back_projection.set_data_3d(x, real_part, np.full_like(x, z_back))
    floor_projection.set_data_3d(x, y_floor + probability * 0.82, np.full_like(x, z_floor))
    # Project the visible part of the wave packet onto the left side plane.
    side_mask = envelope > 0.06
    side_projection.set_data_3d(
        np.full(np.count_nonzero(side_mask), x_side),
        real_part[side_mask],
        imaginary_part[side_mask]
    )

    envelope_y_top.set_data_3d(x, envelope, np.zeros_like(x))
    envelope_y_bottom.set_data_3d(x, -envelope, np.zeros_like(x))
    envelope_z_top.set_data_3d(x, np.zeros_like(x), envelope)
    envelope_z_bottom.set_data_3d(x, np.zeros_like(x), -envelope)

    motion_line.set_data_3d(
        [center, center + 3.5],
        [0, 0],
        [0, 0]
    )

    ax.view_init(elev=19, azim=-64)

    return [
        main_line,
        glow_line,
        back_projection,
        floor_projection,
        side_projection,
        envelope_y_top,
        envelope_y_bottom,
        envelope_z_top,
        envelope_z_bottom,
        motion_line,
    ]


def run_animation():

    frame = 0
    end_pause = 0
    plt.tight_layout()
    plt.ion()
    plt.show(block=False)

    try:
        while plt.fignum_exists(fig.number):
            animate(frame)
            fig.canvas.draw_idle()
            plt.pause(0.01)

            if frame >= max_frame:
                end_pause += 1

                if end_pause >= pause_at_end_frames:
                    frame = 0
                    end_pause = 0
            else:
                frame += 1
    except KeyboardInterrupt:
        pass
    except Exception as error:
        # TkAgg can raise a harmless "pyimage" error when the window closes
        # while a frame is being drawn. Suppress only that close-time error.
        if "pyimage" not in str(error):
            raise
    finally:
        plt.close(fig)


if __name__ == "__main__":
    run_animation()
