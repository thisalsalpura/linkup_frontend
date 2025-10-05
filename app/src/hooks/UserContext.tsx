import React, { createContext, ReactNode, useContext, useState } from "react";

export interface UserRegistrationData {
    fname: string;
    lname: string;
    countryCode: string;
    mobile: string;
    profileImage: string | null;
}

interface UserRegistrationContextType {
    userData: UserRegistrationData,
    setUserData: React.Dispatch<React.SetStateAction<UserRegistrationData>>;
}

const UserRegistrationContext = createContext<UserRegistrationContextType | undefined>(undefined);

export const UserRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserRegistrationData>({
        fname: "",
        lname: "",
        mobile: "",
        countryCode: "",
        profileImage: null,
    });

    return (
        <UserRegistrationContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserRegistrationContext.Provider>
    );
}

export const useUserRegistration = (): UserRegistrationContextType => {
    const ctx = useContext(UserRegistrationContext);
    if (!ctx) {
        throw new Error("useUserRegistration must be used within a UserRegistrationProvider!");
    }
    return ctx;
}