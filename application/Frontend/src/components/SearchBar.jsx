import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react"
import { dummyData } from "../dummyData";


const SearchBar= ({setSearchResults, setSelectedCategory}) => {

    
  const [searching, setSearcheding] = useState(false); 
  const [wordEntered, setWordEntered] = useState(""); 
  const [searchWord, setSearchWord] = useState(""); 

  const handleSubmit = (e) => e.preventDefault(); 

  
  const handleSearch = () => { 
    // setSelectedCategory([]); 
    setSearchResults(dummyData); 

    // Handle Get Request
    // fetch('http://localhost:5000/api/products/${title}')
    // .then((response) => response.json())
    // .then((data) => {
    //     setSearchResults(data); 
    // })
  }; 


  const handleSearchEnter = (e) => {
    if(e.key == 'Enter') {
        handleSearch(); 
    }
  };

  const handleTextSearch = (e) => {
    setSearchWord(wordEntered); 
    setWordEntered(e.target.value); 
    if(searchWord === "") {
        setSearcheding(false); 
    } else {
        setSearcheding(true); 
    }
  }

  const clearInput = (e)=> {
    // e.preventDefault(); 
    setWordEntered(""); 
    setSearcheding(false); 
  }

    return (
        <>
        <div>
            <form className="search" onSubmit={handleSubmit} > 
                <input
                    className="search-input"
                    type="text"
                    placeholder="What do you want to buy?"
                    value={wordEntered}
                    onChange={handleTextSearch}
                    onKeyDown={handleSearchEnter}
                />
                <span className="searchIcon">
                    { searching ? 
                        (
                            <>
                                <CloseIcon onClick={clearInput}/>
                                <SearchIcon onClick={handleSearch}/>
                            </>
                        )
                        : 
                        ( <SearchIcon/>)
                    }
                    
                </span>
            </form>
        </div>
        
        </>

    )

}

export default SearchBar