@echo off
echo === Creating prototype dataset ===
python src\make_prototype_dataset.py

echo.
echo === Training ===
python src\train.py

echo.
echo === Evaluation ===
python src\evaluate.py

echo.
echo === Prediction ===
python src\predict.py

pause
