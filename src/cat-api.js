const API = "live_IktVgYVKYFEGgY5W8dvuwDXsm9FPq2CBkD6uogzVslCLSIvVgFycaTF3YWX0Hgsu"
const URL = 'https://api.thecatapi.com/v1';



export function fetchBreeds() {
    return fetch(`${URL}/breeds`,{headers: {
      'x-api-key': API
    }})
        .then((res) => {
            if (!res.ok) {
                 throw new Error(res.status);
            }
            return res.json()})
        
}


export function fetchCatByBreed(id){
  return fetch(`${URL}/images/search?breed_ids=${id}`, { headers: {
      'x-api-key': API
  }
  }).then(res => {
     if (!res.ok) {
        throw new Error(res.status);
      }
    return res.json()
    
    })
}
