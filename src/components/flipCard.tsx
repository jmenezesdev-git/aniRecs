///////////FLip Card animation is ****ed
////use this tutorial instead https://www.youtube.com/watch?v=GSOgbZ396MI&t=219s
///Fix this, backspace error with score, minimize API calls (it calls once per anime in pre-return), then find hosting.
//CloudFlare? https://www.cloudflare.com/plans/

import React, { useState, useEffect} from "react"
// import { animated, useSpring } from "@react-spring/web";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion, useSpring } from "framer-motion";

export const FlipCard = ({title, description, year, image, url}) => {

    const [isFlipped, setIsFlipped] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // const [anilistLink, setAnilistLink] = useState("https://anilist.co/anime/" + id)
    // const { transform, opacity } = useSpring({
    //     opacity: isFlipped ? 1 : 0,
    //     transform: `perspective(1800px) rotateY(${isFlipped ? 180 : 0}deg)`,
    //     config: { mass: 5, tension: 500, friction: 80 },
    //   });

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };
    const handleMouseLeave = () => {
    if (!isDropdownOpen) {
        setIsFlipped(false);
    }
    };

    
    const handleClick = () => {
        if (isFlipped) {
            setIsFlipped(false);
        } else{
            setIsFlipped(true);
        }
        };
        const handleClickAAA = () => {
            // if (isFlipped) {
            //     setIsFlipped(false);
            // } else{
            //     setIsFlipped(true);
            // }
            };
    const testStopPropagation = (e) => {
        e.stopPropagation();
    }


    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);

    const spring = {
        type: "spring",
        animationDirection: "normal",
        stiffness: 50,
        damping: 40,
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
            animate={{x: isFlipped ? 400:0 ,  rotateY: isFlipped ? -180 : 0 }}
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