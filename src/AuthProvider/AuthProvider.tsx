/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  FC,
} from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import {auth} from '../Firebase/FireBase.config'

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<any>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Default value for context
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  createUser: async () => { /* no-op */ },
  signIn: async () => { /* no-op */ },
  logOut: async () => { /* no-op */ },
  googleSignIn: async () => { /* no-op */ },
  updateUserProfile: async () => { /* no-op */ },
  setUser: () => { /* no-op */ },
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Define the type for the children prop
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic()


  // sign up
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // update user profile
  const updateUserProfile = (name: string, photo: string) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    }
    return Promise.reject("No user is signed in");
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // if (currentUser) {
      //   // get token from client site and store it
      //   const userInfo = { email: currentUser.email };
      //   axiosPublic.post("/jwt", userInfo).then((res) => {
      //     if (res.data.token) {
      //       localStorage.setItem("access-token", res.data.token);
      //       setLoading(false);
      //     }
      //   });
      // } else {
      //   localStorage.removeItem("access-token");
      //   setLoading(false);
      // }
      setLoading(false)
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  // log out
  const logOut = () => {
    setUser(null);
    setLoading(true);
    return signOut(auth);
  };

  const authInfo: AuthContextType = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    logOut,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
