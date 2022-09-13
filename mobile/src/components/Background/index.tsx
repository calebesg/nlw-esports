import { ImageBackground } from 'react-native'

import backgroundImage from '../../assets/background-galaxy.png'
import { styles } from './styles'

interface BackgroundProps {
  children?: React.ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backgroundImage}
      defaultSource={backgroundImage}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  )
}
