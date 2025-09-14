import React from "react";
import { useFonts } from "expo-font";

export function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        EncodeSansCondensedBlack: require('../../../assets/fonts/EncodeSansCondensed-Black.ttf'),
        EncodeSansCondensedBold: require('../../../assets/fonts/EncodeSansCondensed-Bold.ttf'),
        EncodeSansCondensedExtraBold: require('../../../assets/fonts/EncodeSansCondensed-ExtraBold.ttf'),
        EncodeSansCondensedExtraLight: require('../../../assets/fonts/EncodeSansCondensed-ExtraLight.ttf'),
        EncodeSansCondensedLight: require('../../../assets/fonts/EncodeSansCondensed-Light.ttf'),
        EncodeSansCondensedMedium: require('../../../assets/fonts/EncodeSansCondensed-Medium.ttf'),
        EncodeSansCondensedRegular: require('../../../assets/fonts/EncodeSansCondensed-Regular.ttf'),
        EncodeSansCondensedSemiBold: require('../../../assets/fonts/EncodeSansCondensed-SemiBold.ttf'),
        EncodeSansCondensedThin: require('../../../assets/fonts/EncodeSansCondensed-Thin.ttf')
    });

    return fontsLoaded;
}