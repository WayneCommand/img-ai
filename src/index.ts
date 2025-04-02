// Constants

// Main handler
export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const { pathname } = new URL(request.url);

        if (pathname === "/generate-image" && request.method === 'POST') {
          return await handleGenerateImageRequest(request, env);
        }

        return env.ASSETS.fetch(request);
        
    },
};

// 定义请求体的接口
interface GenerateImageRequest {
    prompt: string;
    negative_prompt?: string;
    height?: number;
    width?: number;
    num_steps?: number;
    guidance?: number;
    strength?: number;
    seed?: number;
}

// 处理图像生成请求，并设置120秒的超时
async function handleGenerateImageRequest(request: Request, env: Env) {
    const body: GenerateImageRequest = await request.json(); // 使用接口类型化 body
  
    if (!body.prompt || body.prompt.trim().length === 0) {
      return new Response('Prompt is required', { status: 400 });
    }
  
    const inputs = {
      prompt: body.prompt,
      negative_prompt: body.negative_prompt || undefined,
      height: body.height || undefined,
      width: body.width || undefined,
      num_steps: body.num_steps || undefined,
      guidance: body.guidance || undefined,
      strength: body.strength || undefined,
      seed: body.seed || undefined,
    };
  
    // 超时设置为120秒
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120秒超时
  
    try {
      const response = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs, {});
  
      return new Response(response, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return new Response('Request timed out', { status: 504 });
      }
      return new Response('Error generating image', { status: 500 });
    } finally {
      clearTimeout(timeoutId); // 清除超时
    }
  }