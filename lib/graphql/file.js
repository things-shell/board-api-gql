import gql from 'graphql-tag'

export async function fetchFileList() {
  const response = await this.client.query({
    query: gql`
      {
        files {
          id
          filename
          mimetype
          encoding
          path
          createdAt
          updatedAt
        }
      }
    `
  })

  return response.data
}

/*
 ref. https://github.com/jaydenseric/graphql-multipart-request-spec#client
 - TODO support multiple file upload
 */
export async function uploadFile(file) {
  let o = {
    query: `mutation ($file: Upload!) { 
        singleUpload(
          file: $file
        ) { id filename mimetype encoding path createdAt updatedAt } 
      }`,
    variables: {
      file: null
    }
  }

  let map = {
    '0': ['variables.file']
  }

  let fd = new FormData()
  fd.append('operations', JSON.stringify(o))
  fd.append('map', JSON.stringify(map))
  fd.append(0, file)

  const response = await fetch(this.uri, {
    method: 'POST',
    body: fd
  })

  return await response.json()
}
