import React from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Help from './Help'
import * as constants from '../utils/constants'

interface ModalProps {
  mobile: boolean
  show: boolean
  onClose: any
  dynamic: typeof constants.dynamicRoster
  handleModalData: (data: string) => void
  handleTrigger: (data: boolean) => void
}

const DynamicAvatar: React.FC<ModalProps> = ({ mobile, show, onClose, dynamic, handleModalData, handleTrigger }) => {
  const [roster, setRoster] = React.useState(dynamic)
  const [browser, setBrowser] = React.useState(false)
  const [helpModal, setHelpModal] = React.useState(false)
  const [help, setHelp] = React.useState('')

  React.useLayoutEffect(() => {
    setBrowser(true)
  }, [])

  function reset() {
    let _reset = constants.dynamicRoster.map(item => ({ ...item }))
    setRoster(_reset)
  }

  function updateRosterTick(index: number, value: string) {
    setRoster((prevRoster) => {
      const newRoster = [...prevRoster]
      const _unix = new Date(value)
      newRoster[index].tick = Math.floor(_unix.getTime() / 1000)
      return newRoster
    })
  }

  function updateRosterValue(index: number, value: string) {
    setRoster((prevRoster) => {
      const newRoster = [...prevRoster]
      newRoster[index].value = value
      return newRoster
    })
  }

  const handleCloseClick = (e: { preventDefault: () => void; }) => {
    reset()
    handleModalData('')
    handleTrigger(false)
    e.preventDefault()
    onClose()
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    handleModalData(JSON.stringify(roster))
    handleTrigger(true)
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            <span
              className="material-icons"
            >
              close
            </span>
          </a>
        </StyledModalHeader>
        {show &&
          <StyledModalTitle>
            <div
              className="material-icons-round"
              style={{
                marginTop: '4px',
                fontSize: '70px'
              }}
            >
              dynamic_feed
            </div>
            <div
              style={{
                marginTop: '25px',
                marginBottom: '15px'
              }}
            >
              <span
                style={{
                  fontWeight: '700',
                  fontSize: '20px'
                }}
              >
                Dynamic Avatar
              </span>
              <button
                className="button-tiny"
                style={{
                  marginBottom: '-7.5px'
                }}
                onClick={() => {
                  setHelpModal(true),
                    setHelp('<span><span style="color: cyan">Dynamic</span> Avatars</span>')
                }}
                data-tooltip={'Enlighten Me'}
              >
                <div
                  className="material-icons smol"
                  style={{
                    color: 'cyan',
                    marginLeft: '5px'
                  }}
                >
                  info_outline
                </div>
              </button>
            </div>
          </StyledModalTitle>}
        <StyledModalBody>
          <div className={!mobile ? 'grid' : 'grid'}>
            {Object.values(roster).map((instance) => (
              <div key={instance.index}
                className={!mobile ? 'flex-column' : 'flex-column'}
                style={{
                  margin: !mobile ? '10px' : '10px'
                }}
              >
                <div className='flex-sans-align'>
                  <div
                    className='flex-row-sans-justify'
                    style={{
                      justifyContent: 'space-between'
                    }}
                  >
                    <input
                      className='inputgeneric'
                      id={`left-${instance.index}`}
                      key={`left-${instance.index}`}
                      placeholder={'...'}
                      type='datetime-local'
                      value={String((new Date(roster[instance.index].tick * 1000)).toISOString().substring(0, (new Date().toISOString().indexOf("T") | 0) + 6 | 0))}
                      onChange={(e) => {
                        updateRosterTick(instance.index, e.target.value)
                      }}
                      style={{
                        background: 'black',
                        outline: 'none',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '3px',
                        fontFamily: 'SF Mono',
                        letterSpacing: '-0.5px',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '100%',
                        wordWrap: 'break-word',
                        textAlign: 'left',
                        color: 'rgb(255, 255, 255, 1)',
                        cursor: 'copy',
                        margin: '10px'
                      }}
                    />
                    <input
                      className='inputgeneric'
                      id={`right-${instance.index}`}
                      key={`right-${instance.index}`}
                      placeholder={'...'}
                      type='text'
                      value={roster[instance.index].value}
                      onChange={(e) => {
                        updateRosterValue(instance.index, e.target.value)
                      }}
                      style={{
                        background: 'black',
                        outline: 'none',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '3px',
                        fontFamily: 'SF Mono',
                        letterSpacing: '-0.5px',
                        fontWeight: '400',
                        fontSize: '14px',
                        width: '100%',
                        wordWrap: 'break-word',
                        textAlign: 'left',
                        color: 'rgb(255, 255, 255, 1)',
                        cursor: 'copy',
                        margin: '10px'
                      }}
                    />
                    <button
                      className='button-tiny'
                      data-tooltip={'reset'}
                      onClick={() => reset()}
                    >
                      <div
                        className="material-icons-round"
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: 'lightgreen'
                        }}
                      >
                        {'refresh'}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StyledModalBody>
      </StyledModal>
      <div id="modal-inner">
        <Help
          color={'cyan'}
          icon={'info'}
          onClose={() => setHelpModal(false)}
          show={helpModal}
          position={''}
          handleModalData={function (data: string | undefined): void { throw new Error() }}
          handleTrigger={function (data: boolean): void { throw new Error() }}
        >
          {help}
        </Help>
      </div>
    </StyledModalOverlay>
  ) : null

  if (browser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal")!
    )
  } else {
    return null
  }
}

const StyledModalBody = styled.div`
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 25px;
  display: flex;_
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  overflow-y: auto;
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-top: -15px;
`

const StyledModalTitle = styled.div`
  margin-top: -15px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 700;
  margin-bottom: 15px;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  color: cyan;
`

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledModal = styled.div`
  background: rgba(66,46,40,1);
  background-size: 400% 400%;
  width: 600px;
  max-width: ${isMobile ? '90%' : '60%'};
  height: 530px;
  border-radius: 6px;
  overflow-y: initial !important
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 3px;
`

const StyledModalOverlay = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
`

export default DynamicAvatar
