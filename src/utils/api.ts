import wretch from 'wretch';

const URL = 'http://localhost:3000';

type ParamsType = Record<string, string | number>;

export const get = async <T>(
  endpoint: string,
  params: ParamsType = {},
): Promise<T> => {
  const urlWithParams = Object.keys(params)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`,
    )
    .join('&');
  return wretch(`${URL}/api/${endpoint}?${urlWithParams}`).get().json();
};

export const post = async <T>(endpoint: string, body: object): Promise<T> => {
  return wretch(`${URL}/api/${endpoint}`).post(body).json();
};

export const del = async <T>(endpoint: string): Promise<T> => {
  return wretch(`${URL}/api/${endpoint}`).delete().res();
};

export const update = async <T>(endpoint: string, body: object): Promise<T> => {
  return wretch(`${URL}/api/${endpoint}`).put(body).json();
};

export const patch = async <T>(endpoint: string, body: object): Promise<T> => {
  console.log("In WRETCH: " + JSON.stringify(body));
  return wretch(`${URL}/api/${endpoint}`).patch(body).json();
};
