import { LinearGradient } from 'expo-linear-gradient'
import {
  Text,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { THEME } from '../../theme'
import { styles } from './styles'

export interface Game {
  id: string
  name: string
  imageUrl: string
  _count: {
    ads: number
  }
}

interface GameCardProps extends TouchableOpacityProps {
  data: Game
}

export function GameCard({ data, ...rest }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: data.imageUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}
