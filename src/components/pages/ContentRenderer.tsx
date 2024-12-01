import { Cards } from "./Cards"
import { Home } from "./Home"
import { Settings } from "./Settings"
import { Story } from "./Story"
import { WordListing } from "./WordListing"


const COMPONENT_MAP={
    "home":Home,
    "word-listing":WordListing,
    "cards":Cards,
    "story":Story,
    "settings":Settings,
    default: Home
}
export const ContentRenderer=(currentPage:string)=>{
    const Component=COMPONENT_MAP[currentPage as keyof typeof COMPONENT_MAP]||COMPONENT_MAP.default
    return (
        <Component />
    )
}