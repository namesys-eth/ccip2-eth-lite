import Image from 'next/image'
import styles from './page.module.css'
import BigSearch from '../components/BigSearch'
import './index.css'

// Triggers search of ENS domain
const handleNameSearch = (query: string) => {
}

export default function Home() {
  return (
    <main className='flex-column'>
      <div style={{ marginTop: '7.5%' }}></div>
      <div className='flex-column'>
        <Image
          className={'avatar'}
          src="/logo.png"
          alt="namesys-avatar"
          width={1000}
          height={100}
          priority
        />
        <div className='flex-column'>
          <h2 style={{ color: '#ff2600' }}>
            NameSys
          </h2>
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
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <BigSearch
          onSearch={handleNameSearch}
        />
      </div>
      <div className={styles.grid}>
        <a
          href="https://pro.namesys.xyz"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ff2600' }}
        >
          <h2>
            NAMESYS PRO <span className="material-icons micon">settings</span>
          </h2>
          <p>NameSys Pro Client</p>
        </a>

        <a
          href="https://namesys.xyz/readme/readme.htm?src=https://namesys-eth.github.io/ccip2-eth-resources/GUIDE.md"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            DOCS <span className="material-icons micon">library_books</span>
          </h2>
          <p>Learn About NameSys</p>
        </a>

        <a
          href="https://github.com/namesys-eth"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            CODE <span className="material-icons micon">developer_mode</span>
          </h2>
          <p>Source Codes</p>
        </a>
      </div>
    </main>
  )
}
