import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
import './index.css'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ethers } from 'ethers'
import * as constants from '../utils/constants'
import { isMobile } from 'react-device-detect'
import Loading from '../components/LoadingColors'
import Records from '../components/Records'
import * as ensContent from '../utils/contenthash'
import ResolverModal from '../components/ResolverModal'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import {
  useAccount,
  useFeeData,
  useContractWrite,
  useSignMessage,
  useWaitForTransaction,
  useContractRead
} from 'wagmi'
import Web3 from 'web3'

export default function Profile() {
  const router = useRouter()
  const { query } = router.query // Query from main page
  const { width, height } = useWindowDimensions() // Get window dimensions
  const [ENS, setENS] = React.useState('rilxxlir.eth') // Set ENS from query
  const [resolver, setResolver] = React.useState('') // Get ENS Resolver for query
  const [mobile, setMobile] = React.useState(false) // Set mobile or dekstop environment 
  const [found, setFound] = React.useState(false) // Set name registered or not status
  const [color, setColor] = React.useState('lightgreen') // Set color
  const [message, setMessage] = React.useState('Domain Not Registered') // Set message to display
  const [justMigrated, setJustMigrated] = React.useState(false) // Set migrated flag
  const [canUse, setCanUse] = React.useState(false) // Set import flag
  const [resolverModal, setResolverModal] = React.useState(false) // Resolver modal
  const [records, setRecords] = React.useState(constants.records) // Set records 
  const [meta, setMeta] = React.useState(constants.meta) // Set ENS metadata
  const [tokenIDLegacy, setTokenIDLegacy] = React.useState('') // Set Token ID of unwrapped/legacy name
  const [namehashLegacy, setNamehashLegacy] = React.useState('') // Legacy Namehash of ENS Domain
  const [tokenIDWrapper, setTokenIDWrapper] = React.useState('') // Set Token ID of wrapped name
  const [loading, setLoading] = React.useState(true) // Loading Records marker
  const [recordsModalState, setRecordsModalState] = React.useState<constants.MainBodyState>({
    modalData: undefined,
    trigger: false
  }) // Gateway modal state

  // Variables
  const chain = process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? '1' : '5'
  const { address: _Wallet_ } = useAccount()
  const recoveredAddress = React.useRef<string>()
  const ccip2Contract = constants.ccip2[chain === '1' ? 1 : 0]
  const ccip2Config = constants.ccip2Config[chain === '1' ? 1 : 0]
  const apiKey = chain === '1' ? process.env.NEXT_PUBLIC_ALCHEMY_ID_MAINNET : process.env.NEXT_PUBLIC_ALCHEMY_ID_GOERLI
  const network = chain === '1' ? 'mainnet' : 'goerli'
  const provider = new ethers.AlchemyProvider(network, apiKey)
  const alchemyEndpoint = `https://eth-${network}.g.alchemy.com/v2/` + apiKey
  const web3 = new Web3(alchemyEndpoint)
  const caip10 = `eip155:${chain}:${_Wallet_}`  // CAIP-10
  const origin = `eth:${_Wallet_ || constants.zeroAddress}`
  const PORT = process.env.NEXT_PUBLIC_PORT
  const SERVER = process.env.NEXT_PUBLIC_SERVER

  // Handle Gateway modal data return
  const handleRecordsModalData = (data: string | undefined) => {
    setRecordsModalState(prevState => ({ ...prevState, modalData: data }))
  }
  // Handle Gateway modal trigger
  const handleRecordsTrigger = (trigger: boolean) => {
    setRecordsModalState(prevState => ({ ...prevState, trigger: trigger }))
  }

  // FUNCTIONS
  // Returns Owner of Wrapped or Manager of Legacy ENS Domain
  function getManager() {
    if (_OwnerLegacy_ && _ManagerLegacy_) {
      if (String(_OwnerLegacy_) === constants.ensContracts[chain === '1' ? 7 : 3]) {
        return _OwnerWrapped_ ? String(_OwnerWrapped_) : constants.zeroAddress
      } else {
        return String(_ManagerLegacy_)
      }
    } else {
      return constants.zeroAddress
    }
  }

  // INIT
  React.useEffect(() => {
    if (isMobile || (width && width < 1300)) {
      setMobile(true)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  // Sets ENS domain
  React.useEffect(() => {
    if (query && query !== null && typeof (query) === 'string') {
      setENS(query)
      let __namehash = ethers.namehash(query)
      let __token = BigInt(__namehash)
      setTokenIDWrapper(String(__token))
      let __labelhash = ethers.keccak256(ethers.toUtf8Bytes(query.split('.eth')[0]))
      setNamehashLegacy(__namehash)
      setTokenIDLegacy(String(BigInt(__labelhash)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // Sets ENS domain
  React.useEffect(() => {
    const _getRecords = async () => {
      if (resolver && ENS) {
        const _resolver = await ethers.EnsResolver.fromName(provider, ENS)
        const _avatarRaw = _resolver ? await getText(_resolver, 'avatar', records) : ''
        const _contenthash = _resolver ? await getContenthash(_resolver, records) : ''
        let _avatar: string
        let _records = { ...records }
        if (_avatarRaw.startsWith('ipfs://')) {
          _records.avatar.value = _avatarRaw
          _records.avatar.source = `https://ipfs.io/ipfs/${_avatarRaw.split('ipfs://')[1]}`
          setRecords(_records)
        } else if (_avatarRaw.startsWith(`eip155:${chain}`)) {
          let _contract = _avatarRaw.split(':')[2].split('/')[0]
          let _tokenID = _avatarRaw.split(':')[2].split('/')[1]
          constants.alchemy.nft.getNftMetadata(
            _contract,
            _tokenID
          ).then((_response: any) => {
            _records.avatar.value = _avatarRaw
            _records.avatar.source = _response.media[0].thumbnail || _response.media[0].gateway
            setRecords(_records)
          })
        } else if (_avatarRaw.startsWith('https://')) {
          _records.avatar.value = _avatarRaw
          _records.avatar.source = _avatarRaw
          setRecords(_records)
        } else {
          _avatar = _resolver ? await getAvatar(ENS, records) : ''
        }
        const _addr = _resolver ? await getAddr(ENS, records) : ''
        const _url = _resolver ? await getText(_resolver, 'url', records) : ''
        const _description = _resolver ? await getText(_resolver, 'description', records) : ''
        const _twitter = _resolver ? await getText(_resolver, 'com.twitter', records) : ''
        const _discord = _resolver ? await getText(_resolver, 'com.discord', records) : ''
        const _github = _resolver ? await getText(_resolver, 'com.github', records) : ''
        const _getENSRecords = async () => {
          if (resolver && ENS) {
            if (resolver !== ccip2Contract) {
              if (constants.ensContracts.includes(resolver)) {
                let _records = { ...records }
                let _ensRecords = await constants.getENSRecords(resolver, ENS)
                if (_ensRecords) {
                  _records.addr.ens = _ensRecords.addr
                  _records.avatar.ens = _ensRecords.avatar
                  _records.contenthash.ens = _ensRecords.contenthash
                  _records.url.ens = _ensRecords.url
                  _records.description.ens = _ensRecords.description
                  _records['com.github'].ens = _ensRecords.github
                  _records['com.twitter'].ens = _ensRecords.twitter
                  _records['com.discord'].ens = _ensRecords.discord
                  setRecords(_records)
                  console.log(_records)
                }
              }
            } else {
              if (_Recordhash_ || _Ownerhash_) {
                if (String(_Recordhash_).length > 2 && _Recordhash_ !== _Ownerhash_) {
                  let _String: string = ''
                  if (String(_Recordhash_).startsWith(constants.ipnsPrefix)) {
                    let _this = ensContent.decodeContentHash(`0x${String(_Recordhash_)}`)
                    _String = _this ? `ipns://${_this.decoded}` : ``
                  } else {
                    _String = ethers.toUtf8String(String(_Recordhash_))
                  }
                  if (_String.startsWith('https://') && _String === constants.defaultGateway) {
                    setCanUse(true)
                  }
                } else if (String(_Recordhash_).length > 2 && _Recordhash_ === _Ownerhash_) {
                  if (resolver === ccip2Contract) {
                    let _String: string = ''
                    if (String(_Ownerhash_).startsWith(constants.ipnsPrefix)) {
                      let _this = ensContent.decodeContentHash(`0x${String(_Ownerhash_)}`)
                      _String = _this ? `ipns://${_this.decoded}` : ``
                    } else {
                      _String = ethers.toUtf8String(String(_Ownerhash_))
                    }
                    if (_String.startsWith('https://') && _String === constants.defaultGateway) {
                      setCanUse(true)
                    }
                  }
                }
              }
            }
          }
        }
        _getENSRecords()
      }
    }
    _getRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolver, ENS])

  // Sets new ENS Resolver
  const {
    data: response1of1,
    write: migrate,
    isLoading: isMigrateLoading,
    isSuccess: isMigrateSuccess,
    isError: isMigrateError
  } = useContractWrite({
    address: `0x${!meta.wrapped ? constants.ensConfig[0].addressOrName.slice(2) : constants.ensConfig[chain === '1' ? 7 : 3].addressOrName.slice(2)}`,
    abi: !meta.wrapped ? constants.ensConfig[0].contractInterface : constants.ensConfig[chain === '1' ? 7 : 3].contractInterface,
    functionName: 'setResolver',
    args: [ethers.namehash(ENS), ccip2Contract]
  })
  // Wagmi hook for awaiting transaction processing
  const { isSuccess: txSuccess, isError: txError, isLoading: txLoading } = useWaitForTransaction({
    hash: response1of1?.hash,
  })

  // Handle recent migration & import
  React.useEffect(() => {
    if (justMigrated) {
      setCanUse(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justMigrated])

  // Get Resolver for ENS domain
  async function getResolver(_ENS: string) {
    try {
      const _response = await provider.getResolver(_ENS)
      if (_response?.address) {
        return _response.address
      } else {
        return constants.zeroAddress
      }
    } catch {
      return constants.zeroAddress
    }
  }

  // Get Contenhash
  async function getContenthash(resolver: ethers.EnsResolver, _records: any) {
    const _records_ = { ..._records }
    try {
      const _contenthash = await resolver.getContentHash()
      if (_contenthash) {
        _records_.contenthash.value = _contenthash
        _records_.contenthash.loading = false
        setRecords(_records_)
        return _contenthash
      } else {
        _records_.contenthash.value = ''
        _records_.contenthash.loading = false
        setRecords(_records_)
        return ''
      }
    } catch {
      _records_.contenthash.value = ''
      _records_.contenthash.loading = false
      setRecords(_records_)
      return ''
    }
  }

  // Get Avatar
  async function getAvatar(_ENS: string, _records: any) {
    const _records_ = { ..._records }
    try {
      const _avatar = await provider.getAvatar(_ENS)
      if (_avatar) {
        _records_.avatar.value = _avatar
        _records_.avatar.loading = false
        setRecords(_records_)
        return _avatar
      } else {
        _records_.avatar.value = ''
        _records_.avatar.loading = false
        setRecords(_records_)
        return ''
      }
    } catch (error) {
      _records_.avatar.value = ''
      _records_.avatar.loading = false
      setRecords(_records_)
      return ''
    }
  }

  // Get Address for ENS domain
  async function getAddr(_ENS: string, _records: any) {
    const _records_ = { ..._records }
    try {
      const _addr = await provider.resolveName(_ENS)
      if (_addr) {
        _records_.addr.value = _addr
        _records_.addr.loading = false
        setRecords(_records_)
        return _addr
      } else {
        _records_.addr.value = ''
        _records_.addr.loading = false
        setRecords(_records_)
        return ''
      }
    } catch (error) {
      _records_.addr.value = ''
      _records_.addr.loading = false
      setRecords(_records_)
      return ''
    }
  }

  // Get Text records for ENS domain
  async function getText(resolver: ethers.EnsResolver, _key: string, _records: any) {
    const _records_ = { ..._records }
    try {
      const _record = await resolver.getText(_key)
      if (_record) {
        _records_[_key].value = _record
        _records_[_key].loading = false
        setRecords(_records_)
        return _record
      } else {
        _records_[_key].value = ''
        _records_[_key].loading = false
        setRecords(_records_)
        return ''
      }
    } catch (error) {
      _records_[_key].value = ''
      _records_[_key].loading = false
      setRecords(_records_)
      return ''
    }
  }

  // Wagmi Signature hook
  const {
    data: signature,
    error: signError,
    isLoading: signLoading,
    signMessage
  } = useSignMessage({
    onSuccess(data, variables) {
      const address = ethers.verifyMessage(variables.message, data)
      recoveredAddress.current = address
    },
  })

  /// ENS Domain Metadata
  // Read Legacy ENS Registry for ENS domain Owner
  const { data: _OwnerLegacy_, isLoading: legacyOwnerLoading, isError: legacyOwnerError } = useContractRead({
    address: `0x${constants.ensConfig[1].addressOrName.slice(2)}`,
    abi: constants.ensConfig[1].contractInterface,
    functionName: 'ownerOf',
    args: [tokenIDLegacy]
  })
  // Read Legacy ENS Registry for ENS domain Manager
  const { data: _ManagerLegacy_, isLoading: legacyManagerLoading, isError: legacyManagerError } = useContractRead({
    address: `0x${constants.ensConfig[0].addressOrName.slice(2)}`,
    abi: constants.ensConfig[0].contractInterface,
    functionName: 'owner',
    args: [namehashLegacy]
  })
  // Read ownership of a domain from ENS Wrapper
  const { data: _OwnerWrapped_, isLoading: wrapperOwnerLoading, isError: wrapperOwnerError } = useContractRead({
    address: `0x${constants.ensConfig[chain === '1' ? 7 : 3].addressOrName.slice(2)}`,
    abi: constants.ensConfig[chain === '1' ? 7 : 3].contractInterface,
    functionName: 'ownerOf',
    args: [tokenIDWrapper]
  })
  // Read Ownerhash from CCIP2 Resolver
  const { data: _Ownerhash_ } = useContractRead({
    address: `0x${ccip2Config.addressOrName.slice(2)}`,
    abi: ccip2Config.contractInterface,
    functionName: 'getRecordhash',
    args: [ethers.zeroPadValue(getManager(), 32)]
  })
  // Read Recordhash from CCIP2 Resolver
  const { data: _Recordhash_ } = useContractRead({
    address: `0x${ccip2Config.addressOrName.slice(2)}`,
    abi: ccip2Config.contractInterface,
    functionName: 'getRecordhash',
    args: [ethers.namehash(ENS)]
  })

  // Sets Metadata
  React.useEffect(() => {
    if (_OwnerLegacy_ && _OwnerLegacy_ !== constants.zeroAddress) {
      let _meta = { ...meta }
      _meta.owner = String(_OwnerLegacy_)
      if (String(_OwnerLegacy_) !== constants.ensContracts[7]) {
        if (_ManagerLegacy_ && _ManagerLegacy_ !== constants.zeroAddress) {
          _meta.manager = String(_ManagerLegacy_)
        }
      } else {
        _meta.manager = String(_OwnerWrapped_)
        _meta.wrapped = true
      }
      let _resolver: string
      const _getResolver = async () => {
        _resolver = await getResolver(ENS)
        _meta.resolver = _resolver
        setMeta(_meta)
        setResolver(_resolver)
      }
      _getResolver()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_OwnerLegacy_, _ManagerLegacy_, _OwnerWrapped_])

  return (
    <main className='flex-column'>
      {loading && (
        <div style={{ marginTop: '350px' }}>
          <Loading
            height={50}
            width={50}
          />
        </div>
      )}
      {!loading && (
        <>
          <div style={{ marginTop: '20px', marginRight: '-61.5%' }}>
            <div>
              <ConnectButton
                label='wallet'
              />
            </div>
          </div>
          <div className='flex-column' style={{ opacity: 0.35, marginTop: '-2%' }}>
            <Image
              className={'logo-2'}
              src="/logo.png"
              alt="namesys-logo"
              width={500}
              height={100}
              priority
            />
            <div className='flex-column' style={{ marginTop: '-4%' }}>
              <h4 style={{ color: '#ff2600' }}>
                NameSys
              </h4>
              <h6 style={{ color: '#fc4e14', marginTop: '-25px' }}>
                Lite
              </h6>
            </div>
          </div>
          <div className={!mobile ? 'flex-column-sans-align' : 'flex-column'} style={{ margin: '10px 0 0 0' }}>
            <div className={!mobile ? 'flex-column-sans-align' : 'flex-column'} style={{ margin: '10px 0 0 20px' }}>
              <img
                src={records.avatar.source || '/profile.png'}
                onError={(event) => {
                  (event.target as any).onerror = null;
                  (event.target as any).src = '/profile.png';
                }}
                width={'120px'}
                style={{ margin: '0 15px -3px 0' }}
              />
              <div
                className={!mobile ? 'flex-row' : 'flex-column'}
                style={{
                  alignItems: 'flex-start',
                  margin: mobile ? '5px 0 0 0' : '0 0 0 0',
                }}
              >
                <div
                  className={!mobile ? 'flex-column-sans-align' : 'flex-column'}
                  style={{
                    margin: !mobile ? '-9.375% 0 0 -41%' : '0 0 0 0',
                    color: '#ff2600'
                  }}
                >
                  <div className='flex-row-sans-justify'>
                    <span>{'Migrated'}</span>
                    &nbsp;
                    <button
                      className="button-tiny"
                      data-tooltip={meta.resolver === ccip2Contract ? (canUse ? `Resolver is migrated` : `Using NameSys with IPFS. Please use pro client`) : `Resolver is not migrated`}
                    >
                      <div
                        className="material-icons-round smoller"
                        style={{
                          color: meta.resolver === ccip2Contract ? (canUse ? 'lightgreen' : 'orange') : 'orange',
                          fontSize: '22px',
                          margin: '1px 0 0 -5px'
                        }}
                      >
                        {meta.resolver === ccip2Contract ? 'done' : 'close'}
                      </div>
                    </button>
                  </div>
                  <div>
                    <span>{'Resolver'}</span>
                    &nbsp;
                    <span
                      className='mono'
                      id="metaResolver"
                      onClick={() => constants.copyToClipboard(meta.resolver, "metaResolver", "none")}
                    >
                      {mobile ? constants.truncateHexString(meta.resolver) : meta.resolver}
                    </span>
                    <img
                      src={constants.ensContracts.includes(resolver) ? 'ens.png' : (resolver === ccip2Contract ? 'logo.png' : '')}
                      width={'15px'}
                      style={{ margin: `0 15px -3px 7.5px` }}
                    />
                  </div>
                  <div>
                    <span>{'Owner'}</span>
                    &nbsp;
                    <span
                      className='mono'
                      id="metaOwner"
                      onClick={() => constants.copyToClipboard(meta.owner, "metaOwner", "none")}
                      color=''
                    >
                      {mobile ? constants.truncateHexString(meta.owner) : meta.owner}
                    </span>
                  </div>
                  <div>
                    <span>{'Manager'}</span>
                    &nbsp;
                    <span
                      className='mono'
                      id="metaManager"
                      onClick={() => constants.copyToClipboard(meta.manager, "metaManager", "none")}
                    >
                      {mobile ? constants.truncateHexString(meta.manager) : meta.manager}
                    </span>
                  </div>
                  <div className='flex-row-sans-justify'>
                    <span>{'Wrapped'}</span>
                    &nbsp;
                    <span
                      className='material-icons'
                      style={{
                        color: 'white',
                        fontSize: '21px'
                      }}
                    >
                      {meta.wrapped ? 'done' : 'close'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={!mobile ? 'flex-column-sans-align' : 'flex-column'}>
              <h2
                style={{
                  color: '#ff2600',
                  fontFamily: 'SF Mono',
                  fontSize: '36px',
                  paddingLeft: '20px'
                }}
              >
                <img
                  src='ens.png'
                  width={'25px'}
                  style={{ margin: '0 15px -3px 0' }}
                />
                {ENS ? ENS.slice(0, -4) : ''}
                <span
                  style={{
                    opacity: '0.50',
                    fontSize: '26px',
                    color: 'white'
                  }}
                >
                  {'.eth'}
                </span>
              </h2>
              {/* MIGRATE */}
              <div
                className='flex-column'
                style={{
                  margin: '-10% 0 0 90.75%'
                }}
              >
                <button
                  className="button-tiny"
                  data-tooltip={meta.resolver === ccip2Contract ? `Resolver is migrated` : `Resolver is not migrated`}
                  style={{
                    marginLeft: !mobile ? '0' : '-90%',
                  }}
                >
                  <div
                    className="material-icons-round smoller"
                    style={{
                      color: meta.resolver === ccip2Contract ? 'lightgreen' : 'orange',
                      fontSize: '22px',
                      margin: '1px 0 0 -5px'
                    }}
                  >
                    {'info_outline'}
                  </div>
                </button>
                <button
                  className={justMigrated ? 'button blink' : 'button'}
                  style={{
                    width: '50px',
                    margin: !mobile ? '-7% 0 0 50%' : '-3% 0 0 0',
                  }}
                  onClick={() => migrate()}
                  data-tooltip='Migrate Resolver'
                  disabled={!_Wallet_ || (!meta.wrapped && _Wallet_ !== meta.owner) || (meta.wrapped && _Wallet_ !== meta.manager) || meta.resolver === ccip2Contract}
                >
                  <span className="material-icons-round micon">shopping_cart</span>
                </button>
              </div>
              {/* IMPORT */}
              <div
                className='flex-column'
                style={{
                  margin: '0 0 0 90.75%'
                }}
              >
                <button
                  className="button-tiny"
                  data-tooltip={meta.resolver === ccip2Contract ? (canUse ? `Import ENS records` : `Please use pro client`) : `Resolver is not migrated`}
                  style={{
                    marginLeft: !mobile ? '0' : '-90%',
                  }}
                >
                  <div
                    className="material-icons-round smoller"
                    style={{
                      color: meta.resolver === ccip2Contract ? (!canUse ? 'orange' : 'lightgreen') : 'orange',
                      fontSize: '22px',
                      margin: '1px 0 0 -5px'
                    }}
                  >
                    {'info_outline'}
                  </div>
                </button>
                <button
                  className={justMigrated ? 'button blink' : 'button'}
                  style={{
                    width: '50px',
                    margin: !mobile ? '-5% 0 0 50%' : '-3% 0 0 0',
                  }}
                  onClick={() => setResolverModal(true)}
                  data-tooltip='Import ENS Records'
                  disabled={!canUse}
                >
                  <span className="material-icons-round micon">download</span>
                </button>
              </div>
              <div>
                <Records
                  meta={meta}
                  handleTrigger={handleRecordsTrigger}
                  handleModalData={handleRecordsModalData}
                  records={Object.values(records)}
                  hue={!_Wallet_ || ((!meta.wrapped && _Wallet_ !== meta.owner) && (meta.wrapped && _Wallet_ !== meta.manager)) ? 'white' : 'orange'}
                />
              </div>
            </div>
          </div>
          <div id="modal">
            <ResolverModal
              onClose={() => setResolverModal(false)}
              show={resolverModal}
              children={resolver === ccip2Contract ? '' : resolver}
              handleModalData={function (data: string | undefined): void { }}
              handleTrigger={function (data: boolean): void { }}
            >
            </ResolverModal>
          </div>
          <div className={styles.grid} style={{ margin: '120px 0 0 0' }}>
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
              <p>Learn More</p>
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
          <div
            className="flex-column"
            style={{
              paddingTop: '30px'
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
          <div id='this' style={{ marginTop: '2.5%' }}></div>
        </>
      )}
    </main>
  )
}
