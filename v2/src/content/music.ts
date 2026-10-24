import { toAdd, type ToAdd } from './types'

/** Paste the playlist's share URL, e.g. https://open.spotify.com/playlist/<id> */
export const music: { playlistUrl: string | ToAdd } = {
  playlistUrl: toAdd('Spotify playlist URL'),
}
