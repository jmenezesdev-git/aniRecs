import React, { useState, useEffect, useReducer, useRef, memo } from "react";
// import "./dateSlider.css";
// export const GenreFilter = memo(function GenreFilter({ onSubmit }){});

export const GenreFilter = ({id, placeholderContents, onSubmit, parentVal, setParentVal}) => { //genreFilterDis //genreListFilterRef
    const [apiUsers, setApiUsers] = useState([]);
    const [genreTerms, setGenreTerms] = useState("");
    const [genreListVisibility, setGenreListVisibility] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);


    useEffect(() => {
        fetch('https://dummyjson.com/users')
          .then(response => response.json())
          .then(data => {
            setApiUsers(data.users)
            // update the filteredUsers state
            setFilteredUsers(data.users)
          })
          .catch(err => console.log(err))
      }, [])

    function showListOverlay(){
        hideGenreLists(false);
        tryGenreFilterChange(genreTerms,"genre");
      }

    function hideGenreLists(val) {
    // console.log("hideGenreLists, val = " + val);
    if (val == true){
        setGenreListVisibility(false);
    }
    else{
        setGenreListVisibility(true);
    }

    }

    function tryGenreFilterChange(val, type){
        if (type.toLowerCase() == "genre"){
          //setGenreTerms(val);
          setGenreTerms(val);
          // genreListFilterRef = val;
          setParentVal(val);
          //genreFilterDis({type:'update', value:val});

        }
        // else if (type.toLowerCase() == "excludegenre"){
        //   setExcludeGenreTerms(val);
        // }
        genreFilterChange(val);
      }
      
    const onGenreFilterChange = (e) => { 
        tryGenreFilterChange(e.target.value, "genre");
        
    }

    function genreFilterChange(val){
        // console.log("genreFilterChange = '" + val + "'");
        const re = /^((.*) )?(\S+)?$/;
        const searchTerm = val;
        //var exclusionArray = ["emily", "123"];
        var filteredItems = apiUsers.filter((user) =>
          user.firstName.toLowerCase().includes("")
        );
        if (searchTerm.match(re) && searchTerm.match(re)[3] != null && searchTerm.match(re)[3] != undefined && searchTerm.match(re)[3] != ""){
          
          if (searchTerm.match(re)[2] != null && searchTerm.match(re)[2] != undefined && searchTerm.match(re)[2] != ""){
            var exclusionArray = searchTerm.match(re)[2].split(' ');
            
            for (var i = 0; i < exclusionArray.length; i++) {
              exclusionArray[i] = exclusionArray[i].toLowerCase();
            }
            const exclude = new Set(exclusionArray)
            // console.log(exclude);
            filteredItems = apiUsers.filter((user) =>
              user.firstName.toLowerCase().includes(searchTerm.match(re)[3].toLowerCase()))
              .filter((user) => 
                !exclude.has(user.firstName.toLowerCase())
            );
          } else{
            // console.log(searchTerm.match(re)[2]);
            filteredItems = apiUsers.filter((user) =>
              user.firstName.toLowerCase().includes(searchTerm.match(re)[3].toLowerCase()));
    
          }
          
        }
        else if (searchTerm.match(re) && searchTerm.match(re)[2] != null && searchTerm.match(re)[2] != undefined && searchTerm.match(re)[2] != ""){
          var exclusionArray = searchTerm.match(re)[2].split(' ');
          for (var i = 0; i < exclusionArray.length; i++) {
            exclusionArray[i] = exclusionArray[i].toLowerCase();
          }
          const exclude = new Set(exclusionArray)
        //   console.log(exclude);
          filteredItems = apiUsers.filter((user) => 
              !exclude.has(user.firstName.toLowerCase())
          );
    
        }
        else{
          filteredItems = apiUsers.filter((user) =>
            user.firstName.toLowerCase().match(re)
          );
        }
        // filter the items using the apiUsers state
    
        setFilteredUsers(filteredItems);
    }

    const onClickGenreList = (e) => { 
        e.stopPropagation();
        // console.log(e.target.textContent);
        const re = /^(.* )?(\S+)$/;
        var test = genreTerms;
        if (genreTerms.match(re) && genreTerms.match(re)[2] != null){
          var newGenreTerms = "";
          if (genreTerms.match(re)[1] != null && genreTerms.match(re)[1] != undefined){
            newGenreTerms += genreTerms.match(re)[1]
          }
          newGenreTerms += e.target.textContent + " ";
          //setGenreTerms(newGenreTerms);
          setGenreTerms(newGenreTerms);
          //genreFilterDis({type:'update', value:newGenreTerms});
          // genreListFilterRef = newGenreTerms;
          setParentVal(newGenreTerms);
        }
        else{
          setGenreTerms(genreTerms + e.target.textContent + " ");
            //genreFilterDis({type:'update', value:genreTerms + e.target.textContent + " "});
            // genreListFilterRef = genreTerms + e.target.textContent + " ";
            setParentVal(genreTerms + e.target.textContent + " ");
        //   setGenreTerms(genreTerms + e.target.textContent + " ");
        }
    
        setGenreListVisibility(false);
        hideGenreLists(true);
    }  
    
    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              console.log("You clicked outside of"+ id + "!");
              hideGenreLists(true);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="genre-filter" onClick={showListOverlay} ref={wrapperRef}>
            <input type="text"
                    //onBlur appears to only provide event details for ITSELF and null rather than the new object we are selecting. Does not necognize it's own child objects. onBlur={trySetGenreListVisibility}
                    placeholder={placeholderContents}
                    // value={genreTerms}
                    value={genreTerms}
                    onChange={onGenreFilterChange}
                    onClick={() => setGenreListVisibility(true)}
                    
              />
              {genreListVisibility && (
                // onBlur={hideGenreLists(true)}
                <ul className='dropdownlist' >
                {filteredUsers.map(user => <li key={user.id}
                                              onClick={onClickGenreList} 
                                          >{user.firstName}</li>)}
                </ul>
              )}
              <br/>
        </div>
    );

};


export default GenreFilter;