"""
This script uses the GPT-4o Mini model to analyze a test dataset
with reasoning capabilities.
"""

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_dataset(dataset):
    """Call GPT-4o Mini model for analysis."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": f"Please analyze the following dataset: {dataset}"}
        ]
    )
    return response.choices[0].message.content


if __name__ == '__main__':
    test_dataset = "path/to/test_dataset.csv"
    results = analyze_dataset(test_dataset)
    print(results)
