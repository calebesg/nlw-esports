import { useEffect, useState } from 'react'
import { View, Image, FlatList, ScrollView } from 'react-native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard, Game } from '../../components/GameCard'
import { Heading } from '../../components/Heading'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://192.168.1.105:3333/games')
      .then(res => res.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GameCard data={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </View>
    </ScrollView>
  )
}
