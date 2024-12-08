"use client";
//Front End of AniRecs program
/*
  Form Entry
DONE  mal/anilist
DONE  exclusions
DONE  genre - comma delimited field?
DONE  exclude genre - comma delimited field?
  Passes data to backend
DONE  probably shouldn't attach my personal api keys in any way to the front end.
  Presents user with Recommendation and reasoning
DONE  maybe get a top 3 and present the top one at random
----  Find cheap hosting solution?

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


v0 - website that creates copypastable WORKING UI components as output from AI prompt.
*/


import { useState, useEffect, useRef, useCallback, MouseEvent} from 'react';
import DateSlider from './dateSlider';
import GenreFilter from './genreFilter';
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import FlipCard from './flipCard';


export default function AniRecs() {
  const [anilistAccount, setAnilistAccount] = useState("");
  const [malAccount, setMalAccount] = useState("");
  const [enableAdultContent, setEnableAdultContent] = useState(false);

  
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

  const [resultsTitle, setResultsTitle] = useState("");
  const [resultsYear, setResultsYear] = useState("");
  const [resultsImage, setResultsImage] = useState("");
  const [resultsDescription, setResultsDescription] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);
  const [resultsId, setResultsId] = useState(0);
  const [resultsUrl, setResultsUrl] = useState("");




//   const setVal = (val) => {
//     setGenreListFilterVal(val);
//   };

  async function handleFormSubmission(event:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>){
    event.preventDefault();
    console.log(`The Anilist Account name you entered was: ${anilistAccount}`);
    console.log(`Adult Content was set to: ${enableAdultContent}`);
    console.log(minDateRef.current);
    console.log(maxDateRef.current);
    console.log("parentVal");
    console.log(genreFilter);
    var myRequest = 'http://127.0.0.1:5000/aniRequest';

    

    const response = await fetch(myRequest  , {
      method: 'POST',
      body: JSON.stringify({
        enableAdultContent: enableAdultContent,
        genreFilter: genreFilter,
        excludedGenreFilter: excludedGenreFilter,
        malAccount: malAccount,
        anilistAccount: anilistAccount,
        minDate: minDateRef.current,
        maxDate: maxDateRef.current
      }),
      headers: {
        "Accept": 'application/json',
			  'Content-Type': 'application/json'
        
      }
    });
  
    if (response.status != 200) {
      let data = await response.json();
      console.log('Our Backend Server appears to be throwing a fit.');
    }
    //console.log(response);
    const json = await response.json();
    setResultsVisible(false);
    console.log(json);
    if (json.id != undefined){
      if (json.titleEN != undefined && json.titleEN != null && json.titleEN.length > 0){
        setResultsTitle(json.titleEN);
      }
      else if (json.titleUserPref != undefined && json.titleUserPref != null && json.titleUserPref.length > 0){
        setResultsTitle(json.titleUserPref);
      }
      else{
        setResultsTitle("-");
      }
      setResultsId(json.id);
      setResultsUrl("https://anilist.co/anime/" + json.id);
      setResultsYear(json.startDate.year);
      setResultsImage(json.coverImage);
      setResultsDescription(json.description.replaceAll("<br>", "").replaceAll("<i>","").replaceAll("</i>",""));
      // setResultsDescription(resultsDescription.replaceAll("<br>", ""))
      // setResultsDescription(resultsDescription.substring(0, 200));
      setResultsVisible(true);
      console.log(json.id);
    }
  }

  const handleDateRangeChange = (val: string) => {
    //this.setState({language: val});
    console.log("I AM WORKING!!!" + val);
  }

  const clearFormContents = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    console.log("I clicked Clear Form Contents!");
    // setGenreListFilterDispatch({type:'update', value:""});
    // setMalAccount("ABC12346");
    // setGenreFilter("");
    // setExcludedGenreFilter("");
    // setState(Date.now());
    // setState2(Date.now() + 1);
  }

  //if preceding text is non-space (search based on that text)
  //when clicking if preceding text is non-space, complete text with that and add a space
  //search terms are all obviously space-delimited


  return (
    <form >
      {/* onSubmit={handleFormSubmission} */}
      
      <div className="flex flex-row gap-4">
        <Card className="max-w-[400px]">
            <CardHeader>
                <CardTitle>AniRecs</CardTitle>
                <CardDescription>Recommend me an anime based on some simple information.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="formContainer">
                    <Label className="text-base">Anilist Account:
                        <Input type="text"
                        value={anilistAccount}
                        onChange={(e) => setAnilistAccount(e.target.value)} /><br/>
                    </Label>
                    <Label className="text-base">Mal Account:
                        <Input type="text"
                        value={malAccount}
                        onChange={(e) => setMalAccount(e.target.value)} /><br/>
                    </Label>
                    <div className="flex flex-row gap-4 items-center justify-items-center pb-4">
                    <Label className="text-base">Include 18+ content:
                        {/* <input type="checkbox"
                        value={enableAdultContent}
                        onChange={(e) => {
                            setEnableAdultContent(e.target.checked);
                        }} /> */}
                        {/* <Label htmlFor="email">Your email address</Label> */}
                        
                    </Label>
                      <Switch
                          checked={enableAdultContent}
                          onCheckedChange={(e) => setEnableAdultContent(e)}
                          // disabled
                          aria-readonly
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                      <GenreFilter id="genreFilter" placeholderContents="Search Genre..."   parentVal={genreFilter} setParentVal={setGenreFilter} key={state} allowAdult={enableAdultContent}/>
                      
                      <GenreFilter id="excludedGenreFilter" placeholderContents="Exclude Genre..." parentVal={excludedGenreFilter} setParentVal={setExcludedGenreFilter} key={state2} allowAdult={enableAdultContent}/>
                      <DateSlider minDateRef={minDateRef} maxDateRef={maxDateRef}/>
                    
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button onClick={(e) => handleFormSubmission(e)}>Submit</Button>
                <Button onClick={(e) => clearFormContents(e)}>Clear</Button>
            </CardFooter>
        </Card>
        {resultsVisible ? (
          <FlipCard title={resultsTitle} description={resultsDescription} year={resultsYear} image={resultsImage} url={resultsUrl}/>
        
        ) : null}
        </div>
    </form>
    
  );
}
