import React, {useState } from 'react'
import { Button} from 'reactstrap'

function ResultCard({
  id, 
  base_experience, 
  name, 
  url,
  sprites,
  saveInLocalStorage,
  removeFromLocalStorage
}){
  const [liked, setLiked] = useState(false)
  //add to favorites in SearchBar and change button. 
  function handleFavs(pokemonId){
    if(liked){
      setLiked(false)
      removeFromLocalStorage(pokemonId)
    }
    else{
      setLiked(true)
      saveInLocalStorage(pokemonId)
    }
  }

  /*useEffect(async ()=>{
    let savedFavorite = localStorage.getItem('__Fav');
    if(savedFavorite) {
      setLiked(savedFavorite);
    }
  }, [])
*/


  return (
    <div className="resultCard">
      <>
      {!liked?
      <div className="">
        <img
          alt="Pokemon"
          src={sprites["front_default"]} 
          className="mx-auto col-md-4 w-100 "          
          />
        <p>Name: {name}</p>
        <p><a href={url}>click for more</a></p>
        <h2>{base_experience}</h2>
        
        <Button className="m-2 bg-primary" onClick={() => handleFavs(id)}>
          Add to Favorites
        </Button>
        </div>
        : <div className="bg-gold">
        <img
          alt="Pokemon"
          src={sprites["front_default"]} 
          className="mx-auto col-md-4 w-100 "          
        />
        <p>Name: {name}</p>
        <p><a href={url}>click for more</a></p>
        <h2>{base_experience}</h2>
        <Button className="m-2 bg-success" >
          Favorited!
        </Button>
        <Button className="bg-danger" onClick={() => handleFavs(id)}>
          Delete from favorites!
        </Button>
        </div>}
      </>
    </div>
  )
}

export default ResultCard;