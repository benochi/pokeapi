import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon" || "http://localhost:5000/"

class APICalls {
  //GET https://pokeapi.co/api/v2/{endpoint}/
  static async searchPokeAPIByForm(SearchPhrase) {
      let query = API_URL + `/${SearchPhrase}`;
      let res = await axios.get(query)
      return res.data      
  }
  
  //GET https://pokeapi.co/api/v2/pokemon?limit=20
  static async searchPokeAll(limit) {
    let res = await axios.get(limit)
    return res.data      
  }
  //https://pokeapi.co/api/v2/pokemon/${pokemon.name}
  static async searchPokeApi(url){
    let res = await axios.get(url)
    return res.data
  }
}

export default APICalls;