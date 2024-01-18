export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: Record<string, any> | FormData
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
    const json = await response.json();

    if (response.ok) return Promise.resolve(json);

    return Promise.reject(json.message);    
  } catch (error) {
    return Promise.reject(error);
  }
}
