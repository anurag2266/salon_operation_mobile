import { Dimensions,PixelRatio } from "react-native";
export const DesignWidth = 428 ;
export const DesignHeight = 926 ;
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const {width:SCREEN_WIDTH} = Dimensions.get('window');
const scale = SCREEN_WIDTH/428 ;

export function normalize (size) {
    return PixelRatio.roundToNearestPixel (size*scale);
}

export const vw = (width) => {
    let percent = (width/DesignWidth)*100 ; 
    const elemWidth = parseFloat(percent + '%');
    return PixelRatio.roundToNearestPixel((screenWidth*elemWidth)/100);
};
export const vh = (height) => {
    let percent = (height/DesignHeight)*100 ; 
    const elemHeight = parseFloat(percent + '%');
    return PixelRatio.roundToNearestPixel((screenHeight*elemHeight)/100);
};