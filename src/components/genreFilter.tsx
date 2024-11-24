import React, { useState, useEffect, useReducer, useRef, memo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "~/lib/utils";
// import "./dateSlider.css";
// export const GenreFilter = memo(function GenreFilter({ onSubmit }){});
import { Badge } from "./ui/badge";

import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { number, string } from "zod";
import  commandScore from "command-score";

export const GenreFilter = ({id, placeholderContents, parentVal, setParentVal}) => { //genreFilterDis //genreListFilterRef
     const [apiUsers, setApiUsers] = useState([]);


    useEffect(() => {
        fetch('https://dummyjson.com/users')
          .then(response => response.json())
          .then(data => {
            setApiUsers(data.users)
            //setFilteredUsers(data.users)
          })
          .catch(err => console.log(err))
      }, [])

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<never[]>([]);
    const [inputValue, setInputValue] = React.useState("");


    var relevanceArray = [];


    const handleUnselect = React.useCallback((genre: never) => {
      setSelected((prev) => prev.filter((s) => s.id !== genre.id));
      setParentVal((prev) => prev.filter((s) => s.id !== genre.id));
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        relevanceArray = [];
        if (input) {
          
          populateRelevanceArray(input.value);
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
        } else{
          populateRelevanceArray("");
        }
      },
      []
    );

    

    let selectables = apiUsers.filter(
        (genre) => !selected.includes(genre)
      );

      function populateRelevanceArray(search:string){

        var limitResults = 3;
        var arrayResultsCounter = 0;
        if ( selectables.length > 0){
          // search.length > 0 &&
          relevanceArray.splice(0,relevanceArray.length);

          for(var i = 0;i<selectables.length;i++){
            var temp = {id:selectables[i].id, name:selectables[i].firstName, score:commandScore(selectables[i].firstName, search)};
            relevanceArray.push(temp);
          }
          var tempArray = relevanceArray.slice();
          var values = tempArray
            .map(({ score }) => score)
            .sort((a, b) => b - a)
            .slice(0, limitResults),
          top3 = tempArray.filter(({ score }) => {
            if(arrayResultsCounter < limitResults && values.includes(score) && score>0){
              arrayResultsCounter++;
              return true;
            } else{
              return false;
        }
        
            });

          for(var i=0;i<relevanceArray.length;i++){
            var top3ElementIndex =  top3.findIndex((element) => element.id == relevanceArray[i].id);

            if(top3ElementIndex > -1){
              relevanceArray[i].score = top3[top3ElementIndex].score;
            }
            else{
              relevanceArray[i].score = 0;
            }
          }
        }
      }
  
      function commandFilter(value:string, search:string, keywords?:string[]){
        if (relevanceArray.length <  selectables.length){
           populateRelevanceArray(search);
        }
        var result = relevanceArray.find((element) => element.name == value);
        var temp = commandScore(value, search);
        return result.score;
      }



                    // onBlur appears to only provide event details for ITSELF and null rather than the new object we are selecting. Does not necognize it's own child objects. onBlur={trySetGenreListVisibility}

    return (
        <Command
          onKeyDown={handleKeyDown}
          className="overflow-visible bg-transparent"
          filter={commandFilter}
        >
          <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex flex-wrap gap-1">
              {selected.map((genre, index, array) => {
                return (
                  <Badge key={genre.id} variant="secondary">
                    {genre.firstName}
                    <button
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(genre);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(genre)}
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
                    {selectables.map((genre, index, array) => {
                      let result = <CommandItem
                        key={genre.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          setSelected((prev) => [...prev, genre]);
                          setParentVal((prev) => [...prev, genre]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {genre.firstName}
                      </CommandItem>;
                      
                      if (inputRef.current.value.length < 1 && genre.id > 10){
                        return false;
                      }
                        
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

