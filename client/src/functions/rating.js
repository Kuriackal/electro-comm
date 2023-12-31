import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (p) =>{
    if(p && p.ratings){
        let ratingsArray = p && p.ratings  
        let total =[]
        let length=ratingsArray.length
        console.log("length",length)

        ratingsArray.map((r)=> total.push(r.star))
        let totalReduced =total.reduce((p,n)=> p+n,0)
        console.log("totalReduced",totalReduced)

        let highest= length*5; //if everyone leaves the rating the highest value
        console.log("highest",highest)

        let result=(totalReduced*5)/highest;// To get the average of the star,This is the final output
        console.log("result",result)

        return(
            <div className=" text-center pt-1 pb-3 ">
                <span>
                    <StarRatings 
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="red"
                    editing={false}
                    rating={result}
                    
                    />{""}
                    ({p.ratings.length})
                </span>
                
            </div>

        )

    }
}