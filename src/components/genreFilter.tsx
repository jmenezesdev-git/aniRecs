import React, { useState, useEffect, useReducer, useRef, memo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "~/lib/utils";
// import "./dateSlider.css";
// export const GenreFilter = memo(function GenreFilter({ onSubmit }){});
import { Badge } from "./ui/badge";

import { Command as CommandPrimitive } from "cmdk";
import { number, string } from "zod";
import  commandScore from "command-score";

export const GenreFilter = ({id, placeholderContents, parentVal, setParentVal}) => { //genreFilterDis //genreListFilterRef
     const [apiUsers, setApiUsers] = useState([]);

    // const [genreTerms, setGenreTerms] = useState("");
    // const [genreListVisibility, setGenreListVisibility] = useState(false);
    // const [filteredUsers, setFilteredUsers] = useState([]);


    useEffect(() => {
        fetch('https://dummyjson.com/users')
          .then(response => response.json())
          .then(data => {
            setApiUsers(data.users)
            //setFilteredUsers(data.users)
          })
          .catch(err => console.log(err))
      }, [])

    // function showListOverlay(){
    //     hideGenreLists(false);
    //     tryGenreFilterChange(genreTerms,"genre");
    //   }

    // function hideGenreLists(val) {
    // if (val == true){
    //     setGenreListVisibility(false);
    // }
    // else{
    //     setGenreListVisibility(true);
    // }

    // }

    // function tryGenreFilterChange(val, type){
    //     if (type.toLowerCase() == "genre"){
    //       setGenreTerms(val);
    //       setParentVal(val);

    //     }
    //     genreFilterChange(val);
    //   }
      
    // const onGenreFilterChange = (e) => { 
    //     tryGenreFilterChange(e.target.value, "genre");
        
    // }

    // function genreFilterChange(val){
    //     const re = /^((.*) )?(\S+)?$/;
    //     const searchTerm = val;
    //     var filteredItems = apiUsers.filter((user) =>
    //       user.firstName.toLowerCase().includes("")
    //     );
    //     if (searchTerm.match(re) && searchTerm.match(re)[3] != null && searchTerm.match(re)[3] != undefined && searchTerm.match(re)[3] != ""){
          
    //       if (searchTerm.match(re)[2] != null && searchTerm.match(re)[2] != undefined && searchTerm.match(re)[2] != ""){
    //         var exclusionArray = searchTerm.match(re)[2].split(' ');
            
    //         for (var i = 0; i < exclusionArray.length; i++) {
    //           exclusionArray[i] = exclusionArray[i].toLowerCase();
    //         }
    //         const exclude = new Set(exclusionArray)
    //         filteredItems = apiUsers.filter((user) =>
    //           user.firstName.toLowerCase().includes(searchTerm.match(re)[3].toLowerCase()))
    //           .filter((user) => 
    //             !exclude.has(user.firstName.toLowerCase())
    //         );
    //       } else{
    //         filteredItems = apiUsers.filter((user) =>
    //           user.firstName.toLowerCase().includes(searchTerm.match(re)[3].toLowerCase()));
    
    //       }
          
    //     }
    //     else if (searchTerm.match(re) && searchTerm.match(re)[2] != null && searchTerm.match(re)[2] != undefined && searchTerm.match(re)[2] != ""){
    //       var exclusionArray = searchTerm.match(re)[2].split(' ');
    //       for (var i = 0; i < exclusionArray.length; i++) {
    //         exclusionArray[i] = exclusionArray[i].toLowerCase();
    //       }
    //       const exclude = new Set(exclusionArray)
    //       filteredItems = apiUsers.filter((user) => 
    //           !exclude.has(user.firstName.toLowerCase())
    //       );
    
    //     }
    //     else{
    //       filteredItems = apiUsers.filter((user) =>
    //         user.firstName.toLowerCase().match(re)
    //       );
    //     }
    
    //     setFilteredUsers(filteredItems);
    // }

    // const onClickGenreList = (e) => { 
    //     e.stopPropagation();
    //     const re = /^(.* )?(\S+)$/;
    //     var test = genreTerms;
    //     const genreTermsMatches = genreTerms.match(re);
    //     if (genreTermsMatches !== null && genreTermsMatches[2] !== null){
    //       var newGenreTerms = "";
    //       if (genreTermsMatches[1] != null && genreTermsMatches[1] != undefined){
    //         newGenreTerms += genreTermsMatches[1]
    //       }
    //       newGenreTerms += e.target.textContent + " ";
    //       setGenreTerms(newGenreTerms);
    //       setParentVal(newGenreTerms);
    //     }
    //     else{
    //       setGenreTerms(genreTerms + e.target.textContent + " ");
    //       setParentVal(genreTerms + e.target.textContent + " ");
    //     }
    
    //     setGenreListVisibility(false);
    //     hideGenreLists(true);
    // }  
    
    // function useOutsideAlerter(ref) {
    //     useEffect(() => {
    //       function handleClickOutside(event) {
    //         if (ref.current && !ref.current.contains(event.target)) {
    //           console.log("You clicked outside of"+ id + "!");
    //           hideGenreLists(true);
    //         }
    //       }
    //       document.addEventListener("mousedown", handleClickOutside);
    //       return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //       };
    //     }, [ref]);
    // }
    // const wrapperRef = useRef(null);
    // useOutsideAlerter(wrapperRef);

    // const [open, setOpen] = React.useState(false);
    // const [value, setValue] = React.useState("");

      
    type Article = Record<"id" | "firstName" | "lastName", string>;
    

    

    type Framework = Record<"value" | "label", string>;
    const FRAMEWORKS  = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
    ] satisfies Framework[];


    
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected_, setSelected_] = React.useState<Framework[]>([]);//([FRAMEWORKS[2]]);
    const [selected, setSelected] = React.useState<never[]>([]);//([FRAMEWORKS[2]]);
    const [inputValue, setInputValue] = React.useState("");

    var listReturnCounter = 0;
    const maxListReturnCounter = 10;
    var relevanceArray = [];


    const handleUnselect = React.useCallback((framework: never) => {
      setSelected((prev) => prev.filter((s) => s.id !== framework.id));
      setParentVal((prev) => prev.filter((s) => s.id !== framework.id));
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        relevanceArray = [];
        populateRelevanceArray("e");
        const input = inputRef.current;
        if (input) {
          if (e.key === "Delete" || e.key === "Backspace") {
            if (input.value === "") {
              setSelected((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              });
              setParentVal((prev) => {
                const newSelected = [...prev];
                newSelected.pop();
                return newSelected;
              });
            }
          }
          // This is not a default behaviour of the <input /> field
          if (e.key === "Escape") {
            input.blur();
          }
        }
      },
      []
    );

    

    let selectables = apiUsers.filter(
        (framework) => !selected.includes(framework)
      );

      function populateRelevanceArray(search:string){
        if (search.length > 0 && selectables.length > 0){
          relevanceArray.splice(0,relevanceArray.length);

          for(var i = 0;i<selectables.length;i++){
            // console.log(selectables[0].id);
            // console.log(selectables[0].firstName);
            var temp = {id:selectables[i].id, name:selectables[i].firstName, score:commandScore(selectables[i].firstName, search)};
            relevanceArray.push(temp);
          }
          console.log(relevanceArray);
          var tempArray = relevanceArray.slice();
          var values = tempArray
            .map(({ score }) => score)
            .sort((a, b) => b - a)
            .slice(0, 3),
          top3 = tempArray.filter(({ score }) => values.includes(score));
          console.log(values);
          console.log(top3);
        }
      }
  
      function commandFilter(value:string, search:string, keywords?:string[]){
        // commandScore.commandScore(value, search);
        // console.log(value);
        // if (relevanceArray != null){
           populateRelevanceArray(search);
        // }
        var temp = commandScore(value, search);
        // console.log(temp);
        return temp;
      }
    // FRAMEWORKS.filter(
    //   (framework) => !selected.includes(framework)
    // );

    // {genreListVisibility && (
    //     <ul className='dropdownlist' >
    //     {filteredUsers.map(user => <li key={user.id}
    //                                   onClick={onClickGenreList} 
    //                               >{user.firstName}</li>)}
    //     </ul>





    //   )}

                    // onBlur appears to only provide event details for ITSELF and null rather than the new object we are selecting. Does not necognize it's own child objects. onBlur={trySetGenreListVisibility}

    return (
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
          filter={commandFilter}
        >
          <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex flex-wrap gap-1">
              {selected.map((framework, index, array) => {
                return (
                  <Badge key={framework.id} variant="secondary">
                    {framework.firstName}
                    <button
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(framework);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(framework)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                );
              })}
              {/* Avoid having the "Search" Icon */}
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder={placeholderContents}
                className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="relative mt-2">
            <CommandList>
              {open && selectables.length > 0 ? (
                <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                  <CommandEmpty>No matching genre found!</CommandEmpty>
                  <CommandGroup className="max-h-96 overflow-auto">
                    {selectables.map((framework, index, array) => {
                      let result = <CommandItem
                        key={framework.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          setSelected((prev) => [...prev, framework]);
                          setParentVal((prev) => [...prev, framework]);
                          console.log(apiUsers);
                        }}
                        className={"cursor-pointer"}
                      >
                        {framework.firstName}
                      </CommandItem>;
                      
                        return (result);
                    })}
                  </CommandGroup>
                </div>
              ) : null}
            </CommandList>
          </div>
        </Command>


    );

};


export default GenreFilter;

