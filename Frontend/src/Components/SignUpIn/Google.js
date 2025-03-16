import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Google({ setData }) {
    const details = async (data) => {
        if (!data.email || !data.name || !data.sub) {
            console.error("Missing required fields:", data);
            return;
        }
        const loginInfo = {
            name: data.name,
            email: data.email,
            password: data.sub,
            mobile: 999999999
        };

        console.log("Sending data to backend:", loginInfo);
        setData(loginInfo);
    };

    return (
        <GoogleLogin
            onSuccess={(response) => {
                const data = jwtDecode(response.credential);
                console.log("Decoded JWT Data:", data);  // ✅ Check JWT data
                details(data);
            }}
            onError={() => {
                console.log("Login failed");
            }}
        />
    );
}

export default Google;
