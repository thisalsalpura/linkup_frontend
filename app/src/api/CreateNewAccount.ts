import { UserRegistrationData } from "../hooks/UserContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/linkup_backend"

export const createNewAccount = async (
    userRegistrationData: UserRegistrationData,
    profileImgStatus: string
) => {
    let form = new FormData();
    form.append("fname", userRegistrationData.fname);
    form.append("lname", userRegistrationData.lname);
    form.append("countryCode", userRegistrationData.countryCode);
    form.append("mobile", userRegistrationData.mobile);
    form.append("profileImgStatus", profileImgStatus);
    if (profileImgStatus === "WITH_PROFILE_IMG") {
        form.append("profileImage", {
            uri: userRegistrationData.profileImage,
            name: "profile-pic.png",
            type: "image/png"
        } as any);
    }

    const response = await fetch(API + "/CreateNewAccount", {
        method: "POST",
        body: form
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "Something went wrong! Please try again later.";
    }
}