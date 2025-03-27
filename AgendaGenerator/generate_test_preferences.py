import pandas as pd
import random

# Generate sample investors and startups
investors = [f"Investor {i+1}" for i in range(48)]
startups = [f"Startup {i+1}" for i in range(45)]

# Create the dataset
data = []
for investor in investors:
    preferences = random.sample(startups, k=random.randint(12, 26))  # 12-26 preferences
    row = [investor, "Investor", f"{investor.lower().replace(' ', '_')}@email.com", random.randint(1, 1000)] + preferences
    data.append(row)

for startup in startups:
    preferences = random.sample(investors, k=random.randint(12, 26))  # 12-26 preferences
    row = [startup, "Startup", f"{startup.lower().replace(' ', '_')}@email.com", random.randint(1, 1000)] + preferences
    data.append(row)

# Define column headers
columns = ["Organisation", "Type", "Email", "Time Created"] + [f"Preference {i+1}" for i in range(26)]

# Create DataFrame and save to CSV
df = pd.DataFrame(data, columns=columns)
df.to_csv("sample_preferences.csv", index=False)

print("Sample preference CSV generated: sample_preferences.csv")
