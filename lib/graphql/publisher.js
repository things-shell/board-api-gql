import gql from 'graphql-tag'

export async function fetchPublisherList() {
  const response = await this.client.query({
    query: gql`
      {
        publishers {
          id
          name
          description
          createdAt
          updatedAt
          datasource {
            id
            name
          }
        }
      }
    `
  })

  return response.data
}

export async function createPublisher(publisher) {
  var { name, description, rule, type, datasrouce } = publisher

  const response = await this.client.mutate({
    mutation: gql`
      mutation CreatePublisher($publisher: NewPublisher!, $datasourceId: String!) {
        createPublisher(publisher: $publisher, datasourceId: $datasourceId) {
          id
          name
          description
          rule
          type
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      publisher: { name, description, rule, type },
      datasourceId: datasource
    }
  })

  return response.data
}

export async function updatePublisher(publisher) {
  var { name, description, rule, type } = publisher

  const response = await this.client.mutate({
    mutation: gql`
      mutation UpdatePublisher($id: String!, $patch: PublisherPatch!) {
        updatePublisher(id: $id, publisher: $patch) {
          id
          name
          description
          rule
          type
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id,
      patch: { name, description, rule, type }
    }
  })

  return response.data
}

export async function deletePublisher(id) {
  const response = await this.client.mutate({
    mutation: gql`
      mutation($id: String!) {
        deletePublisher(id: $id) {
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
