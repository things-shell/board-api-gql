import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import { fetchBoardList, fetchBoard, createBoard, updateBoard, deleteBoard } from './graphql/board.js'
import { fetchGroupList, /*fetchGroup,*/ createGroup, updateGroup, deleteGroup, joinGroup } from './graphql/group.js'
import {
  fetchPlayGroupList,
  /*fetchPlayGroup,*/
  createPlayGroup,
  updatePlayGroup,
  deletePlayGroup,
  joinPlayGroup,
  leavePlayGroup
} from './graphql/play-group.js'
import {
  fetchDataSourceList,
  /*fetchDataSource,*/
  createDataSource,
  updateDataSource,
  deleteDataSource
} from './graphql/datasource.js'
import { fetchFontList, /*fetchFont,*/ createFont, updateFont, deleteFont } from './graphql/font.js'
import {
  fetchPublisherList,
  /*fetchPublisher,*/ createPublisher,
  updatePublisher,
  deletePublisher
} from './graphql/publisher.js'
import { fetchSettingList, /*fetchSetting,*/ createSetting, updateSetting, deleteSetting } from './graphql/setting.js'
import { fetchFileList, uploadFile } from './graphql/file.js'

const GRAPHQL_URI = '/graphql'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache', //'network-only'
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
}

const DEFAULT_ERR_HANDLER = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`[GraphQL error] Message: ${message}, Location: ${locations}, Path: ${path}`)
    })
  }
  if (networkError) {
    console.error(`[Network error (newtorkError.statusCode)] ${networkError}`)
  }
}

export default class BoardClient {
  constructor(uri = GRAPHQL_URI, errorHandler = DEFAULT_ERR_HANDLER, options = {}) {
    const cache = options.cache ? options.cache : new InMemoryCache()

    this.fetchBoardList = fetchBoardList.bind(this)
    this.fetchBoard = fetchBoard.bind(this)
    this.createBoard = createBoard.bind(this)
    this.updateBoard = updateBoard.bind(this)
    this.deleteBoard = deleteBoard.bind(this)

    this.fetchGroupList = fetchGroupList.bind(this)
    this.createGroup = createGroup.bind(this)
    this.updateGroup = updateGroup.bind(this)
    this.deleteGroup = deleteGroup.bind(this)
    this.joinGroup = joinGroup.bind(this)

    this.fetchPlayGroupList = fetchPlayGroupList.bind(this)
    this.createPlayGroup = createPlayGroup.bind(this)
    this.updatePlayGroup = updatePlayGroup.bind(this)
    this.deletePlayGroup = deletePlayGroup.bind(this)
    this.joinPlayGroup = joinPlayGroup.bind(this)
    this.leavePlayGroup = leavePlayGroup.bind(this)

    this.fetchDataSourceList = fetchDataSourceList.bind(this)
    this.createDataSource = createDataSource.bind(this)
    this.updateDataSource = updateDataSource.bind(this)
    this.deleteDataSource = deleteDataSource.bind(this)

    this.fetchFontList = fetchFontList.bind(this)
    this.createFont = createFont.bind(this)
    this.updateFont = updateFont.bind(this)
    this.deleteFont = deleteFont.bind(this)

    this.fetchPublisherList = fetchPublisherList.bind(this)
    this.createPublisher = createPublisher.bind(this)
    this.updatePublisher = updatePublisher.bind(this)
    this.deletePublisher = deletePublisher.bind(this)

    this.fetchSettingList = fetchSettingList.bind(this)
    this.createSetting = createSetting.bind(this)
    this.updateSetting = updateSetting.bind(this)
    this.deleteSetting = deleteSetting.bind(this)

    this.fetchFileList = fetchFileList.bind(this)
    this.uploadFile = uploadFile.bind(this)

    this.uri = uri
    this.client = new ApolloClient({
      defaultOptions,
      cache,
      link: ApolloLink.from([
        onError(errorHandler),
        new HttpLink({
          uri,
          credentials: 'include'
        })
      ]),
      ...options
    })
  }
}
