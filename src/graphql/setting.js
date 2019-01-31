import gql from 'graphql-tag'

export async function fetchSettingList() {
  const response = await this.client.query({
    query: gql`
      {
        settings {
          name
          value
          createdAt
          updatedAt
        }
      }
    `
  })

  return response.data
}

export async function createSetting(setting) {
  var { name, value } = setting

  const response = await this.client.mutate({
    mutation: gql`
      mutation CreateSetting($setting: NewSetting!) {
        createSetting(setting: $setting) {
          name
          value
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      setting: { name, value }
    }
  })

  return response.data
}

export async function updateSetting(setting) {
  var { name, value } = setting

  const response = await this.client.query({
    qery: gql`
      mutation UpdateSetting($patch: SettingPatch!) {
        updateSetting(patch: $patch) {
          name
          value
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      patch: { name, value }
    }
  })

  return response.data
}

export async function deleteSetting(name) {
  const response = await this.client.query({
    qery: gql`
      mutation($name: String!) {
        deleteSetting(name: $name) {
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
