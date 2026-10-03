"""
Builds a historical training dataset for crop suitability prediction.

Merges:
  1. PSA production data (Rizal province rows)
  2. NASA POWER daily weather (aggregated to yearly)
  3. Heuristic suitability labels based on crop requirement ranges

Output: data/processed/crop_data.csv
"""
import pandas as pd
import numpy as np
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
OUT = ROOT / "data" / "processed"
OUT.mkdir(parents=True, exist_ok=True)


# ---------------------------------------------------------------
# 1. Parse PSA Production Data
# ---------------------------------------------------------------
def parse_psa_long(path: Path, crop_name_map: dict) -> pd.DataFrame:
    """Parses a PSA-wide CSV into long format."""
    if not path.exists():
        print(f"   [SKIP] Missing {path.name}")
        return pd.DataFrame()

    # PSA uses semicolon as delimiter
    df = pd.read_csv(path, sep=";", quoting=1, skiprows=1, engine="python")
    df.columns = [str(c).strip().strip('"') for c in df.columns]

    # Identify year columns
    year_cols = [c for c in df.columns if re.match(r"^\d{4}(\s+Annual)?$", c)]
    if not year_cols:
        print(f"   [WARN] No year columns in {path.name}")
        return pd.DataFrame()

    # First two columns are crop name and geolocation
    crop_col = df.columns[0]
    geo_col = df.columns[1]

    df["crop_raw"] = df[crop_col].astype(str).str.strip().str.strip('"')
    df["geo"] = df[geo_col].astype(str).str.strip().str.strip('"')

    # Filter to Rizal rows only
    rizal = df[df["geo"].str.contains("Rizal", case=False, na=False)].copy()
    print(f"   {path.name}: {len(rizal)} Rizal rows")

    # Normalize crop names
    def normalize(name: str):
        name_lower = name.lower()
        # Skip region/province rows (start with dots)
        if name_lower.startswith(".") or name_lower == "philippines":
            return None
        for key, canonical in crop_name_map.items():
            if key in name_lower:
                return canonical
        return None

    rizal["crop"] = rizal["crop_raw"].apply(normalize)
    rizal = rizal[rizal["crop"].notna()]

    if rizal.empty:
        print(f"   [WARN] No matching crops in {path.name}")
        return pd.DataFrame()

    # Melt to long format
    records = []
    for _, row in rizal.iterrows():
        for col in year_cols:
            year_match = re.match(r"^(\d{4})", col)
            if not year_match:
                continue
            year = int(year_match.group(1))
            try:
                value = float(str(row[col]).replace(",", "").strip())
            except (ValueError, AttributeError):
                continue
            records.append({
                "year": year,
                "crop": row["crop"],
                "production_tons": value,
            })

    return pd.DataFrame(records)


# ---------------------------------------------------------------
# 2. Parse NASA POWER Weather Data
# ---------------------------------------------------------------
def parse_nasa_weather(path: Path) -> pd.DataFrame:
    """Reads NASA POWER daily CSV, aggregates to yearly."""
    if not path.exists():
        print(f"   [SKIP] Missing {path.name}")
        return pd.DataFrame()

    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    header_idx = None
    for i, line in enumerate(lines):
        if line.startswith("YEAR,MO,DY"):
            header_idx = i
            break

    if header_idx is None:
        print(f"   [WARN] No header in {path.name}")
        return pd.DataFrame()

    df = pd.read_csv(path, skiprows=header_idx)
    df.columns = [c.strip() for c in df.columns]
    df = df.replace(-999, np.nan).dropna(subset=["T2M", "RH2M"])

    yearly = df.groupby("YEAR").agg(
        temperature=("T2M", "mean"),
        humidity=("RH2M", "mean"),
    ).reset_index().rename(columns={"YEAR": "year"})

    yearly["temperature"] = yearly["temperature"].round(2)
    yearly["humidity"] = yearly["humidity"].round(2)

    print(f"   {path.name}: {len(yearly)} years aggregated")
    return yearly


# ---------------------------------------------------------------
# 3. Crop Ideal Conditions (for labeling)
# ---------------------------------------------------------------
CROP_IDEALS = {
    "rice":         {"ph": 6.25, "moist": 80, "temp": 27, "hum": 80},
    "corn":         {"ph": 6.40, "moist": 60, "temp": 25, "hum": 70},
    "cassava":      {"ph": 5.50, "moist": 50, "temp": 30, "hum": 65},
    "eggplant":     {"ph": 6.30, "moist": 70, "temp": 26, "hum": 75},
    "tomatoes":     {"ph": 6.40, "moist": 70, "temp": 24, "hum": 70},
    "string_beans": {"ph": 6.75, "moist": 60, "temp": 25, "hum": 70},
}

