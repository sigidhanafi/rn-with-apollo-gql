import React from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ProfileScreen extends React.Component {
  handleRetry = () => {
    const { data } = this.props
    const { refetch } = data
    console.log('halo', data)

    try {
      refetch()
    } catch (e) {
      console.log('Error', e)
    }
  }

  render() {
    const { data } = this.props
    console.log('DARA', data)
    if (data && data.loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if (data && data.error) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, margin: 20 }}>
          <Text style={{ textAlign: 'center' }}>{data.error.message}</Text>
          <TouchableOpacity onPress={this.handleRetry}>
            <Text>Coba lagi</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if (data && data.user) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, margin: 20}}>
          <Image source={{ uri: data.user.avatarUrl }} style={{ width: 100, height: 100, margin: 10 }}/>
          <Text>{ data.user.name  }</Text>
          <Text>{ data.user.bio  }</Text>
        </View>
      )
    }

    return null
  }
}

const ProfileQuery = gql`
  query {
    user(login: "sigidhanafi"){
      avatarUrl
      name
      bio
    }
  }
`

const ProfileContainer = graphql(ProfileQuery)(ProfileScreen)

export default ProfileContainer
