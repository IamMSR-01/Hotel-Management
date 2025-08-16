import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react"; 
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const fetchUser = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });


      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        console.error("Failed to fetch user data:", data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data. Please try again later.");
    }
  }, [getToken]); 

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user, fetchUser]); 

  const value = useMemo(
    () => ({
      currency,
      navigate,
      user,
      getToken,
      isOwner,
      setIsOwner,
      axios,
      showHotelReg,
      setShowHotelReg,
      searchedCities,
      setSearchedCities,
    }),
    [user, isOwner, showHotelReg, searchedCities, getToken, navigate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
