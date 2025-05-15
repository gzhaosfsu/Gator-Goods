import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
// import { dummyData } from "../dummyData";


const SearchBar= ({setSearchResults, selectedCategory, setDataReturned, setIsSearching, setSelectedCategoryName}) => {

    
  const [searching, setSearching] = useState(false); // Toggles the Close ("x") Icon
  const [wordEntered, setWordEntered] = useState(""); // so we can updated the value in serach bar parameter
  const [searchWord, setSearchWord] = useState(""); // this is the word that is being searched user is ready to search

  const handleSubmit = (e) => e.preventDefault(); 

 
  // OnClick "Search Icon" or press Enter, this should handle all fetch request based on category only, Search Text Only, both or none 
  const handleSearch = (e) => { 
  
    e.preventDefault();

    setDataReturned([]); // make sure I empty the any value before adding a value

    if(!searchWord && selectedCategory) { // NO text entered in search bar but selected category*
      console.log("NO text entered in search bar but selected category"); 
      
      // this is temp dummy data for now but will change with fetch request
      // const filteredResults = dummyData.filter((product) => { 
      //   const productCategory = product.category.toLowerCase(); 
      //   return productCategory === selectedCategory.toLowerCase()
      // });
      // // An array of data and return back to Homepage.jsx to pass in Content.jsx aka body to use display products 
      // setDataReturned(filteredResults); 
      

      // 4/11/25 JACE COMMENT: Replaces above, adding for fetch request for category only*
      fetch(`api/category?category=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
        setDataReturned(data);
      });


                //OLD VERSION: handles Get Request for category
                // fetch(`http://localhost:5000/api/category?category=${selectedCategory}`)
                // .then((response) => response.json())
                // .then((data) => {
        
                //     setDataReturned(data); 
                // })

      setIsSearching(true)
      setSelectedCategoryName(selectedCategory); // only update when search is performed

    } else if(searchWord && !selectedCategory ) { // text in search bar but NO category selected**
          
      console.log("text in search bar but NO category selected");

      // this is temp dummy data for now but will change with fetch request
      // const filteredResults = dummyData.filter((product) => { 
      //   const productTitle = product.title.toLowerCase(); 
      //   return productTitle.includes(searchWord.toLowerCase());
      // });
      //  // An array of data and return back to Homepage.jsx to pass in Content.jsx aka body to use display products 
      // setDataReturned(filteredResults); 


      // **4/11/25 JACE COMMENT: Replaces above, adding for fetch request for text in search but NO category selected
      fetch(`api/title?title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
        setDataReturned(data);
      });


                //OLD VERSION: handles Get Request for Title
                // fetch(`http://localhost:5000/api/title?q=${searchWord}`)
                // .then((response) => response.json())
                // .then((data) => {
                //     setDataReturned(data); 
                // })
      
      setIsSearching(true)
      setSelectedCategoryName(selectedCategory); // no category selected, so clear it

    } else if (searchWord && selectedCategory) { // text and selected category 

      console.log("text and selected category ");


      // this is temp dummy data for now but will change with fetch request ***
      // const filteredResults = dummyData.filter((product) => { 
      //   const productCategory = product.category.toLowerCase();
      //   const productTitle = product.title.toLowerCase();
                  
      //   const categoryMatches = productCategory === selectedCategory.toLowerCase();
      //   const searchMatches = searchWord
      //   ? productTitle.includes(searchWord.toLowerCase())
      //   : true;
                  
      //   return categoryMatches && searchMatches;
      // });
      //  // An array of data and return back to Homepage.jsx to pass in Content.jsx aka body to use display products 
      // setDataReturned(filteredResults); 

      // ***4/11/25 JACE COMMENT: Replaces above, adding for fetch request for BOTH text in entered AND category selected
      fetch(`api/combined?category=${selectedCategory}&title=${searchWord}`)
      .then((response) => response.json())
      .then((data) => {
        setDataReturned(data);
      });
    


                //OLD VERSION: handles Get Request for category and title 
                // fetch(`http://localhost:5000/api/`)
                // .then((response) => response.json())
                // .then((data) => {
                //     setDataReturned(data); 
                // })
      setIsSearching(true)
      setSelectedCategoryName(selectedCategory); // set only after valid combo search

    } else if(!searchWord && !selectedCategory) {

      // NO serach word in serach bar and No catergory selected
      // Reset all info
      console.log("NO serach word in serach bar and No catergory selected"); 
      setDataReturned([]);
      setIsSearching(false); 
      setSearchWord("");
      setSelectedCategoryName(selectedCategory); // clear if nothing selected
      // console.log("User not searching for any item")
    }
    
      console.log("User selected a catergory: " + selectedCategory);
      console.log("User keyword from search bar HELLO: " + searchWord);
    
      // sets a string of the search bar input and returns back to Header.jsx
      setSearchResults(searchWord); 
      
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