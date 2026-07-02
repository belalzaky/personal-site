"""
Reproduces the FAERS Signal Detection disproportionality chart as an
interactive Plotly horizontal bar chart and exports it to
public/charts/faers-signal.html.

Data is read directly from the static PNG (faers-signal.png) — same pairs,
same PRR values, same signal/negative-control classification.
"""

import pathlib
import plotly.graph_objects as go

# ---------------------------------------------------------------------------
# Data — exact values from faers-signal.png
# (pair, PRR, is_signal)
# Order: bottom → top matches the original chart (Warfarin at bottom)
# ---------------------------------------------------------------------------
pairs = [
    ("Warfarin → Haemorrhage",         5.2, True),
    ("Methotrexate → Hepatotoxicity",   3.8, True),
    ("SSRIs → Serotonin syndrome",      4.1, True),
    ("Metformin → Alopecia",            0.9, False),
    ("Ibuprofen → Bradycardia",         1.1, False),
]

ACCENT   = "#2546f0"   # signal bars
MUTED    = "#9a9a96"   # negative-control bars
THRESH   = "#6b6b68"   # threshold line + annotation
THRESHOLD = 2.0

labels    = [p[0] for p in pairs]
prrs      = [p[1] for p in pairs]
colors    = [ACCENT if p[2] else MUTED for p in pairs]
statuses  = ["Signal" if p[2] else "Negative control" for p in pairs]

# ---------------------------------------------------------------------------
# Figure
# ---------------------------------------------------------------------------
fig = go.Figure()

fig.add_trace(go.Bar(
    x=prrs,
    y=labels,
    orientation="h",
    marker_color=colors,
    text=[str(v) for v in prrs],
    textposition="outside",
    textfont=dict(size=13, color="#1a1a1a"),
    hovertemplate=(
        "<b>%{y}</b><br>"
        "PRR: <b>%{x}</b><br>"
        "Classification: %{customdata}<extra></extra>"
    ),
    customdata=statuses,
))

# Threshold line
fig.add_vline(
    x=THRESHOLD,
    line_dash="dash",
    line_color=THRESH,
    line_width=1.5,
    annotation_text="Signal threshold (PRR = 2)",
    annotation_position="top right",
    annotation_font=dict(size=11, color=THRESH),
)

fig.update_layout(
    title=dict(
        text="Disproportionality analysis: signals vs. negative controls",
        font=dict(size=18, color="#1a1a1a"),
        x=0,
        xanchor="left",
    ),
    font=dict(
        family="Inter, -apple-system, 'Segoe UI', sans-serif",
        size=14,
        color="#1a1a1a",
    ),
    paper_bgcolor="#ffffff",
    plot_bgcolor="#ffffff",
    margin=dict(l=70, r=40, t=70, b=50),
    xaxis=dict(
        range=[0, 6.5],
        gridcolor="#e6e6e3",
        zeroline=False,
        linecolor="#e6e6e3",
        title="Proportional Reporting Ratio (PRR)",
    ),
    yaxis=dict(
        gridcolor="#ffffff",
        zeroline=False,
    ),
    hoverlabel=dict(
        bgcolor="#1a1a1a",
        font=dict(color="#ffffff", family="Inter"),
    ),
    showlegend=False,
)

# ---------------------------------------------------------------------------
# Export
# ---------------------------------------------------------------------------
out = pathlib.Path(__file__).parents[2] / "public" / "charts" / "faers-signal.html"
out.parent.mkdir(parents=True, exist_ok=True)

fig.write_html(
    str(out),
    include_plotlyjs="cdn",
    full_html=True,
    config={"displayModeBar": False, "responsive": True},
)

print(f"Written → {out}")
