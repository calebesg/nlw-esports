import { StatusBar } from 'react-native'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { Background } from './src/components/Background'
import { Home } from './src/screens/Home'
import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  return (
    <Background>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      {fontsLoaded ? <Home /> : <Loading size={40} />}
    </Background>
  )
}
