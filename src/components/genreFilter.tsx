import React, { useState, useEffect, } from "react";
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

export const GenreFilter = ({id, placeholderContents, parentVal, setParentVal, allowAdult}:{id:any, placeholderContents:any, parentVal:any, setParentVal:any, allowAdult:any}) => { //genreFilterDis //genreListFilterRef


      const [ genres, setGenres] = useState([])
      useEffect(() => {
        // fetch('http://localhost:5000/getGenres')
        // fetch('https://anirecsbackend-951543336432.northamerica-northeast2.run.app/getGenres') 
        fetch('https://anirecsbackend-951543336432.us-central1.run.app/getGenres')
          .then(response => response.json())
          .then(data => {
            
            // console.log(data.data)
            setGenres(data.data);
          })
          .catch(err => console.log(err))
      }, [])

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<never[]>([]);
    const [inputValue, setInputValue] = React.useState("");

    const counterRef = React.useRef<number>(0);

    var relevanceArray: { _id: any; name: any; score: any; }[] | { score: number; }[] = [];


    const handleUnselect = React.useCallback((genre: never) => {
      setSelected((prev) => prev.filter((s) => s._id !== genre._id));
      setParentVal((prev: any[]) => prev.filter((s) => s._id !== genre._id));
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        counterRef.current = 0;
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
              setParentVal((prev: any) => {
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

    

    let selectables = genres.filter(
        (genre) => !selected.includes(genre) && ((allowAdult) || (!allowAdult && !genre.isAdult))
      );
      
      //TRUE
        //Not Includes & isAdult
        //Not Includes & Not isAdult and Not genre.isAdult
      //FALSE
        // Included OR genre.isAdult & Not isAdult
        // 

      function populateRelevanceArray(search:string){

        var limitResults = 10;
        var arrayResultsCounter = 0;
        if ( selectables.length > 0){
          // search.length > 0 &&
          relevanceArray.splice(0,relevanceArray.length);

          for(var i = 0;i<selectables.length;i++){
            var temp = {_id:selectables[i]._id, name:selectables[i].name, score:commandScore(selectables[i].name, search)};
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
          // console.log("top3");
          // console.log(top3);

          for(var i=0;i<relevanceArray.length;i++){
            var top3ElementIndex =  top3.findIndex((element) => element._id === relevanceArray[i]._id);

            if(top3ElementIndex > -1){
              relevanceArray[i].score = top3[top3ElementIndex].score;
            }
            else{
              relevanceArray[i].score = 0;
            }
          }
          // console.log(relevanceArray);
        }
      }
  
      function commandFilter(value:string, search:string, keywords?:string[]){
        if (relevanceArray.length <  selectables.length){
           populateRelevanceArray(search);
        }
        var result = relevanceArray.find((element) => element.name == value);
        var temp = commandScore(value, search);
        if (result != null && result != undefined && result.score != null && result.score != undefined){
          return result.score;
        }
        return 0;
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
                  <Badge key={genre._id} variant="secondary">
                    {genre.name}
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
                        key={genre._id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          setSelected((prev) => [...prev, genre]);
                          setParentVal((prev: any) => [...prev, genre]);
                        }}
                        className={"cursor-pointer"}
                      >
                        {genre.name}
                      </CommandItem>;
                      
                      if (index == 0){
                        counterRef.current = 0;
                      }
                      if (inputRef.current != null){
                        if (inputRef.current.value.length < 1 && counterRef.current > 10){
                        // console.log(inputRef.current?.value.length);
                        return false;
                      }
                      }
                      counterRef.current = counterRef.current + 1; 
                      // console.log(inputRef.current?.value.length);
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

