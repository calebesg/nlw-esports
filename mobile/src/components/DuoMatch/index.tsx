import { useState } from 'react'
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard'

import { Heading } from '../Heading'
import { Loading } from '../Loading'

import { THEME } from '../../theme'
import { styles } from './styles'

interface DuoMatchProps extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [copping, setCopping] = useState(false)

  async function handleCopyDiscordToClipboard() {
    setCopping(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert(
      'Discord Copiado!',
      'Agora você pode color no discord, e começar a jogar!'
    )
    setCopping(false)
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            style={{ alignItems: 'center', marginTop: 24 }}
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
            disabled={copping}
          >
            {copping ? (
              <Loading />
            ) : (
              <Text style={styles.discord}>{discord}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
