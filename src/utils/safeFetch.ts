export type SafeFetchResult = {
  response: Response | null;
  networkError: boolean;
  error?: any;
};

export async function safeFetch(input: RequestInfo, init?: RequestInit): Promise<SafeFetchResult> {
  try {
    const response = await fetch(input, init);
    return { response, networkError: false };
  } catch (err) {
    return { response: null, networkError: true, error: err };
  }
}
