# AI Crop Suitability Prediction System

PC-first training project for:
AI-Driven Crop Suitability Prediction System for Multi-Crop Farms in Macabud, Montalban, Rizal.

Target crops:
- rice
- corn
- cassava
- eggplant
- tomato
- string_beans

## Important research rule

The `make_prototype_dataset.py` script creates SYNTHETIC data only to test that the software pipeline works. Do NOT report its accuracy as the thesis model's real performance.

For the thesis model, replace the prototype data with documented agricultural observations/datasets and a defensible suitability-labeling method.

## Recommended workflow

1. Install Python and VS Code.
2. Put a real dataset in `data/raw/`.
3. Run `python src/prepare_data.py`.
4. Run `python src/train.py`.
5. Run `python src/evaluate.py`.
6. Run `python src/predict.py`.
7. When the sensors arrive, collect real YAGO/SHT35 readings and append them to a controlled dataset.
8. Retrain/validate the final model using the real study data.
9. Copy the final `.joblib` model to the Raspberry Pi for inference.

## Prototype

If you have no dataset yet:

    python src/make_prototype_dataset.py
    python src/train.py
    python src/evaluate.py

The prototype is only for software setup and debugging.

## Expected real-data columns

The final deployment-oriented schema is:

air_temperature_c
air_humidity_pct
soil_temperature_c
soil_moisture_pct
soil_ec_ms_cm
soil_salinity
soil_n_mg_kg
soil_p_mg_kg
soil_k_mg_kg
soil_ph
crop
suitability

The YAGO/SHT35 may not provide every field in every hardware variant. Do not invent unavailable sensor readings. Record which fields are measured, externally sourced, or unavailable.

## Output

The trained pipeline is saved as:

models/crop_suitability_model.joblib

It includes preprocessing and the Random Forest model so the same transformations are used during inference.
