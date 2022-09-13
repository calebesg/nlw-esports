import { View, ActivityIndicator } from 'react-native'

import { THEME } from '../../theme'
import { styles } from './styles'

interface LoadingProps {
  size?: number
}

export function Loading({ size = 20 }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={THEME.COLORS.PRIMARY} />
    </View>
  )
}
