# Use the official lightweight Python image
FROM python:3.12-slim-bookworm

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED=True

# Set the working directory
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . ./

# Run the web service on container startup using Uvicorn
# The PORT environment variable is injected by Cloud Run
CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}