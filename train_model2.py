# %%
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# %%
df = pd.read_csv(r"D:\My Documents\Bharathi Documents\Bobby Mini Project\Dataset\PCOD_data.csv")
df

# %%
df.info()

# %%
df.isna().sum()

# %%
# Define features (X) and target (y)
X = df.drop(columns=['pcod_diagnosis'])  # All columns except target
y = df['pcod_diagnosis']  # Target variable

# %%
# Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# %%
# Standardize the features (normalize data for better performance)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# %%
# Train a Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# %%
# Predict on test data
y_pred = model.predict(X_test)

# %%
# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# %%
# Save trained model (for integration with React & FastAPI)
import joblib
joblib.dump(model, "pcod_model.pkl")
joblib.dump(scaler, "pcod_scaler.pkl")


