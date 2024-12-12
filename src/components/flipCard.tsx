///////////FLip Card animation is ****ed
////use this tutorial instead https://www.youtube.com/watch?v=GSOgbZ396MI&t=219s
///Making proper card flip animations is not for the faint of heart and will take literal days. Not worth doing ATM
///find hosting.
//Buy domain from - CloudFlare? https://www.cloudflare.com/plans/
//Host backend on GCP under EtherealAffairs account  https://console.cloud.google.com/run?authuser=2&hl=en&inv=1&invt=Abj4_g&project=ordinal-env-444503-k4
//Use GCP's firebase to host front end https://console.firebase.google.com/u/2/project/anirecs/hosting/sites/anirecs

//Try to skip the "npm build" process and use github directly to deploy on firebase?

//Dont forget to containerize this stuff!

import React, { useState, useEffect} from "react"
// import { animated, useSpring } from "@react-spring/web";
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


    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    // const [rotate, setRotate] = useState(0);

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