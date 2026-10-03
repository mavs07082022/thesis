from pydantic import BaseModel, Field


class SensorInput(BaseModel):
    air_temperature_c: float = Field(..., description="Air temperature in Celsius")
    air_humidity_pct: float = Field(..., description="Air humidity percentage")

    soil_temperature_c: float = Field(..., description="Soil temperature in Celsius")
    soil_moisture_pct: float = Field(..., description="Soil moisture percentage")

    soil_ec_ms_cm: float = Field(..., description="Soil electrical conductivity")
    soil_salinity: float = Field(..., description="Soil salinity")

    soil_n_mg_kg: float = Field(..., description="Nitrogen")
    soil_p_mg_kg: float = Field(..., description="Phosphorus")
    soil_k_mg_kg: float = Field(..., description="Potassium")

    soil_ph: float = Field(..., description="Soil pH")


class PredictionRequest(SensorInput):
    crop: str


class CropPrediction(BaseModel):
    crop: str
    suitability: str
    score: float


class PredictionResponse(BaseModel):
    crop: str
    suitability: str
    score: float


class RankingResponse(BaseModel):
    predictions: list[CropPrediction]