import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAIN_TITLE = "ماکوین | خرید ارز دیجیتال";



export default function useTitle( title : string) {
  const location = useLocation();

  useEffect(() => {
    if (title) {
      document.title = `ماکوین | ${title}`;
    } else if (location.pathname === "/") {
      document.title = MAIN_TITLE;
    } else {
     
      document.title = MAIN_TITLE;
    }
  }, [title, location.pathname]); 
}
