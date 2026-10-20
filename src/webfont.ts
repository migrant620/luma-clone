import { useFonts, FontDisplay } from 'expo-font'

export function useAppFonts() {
  return useFonts({
    PlusJakartaSans: {
      uri: require('../assets/fonts/PlusJakartaSans-VF.ttf'),
      display: FontDisplay.SWAP,
    },
  })
}
