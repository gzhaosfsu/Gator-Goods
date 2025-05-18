import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// import { dummyData } from "../dummyData";


const SearchBar= ({setSearchResults, selectedCategory, setDataReturned, setIsSearching, setSelectedCategoryName}) => {

  const navigate = useNavigate();
  const [searching, setSearching] = useState(false); // Toggles the Close ("x") Icon
  const [wordEntered, setWordEntered] = useState(""); // so we can updated the value in serach bar parameter
  const [searchWord, setSearchWord] = useState(""); // this is the word that is being searched user is ready to search

  const handleSubmit = (e) => e.preventDefault(); 

 
  // OnClick "Search Icon" or press Enter, this should handle all fetch request based on category only, Search Text Only, both or none 
  const handleSearch = (e) => { 
  
    e.preventDefault();

    setDataReturned([]); // make sure I empty the any value before adding a value
    console.log("Search Word: " + searchWord);
    console.log("Selected Category: " + selectedCategory);

    if(!searchWord && selectedCategory) { // NO text entered in search bar but selected category*
       
    
      
      fetch(`api/category?category=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
        setDataReturned(data);
      });


      setIsSearching(true)
      setSelectedCategoryName(selectedCategory); // only update when search is performed

    } else if(searchWord && !selectedCategory ) { // text in search bar but NO category selected**
          
      console.log("text in search bar but NO category selected");


      fetch(`api/title?title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
        setDataReturned(data);
      });


      
      setIsSearching(true)
      setSelectedCategoryName(selectedCategory); // no category selected, so clear it

    } else if (searchWord && selectedCategory) { // text and selected category 

      fetch(`api/combined?category=${selectedCategory}&title=${searchWord}`)
      .then((response) => response.json())
      .then((data) => {
        setDataReturned(data);
      });

      setIsSearching(true)
      setSelectedCategoryName(selectedCategory); // set only after valid combo search

    } else if(!searchWord && !selectedCategory) {

      // NO serach word in serach bar and No catergory selected
      
      fetch("/api/all")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        const amountToDisplay = data.length/2; 
        const pick = (data.slice(0, amountToDisplay));

        setDataReturned(pick);

      })
      .catch((err) => console.error("Error fetching products:", err));

      setIsSearching(true); 
      setSelectedCategoryName(selectedCategory); // clear if nothing selected

    }
  
      // sets a string of the search bar input and returns back to Header.jsx
      setSearchResults(searchWord); 
      navigate("/");
  }; 


  // if the the user decides to press enter instead of search Icon
  const handleSearchEnter = (e) => {
  
    if(e.key == 'Enter') {
      
      e.preventDefault(); // prevents from submitting form
        handleSearch(e); 
    }
  };


 
  const handleTextSearch = (e) => {

    const newWord = e.target.value;

    setWordEntered(newWord);     // updates the search bar input
    setSearchWord(newWord);      // keeps the same value for searching later
  
    setSearching(newWord.trim() !== ""); // toggle "x" icon



  }

  // this is to clear the text from search bar
  const clearInput = (e)=> {
    // e.preventDefault(); 
    setWordEntered(""); // reset search bar to empty
    setSearching(false); // toggle "x" icon
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
                              <CloseIcon onClick={clearInput} />
                              <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                                <Link to ="/">
                                  <SearchIcon />
                                </Link>
                              </div>
                            </>
                        )
                        : 
                        ( 
                          <div onClick={handleSearch} style={{ cursor: 'pointer' }}>
                            <SearchIcon />
                          </div>
                        )
                    }
                    
                </span>
            </form>
        </div>
        
        </>

    )

}

export default SearchBar