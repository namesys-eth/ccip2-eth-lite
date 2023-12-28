import Image from 'next/image'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import styles from './page.module.css'
import SearchBox from '../components/SearchBox'
import { isMobile } from 'react-device-detect'
import './index.css'

export default function Home() {
  const router = useRouter()
  const [mobile, setMobile] = React.useState(false)

  // Triggers search of ENS domain
  const handleNameSearch = (query: string) => {
    router.push(`/profile?query=${query}`)
  }

  // INIT
  React.useEffect(() => {
    if (isMobile) {
      setMobile(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>NameSys Lite</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className='flex-column'>
        <div style={{ fontFamily: 'SF Mono' }}></div>
        <div style={{ fontFamily: 'Spotnik' }}></div>
        <div style={{ marginTop: '7.5%' }}></div>
        <div className='flex-column'>
          <Image
            className={'logo'}
            src="/logo.png"
            alt="namesys-logo"
            width={1500}
            height={1500}
            priority
          />
          <div className='flex-column'>
            <h1 style={{ color: '#ff2600' }}>
              NameSys
            </h1>
            <h4 style={{ color: '#fc4e14', marginTop: '-25px' }}>
              Lite
            </h4>
          </div>
        </div>
        <div
          className='main-search-container'
          style={{
            maxHeight: '520px',
            overflowY: 'auto',
            marginBottom: '50px',
          }}
        >
          <SearchBox
            onSearch={handleNameSearch}
          />
        </div>
        <div className={styles.grid} style={{ marginTop: '50px' }}>
          <a
            href="https://pro.namesys.xyz"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ff2600' }}
          >
            <h1 style={{ fontSize: '24px' }}>
              NAMESYS PRO <span className="material-icons micon">settings</span>
            </h1>
            <p>NameSys Pro Client</p>
          </a>

          <a
            href="https://namesys.xyz/readme/readme.htm?src=https://namesys-eth.github.io/ccip2-eth-resources/GUIDE.md"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 style={{ fontSize: '24px' }}>
              DOCS <span className="material-icons micon">library_books</span>
            </h1>
            <p>Learn More</p>
          </a>

          <a
            href="https://github.com/namesys-eth"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 style={{ fontSize: '24px' }}>
              CODE <span className="material-icons micon">developer_mode</span>
            </h1>
            <p>Source Codes</p>
          </a>
        </div>
        <div
          className="flex-column"
          style={{
            paddingBottom: '10px',
            marginTop: mobile ? '60px' : '100px'
          }}
        >
          <span
            style={{
              color: 'skyblue',
              fontWeight: '700',
              fontSize: mobile ? '12px' : '14px',
              paddingBottom: '5px'
            }}
          >
            {'Funded By'}
          </span>
          <span
            style={{
              color: 'white',
              fontWeight: '700',
              fontSize: mobile ? '16px' : '20px'
            }}
          >
            {'ENS DAO'}
          </span>
        </div>
      </main>
    </>
  )
}
