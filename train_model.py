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
file_path = "D:\My Documents\Bharathi Documents\Bobby Mini Project\Dataset\Filtered_PCOS_data.csv"
df = pd.read_csv(file_path)
df

# %%
df.info()

# %%
df['AMH(ng/mL)'] = pd.to_numeric(df['AMH(ng/mL)'], errors='coerce')

# %%
# Check for missing values
df.isna().sum()

# %%
# Fill missing values with median
df.fillna(df.median(), inplace=True)    

# %%
# Define features (X) and target (y)
X = df.drop(columns=['PCOS (Y/N)'])  # All columns except target
y = df['PCOS (Y/N)']  # Target variable

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
joblib.dump(model, "pcos_model.pkl")
joblib.dump(scaler, "scaler.pkl")

# %%



