import Head from 'next/head'
import { Inter } from 'next/font/google'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'

const inter = Inter({ subsets: ['latin'] })

export default function Home({
  token,
  tokenJane,
}: {
  token: string,
  tokenJane: string,
}) {
  return (
    <>
      <Head>
        <title>😨 Livekit Snack 😨</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <table>
        <thead>
          <tr>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{token}</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <LiveKitRoom
          serverUrl="ws://localhost:7880"
          token={token}
        >
          <VideoConference />
        </LiveKitRoom>
        <LiveKitRoom
          serverUrl="ws://localhost:7880"
          token={tokenJane}
        >
          <VideoConference />
        </LiveKitRoom>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const token = await fetch('http://localhost:3000/api/token')
    .then((res) => res.json())
    .then((data) => data.token)

  const tokenJane = await fetch('http://localhost:3000/api/token?jane=true')
    .then((res) => res.json())
    .then((data) => data.token)

  return {
    props: {
      token,
      tokenJane,
    },
  }
}