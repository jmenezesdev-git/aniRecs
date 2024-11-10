//Front End of AniRecs program
/*
  Form Entry
    mal/anilist
    exclusions
    genre - comma delimited field?
    exclude genre - comma delimited field?
  Passes data to backend
    probably shouldn't attach my personal api keys in any way to the front end.
  Presents user with Recommendation and reasoning
    maybe get a top 3 and present the top one at random
  Find cheap hosting solution?

John Smith's account name
Isekai ecchi
2006-2020

it gives you one of the top 3 you haven't seen from between 2006 and 2020 or something.....


*/
import { useState, useEffect, useRef } from 'react';
import DateSlider from './dateSlider/dateSlider.js';
import GenreFilter from './genreFilter/genreFilter.tsx';


export default function AniRecs() {
  const [anilistAccount, setAnilistAccount] = useState("");
  const [malAccount, setMalAccount] = useState("");
  const [enableAdultContent, setEnableAdultContent] = useState("");

  
  const [apiUsers, setApiUsers] = useState([])

  const [displayFieldClosureOverlay, setDisplayFieldClosureOverlay] = useState(false);

  const [genreListVisibility, setGenreListVisibility] = useState(false);
  const [excludedGenreListVisibility, setExcludedGenreListVisibility] = useState(false);
  // const [filteredUsers, setFilteredUsers] = useState(users)
  let minDateRef = useRef(1917);
  let maxDateRef = useRef(new Date().getFullYear());
  let genreListFilterRef = useRef("");
  let excludedGenreListFilterRef = useRef("");




  function handleFormSubmission(){
    event.preventDefault();
    console.log(`The Anilist Account name you entered was: ${anilistAccount}`);
    console.log(`Adult Content was set to: ${enableAdultContent}`);
    console.log(minDateRef.current);
    console.log(maxDateRef.current);
    console.log(genreListFilterRef.current);
    console.log('Test12345');
    genreListFilterRef.current = "";
    console.log(genreListFilterRef.current);
  }

  const handleDateRangeChange = (val) => {
    //this.setState({language: val});
    console.log("I AM WORKING!!!" + val);
  }

  const clearFormContents = () => {
    console.log("I clicked Clear Form Contents!");
  }

  //if preceding text is non-space (search based on that text)
  //when clicking if preceding text is non-space, complete text with that and add a space
  //search terms are all obviously space-delimited


  const preventPropagation = (e) =>{
    e.stopPropagation();
    console.log('PREVENTING PROPAGATION');
  }

  return (
    <>
      {/* <div className="fieldClosureOverlay" style={{ display: displayFieldClosureOverlay ? "flex" : "none" }} onClick={() => hideGenreLists(true)}/> */}
      <div className="formContainer">
        <form onSubmit={handleFormSubmission}>
          <label>Anilist Account:
            <input type="text"
              value={anilistAccount}
              onChange={(e) => setAnilistAccount(e.target.value)} /><br/>
          </label>
          <label>Mal Account:
            <input type="text"
              value={malAccount}
              onChange={(e) => setMalAccount(e.target.value)} /><br/>
          </label>
          <label>Include 18+ content:
            <input type="checkbox"
              value={enableAdultContent}
              onChange={(e) => {
                setEnableAdultContent(e.target.checked);
              }} /><br/>
          </label>
          <GenreFilter id="genreFilter" genreListFilterRef={genreListFilterRef} placeholderContents="Search Genre..."/>
          <GenreFilter id="excludedGenreFilter" genreListFilterRef={excludedGenreListFilterRef} placeholderContents="Exclude Genre..."/>
          <DateSlider minDateRef={minDateRef} maxDateRef={maxDateRef}/>
          <input type="submit" value="Submit"/>
        </form>
        <button onClick={clearFormContents}>Clear</button>
      </div>
    </>
  );
}


///Parent 
//func dispatcher()

//<obj myState{state} myPara={dispatcher}>
//state needed to Read
//Dispatcher needed to Write

//child({myState, myPara})
//x = useReducer(dispa123)

// dispa123(new val)
//   setval(val) 
//   myPara({type:'min', value:value})
