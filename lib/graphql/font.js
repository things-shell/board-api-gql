import gql from 'graphql-tag'

export async function fetchFontList() {
  const response = await this.client.query({
    query: gql`
      {
        fonts {
          name
          provider
          uri
          path
          active
          createdAt
          updatedAt
        }
      }
    `
  })

  return response.data
}

export async function createFont(font) {
  var { name, provider, uri, path, active = false } = font

  const response = await this.client.mutate({
    mutation: gql`
      mutation CreateFont($font: NewFont!) {
        createFont(font: $font) {
          name
          provider
          uri
          path
          active
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      font: { name, provider, uri, path, active }
    }
  })

  return response.data
}

export async function updateFont(font) {
  var { name, provider, uri, path } = font

  const response = await this.client.mutate({
    mutation: gql`
      mutation UpdateFont($patch: FontPatch!) {
        updateFont(patch: $font) {
          name
          provider
          uri
          path
          active
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      font: { name, path }
    }
  })

  return response.data
}

export async function deleteFont(name) {
  const response = await this.client.mutate({
    mutation: gql`
      mutation($name: String!) {
        deleteFont(name: $name) {
          name
        }
      }
    `,
    variables: {
      name
    }
  })

  return response.data
}
