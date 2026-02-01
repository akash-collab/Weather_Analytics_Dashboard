import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useSelector } from "react-redux";
import UnitToggle from "./Common/UnitToggle";

const Header = () => {
  const user = useSelector(state => state.auth.user);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <header className="bg-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* Title (left) */}
        <h1 className="font-bold text-lg">
          Weather Dashboard
        </h1>

        {/* Controls (forced to far right) */}
        <div className="flex items-center gap-4 ml-auto">
          
          <UnitToggle />

          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0)}
                </div>
              )}

              <span className="text-sm font-medium hidden sm:block">
                {user.name}
              </span>

              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;