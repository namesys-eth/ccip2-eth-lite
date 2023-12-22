import React from 'react'
import styles from '../pages/page.module.css'
import { isMobile } from 'react-device-detect'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import * as constants from '../utils/constants'
import Help from '../components/Help'
import {
  useAccount
} from 'wagmi'

interface Record {
  id: string
  value: string
  type: string
  path: string
  source: string
  loading: boolean
  new: string
  help: string
}

interface RecordsContainerProps {
  meta: any
  records: Record[]
  hue: string
  handleModalData: (data: any) => void
  handleTrigger: (data: boolean) => void
}

const Records: React.FC<RecordsContainerProps> = ({ meta, records, hue, handleModalData, handleTrigger }) => {
  const { address: _Wallet_ } = useAccount()
  const [helpModal, setHelpModal] = React.useState(false)
  const [help, setHelp] = React.useState('')
  const [color, setColor] = React.useState('lightgreen') // Set color
  const [inputValue, setInputValue] = React.useState(records)
  const [mobile, setMobile] = React.useState(false) // Set mobile or dekstop environment 
  const { width, height } = useWindowDimensions() // Get window dimensions

  // INIT
  React.useEffect(() => {
    if (isMobile || (width && width < 1300)) {
      setMobile(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  // INIT
  React.useEffect(() => {
    handleModalData(inputValue)
    handleTrigger(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  // Update values
  async function update(type: string, value: string) {
    setInputValue((prevInputValue) => {
      const index = prevInputValue.findIndex((record) => record.id === type)
      if (index !== -1) {
        const updatedRecords = [...prevInputValue]
        updatedRecords[index] = { ...updatedRecords[index], new: value }
        return updatedRecords
      }
      return prevInputValue
    })
  }

  return (
    <div className={!mobile ? styles.grid : 'flex-column'}>
      {records.map((record) => (
        <div key={record.path} className={!mobile ? styles.arrange : 'flex-column'}>
          <div className='flex-sans-align'>
            <div className='flex-row-sans-justify'>
              <h2
                style={{
                  fontFamily: 'Spotnik',
                  fontSize: '17px',
                  color: 'skyblue',
                  marginBottom: '5px'
                }}
              >
                {record.id}
              </h2>
              <button
                className="button-tiny"
                onClick={() => {
                  setHelpModal(true)
                  setHelp(`<span>${record.help}</span>`)
                }}
                data-tooltip={'Enlighten Me'}
              >
                <div
                  className="material-icons-round smol"
                  style={{
                    color: 'cyan',
                    marginLeft: '5px'
                  }}
                >
                  info_outline
                </div>
              </button>
            </div>
            <div className='flex-row'>
              <input
                id={`${record.id}`}
                key='0'
                placeholder={record.value}
                type='text'
                value={!_Wallet_ || (!meta.wrapped && _Wallet_ !== meta.owner) || (meta.wrapped && _Wallet_ !== meta.manager) || meta.resolver === constants.ccip2[meta.chainId === 5 ? 0 : 1] ? inputValue[inputValue.findIndex((_record) => _record.id === record.id)].new : record.value}
                onChange={(e) => {
                  update(record.id, e.target.value)
                }}
                disabled={!_Wallet_ || ((!meta.wrapped && _Wallet_ !== meta.owner) && (meta.wrapped && _Wallet_ !== meta.manager)) || meta.resolver !== constants.ccip2[meta.chainId === 5 ? 0 : 1]}
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
                  cursor: 'copy',
                  opacity: inputValue[inputValue.findIndex((_record) => _record.id === record.id)].new !== '' || !record.value ? '0' : '1'
                }}
                onClick={() => constants.copyToClipboard(`${record.value}`, `${record.id}`, `${record.id}-${record.type}`)}
              >
                {!record.loading ? 'content_copy' : 'hourglass_top'}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div id="modal">
        <Help
          color={'cyan'}
          icon={'info'}
          onClose={() => setHelpModal(false)}
          show={helpModal}
          position={''}
          children={help}
          handleModalData={function (data: string | undefined): void { throw new Error() }}
          handleTrigger={function (data: boolean): void { throw new Error() }}
        >
        </Help>
      </div>
    </div>
  )
}

export default Records
