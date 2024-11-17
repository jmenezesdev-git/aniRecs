"use client";
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

Random result from pool?
Minimum Rating?
Some way to exclude the meta stuff?
Some way to exclude off-meta stuff?

it gives you one of the top 3 you haven't seen from between 2006 and 2020 or something.....

If you ever think of using Redux, use Zustand. It's easier and modern.

Use for UI https://ui.shadcn.com/
For CSS use Tailwind
NPX possibly needed to use?



Parent -> Child 
Child -> Parent

In angular easy serivce W

Parent can SET Genre Filter
Genre Filter can be READ by parent. (Or child can update parent variable)



v0 - website that creates copypastable WORKING UI components as output from AI prompt.
*/


import { useState, useEffect, useRef, useCallback} from 'react';
import DateSlider from './dateSlider';
import GenreFilter from './genreFilter';
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from './ui/button';


export default function AniRecs() {
  const [anilistAccount, setAnilistAccount] = useState("");
  const [malAccount, setMalAccount] = useState("");
  const [enableAdultContent, setEnableAdultContent] = useState("");

  
  const [apiUsers, setApiUsers] = useState([])

  const [displayFieldClosureOverlay, setDisplayFieldClosureOverlay] = useState(false);

  const [genreListVisibility, setGenreListVisibility] = useState(false);
  const [excludedGenreListVisibility, setExcludedGenreListVisibility] = useState(false);
  let minDateRef = useRef(1917);
  let maxDateRef = useRef(new Date().getFullYear());
  let excludedGenreListFilterRef = useRef("");

  const [genreFilter, setGenreFilter] = useState("");
  const [excludedGenreFilter, setExcludedGenreFilter] = useState("");
  const [state, setState] = useState(Date.now());
  const [state2, setState2] = useState(Date.now() + 1);

  
  const[newText, setNewText] = useState("");




//   const setVal = (val) => {
//     setGenreListFilterVal(val);
//   };

  function handleFormSubmission(){
    // event.preventDefault();
    console.log(`The Anilist Account name you entered was: ${anilistAccount}`);
    console.log(`Adult Content was set to: ${enableAdultContent}`);
    console.log(minDateRef.current);
    console.log(maxDateRef.current);
    //console.log(genreListFilterRef.current);
    //console.log('Test12345');
    // genreListFilterRef.current = "";
    // console.log(genreListFilterRef.current);
    //console.log("genreListFilterRef = ");
    //console.log(genreListFilterRef);
    console.log("parentVal");
    console.log(genreFilter);
  }

  const handleDateRangeChange = (val: string) => {
    //this.setState({language: val});
    console.log("I AM WORKING!!!" + val);
  }

  const clearFormContents = () => {
    console.log("I clicked Clear Form Contents!");
    // setGenreListFilterDispatch({type:'update', value:""});
    setGenreFilter("");
    setExcludedGenreFilter("");
    setState(Date.now());
    setState2(Date.now() + 1);
  }

  //if preceding text is non-space (search based on that text)
  //when clicking if preceding text is non-space, complete text with that and add a space
  //search terms are all obviously space-delimited



  return (
    <form onSubmit={handleFormSubmission}>
        <Card className="max-w-[400px]">
            <CardHeader>
                <CardTitle>AniRecs</CardTitle>
                <CardDescription>Recommend me an anime based on some simple information.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="formContainer">
                    <label>Anilist Account:
                        <Input type="text"
                        value={anilistAccount}
                        onChange={(e) => setAnilistAccount(e.target.value)} /><br/>
                    </label>
                    <label>Mal Account:
                        <Input type="text"
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
                    {/* onSubmit={updateGenreFilter} */}
                    
                    <div className="flex flex-col gap-4">
                    <GenreFilter id="genreFilter" placeholderContents="Search Genre..."   parentVal={genreFilter} setParentVal={setGenreFilter} key={state}/>
                    
                    {/* <GenreFilter id="excludedGenreFilter" placeholderContents="Exclude Genre..." parentVal={excludedGenreFilter} setParentVal={setExcludedGenreFilter} key={state2}/> */}
                    <DateSlider minDateRef={minDateRef} maxDateRef={maxDateRef}/>
                    
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleFormSubmission}>Submit</Button>
                <Button onClick={clearFormContents}>Clear</Button>
            </CardFooter>
        </Card>
    </form>
  );
}
