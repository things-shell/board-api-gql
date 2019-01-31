import gql from 'graphql-tag'

export async function fetchPlayGroupList() {
  const response = await this.client.query({
    query: gql`
      {
        playGroups {
          id
          name
          description
        }
      }
    `
  })

  return response.data
}

export async function createPlayGroup(group) {
  var { name, description } = group

  const response = await this.client.mutate({
    mutation: gql`
      mutation CreatePlayGroup($playGroup: NewPlayGroup!) {
        createPlayGroup(playGroup: $playGroup) {
          id
          name
          description
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      playGroup: { name, description }
    }
  })

  return response.data
}

export async function updatePlayGroup(group) {
  var { id, name, description } = group

  const response = await this.client.mutate({
    mutation: gql`
      mutation UpdatePlayGroup($id: String!, $patch: PlayGroupPatch!) {
        updatePlayGroup(id: $id, patch: $patch) {
          id
          name
          description
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id,
      patch: { name, description }
    }
  })

  return response.data
}

export async function deletePlayGroup(id) {
  const response = await this.client.mutate({
    mutation: gql`
      mutation($id: String!) {
        deletePlayGroup(id: $id) {
          id
        }
      }
    `,
    variables: {
      id
    }
  })
  return response.data
}

export async function joinPlayGroup(boardId, group) {
  var { id, name, description } = group

  const response = await this.client.mutate({
    mutation: gql`
      mutation JoinPlayGroup($id: String!, $boardIds: [String]!) {
        joinPlayGroup(id: $id, boardIds: $boardIds) {
          id
          name
          description
          boards {
            id
            name
            description
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id,
      boardIds: [boardId]
    }
  })

  return response.data
}

export async function leavePlayGroup(boardId, groupId) {
  const response = await this.client.mutate({
    mutation: gql`
      mutation($id: String!, $boardIds: [String]!) {
        leavePlayGroup(id: $id, boardIds: $boardIds) {
          id
          name
          description
          boards {
            id
            name
            description
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id: groupId,
      boardIds: [boardId]
    }
  })

  return response.data
}
