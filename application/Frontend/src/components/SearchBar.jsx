import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react"


const SearchBar= ({setSearchResults}) => {

    const dummyData = [
        {
            "product_id": 1, 
            "description": "THis is brand new book", 
            "category": "school saterial", 
            "title": "Math Book", 
            "vendor_id": 1
        }, 
        {
            "product_id": 2, 
            "description": "Shirt has some holes but still good pick up only", 
            "category": "clothing", 
            "title": "Green Shirt XL", 
            "vendor_id": 1
        }, 
        {
            "product_id": 3, 
            "description": "laptop 16GB ", 
            "category": "electronics", 
            "title": "Macbook Pro 13 inches", 
            "vendor_id": 2
        }, 
        {
            "product_id": 4, 
            "description": "Thursday Food Market on campus ", 
            "category": "food", 
            "title": "Aloha Food Vendor", 
            "vendor_id": 3
        }
    ]

  const [searching, setSearcheding] = useState(false); 
  const [wordEntered, setWordEntered] = useState(""); 
  const [searchWord, setSearchWord] = useState(""); 

  const handleSubmit = (e) => e.preventDefault(); 

  
  const handleSearch = () => { 
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