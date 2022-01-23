export function getImages<T>(url: string): Promise<T> {
  return fetch(url, {
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01"
    },
    mode: 'cors',
    referrerPolicy: 'strict-origin-when-cross-origin'
  }).then((res) => res.json())
}
