from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = ROOT_DIR / "models" / "crop_suitability_model.joblib"

CROPS = [
    "rice",
    "corn",
    "cassava",
    "eggplant",
    "tomato",
    "string_beans"
]