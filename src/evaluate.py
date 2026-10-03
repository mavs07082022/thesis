from pathlib import Path
import joblib
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
)

DATA = Path("data/processed/training.csv")
MODEL = Path("models/crop_suitability_model.joblib")
OUT = Path("reports/confusion_matrix.png")

FEATURES = [
    "air_temperature_c",
    "air_humidity_pct",
    "soil_temperature_c",
    "soil_moisture_pct",
    "soil_ec_ms_cm",
    "soil_salinity",
    "soil_n_mg_kg",
    "soil_p_mg_kg",
    "soil_k_mg_kg",
    "soil_ph",
    "crop",
]
TARGET = "suitability"

def main():
    df = pd.read_csv(DATA).dropna(subset=FEATURES + [TARGET])
    model = joblib.load(MODEL)

    # NOTE: This is a simple evaluation of the saved pipeline.
    # For publication-grade evaluation, keep a completely untouched
    # external test set in addition to this train/test split.
    X = df[FEATURES]
    y = df[TARGET]

    pred = model.predict(X)

    print(classification_report(y, pred))

    cm = confusion_matrix(y, pred, labels=model.classes_)
    disp = ConfusionMatrixDisplay(cm, display_labels=model.classes_)
    disp.plot(xticks_rotation=30)
    plt.tight_layout()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(OUT, dpi=200)
    plt.close()
    print(f"Saved: {OUT}")

if __name__ == "__main__":
    main()
