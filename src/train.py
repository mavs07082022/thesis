from pathlib import Path
import json
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

DATA = Path("data/processed/training.csv")
MODEL = Path("models/crop_suitability_model.joblib")
REPORT = Path("reports/training_summary.json")

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
    df = pd.read_csv(DATA)

    missing = [c for c in FEATURES + [TARGET] if c not in df.columns]
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    df = df.dropna(subset=FEATURES + [TARGET]).copy()

    X = df[FEATURES]
    y = df[TARGET]

    categorical = ["crop"]
    numeric = [c for c in FEATURES if c not in categorical]

    preprocessor = ColumnTransformer(
        transformers=[
            ("crop", OneHotEncoder(handle_unknown="ignore"), categorical),
            ("numeric", "passthrough", numeric),
        ]
    )

    classifier = RandomForestClassifier(
        n_estimators=300,
        random_state=42,
        class_weight="balanced",
        n_jobs=-1,
    )

    pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("classifier", classifier),
    ])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.20,
        random_state=42,
        stratify=y,
    )

    pipeline.fit(X_train, y_train)
    pred = pipeline.predict(X_test)

    accuracy = accuracy_score(y_test, pred)
    report = classification_report(y_test, pred, output_dict=True)

    MODEL.parent.mkdir(parents=True, exist_ok=True)
    REPORT.parent.mkdir(parents=True, exist_ok=True)

    joblib.dump(pipeline, MODEL)

    summary = {
        "rows_total": len(df),
        "rows_train": len(X_train),
        "rows_test": len(X_test),
        "features": FEATURES,
        "classes": sorted(y.unique().tolist()),
        "accuracy": accuracy,
        "classification_report": report,
        "random_forest": {
            "n_estimators": 300,
            "random_state": 42,
            "class_weight": "balanced"
        }
    }

    REPORT.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    print(f"Accuracy: {accuracy:.4f}")
    print(classification_report(y_test, pred))
    print(f"Model saved to: {MODEL}")
    print(f"Summary saved to: {REPORT}")

if __name__ == "__main__":
    main()
