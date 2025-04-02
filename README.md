# Image Generation API

## Description
This project provides an API for generating images using a machine learning model. It allows users to send requests with specific parameters to generate images based on prompts.

## Installation
To install the necessary dependencies, run:

```bash
npm install
```

## Usage
To start the server, use the following command:

```bash
npm start
```

The server will be running on `http://localhost:PORT`, where `PORT` is the port number specified in your environment configuration.

## API Endpoints

### Generate Image
- **Endpoint:** `/generate-image`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "prompt": "string",
    "negative_prompt": "string (optional)",
    "height": "number (optional)",
    "width": "number (optional)",
    "num_steps": "number (optional)",
    "guidance": "number (optional)",
    "strength": "number (optional)",
    "seed": "number (optional)"
  }
  ```
- **Response:**
  - **Success:** Returns a PNG image.
  - **Error 400:** If the prompt is missing or empty.
  - **Error 504:** If the request times out.
  - **Error 500:** If there is an error generating the image.