# AI Text to Image Generator By Linux.do

A powerful AI text-to-image tool supporting multiple advanced AI models, including Stable Diffusion, FLUX, and Kolors.

## Features

- Supports multiple top AI models:
  - Stable Diffusion XL Base
  - SD XL Lightning
  - FLUX.1 Schnell
  - Kolors
  - Stable Diffusion 3.5
- Intelligent prompt translation and optimization
- Streaming responses for real-time generation
- Clean and modern user interface
- Custom API settings supported

## Quick Start

### Requirements

- Node.js
- Modern browser (ES6+ supported)

### Installation & Deployment

1. Clone the repository
```bash
git clone [repository-url]
cd img-ai
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file and set the following variables:
```env
SF_TOKEN=your_token_here
API_ACCESS_KEY=your_api_key_here
```

4. Start the service
```bash
npm start
```

Visit `http://localhost:3000` to use the app.

## API Documentation

### Model List Endpoint

- Endpoint: `/v1/models`
- Method: GET
- Example response:
```json
{
  "data": [
    { "id": "DS-8-CF", "object": "model" },
    { "id": "SD-XL-Bash-CF", "object": "model" }
  ],
  "object": "list"
}
```

### Image Generation Endpoint

- Endpoint: `/v1/chat/completions`
- Method: POST
- Example request body:
```json
{
  "model": "SD-XL-Bash-CF",
  "messages": [
    {
      "role": "user",
      "content": "a cute cat"
    }
  ],
  "stream": true
}
```

### Image Access Endpoint

- Endpoint: `/image/:key`
- Method: GET
- Description: Retrieve generated images. Images are stored in KV for 30 minutes.

## Configuration

You can configure the following parameters in `src/index.ts`:

```typescript
const CONFIG = {
  CF_IS_TRANSLATE: true,  // Enable AI prompt translation and optimization
  CF_TRANSLATE_MODEL: "@cf/qwen/qwen1.5-14b-chat-awq",  // Translation model
  CF_IMG2TEXT_MODEL: "@cf/llava-hf/llava-1.5-7b-hf", // Image-to-text model
  FLUX_NUM_STEPS: 4, // Flux model steps (4-8)
}
```

## Deployment Guide

### Deploy on Cloudflare Workers

1. Install Wrangler
```bash
npm install -g wrangler
```

2. Login to Cloudflare
```bash
wrangler login
```

3. Configure `wrangler.toml`
```toml
name = "img-ai"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
SF_TOKEN = "your_token"
API_ACCESS_KEY = "your_key"
```

4. Publish
```bash
wrangler publish