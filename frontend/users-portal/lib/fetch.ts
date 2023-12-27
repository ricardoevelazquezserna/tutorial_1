export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: Record<string, unknown> | FormData
}

export async function fetchRequest(
  endpoint: string,
  options: RequestOptions = {}
) {
  try {
    const url = `${process.env.BASE_API_URL}/${endpoint}`

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }
  
    const reqOptions = {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    };
  
    const response = await fetch(url, reqOptions);
  
    return await response.json();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
