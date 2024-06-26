# Dockerfile
FROM python:3.10-slim

# Set working directory
WORKDIR /usr/src/app

# Copy requirements file
COPY requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the script and JSON file
COPY populate_database.py .
COPY data.json .

# Run the script
CMD ["python", "populate_database.py"]
