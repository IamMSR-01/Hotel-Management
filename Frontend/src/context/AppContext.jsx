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
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);


  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error("Failed to fetch rooms. Please try again later.");
        console.error("Failed to fetch rooms:", data.message);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Error fetching rooms. Please try again later.");
    }
  }


  const fetchUser = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;

      console.log("Fetching user", user);
      console.log("Token:", getToken);

      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User data fetched:", data);

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
  }, [user, getToken]); 

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user, fetchUser]); 

  useEffect(() => {
    fetchRooms();
  }, []);

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
      rooms,
      setRooms
    }),
    [user, isOwner, showHotelReg, searchedCities, getToken, navigate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
