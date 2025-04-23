# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy required files
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port
EXPOSE 10000

# Run the app
CMD ["python", "agent.py"]