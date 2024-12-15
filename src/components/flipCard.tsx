import React, { useState, useEffect} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion, useSpring } from "framer-motion";

export const FlipCard = ({title, description, year, image, url}:{title:any, description:any, year:any, image:any, url:any}) => {

    const [isFlipped, setIsFlipped] = useState(false);
    
    const handleClick = () => {
        if (isFlipped) {
            setIsFlipped(false);
        } else{
            setIsFlipped(true);
        }
        };



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
        </Card>
    </motion.div>
    </motion.div>
    );
}

export default FlipCard;