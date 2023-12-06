import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load the data
data = pd.read_excel('RunningResult.xlsx')  # Replace with the path to your Excel file

# Create a new column 'Series' that concatenates 'Algorithm' and 'Parameter'
data['Series'] = data['Algorithm'] + '_' + data['Parameter']

# Set up the plot with increased size
plt.figure(figsize=(15, 8))

# Scale factor to fit x-axis in the range 0-5
scale_factor = len(data) / 5

# Group the data by the new 'Series' column and plot each as a separate line
for series, group in data.groupby('Series'):
    # Scale the x-axis data
    scaled_x = np.arange(len(group)) / scale_factor
    plt.plot(scaled_x, group['Score'], label=series, linestyle='dashed')  # Increased line thickness
    # Add data labels
    for x, y in zip(scaled_x, group['Score']):
        plt.text(x, y, f'{y:.0f}', fontsize=8, ha='right')  # Adjusted text alignment for clarity

# Add labels and title
plt.xlabel('Scaled Observation (0-5)')
plt.ylabel('Score')
plt.title('Multi-Series Line Chart of Scores')
plt.legend()

# Save the plot as an image file
plt.savefig('multi_series_line_chart.png')

# Show the plot
plt.show()
