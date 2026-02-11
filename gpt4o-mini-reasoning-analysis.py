# gpt4o-mini-reasoning-analysis.py

"""
This script leverages GPT-4o Mini for analyzing subscription datasets
with extended reasoning capabilities.
"""

import os
import pandas as pd
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Load your subscription dataset
# Replace 'path_to_your_dataset.csv' with your actual dataset path
dataset_path = 'path_to_your_dataset.csv'
subscription_data = pd.read_csv(dataset_path)


def analyze_subscriptions(data):
    results = []
    for index, row in data.iterrows():
        analysis_input = f"Analyze the following subscription details: {row}\n"
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {'role': 'user', 'content': analysis_input}
            ],
            max_tokens=150
        )
        results.append(response.choices[0].message.content)
    return results


# Perform analysis on the entire dataset
analysis_results = analyze_subscriptions(subscription_data)

# Output the analysis results
for result in analysis_results:
    print(result)