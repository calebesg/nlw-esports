import * as Notifications from 'expo-notifications'

export async function getPushNotificationToken() {
  const { granted } = await Notifications.getPermissionsAsync()

  if (!granted) {
    await Notifications.requestPermissionsAsync()
  }

  const pushToken = await Notifications.getExpoPushTokenAsync()
  console.log('TOKEN', pushToken.data)

  return pushToken.data
}
