"""
SYNTHETIC PROTOTYPE DATA ONLY.

Purpose:
- verify that the training/evaluation/prediction pipeline works before sensors arrive.

Do NOT use the resulting accuracy as the final thesis result.
"""

from pathlib import Path
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)

crops = {
    "rice":        (26, 30, 70, 90, 5.5, 7.0),
    "corn":        (22, 30, 55, 80, 5.5, 7.2),
    "cassava":     (24, 30, 50, 75, 5.0, 7.5),
    "eggplant":    (24, 30, 55, 80, 5.5, 7.0),
    "tomato":      (20, 28, 50, 75, 5.5, 7.5),
    "string_beans":(20, 30, 55, 80, 5.5, 7.5),
}

rows = []

for crop, (tmin, tmax, hmin, hmax, phmin, phmax) in crops.items():
    for _ in range(400):
        t = rng.uniform(18, 35)
        h = rng.uniform(35, 95)
        ph = rng.uniform(4.2, 8.2)
        sm = rng.uniform(15, 90)
        st = t + rng.normal(0, 1.5)

        # Prototype scoring rule used ONLY to exercise the pipeline.
        matches = sum([
            tmin <= t <= tmax,
            hmin <= h <= hmax,
            phmin <= ph <= phmax,
            30 <= sm <= 75,
        ])

        if matches >= 4:
            label = "suitable"
        elif matches >= 2:
            label = "moderately_suitable"
        else:
            label = "not_suitable"

        rows.append({
            "air_temperature_c": t,
            "air_humidity_pct": h,
            "soil_temperature_c": st,
            "soil_moisture_pct": sm,
            "soil_ec_ms_cm": rng.uniform(0.1, 3.0),
            "soil_salinity": rng.uniform(0.1, 2.5),
            "soil_n_mg_kg": rng.uniform(20, 180),
            "soil_p_mg_kg": rng.uniform(5, 100),
            "soil_k_mg_kg": rng.uniform(20, 220),
            "soil_ph": ph,
            "crop": crop,
            "suitability": label,
        })

out = Path("data/processed/training.csv")
out.parent.mkdir(parents=True, exist_ok=True)
pd.DataFrame(rows).to_csv(out, index=False)
print(f"Created {len(rows)} synthetic rows: {out}")
print("REMINDER: synthetic accuracy is not a thesis result.")