# Typical soil pH for Rizal province
RIZAL_SOIL_PH = 6.2
RIZAL_SOIL_MOISTURE = 65.0
RIZAL_RAINFALL = 200.0


def label_from_deviation(crop: str, temperature: float, humidity: float) -> int:
    """Labels based on distance from crop ideal temp & humidity."""
    ideal = CROP_IDEALS[crop]
    temp_dev = abs(temperature - ideal["temp"])
    hum_dev = abs(humidity - ideal["hum"])

    if temp_dev <= 2 and hum_dev <= 5:
        return 2  # Suitable
    if temp_dev <= 5 and hum_dev <= 12:
        return 1  # Moderate
    return 0  # Not Suitable


# ---------------------------------------------------------------
# 4. Main
# ---------------------------------------------------------------
def main():
    print("=" * 60)
    print("  BUILDING HISTORICAL TRAINING DATASET")
    print("=" * 60)

    crop_name_map = {
        "palay": "rice",
        "corn": "corn",
        "cassava": "cassava",
        "eggplant": "eggplant",
        "tomato": "tomatoes",
        "sitao": "string_beans",
        "stringbean": "string_beans",
    }

    print("\n[1/4] Parsing PSA production data...")
    palay_corn = parse_psa_long(
        RAW / "psa_palay_corn_production.csv", crop_name_map
    )
    vegetables = parse_psa_long(
        RAW / "psa_vegetable_root_production.csv", crop_name_map
    )
    production = pd.concat([palay_corn, vegetables], ignore_index=True)
    print(f"   --> Total: {len(production)} production records")

    print("\n[2/4] Parsing NASA weather data...")
    power_files = list(RAW.glob("POWER_Point_Daily_*.csv"))
    if not power_files:
        raise FileNotFoundError("No POWER_Point_Daily_*.csv in data/raw/")
    weather = parse_nasa_weather(power_files[0])

    if production.empty or weather.empty:
        raise RuntimeError("Missing production or weather data.")

    print("\n[3/4] Merging production with weather by year...")
    merged = production.merge(weather, on="year", how="inner")
    print(f"   --> {len(merged)} merged rows")

    print("\n[4/4] Generating suitability labels + augmentation...")

    merged["soil_ph"] = RIZAL_SOIL_PH
    merged["soil_moisture"] = RIZAL_SOIL_MOISTURE
    merged["rainfall"] = RIZAL_RAINFALL

    merged["suitability"] = merged.apply(
        lambda row: label_from_deviation(
            row["crop"], row["temperature"], row["humidity"]
        ),
        axis=1,
    )

    final = merged[[
        "soil_ph", "soil_moisture", "temperature",
        "humidity", "rainfall", "crop", "suitability",
    ]]

    # Augmentation: 9x rows with realistic noise
    augmented = []
    for _, row in final.iterrows():
        augmented.append(row.to_dict())
        for _ in range(8):
            new_row = row.to_dict()
            new_row["soil_ph"] = round(np.clip(row["soil_ph"] + np.random.normal(0, 0.4), 0, 14), 2)
            new_row["soil_moisture"] = round(np.clip(row["soil_moisture"] + np.random.normal(0, 8), 0, 100), 1)
            new_row["temperature"] = round(np.clip(row["temperature"] + np.random.normal(0, 1.5), -5, 55), 1)
            new_row["humidity"] = round(np.clip(row["humidity"] + np.random.normal(0, 6), 0, 100), 1)
            new_row["rainfall"] = round(max(0, row["rainfall"] + np.random.normal(0, 20)), 1)
            new_row["suitability"] = label_from_deviation(
                row["crop"], new_row["temperature"], new_row["humidity"]
            )
            augmented.append(new_row)

    out_df = pd.DataFrame(augmented)
    out_path = OUT / "crop_data.csv"
    out_df.to_csv(out_path, index=False)

    # Copy to raw for prepare_data.py
    raw_path = RAW / "crop_data.csv"
    out_df.to_csv(raw_path, index=False)

    print(f"\n   --> Wrote {len(out_df)} rows to:")
    print(f"       {out_path}")
    print(f"       {raw_path}")

    print("\n[SUCCESS] Class distribution:")
    print(out_df["suitability"].value_counts().sort_index().to_string())

    print("\n[SUCCESS] Rows per crop:")
    print(out_df["crop"].value_counts().to_string())

    print("\n" + "=" * 60)
    print("  DONE. Next: python src/prepare_data.py")
    print("=" * 60)


if __name__ == "__main__":
    main()