import React, { useState, useEffect, MouseEvent} from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { motion, useSpring } from "framer-motion";
import { Button } from "./ui/button";

export const FlipCard = ({title, description, year, image, url, resultsVisible, setResultsVisible}:{title:any, description:any, year:any, image:any, url:any, resultsVisible:boolean, setResultsVisible:any}) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [localScreenWidth, setLocalScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setLocalScreenWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleClick = () => {
        if (window.innerWidth < 800){
            //Doing Nothing
        }
        else{
            tryFlip();
        }
    };
    
    function tryFlip(){
        if (isFlipped) {
            setIsFlipped(false);
        } else{
            setIsFlipped(true);
        }
    }

    function handleFlip(event:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>){
        event.preventDefault();
        event.stopPropagation();
        console.log("HandleFlipCalled");
        tryFlip();
    }
    function handleReturnToMenu(event:MouseEvent<HTMLButtonElement, globalThis.MouseEvent>){
        event.preventDefault();
        event.stopPropagation();
        setResultsVisible(false);
    }



    const spring = {
        type: "spring",
        animationDirection: "normal",
        stiffness: 40,
        damping: 30,
    }


    return (
        <motion.div
            onClick={handleClick}
                transition={spring}
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                }}
        >
        <motion.div
            animate={{x: isFlipped ? 400:0, rotateY: isFlipped ? -180 : 0 }}
            // x: isFlipped? 400:0 ,
            transition={spring}
            style={{
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: "hidden",
                position: "absolute",
                originX: 0.5,
            }}
        >
        <Card className="max-w-[400px] min-w-96">
        <CardHeader>
                <CardTitle><a className="underline" onClick={(e) => { e.stopPropagation();}} href={url}>{title}</a></CardTitle>
                <CardDescription>{year}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <img src={image} alt={title}/>
                {/* <p>{resultsDescription}</p> */}
              </div>
            </CardContent>
            {(localScreenWidth < 800) ? (
            <CardFooter className="flex justify-between">
                <Button onClick={(e) => handleFlip(e)}>Flip</Button>
                <Button onClick={(e) => handleReturnToMenu(e)}>Return</Button>
            </CardFooter>
            ):null}
            
        </Card>
        </motion.div>


        <motion.div
            // initial={{ rotateY: 180}}
            initial={{ rotateY: +-180, scale: 1.1}}
            // animate={{x: isFlipped ? 0:400 , rotateY: isFlipped ? 0 : 180 }}
            animate={{x: !isFlipped ? 400:0 , rotateY: !isFlipped ? -180 : -360, scale: !isFlipped ? 1.6:1 }}
            // 
            transition={spring}
            style={{
                width: "100%",
                height: "100%",
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: "hidden",
                position: "absolute",
                originX: 0.5,
            }}
        >

        <Card className="max-w-[400px] min-w-96">
            <CardHeader>
                <CardTitle><a className="underline" onClick={(e) => { e.stopPropagation();}} href={url}>{title}</a></CardTitle>
                <CardDescription>{year}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p className="whitespace-pre-wrap">{description}</p>
              </div>
            </CardContent>
            {(localScreenWidth < 800) ? (
            <CardFooter className="flex justify-between">
                <Button onClick={(e) => handleFlip(e)}>Flip</Button>
                <Button onClick={(e) => handleReturnToMenu(e)}>Return</Button>
            </CardFooter>
            ):null}
            
        </Card>
    </motion.div>
    </motion.div>
    );
}

export default FlipCard;