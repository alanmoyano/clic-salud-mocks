import { ImageResponse } from 'next/og'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 96,
          color: 'white',
          background: 'black',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='96'
          height='96'
          fill='none'
          stroke='white'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          className='lucide lucide-log-in'
        >
          <path d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4 5-5-5-5m5 5H3' />
        </svg>
        <div style={{ marginLeft: 16 }}>ClicSalud Mocks</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
