from pathlib import Path
import joblib
import pandas as pd

from .config import MODEL_PATH, CROPS


class CropModel:

    def __init__(self):
        self.model = None

    def load(self):
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Model not found: {MODEL_PATH}"
            )

        self.model = joblib.load(MODEL_PATH)

    def predict(self, data: dict):

        if self.model is None:
            self.load()

        df = pd.DataFrame([data])

        prediction = self.model.predict(df)[0]

        score = None

        if hasattr(self.model, "predict_proba"):
            probabilities = self.model.predict_proba(df)[0]

            if hasattr(self.model, "classes_"):
                classes = list(self.model.classes_)

                if prediction in classes:
                    index = classes.index(prediction)
                    score = float(probabilities[index])

        if score is None:
            score = 0.0

        return {
            "crop": data["crop"],
            "suitability": str(prediction),
            "score": round(score * 100, 2)
        }

    def rank_crops(self, sensor_data: dict):

        if self.model is None:
            self.load()

        results = []

        for crop in CROPS:

            row = dict(sensor_data)
            row["crop"] = crop

            df = pd.DataFrame([row])

            prediction = self.model.predict(df)[0]

            score = 0.0

            if hasattr(self.model, "predict_proba"):
                probabilities = self.model.predict_proba(df)[0]
                classes = list(self.model.classes_)

                if prediction in classes:
                    index = classes.index(prediction)
                    score = float(probabilities[index])

            results.append({
                "crop": crop,
                "suitability": str(prediction),
                "score": round(score * 100, 2)
            })

        results.sort(
            key=lambda item: item["score"],
            reverse=True
        )

        return results


crop_model = CropModel()