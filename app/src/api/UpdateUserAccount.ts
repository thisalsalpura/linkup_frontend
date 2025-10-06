import { UserRegistrationData } from "../hooks/UserContext"

const API = process.env.EXPO_PUBLIC_APP_URL + "/linkup_backend"

export const updateUserAccount = async (
    userId: string,
    userRegistrationData: UserRegistrationData
) => {
    let form = new FormData();
    form.append("userId", userId);
    form.append("fname", userRegistrationData.fname);
    form.append("lname", userRegistrationData.lname);
    form.append("countryCode", userRegistrationData.countryCode);
    form.append("mobile", userRegistrationData.mobile);
    if (userRegistrationData.profileImage) {
        form.append("profileImgStatus", "WITH_PROFILE_IMG");
        form.append("profileImage", {
            uri: userRegistrationData.profileImage,
            name: "profile-pic.png",
            type: "image/png"
        } as any);
    } else {
        form.append("profileImgStatus", "WITHOUT_PROFILE_IMG");
    }

    const response = await fetch(API + "/UpdateUserAccount", {
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