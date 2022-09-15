import { View, TouchableOpacity, Text } from 'react-native'
import { GameController } from 'phosphor-react-native'

import { DuoInfo } from '../DuoInfo'

import { THEME } from '../../theme'
import { styles } from './styles'

export interface Duo {
  id: string
  name: string
  weekDays: string[]
  hoursStart: string
  hoursEnd: string
  useVoiceChannel: boolean
  yearsPlaying: number
}

interface DuoCardProps {
  duo: Duo
  onConnect: () => void
}

export function DuoCard({ duo, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={duo.name} />
      <DuoInfo label="Tempo de jogo" value={`${duo.yearsPlaying} ano(s)`} />
      <DuoInfo
        label="Disponibilidade"
        value={`${duo.weekDays.length} dias \u2022 ${duo.hoursStart} - ${duo.hoursEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio"
        value={duo.useVoiceChannel ? 'Sim' : 'Não'}
        color={duo.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  )
}
