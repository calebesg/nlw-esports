import { View, Text, ColorValue } from 'react-native'

import { THEME } from '../../theme'
import { styles } from './styles'

interface DuoInfoProps {
  label: string
  value: string
  color?: ColorValue
}

export function DuoInfo({
  label,
  value,
  color = THEME.COLORS.TEXT,
}: DuoInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  )
}
