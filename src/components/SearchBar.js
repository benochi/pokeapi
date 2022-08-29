import React, { useState, useEffect } from "react";
import { Container, FormGroup, Form, Label, Input, Col, Row, Button } from "reactstrap";
import APICalls from "../api/APICalls";
import ResultList from "./ResultList";


function SearchBar(){
  const [formData, setFormData] = useState({
    pokeSearch: '',
  });
  const [formErrors, setFormErrors] = useState([]);
  const [results, setResults] =useState([])
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [getTwenty, setGetTwenty] = useState([])
  const [limit, setLimit] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20`)
  
  useEffect(() =>{
    const favPokemon = JSON.parse(localStorage.getItem('pokemon-ids'))
    if(favPokemon){
      callFavorites(favPokemon)
    }
  },[])

  //useEffect API call
  async function callFavorites(favPokemon){
    let arr =[]
      favPokemon.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await res.json();
        arr.push(data)
      });
      setGetTwenty([arr])
  }

  //Handle local storage of favorites
  function saveInLocalStorage(pokemonId){
    let arr = []
    let current = JSON.parse(localStorage.getItem('pokemon-ids'))
    
    if(current){
      for(let i =0; i < current.length; i++){
        if(current[i] === pokemonId){
          continue;
        }
        arr.push(current[i])
      }
    }
    arr.push(pokemonId)
  
    console.log(arr)
    localStorage.setItem('pokemon-ids', JSON.stringify(arr))
    console.log("localstoragesave")
  }

  function removeFromLocalStorage(pokemonId){
    let arr = []
    let current = JSON.parse(localStorage.getItem('pokemon-ids'))
    if(current){
      for(let i =0; i < current.length; i++){
        if(current[i] === pokemonId){
          current.splice(i,1);
          continue
        }
        arr.push(current[i])
      }
    }
    localStorage.setItem('pokemon-ids', JSON.stringify(arr))
  }

  //handle single search button hover
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  //handle single search button unhover
  const handleMouseLeave = () => {
    setIsHovering(false);
  }; 
  //handle 20 search button hover
  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };
  //handle 20 search button unhover
  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  }; 

  //Handle pokemonsearch for single pokemon -> api -> APICalls
  async function handleSubmit(evt){
    evt.preventDefault()
    let pokeSearch = formData.pokeSearch
    if(pokeSearch.length <= 0){
      setFormErrors("Value can't be empty.")
      return
    }
    //Handle api call and handle error message if invalid name
    try{
      let result = await APICalls.searchPokeAPIByForm(pokeSearch)
      setResults([result])
    } catch(err){
      console.log(err)
      setFormErrors('Search must be a valid Pokemon name.')
    }
  } 

  async function getTwentyResults(evt){
    evt.preventDefault()
    try{
      const result = await APICalls.searchPokeAll(limit)
      const data = result
      setLimit(result.next)
      function createPokemonObject(result){
        let arr =[]
        result.forEach(async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json();
          arr.push(data)
        });
        setGetTwenty([arr])
      }
      createPokemonObject(data.results)
    } catch(err){
      console.log(err)
      setFormErrors('Something went wrong! Oh noes.')
    }
  }
  
  //Update form data
  function handleChange(evt) {
    evt.preventDefault()
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (  
    <div>
      <Container className="mx-auto mt-5 col-lg-11 bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="text-center">
          <FormGroup row className="p-2 mx-auto mb-2 mr-sm-2 mb-sm-0 col-lg-10">
            <Label for="pokeSearch" className="text-center mr-sm-2">
              <b>Search PokeAPI:</b>
            </Label>
            <Col sm={12} className="align-center">
              <Input
                name="pokeSearch"
                pattern="[A-Za-z]*"
                className="form-control text-center"
                value={formData.pokeSearch}
                onChange={handleChange}
                autoComplete="pokeSearch"
                default=""
                placeholder="Search PokeAPI"
              />
            </Col>
          </FormGroup>
          { formErrors.length
          ? <p className="text-danger"><small>{formErrors}</small></p>
          : null}
          </Row>
          <div className="text-center">
            <Button className="text-center col-lg-6 border border-dark rounded-pill" 
              style={{
                backgroundColor: isHovering ? '#6383A6' : '#063970',
                color: isHovering ? 'black' : 'white',
              }} 
              size="lg" 
              onSubmit={handleSubmit}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              >
              Search PokeAPI
            </Button>
          </div>
        </Form>
      </Container>
      <Container className="text-center mx-auto mt-5 col-lg-12 bg-light">
        <h1>Search 20 at a time</h1>
      <Row >
        <Col></Col>
        <Button className="text-center col-lg-6 border border-dark rounded-pill" 
            style={{
              backgroundColor: isHovering2 ? '#6383A6' : '#063970',
              color: isHovering2 ? 'black' : 'white',
            }} 
            size="lg" 
            onClick={getTwentyResults}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            
            >
            Get 20 Pokemon
        </Button>
        <Col></Col>
      </Row>
      </Container>
      <Container fluid>
      <Row className="flex-md-row mt-2 pt-2">
        { results.length ? 
          <Col className="mx-auto p-2 mt-2 p-1 border border-black col-sm-12 text-3xl">
            {results.map(( result ) => (
          <ResultList
            key={result}
            results={results}
          />
        ))}
          </Col>
          : <h5>No single results</h5>}
      </Row>
      <Row className="fluid mx-auto col-sm-12 mt-2 pt-2 bg-light">
        { getTwenty.length ? 
          <>
          {getTwenty.map((getTwenty, index) => (
          <ResultList
            key={index}
            results={getTwenty}
            saveInLocalStorage={saveInLocalStorage}
            removeFromLocalStorage={removeFromLocalStorage}
          />
          ))}
          </>
          : <h5>No bulk results</h5>}
        </Row>
      </Container>
    </div>  
  )
}

export default SearchBar;