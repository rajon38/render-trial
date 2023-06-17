import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loading = ({ path = "login" })=> {
  // state
  const [count, setCount] = useState(3);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
      <div className="w-12 h-12 rounded-full animate-spin
                    border-8 border-solid border-purple-500 border-t-transparent shadow-md"></div>
  );
}

export default Loading;
