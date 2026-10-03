import joblib
import pandas as pd

MODEL = "models/crop_suitability_model.joblib"

model = joblib.load(MODEL)

# Replace these example values with real sensor/API values later.
base = {
    "air_temperature_c": 28.0,
    "air_humidity_pct": 75.0,
    "soil_temperature_c": 27.0,
    "soil_moisture_pct": 55.0,
    "soil_ec_ms_cm": 0.8,
    "soil_salinity": 0.5,
    "soil_n_mg_kg": 80.0,
    "soil_p_mg_kg": 40.0,
    "soil_k_mg_kg": 120.0,
    "soil_ph": 6.2,
}

crops = ["rice", "corn", "cassava", "eggplant", "tomato", "string_beans"]

rows = []
for crop in crops:
    row = dict(base)
    row["crop"] = crop
    rows.append(row)

X = pd.DataFrame(rows)
pred = model.predict(X)

print("\nCrop suitability:")
for crop, result in zip(crops, pred):
    print(f"{crop:15} -> {result}")

if hasattr(model, "predict_proba"):
    probabilities = model.predict_proba(X)
    class_names = list(model.classes_)

    print("\nModel probability for predicted class:")
    scored = []
    for crop, result, probs in zip(crops, pred, probabilities):
        score = float(probs[class_names.index(result)])
        scored.append((crop, result, score))

    for crop, result, score in sorted(scored, key=lambda x: x[2], reverse=True):
        print(f"{crop:15} -> {result:22} {score:.2%}")
