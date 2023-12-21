import React from 'react'
import styles from '../pages/page.module.css'
import { isMobile } from 'react-device-detect'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import * as constants from '../utils/constants'

interface Record {
  id: string
  value: string
  type: string
  path: string
  source: string
  loading: boolean
}

interface RecordsContainerProps {
  records: Record[]
  hue: string
}

const Records: React.FC<RecordsContainerProps> = ({ records, hue }) => {
  const [isLoading, setIsLoading] = React.useState('')
  const [inputValue, setInputValue] = React.useState('')
  const [mobile, setMobile] = React.useState(false) // Set mobile or dekstop environment 
  const { width, height } = useWindowDimensions() // Get window dimensions

  // INIT
  React.useEffect(() => {
    if (isMobile || (width && width < 1300)) {
      setMobile(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  return (
    <div className={!mobile ? styles.grid : 'flex-column'}>
      {records.map((record) => (
        <div key={record.path} className={!mobile ? styles.arrange : 'flex-column'}>
          <div className='flex-sans-align'>
            <h2
              style={{
                fontFamily: 'Spotnik',
                fontSize: '17px',
                color: '#d1d1d1',
                marginBottom: '5px'
              }}
            >
              {record.id}
            </h2>
            <div className='flex-row'>
              <input
                id={`${record.id}`}
                key='0'
                placeholder={record.value || ''}
                type='text'
                value={record.value || ''}
                onChange={(e) => {
                  setInputValue(e.target.value)
                }}
                style={{
                  background: '#361a17',
                  outline: 'none',
                  border: 'none',
                  padding: '5px 30px 5px 5px',
                  borderRadius: '3px',
                  fontFamily: 'SF Mono',
                  letterSpacing: '-0.5px',
                  fontWeight: '400',
                  fontSize: '14px',
                  width: '400px',
                  wordWrap: 'break-word',
                  textAlign: 'left',
                  color: hue,
                  cursor: 'copy'
                }}
              />
              <div
                id={`${record.id}-${record.type}`}
                className="material-icons-round"
                style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  margin: '0 0 0 -25px',
                  color: (!record.loading && record.value) ? 'lightgreen' : 'white',
                  cursor: 'copy'
                }}
                onClick={() => constants.copyToClipboard(`${record.value}`, `${record.id}`, `${record.id}-${record.type}`)}
              >
                {!record.loading ? 'content_copy' : 'hourglass_top'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Records
