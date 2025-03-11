import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Google() {
    const details = async (data) => {
        if (!data.email || !data.name || !data.sub) {
            console.error("Missing required fields:", data);
            return;
        }

        const loginInfo = {
            name: data.name,
            email: data.email,
            password: data.sub,
        };
        console.log(loginInfo);


        console.log("Sending data to backend:", loginInfo);

        try {
            const response = await axios.post(
                "http://localhost:3200/customer/sign-up",
                loginInfo,
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
        }
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
