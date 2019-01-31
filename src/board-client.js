import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import { fetchBoardList, fetchBoard, createBoard, updateBoard, deleteBoard } from './graphql/board'
import { fetchGroupList, /*fetchGroup,*/ createGroup, updateGroup, deleteGroup, joinGroup } from './graphql/group'
import {
  fetchPlayGroupList,
  /*fetchPlayGroup,*/
  createPlayGroup,
  updatePlayGroup,
  deletePlayGroup,
  joinPlayGroup,
  leavePlayGroup
} from './graphql/play-group'
import {
  fetchDataSourceList,
  /*fetchDataSource,*/
  createDataSource,
  updateDataSource,
  deleteDataSource
} from './graphql/datasource'
import { fetchFontList, /*fetchFont,*/ createFont, updateFont, deleteFont } from './graphql/font'
import {
  fetchPublisherList,
  /*fetchPublisher,*/ createPublisher,
  updatePublisher,
  deletePublisher
} from './graphql/publisher'
import { fetchSettingList, /*fetchSetting,*/ createSetting, updateSetting, deleteSetting } from './graphql/setting'
import { fetchFileList, uploadFile } from './graphql/file'

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

    this.uri = uri
    this.client = new ApolloClient({
      defaultOptions,
      cache,
      link: ApolloLink.from([
        onError(errorHandler),
        new HttpLink({
          uri
        })
      ]),
      ...options
    })
  }

  fetchBoardList = fetchBoardList.bind(this)
  fetchBoard = fetchBoard.bind(this)
  createBoard = createBoard.bind(this)
  updateBoard = updateBoard.bind(this)
  deleteBoard = deleteBoard.bind(this)

  fetchGroupList = fetchGroupList.bind(this)
  createGroup = createGroup.bind(this)
  updateGroup = updateGroup.bind(this)
  deleteGroup = deleteGroup.bind(this)
  joinGroup = joinGroup.bind(this)

  fetchPlayGroupList = fetchPlayGroupList.bind(this)
  createPlayGroup = createPlayGroup.bind(this)
  updatePlayGroup = updatePlayGroup.bind(this)
  deletePlayGroup = deletePlayGroup.bind(this)
  joinPlayGroup = joinPlayGroup.bind(this)
  leavePlayGroup = leavePlayGroup.bind(this)

  fetchDataSourceList = fetchDataSourceList.bind(this)
  createDataSource = createDataSource.bind(this)
  updateDataSource = updateDataSource.bind(this)
  deleteDataSource = deleteDataSource.bind(this)

  fetchFontList = fetchFontList.bind(this)
  createFont = createFont.bind(this)
  updateFont = updateFont.bind(this)
  deleteFont = deleteFont.bind(this)

  fetchPublisherList = fetchPublisherList.bind(this)
  createPublisher = createPublisher.bind(this)
  updatePublisher = updatePublisher.bind(this)
  deletePublisher = deletePublisher.bind(this)

  fetchSettingList = fetchSettingList.bind(this)
  createSetting = createSetting.bind(this)
  updateSetting = updateSetting.bind(this)
  deleteSetting = deleteSetting.bind(this)

  fetchFileList = fetchFileList.bind(this)
  uploadFile = uploadFile.bind(this)
}
