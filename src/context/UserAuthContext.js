import { createContext,useEffect,useState, useContext } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

const AuthContext = createContext();
export function AuthProvider({ children }){
    const[currentUser,setCurrentUser] = useState("")
    const [loading, setLoading] = useState(true)

    function signup(email,password,passwordConfirm){
        return createUserWithEmailAndPassword(auth,email,password,passwordConfirm)

    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)

    }
    const value ={ currentUser, signup, login }


    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth,(User) =>{
            setCurrentUser(User);
            setLoading(false)

        });
        return () => {
            unsubcribe();
        }
    },[]);

    return <AuthContext.Provider value={value} >
        {!loading && children}
        {/* { children} */}

     </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext);
}