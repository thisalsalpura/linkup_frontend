import { UserRegistrationData } from "../hooks/UserContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/linkup_backend"

export const signInToUserAccount = async (
    userRegistrationData: UserRegistrationData,
) => {
    const userOBJECT = {
        countryCode: userRegistrationData.countryCode,
        mobile: userRegistrationData.mobile
    };

    const userJSON = JSON.stringify(userOBJECT);

    const response = await fetch(API + "/SignInToUserAccount", {
        method: "POST",
        body: userJSON
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "Something went wrong! Please try again later.";
    }
}