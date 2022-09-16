import { useRef, useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'react-native'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'

import { Background } from './src/components/Background'
import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'

import './src/services/notificationConfig'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  }, [])

  useEffect(() => {
    getNotificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log(notification)
      })

    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response)
      })

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        )
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        )
      }
    }
  }, [])

  return (
    <Background>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading size={40} />}
    </Background>
  )
}
