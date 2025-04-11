import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react"
import { dummyData } from "../dummyData";


const SearchBar= ({setSearchResults, setSelectedCategory, setIsSearching, selectedCategory}) => {

    
  const [searching, setSearcheding] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const [searchWord, setSearchWord] = useState(""); // this is the word that is being searched for

  const handleSubmit = (e) => e.preventDefault(); 

  
  const handleSearch = () => { 

  
    const filteredResults = dummyData.filter((product) => { // filters the dummy data based on the search word and selected category
    const matchesTitle = product.title.toLowerCase().includes(wordEntered.toLowerCase()); // checks if the product title includes the search word
    const matchesCategory = selectedCategory // checks if the product category matches the selected category
      ? product.category.toLowerCase() === selectedCategory.toLowerCase() // checks if the product category matches the selected category
      : true; // if no category, match all

    return matchesTitle && matchesCategory; // checks if both title and category match
    });
    setSelectedCategory([]); // clears the selected category
    setIsSearching("SearchBarResult"); // sets the search state to SearchBarResult
    setSearchResults(filteredResults); // sets the search results to the filtered results

    //Handle Get Request
    fetch(`http://localhost:3001/api/title?q=${searchWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.isarray);
        setSearchResults(data); 
    })


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