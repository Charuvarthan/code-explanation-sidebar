import sys
import requests
import json
import datetime
import os

# DeepSeek API details
API_URL = "https://api.deepseek.com/v1/chat/completions"
API_KEY = "sk-4e5423e4c25d4967ab3e80a120d22b2e"
MODEL = "deepseek-chat"

# Step 1: Get selected code from command-line
if len(sys.argv) < 2:
    print("No code received from VS Code.")
    sys.exit(1)

selected_code = sys.argv[1].replace('\\n', '\n')

# Step 2: Prepare DeepSeek request
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

payload = {
    "model": MODEL,
    "messages": [
        {
            "role": "user",
            "content": f"Explain this Python code in a point-wise manner:\n\n{selected_code}"
        }
    ],
    "temperature": 0.7
}

# Step 3: Send the request
response = requests.post(API_URL, headers=headers, json=payload)

if response.status_code != 200:
    print("DeepSeek API error:", response.text)
    sys.exit(1)

data = response.json()
explanation = data['choices'][0]['message']['content']

# ✅ FIX: Use absolute path for backend/notes
script_dir = os.path.dirname(os.path.abspath(__file__))  # backend/
notes_dir = os.path.join(script_dir, "notes")
os.makedirs(notes_dir, exist_ok=True)

timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
filename = os.path.join(notes_dir, f"note_{timestamp}.txt")

with open(filename, "w", encoding="utf-8") as f:
    f.write(explanation)

print("Explanation saved successfully.")
