"""
This script uses the GPT-4o Mini model to analyze a test dataset
with reasoning capabilities.
"""

import openai

# Define the function to analyze the dataset

def analyze_dataset(dataset):
    # Call to GPT-4o Mini model for analysis
    analysis = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": f"Please analyze the following dataset: {dataset}"}
        ]
    )
    return analysis['choices'][0]['message']['content']

# Example use case:
if __name__ == '__main__':
    test_dataset = "path/to/test_dataset.csv"
    # Call the analyze function
    results = analyze_dataset(test_dataset)
    print(results)
