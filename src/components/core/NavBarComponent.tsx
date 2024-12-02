import { useLocation } from "react-router-dom";

export default function NavBarComponent() {

  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="ml-1 text-white text-sm font-bold flex flex-col gap-10 bg-customGray px-10 w-25 rounded-l-lg h-screen fixed shadow-lg">
      <div className="mt-10">
        <a href="/" className={` mt-10 py-5 flex items-center hover:opacity-80 transition-opacity ${  isActiveRoute("/") ? "opacity-100" : "opacity-50"}`}>
          <img
            src="static/svg/house-solid.svg"
            className="w-5 h-5 brightness-0 invert"
            alt="Home"
          />
          <span className="ml-2">Home</span>
        </a>
      </div>

      <div>
        <a href="/word-list" className={`py-5 flex items-center hover:opacity-80 transition-opacity ${  isActiveRoute("/word-list") ? "opacity-100" : "opacity-50"}`}>
          <img
            src="static/svg/bars-solid.svg"
            className="w-5 h-5 brightness-0 invert"
            alt="Settings"
          />
          <span className="ml-2">Word Listing</span>
        </a>
      </div>

      <div>
        <a href="/cards" className={`py-5 flex items-center hover:opacity-80 transition-opacity ${  isActiveRoute("/cards") ? "opacity-100" : "opacity-50"}`}>
          <img
            src="static/svg/square-regular.svg"
            className="w-5 h-5 brightness-0 invert"
            alt="Cards"
          />
          <span className="ml-2">Cards</span>
        </a>
      </div>

      <div>
        <a href="/story" className={`py-5 flex items-center hover:opacity-80 transition-opacity ${  isActiveRoute("/story") ? "opacity-100" : "opacity-50"}`}>
          <img
            src="static/svg/book-solid.svg"
            className="w-5 h-5 brightness-0 invert"
            alt="Story"
          />
          <span className="ml-2">Story</span>
        </a>
      </div>

      <div>
        <a href="/settings" className={`py-5 flex items-center hover:opacity-80 transition-opacity ${  isActiveRoute("/settings") ? "opacity-100" : "opacity-50"}`}>
          <img
            src="static/svg/gears-solid.svg"
            className="w-5 h-5 brightness-0 invert"
            alt="Settings"
          />
          <span className="ml-2">Settings</span>
        </a>
      </div>

      
    </div>
  );
}
