import { useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { GameParams } from '../../@types/navigation'
import { Background } from '../../components/Background'
import { Heading } from '../../components/Heading'
import { Duo, DuoCard } from '../../components/DuoCard'

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme'
import { styles } from './styles'

export function GameDescription() {
  const [duos, setDuos] = useState<Duo[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  useEffect(() => {
    fetch(`http://192.168.1.105:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => {
        setDuos(data)
      })
  }, [])

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <ScrollView
          style={{ width: '100%', marginTop: 16 }}
          contentContainerStyle={styles.scrollContent}
        >
          <Image
            source={{ uri: game.imageUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading title={game.name} subtitle="Conecte-se e comece a jogar!" />

          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard onConnect={() => {}} duo={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              duos.length > 0 ? styles.contentList : styles.emptyListContent
            }
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados.
              </Text>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </Background>
  )
}
