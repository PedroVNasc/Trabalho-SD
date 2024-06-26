import json
import requests
import time

# Constants
API_BASE_URL = "http://portal:3000"  # Replace with your actual API base URL
JSON_FILE_PATH = "data.json"  # Path to your large JSON file

# Function to send data to the API
def send_data(endpoint, data):
    url = f"{API_BASE_URL}/{endpoint}"
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print(f"Successfully sent data to {endpoint}")
    else:
        print(f"Failed to send data to {endpoint}: {response.status_code} - {response.text}")

# Main function to read the JSON file and populate the database
def populate_database():
    # sleep for 10 seconds to wait for the API to start
    time.sleep(10)

    try:
        with open(JSON_FILE_PATH, "r") as file:
            data = json.load(file)

        # Assuming the JSON data is a dictionary with keys as endpoints and values as lists of data
        for endpoint, records in data.items():
            for record in records:
                send_data(endpoint, record)

    except FileNotFoundError:
        print(f"File not found: {JSON_FILE_PATH}")
    except json.JSONDecodeError:
        print(f"Error decoding JSON from file: {JSON_FILE_PATH}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    populate_database()
