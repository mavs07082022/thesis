from pathlib import Path
import pandas as pd

RAW = Path("data/raw")
OUT = Path("data/processed/training.csv")

# Mapping for common Kaggle Crop Recommendation Dataset names.
# This creates a PROTOTYPE-compatible schema only.
COLUMN_MAP = {
    "N": "soil_n_mg_kg",
    "P": "soil_p_mg_kg",
    "K": "soil_k_mg_kg",
    "temperature": "air_temperature_c",
    "humidity": "air_humidity_pct",
    "ph": "soil_ph",
}

CROP_MAP = {
    "maize": "corn",
    "corn": "corn",
    "rice": "rice",
}

def main():
    files = list(RAW.glob("*.csv"))
    if not files:
        raise FileNotFoundError("No CSV found in data/raw/")

    source = files[0]
    df = pd.read_csv(source, sep=None, engine="python")
    df = df.rename(columns={k: v for k, v in COLUMN_MAP.items() if k in df.columns})

    if "crop" not in df.columns:
        for candidate in ["Crop", "label", "Label", "crop_name"]:
            if candidate in df.columns:
                df = df.rename(columns={candidate: "crop"})
                break

    if "crop" not in df.columns:
        raise ValueError("No crop/label column found.")

    df["crop"] = df["crop"].astype(str).str.strip().str.lower().map(
        lambda x: CROP_MAP.get(x, x)
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(OUT, index=False)
    print(f"Saved: {OUT}")
    print(df.head())
    print("\nColumns:", list(df.columns))

if __name__ == "__main__":
    main()
