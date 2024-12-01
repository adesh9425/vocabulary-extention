import { useState } from "react";
import { WordListingComponent } from "../core/WordListingComponent";
import StoryCard from "../core/StoryCard";

export const Home=()=>{
   
    return (
      <div>
        <WordListingComponent />
        <StoryCard />
      </div>
    )
      
}