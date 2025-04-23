# Use official Python image
FROM python:3.10

# Set working directory inside the container
WORKDIR /app

# Copy only the necessary files
COPY ./src/assets/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your source code
COPY ./src/assets/agent.py ./agent.py

# Expose port
EXPOSE 10000

# Run the app
CMD ["python", "agent.py"]
