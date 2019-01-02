import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'none',
    },
    query: {
      errorPolicy: 'none',
    },
    mutate: {
      errorPolicy: 'none',
    },
  },
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>Welcome to React Native!</Text>
        </View>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
