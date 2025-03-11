import { useDispatch } from "react-redux";
import { logout } from "../Authentication/AuthSlice";
import { useNavigate } from "react-router-dom";



export function LogOut() {
  const navigate =  useNavigate()
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate('/')
  }
  return <span onClick={handleLogout}>Logout</span>;
}  
export function Login() {
  // const router = useRouter();
  function handleLogIn() {
    // router.push("/pages/auth/login");
  }
  return (
    <button
      onClick={handleLogIn}
      className="px-4 py-2  text-darkColor font-semibold rounded-lg border border-darkColor  focus:ring-2 focus:ring-mutedColor transition-all"
    >
      Login
    </button>
  );
}
