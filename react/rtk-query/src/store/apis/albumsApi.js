import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// library used to generate fake data
import { faker } from '@faker-js/faker'

// DEV ONLY
const pause = duration => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const albumsApi = createApi({
  // reducerPath is simply the name of the key in the reducer
  reducerPath: 'albums',
  // fetchBaseQuery returns a pre-configured version of the fetch api
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    // override the fetch function that RTK is using to make your requests:
    fetchFn: async (...args) => {
      // slow down all requests so that you can see your loading spinners
      await pause(1000)
      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      removeAlbum: builder.mutation({
        // array of tags to invalidate when this mutation runs
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }]
        },
        // config object to construct an API handler that will handle our actual request
        query: album => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE'
          }
        }
      }),
      addAlbum: builder.mutation({
        // 3rd argument of the tag is the argument you pass to the query / mutation
        invalidatesTags: (result, error, user) => {
          // when we add a new album, we only want to refetch all albums of the user that the album belongs to, not ALL users
          return [{ type: 'UsersAlbums', id: user.id }]
        },
        query: user => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          }
        }
      }),
      // fetch albums for a given user
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map(album => {
            return { type: 'Album', id: album.id }
          })
          tags.push({ type: 'UsersAlbums', id: user.id })
          return tags
        },
        query: user => {
          return {
            url: '/albums',
            params: {
              userId: user.id
            },
            method: 'GET'
          }
        }
      })
    }
  }
})

// names of the hooks are generated based on the keys of each endpoint e.g. fetchAlbums => useFetchAlbumsQuery
export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi
export { albumsApi }
