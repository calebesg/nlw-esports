import { useEffect, useState } from 'react'
import { Image, FlatList, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Background } from '../../components/Background'
import { GameCard, Game } from '../../components/GameCard'
import { Heading } from '../../components/Heading'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  const navigation = useNavigation()

  useEffect(() => {
    fetch('http://192.168.1.105:3333/games')
      .then(res => res.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  function handleOpenGame({ id, imageUrl, name }: Game) {
    navigation.navigate('description', { id, imageUrl, name })
  }

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image source={logoImg} style={styles.logo} />
          <Heading
            title="Encontre seu duo!"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList
            data={games}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <GameCard onPress={() => handleOpenGame(item)} data={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  )
}
