import { useFonts } from 'expo-font';
export function useAppFonts() {
    return useFonts({
        PlusJakartaSans: require('../assets/fonts/PlusJakartaSans-VF.ttf'),
        'Inter-Regular': require('../assets/fonts/Roboto_400Regular.ttf'),
        'Inter-Medium': require('../assets/fonts/Roboto_500Medium.ttf'),
        'Inter-Bold': require('../assets/fonts/Roboto_700Bold.ttf'),
    });
}
