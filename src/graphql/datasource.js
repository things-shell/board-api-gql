import gql from 'graphql-tag'

export async function fetchDataSourceList() {
  const response = await this.client.query({
    query: gql`
      {
        datasources {
          id
          name
          description
          createdAt
          updatedAt
        }
      }
    `
  })

  return response.data
}

export async function createDataSource(datasource) {
  var { name, description, credential, type } = datasource

  const response = await this.client.mutate({
    mutation: gql`
      mutation CreateDataSource($datasource: NewDataSource!) {
        createDataSource(datasource: $datasource) {
          id
          name
          description
          credential
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      datasource: { name, description, credential, type }
    }
  })

  return response.data
}

export async function updateDataSource(datasource) {
  var { name, description, credential, type } = datasource

  const response = await this.client.mutate({
    mutation: gql`
      mutation UpdateDataSource($id: String!, $datasource: DataSourcePatch!) {
        updateDataSource(id: $id, datasource: $datasource) {
          id
          name
          description
          credential
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      datasource: { name, description, credential, type }
    }
  })

  return response.data
}

export async function deleteDataSource(id) {
  const response = await this.client.mutate({
    mutation: gql`
      mutation($id: String!) {
        deleteDataSource(id: $id) {
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
