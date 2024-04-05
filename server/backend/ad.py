import pandas as pd
from adtk.detector import SeasonalAD
from adtk.data import validate_series
import matplotlib.pyplot as plt

# Load log data
with open('info.log', 'r') as file:
    log_lines = file.readlines()

# Parse log data into DataFrame
log_data = [eval(line.strip()) for line in log_lines]  # Convert JSON strings to dictionaries
df = pd.DataFrame(log_data)

# Filter to include only entries where the "level" is "error"
error_df = df[df['level'] == 'error'].copy()  # Create a copy of the DataFrame

# Convert timestamp column to datetime and set it as index
error_df['timestamp'] = pd.to_datetime(error_df['timestamp'])
error_df.set_index('timestamp', inplace=True)  # Set timestamp as index

# Print information about the timestamp range
print("Timestamp range:")
print(error_df.index.min(), "to", error_df.index.max())

# Resample the data to hourly frequency (adjust as needed)
resampled_error_df = error_df.resample('H').size()

# Validate series
resampled_error_df = validate_series(resampled_error_df)

# Print the resampled data
print("\nResampled Data:")
print(resampled_error_df.head())

# Create a SeasonalAD detector
detector = SeasonalAD()

# Predict anomaly scores
anomalies = detector.fit_detect(resampled_error_df)

# Plot the time series data and anomalies
plt.figure(figsize=(12, 6))
plt.plot(resampled_error_df.index, resampled_error_df.values, label='Log Data')
plt.scatter(anomalies[anomalies == True].index, resampled_error_df[anomalies == True].values, color='red', label='Anomaly')
plt.xlabel('Timestamp')
plt.ylabel('Frequency of Error Logs')
plt.title('Log Data with Anomalies Detected (SeasonalAD)')
plt.legend()
plt.grid(True)
plt.show()
