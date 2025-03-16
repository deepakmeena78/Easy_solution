import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { login } from "../Authentication/AuthSlice"; // Import login action
import { loginUser } from "../Authentication/AuthServise";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleSignin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const details = async (data) => {
        if (!data.email || !data.name || !data.sub) {
            console.error("Missing required fields:", data);
            return;
        }

        const loginInfo = {
            email: data.email,
            password: data.sub,
        };
        console.log(loginInfo);


        console.log("Sending data to backend:", loginInfo);

        try {
            const data = await loginUser(loginInfo.email, loginInfo.password);
            dispatch(login({ token: data.token }));
            toast.success("Login successful!");
            if (data) {
                navigate("/");
            }
        } catch (err) {
            console.log('===========', err);
            toast.error("First Sign Up Plaese", err);
        }
    };

    return (
        <>
            <Toaster />
            <GoogleLogin
                onSuccess={(response) => {
                    const data = jwtDecode(response.credential);
                    console.log("Decoded JWT Data:", data);
                    details(data);
                }}
                onError={() => {
                    console.log("Login failed");
                }}
            />
        </>
    );
}


export default GoogleSignin
