export const validateFname = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "First name is Required!";
    }
    return null;
}

export const validateLname = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Last name is Required!";
    }
    return null;
}

export const validateMobile = (mobile: string): string | null => {
    const regex = /^[1-9][0-9]{6,14}$/;

    if (!mobile) {
        return "Mobile Number is Required!";
    }

    if (!regex.test(mobile)) {
        return "Enter a valid Mobile Number!";
    }

    return null;
}

export const validateProfileImage = (
    image: {
        uri: string;
        type?: string;
        fileSize?: number;
    } | null
): string | null => {
    if (!image) {
        return "Profile Image is Required!";
    }

    if (image.type && !["image/jpeg", "image/jpg", "image/png"].includes(image.type)) {
        return "Invalid Image type, only JPEG, JPG and PNG type Images can upload!";
    }

    if (image.fileSize && image.fileSize > 10 + 1024 * 1024) {
        return "Image size must be less than 10MB!";
    }

    return null;
}