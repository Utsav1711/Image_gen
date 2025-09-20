// import axios from "axios";
// import { useEffect } from "react";
// import { createContext, useState } from "react";
// import { useNavigate} from "react-router-dom";
// import { toast } from "react-toastify";

// export const AppContext = createContext()

// const AppContextProvider = (props) => {
//     const [user, setUser] = useState(null);
//     const [showLogin, setShowLogin] = useState(false);
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [credit, setCredit] = useState(false);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     // ketala Credits baki che te load karva mate
//     const loadCreditsData = async () => {
//         try {
//             const { data } = await axios.get(backendUrl + '/api/user/credits', {
//                 headers: { token }
//             })
//             if (data.success) {
//                 setCredit(data.credits)
//                 setUser(data.user)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }
//     }

//     // Image generate Karva 
//     // const generateImage = async (prompt) => {
//     //     const {data} = await axios.post(backendUrl + '/api/image/generate-image' , {prompt} , {headers:{token}})

//     //     if(data.success){
//     //         loadCreditsData()
//     //         return { image: data.resultImage, creditBalance: data.creditBalance }
//     //     }
//     //     else{
//     //         toast.error(data.message)
//     //         loadCreditsData()

//     //         if(data.creditBalance === 0){
//     //             navigate('/buy')
//     //         }
//     //     }
//     // }

//     const generateImage = async (prompt) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + '/api/image/generate-image',
//                 { prompt },
//                 { headers: { token } }
//             )

//             if (data.success) {
//                 loadCreditsData()
//                 return { image: data.resultImage, creditBalance: data.creditBalance }
//             } else {
//                 toast.error(data.message)
//                 loadCreditsData()
//                 return { error: true, creditBalance: data.creditBalance }
//             }
//         } catch (error) {
//             toast.error(error.message || "Image generation failed")
//             return { error: true }
//         }
//     }



//     // logout karti vakhate 
//     const logout = () => {
//         localStorage.removeItem('token')
//         setToken(null)
//         setUser(null)
//         toast.success("Logged Out")
//     }

//     // token ma change thase tyare credit load karva mate
//     useEffect(() => {
//         if (token) {
//             loadCreditsData()
//         }
//     }, [token])

//     const value = {
//         user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )

// }

// export default AppContextProvider


import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // 🔹 Load user credits
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Load Credits Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 🔹 Generate Image
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        loadCreditsData();
        return { image: data.resultImage, creditBalance: data.creditBalance };
      } else {
        toast.error(data.message);
        loadCreditsData();

        if (data.creditBalance === 0) {
          navigate("/buy");
        }
        return { error: true, creditBalance: data.creditBalance };
      }
    } catch (error) {
      console.error("Frontend Generate Error:", error);
      toast.error(error.response?.data?.message || "Image generation failed");
      return { error: true };
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged Out");
  };

  // 🔹 Auto load credits on token change
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
