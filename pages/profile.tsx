import Head from "next/head";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import * as C from "../utils/constants";
import { isMobile } from "react-device-detect";
import Loading from "../components/Loading";
import { AbiItem } from "web3-utils";
import { KEYGEN } from "../utils/keygen";
import Records from "../components/Records";
import Salt from "../components/Salt";
import Success from "../components/Success";
import Error from "../components/Error";
import GasSavings from "../components/WrapUp";
import * as ensContent from "../utils/contenthash";
import * as addrEncode from "@ensdomains/address-encoder";
import ResolverModal from "../components/Import";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import {
  useAccount,
  useFeeData,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  useSignMessage,
} from "wagmi";
import Web3 from "web3";

export default function Profile() {
  const router = useRouter();
  const { data: gasData, isError } = useFeeData(); // Current gas prices
  const { query } = router.query; // Query from main page
  const { width, height } = useWindowDimensions(); // Get window dimensions
  const [ENS, setENS] = React.useState(""); // Set ENS from query
  const [resolver, setResolver] = React.useState(""); // Get ENS Resolver for query
  const [mobile, setMobile] = React.useState(false); // Set mobile or dekstop environment
  const [write, setWrite] = React.useState(false); // Sets write flag
  const [triggerRefresh, setTriggerRefresh] = React.useState(true); // Sets refresh flag
  const [sigCount, setSigCount] = React.useState(0); // Set signature count
  const [color, setColor] = React.useState("lightgreen"); // Set color
  const [gas, setGas] = React.useState({}); // Sets list of gas consumption
  const [gasModal, setGasModal] = React.useState(false); // Sets gas modal state
  const [crash, setCrash] = React.useState(false); // Set crash status
  const [success, setSuccess] = React.useState(""); // Sets success text for the Success modal
  const [saltModal, setSaltModal] = React.useState(false); // Salt (password/key-identifier)
  const [successModal, setSuccessModal] = React.useState(false); // Success modal trigger
  const [signer, setSigner] = React.useState(["", ""]); // Set signer keypair [priv, pub]
  const [cache, setCache] = React.useState<C.RecordsType>({}); // Set cache
  const [message, setMessage] = React.useState("Loading"); // Set message to display
  const [justMigrated, setJustMigrated] = React.useState(false); // Set migrated flag
  const [canUse, setCanUse] = React.useState(false); // Set import flag
  const [resolverModal, setResolverModal] = React.useState(false); // Resolver modal
  const [records, setRecords] = React.useState<C.RecordsType>(C.records); // Set records
  const [meta, setMeta] = React.useState(C.meta); // Set ENS metadata
  const [tokenIDLegacy, setTokenIDLegacy] = React.useState(""); // Set Token ID of unwrapped/legacy name
  const [namehashLegacy, setNamehashLegacy] = React.useState(""); // Legacy Namehash of ENS Domain
  const [tokenIDWrapper, setTokenIDWrapper] = React.useState(""); // Set Token ID of wrapped name
  const [loading, setLoading] = React.useState(true); // Loading Records marker
  const [resolverModalState, setResolverModalState] =
    React.useState<C.MainBodyState>(C.modalTemplate); // Gateway modal state
  const [recordsState, setRecordsState] = React.useState<C.MainBodyState>(
    C.modalTemplate
  ); // Records body state
  const [saltModalState, setSaltModalState] = React.useState<C.MainSaltState>(
    C.modalSaltTemplate
  ); // Salt modal state
  const [, setSuccessModalState] = React.useState<C.MainSaltState>(
    C.modalSaltTemplate
  );
  // Variables
  const chain = process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? "1" : "5";
  const { address: _Wallet_ } = useAccount();
  const ccip2Contract = C.ccip2[chain === "1" ? 1 : 0];
  const ccip2Config = C.ccip2Config[chain === "1" ? 1 : 0];
  const apiKey =
    chain === "1"
      ? process.env.NEXT_PUBLIC_ALCHEMY_ID_MAINNET
      : process.env.NEXT_PUBLIC_ALCHEMY_ID_GOERLI;
  const network = chain === "1" ? "mainnet" : "goerli";
  const provider = new ethers.AlchemyProvider(network, apiKey);
  const alchemyEndpoint = `https://eth-${network}.g.alchemy.com/v2/` + apiKey;
  const web3 = new Web3(alchemyEndpoint);
  const recoveredAddress = React.useRef<string>();
  const caip10 = `eip155:${chain}:${_Wallet_}`; // CAIP-10
  const origin = `eth:${_Wallet_ || C.zeroAddress}`;
  const PORT = process.env.NEXT_PUBLIC_PORT;
  const SERVER = process.env.NEXT_PUBLIC_SERVER;

  // Handle Resolver modal data return
  const handleResolverModalData = (data: string) => {
    setResolverModalState((prevState) => ({ ...prevState, modalData: data }));
  };
  // Handle Resolver modal trigger
  const handleResolverTrigger = (trigger: boolean) => {
    setResolverModalState((prevState) => ({ ...prevState, trigger: trigger }));
  };
  // Handle Records body data return
  const handleRecordsData = (data: string) => {
    setRecordsState((prevState) => ({ ...prevState, modalData: data }));
  };
  // Handle Records body trigger
  const handleRecordsTrigger = (trigger: boolean) => {
    setRecordsState((prevState) => ({ ...prevState, trigger: trigger }));
  };
  // Handle Salt modal data return
  const handleSaltModalData = (data: string | undefined) => {
    setSaltModalState((prevState) => ({ ...prevState, modalData: data }));
  };
  // Handle Salt modal trigger
  const handleSaltTrigger = (trigger: boolean) => {
    setSaltModalState((prevState) => ({ ...prevState, trigger: trigger }));
  };
  // Handle Success modal data return
  const handleSuccessModalData = (data: string | undefined) => {
    setSuccessModalState((prevState) => ({ ...prevState, modalData: data }));
  };
  // Handle Success modal trigger
  const handleSuccessTrigger = (trigger: boolean) => {
    setSuccessModalState((prevState) => ({ ...prevState, trigger: trigger }));
  };

  // UTILS
  const resetKeys = (records: C.RecordsType): C.RecordsType => {
    const resetRecords: C.RecordsType = {};
    for (const key in records) {
      if (Object.prototype.hasOwnProperty.call(records, key)) {
        const resetValue = {
          ...records[key],
          new: "",
          signature: "",
          value: "...",
          loading: true,
        };
        resetRecords[key] = resetValue;
      }
    }
    return resetRecords;
  };

  // FUNCTIONS
  // Returns Owner of Wrapped or Manager of Legacy ENS Domain
  function getManager() {
    if (_OwnerLegacy_ && _ManagerLegacy_) {
      if (String(_OwnerLegacy_) === C.ensContracts[chain === "1" ? 7 : 3]) {
        return _OwnerWrapped_ ? String(_OwnerWrapped_) : C.zeroAddress;
      } else {
        return String(_ManagerLegacy_);
      }
    } else {
      if (
        !_OwnerLegacy_ &&
        String(_ManagerLegacy_) === C.ensContracts[chain === "1" ? 7 : 3]
      ) {
        return String(_OwnerWrapped_);
      }
      return C.zeroAddress;
    }
  }
  // Returns Account allowed to manage/edit NameSys records
  function getRecordEditor() {
    if (
      _OwnerWrapped_ &&
      _ManagerLegacy_ &&
      String(_OwnerWrapped_) !== C.zeroAddress &&
      String(_ManagerLegacy_) !== C.zeroAddress
    ) {
      if (String(_ManagerLegacy_) === C.ensContracts[chain === "1" ? 7 : 3]) {
        if (_OwnerWrapped_ && String(_OwnerWrapped_) !== C.zeroAddress) {
          return String(_OwnerWrapped_);
        }
      } else {
        return String(_OwnerLegacy_);
      }
      return C.zeroAddress;
    } else {
      if (_OwnerLegacy_ && String(_OwnerLegacy_) !== C.zeroAddress) {
        return String(_OwnerLegacy_);
      } else {
        if (_ManagerLegacy_ && String(_ManagerLegacy_) !== C.zeroAddress) {
          return String(_ManagerLegacy_);
        } else {
          return C.zeroAddress;
        }
      }
    }
  }

  // Whether connector is ready to write
  function canEdit() {
    return (
      !_Wallet_ ||
      (!meta.wrapped && _Wallet_ !== meta.owner) ||
      (meta.wrapped && _Wallet_ !== meta.manager) ||
      meta.resolver !== C.ccip2[meta.chainId === 5 ? 0 : 1]
    );
  }

  // Whether connector is (un)authorised to write
  function unauthorised() {
    return (
      !_Wallet_ ||
      (!meta.wrapped && _Wallet_ !== meta.owner) ||
      (meta.wrapped && _Wallet_ !== meta.manager)
    );
  }

  // Counts live values of update
  function countVal(records: C.RecordsType) {
    let nonEmptyNewCount = 0;
    for (const key in records) {
      if (records.hasOwnProperty(key) && records[key].new !== "") {
        nonEmptyNewCount++;
      }
    }
    return nonEmptyNewCount;
  }

  // Sign a record
  async function signRecord(
    records: C.RecordsType,
    _signer: ethers.Wallet,
    _type: string
  ) {
    if (records[_type].new) {
      return await _signer.signMessage(
        statementRecords(
          records[_type].path,
          genExtradata(_type, records[_type].new),
          meta.signer
        )
      );
    } else {
      return "";
    }
  }

  /// Encode string values of records
  // returns abi.encodeWithSelector(iCallbackType.signedRecord.selector, _signer, _recordSignature, _approvedSignature, result)
  function encodeValue(
    key: string,
    value: string,
    signature: string,
    approval: string,
    signer: string
  ) {
    let encoded: string;
    let _value: string = "";
    let type: string = "";
    if (
      [
        "avatar",
        "description",
        "email",
        "pubkey",
        "com.github",
        "url",
        "com.twitter",
        "com.discord",
        "xyz.farcaster",
        "nostr",
        "zonehash",
      ].includes(key)
    ) {
      type = "string";
      _value = value;
    }
    if (["btc", "ltc", "doge", "sol", "atom"].includes(key)) {
      type = "bytes";
      _value = `0x${addrEncode
        .getCoderByCoinName(key.toUpperCase())
        .decode(value)
        .toString()}`;
    }
    if (key === "contenthash") {
      type = "bytes";
      _value = ensContent.encodeContentHash(value);
    }
    if (key === "addr") {
      type = "address";
      _value = value;
    }
    let _result = ethers.AbiCoder.defaultAbiCoder().encode([type], [_value]);
    let _ABI = [C.signedRecord];
    let _interface = new ethers.Interface(_ABI);
    let _encodedWithSelector = _interface.encodeFunctionData("signedRecord", [
      signer,
      signature,
      approval,
      _result,
    ]);
    encoded = _encodedWithSelector;
    return encoded;
  }

  // Generate extradata for S_RECORDS(K_SIGNER)
  function genExtradata(key: string, _recordValue: string) {
    // returns bytesToHexString(abi.encodePacked(keccak256(result)))
    let type: string = "";
    let _value: string = "";
    if (
      [
        "avatar",
        "description",
        "email",
        "pubkey",
        "com.github",
        "url",
        "com.twitter",
        "com.discord",
        "xyz.farcaster",
        "nostr",
        "zonehash",
      ].includes(key)
    ) {
      type = "string";
      _value = _recordValue;
    }
    if (["btc", "ltc", "doge", "sol", "atom"].includes(key)) {
      type = "bytes";
      _value = `0x${addrEncode
        .getCoderByCoinName(key.toUpperCase())
        .decode(_recordValue)
        .toString()}`;
    }
    if (key === "contenthash") {
      type = "bytes";
      _value = ensContent.encodeContentHash(_recordValue);
    }
    if (key === "addr") {
      type = "address";
      _value = _recordValue;
    }
    const toPack = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode([type], [_value])
    );
    const _extradata = ethers.hexlify(
      ethers.solidityPacked(["bytes"], [toPack])
    );
    return _extradata;
  }

  // Get gas cost estimate for hypothetical on-chain record update
  async function getGas(key: string, value: string) {
    const getGasAmountForContractCall = async () => {
      const contract = new web3.eth.Contract(
        C.ensConfig[chain === "1" ? 6 : 6].contractInterface as AbiItem[],
        C.ensConfig[chain === "1" ? 6 : 6].addressOrName
      );
      let gasAmount: any;
      if (key === "contenthash") {
        gasAmount = await contract.methods
          .setContenthash(
            ethers.namehash(ENS),
            ensContent.encodeContentHash(value)
          )
          .estimateGas({ from: _Wallet_ });
      } else if (
        [
          "avatar",
          "description",
          "email",
          "pubkey",
          "com.github",
          "url",
          "com.twitter",
          "com.discord",
          "xyz.farcaster",
          "nostr",
          "zonehash",
        ].includes(key)
      ) {
        gasAmount = await contract.methods
          .setText(ethers.namehash(ENS), key, value)
          .estimateGas({ from: _Wallet_ });
      } else if (["btc", "ltc", "doge", "sol", "atom"].includes(key)) {
        let _type =
          key === "btc"
            ? 0
            : key === "ltc"
            ? 2
            : key === "doge"
            ? 3
            : key === "sol"
            ? 501
            : 118;
        gasAmount = await contract.methods
          .setAddr(
            ethers.namehash(ENS),
            _type,
            `0x${addrEncode
              .getCoderByCoinName(key.toUpperCase())
              .decode(value)
              .toString()}`
          )
          .estimateGas({ from: _Wallet_ });
      } else if (key === "addr") {
        gasAmount = await contract.methods
          .setAddr(ethers.namehash(ENS), value)
          .estimateGas({ from: _Wallet_ });
      }
      return gasAmount;
    };
    const gas = await getGasAmountForContractCall();
    return gas;
  }

  // Function for writing Revision metadata to NameSys backend; needed for updates
  async function writeRevision(
    revision: undefined,
    gas: {},
    timestamp: string,
    _ipfs: string
  ) {
    let __revision: any = {};
    if (revision) {
      const _revision = JSON.parse(
        JSON.stringify(revision, (key, value) => {
          return typeof value === "bigint" ? String(value) : value;
        })
      );
      if (_revision._name._privKey) _revision._name._privKey._key = {};
      __revision = JSON.stringify(_revision);
    } else {
      __revision = JSON.stringify(__revision);
    }
    const request = {
      ens: ENS,
      controller: _Wallet_,
      manager: meta.signer || C.zeroAddress,
      managerSignature: meta.signature,
      revision: {},
      chain: chain,
      ipns: "",
      ipfs: _ipfs,
      gas: JSON.stringify(gas),
      version: __revision,
      timestamp: timestamp,
      hashType: "gateway",
    };
    try {
      await fetch(`${SERVER}:${PORT}/revision`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            return data.status === "true";
          } else {
            return false;
          }
        });
    } catch (error) {
      console.error("ERROR:", "Failed to write Revision to CCIP2 backend");
      setMessage("Revision Update Failed");
      setCrash(true);
      setLoading(false);
      setColor("orangered");
    }
  }

  // INIT
  React.useEffect(() => {
    if (isMobile || (width && width < 1300)) {
      setMobile(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  // Sets ENS domain
  React.useEffect(() => {
    if (query && query !== null && typeof query === "string") {
      setENS(query);
      let __namehash = ethers.namehash(query);
      setNamehashLegacy(__namehash);
      let __token = BigInt(__namehash);
      setTokenIDWrapper(String(__token));
      let __labelhash = C.calculateLabelhash(query);
      setTokenIDLegacy(String(BigInt(__labelhash)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Gets past ENS records upon request
  React.useEffect(() => {
    if (
      resolverModalState.trigger &&
      C.ensContracts.includes(resolverModalState.modalData)
    ) {
      const getENSRecords = async () => {
        try {
          setMessage("Importing");
          setLoading(true);
          const contract = new web3.eth.Contract(
            C.ensConfig[C.ensContracts.indexOf(resolverModalState.modalData)]
              .contractInterface as AbiItem[],
            C.ensConfig[
              C.ensContracts.indexOf(resolverModalState.modalData)
            ].addressOrName
          );
          let _ensRecords = { ...C.ensRecords };
          await contract.methods
            .contenthash(ethers.namehash(ENS))
            .call()
            .then(async (value: string) => {
              _ensRecords.contenthash = value;
              await contract.methods
                .text(ethers.namehash(ENS), "avatar")
                .call()
                .then(async (value: string) => {
                  _ensRecords.avatar = value;
                  await contract.methods
                    .addr(ethers.namehash(ENS))
                    .call()
                    .then(async (value: string) => {
                      _ensRecords.addr = value;
                      await contract.methods
                        .text(ethers.namehash(ENS), "url")
                        .call()
                        .then(async (value: string) => {
                          _ensRecords.url = value;
                          await contract.methods
                            .text(ethers.namehash(ENS), "description")
                            .call()
                            .then(async (value: string) => {
                              _ensRecords.description = value;
                              await contract.methods
                                .text(ethers.namehash(ENS), "com.twitter")
                                .call()
                                .then(async (value: string) => {
                                  _ensRecords.twitter = value;
                                  await contract.methods
                                    .text(ethers.namehash(ENS), "com.discord")
                                    .call()
                                    .then(async (value: string) => {
                                      _ensRecords.discord = value;
                                      await contract.methods
                                        .text(
                                          ethers.namehash(ENS),
                                          "com.github"
                                        )
                                        .call()
                                        .then(async (value: string) => {
                                          _ensRecords.github = value;
                                          // Set all values
                                          let _records = { ...records };
                                          if (_ensRecords.addr) {
                                            _records.addr.ens =
                                              _ensRecords.addr;
                                            _records.addr.new =
                                              _ensRecords.addr;
                                            _records.addr.value =
                                              _ensRecords.addr;
                                          }
                                          if (_ensRecords.avatar) {
                                            _records.avatar.ens =
                                              _ensRecords.avatar;
                                            _records.avatar.new =
                                              _ensRecords.avatar;
                                            _records.avatar.value =
                                              _ensRecords.avatar;
                                          }
                                          if (_ensRecords.contenthash) {
                                            _records.contenthash.ens =
                                              _ensRecords.contenthash;
                                            _records.contenthash.new =
                                              _ensRecords.contenthash;
                                            _records.contenthash.value =
                                              _ensRecords.contenthash;
                                          }
                                          if (_ensRecords.url) {
                                            _records.url.ens = _ensRecords.url;
                                            _records.url.new = _ensRecords.url;
                                            _records.url.value =
                                              _ensRecords.url;
                                          }
                                          if (_ensRecords.description) {
                                            _records.description.ens =
                                              _ensRecords.description;
                                            _records.description.new =
                                              _ensRecords.description;
                                            _records.description.value =
                                              _ensRecords.description;
                                          }
                                          if (_ensRecords.github) {
                                            _records["com.github"].ens =
                                              _ensRecords.github;
                                            _records["com.github"].new =
                                              _ensRecords.github;
                                            _records["com.github"].value =
                                              _ensRecords.github;
                                          }
                                          if (_ensRecords.twitter) {
                                            _records["com.twitter"].ens =
                                              _ensRecords.twitter;
                                            _records["com.twitter"].new =
                                              _ensRecords.twitter;
                                            _records["com.twitter"].value =
                                              _ensRecords.twitter;
                                          }
                                          if (_ensRecords.discord) {
                                            _records["com.discord"].ens =
                                              _ensRecords.discord;
                                            _records["com.discord"].new =
                                              _ensRecords.discord;
                                            _records["com.discord"].value =
                                              _ensRecords.discord;
                                          }
                                          setRecords(_records);
                                          setLoading(false);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        } catch (error) {
          console.error(error);
        }
      };
      getENSRecords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolverModalState]);

  // Sets ENS domain
  React.useEffect(() => {
    const getRecords = async () => {
      if (resolver && ENS) {
        const _resolver = await ethers.EnsResolver.fromName(provider, ENS);
        const _avatarRaw = _resolver
          ? await getText(_resolver, "avatar", records)
          : "";
        if (_resolver) await getContenthash(_resolver, records);
        let _avatar: string;
        let _records =
          Object.keys(cache).length > 0 ? { ...cache } : { ...records };
        if (_avatarRaw.startsWith("ipfs://")) {
          _records.avatar.value = _avatarRaw;
          _records.avatar.source = `https://ipfs.io/ipfs/${
            _avatarRaw.split("ipfs://")[1]
          }`;
          setRecords(_records);
        } else if (_avatarRaw.startsWith(`eip155:${chain}`)) {
          let _contract = _avatarRaw.split(":")[2].split("/")[0];
          let _tokenID = _avatarRaw.split(":")[2].split("/")[1];
          C.alchemy.nft
            .getNftMetadata(_contract, _tokenID)
            .then((_response: any) => {
              _records.avatar.value = _avatarRaw;
              _records.avatar.source =
                _response.media[0].thumbnail || _response.media[0].gateway;
              setRecords(_records);
            });
        } else if (_avatarRaw.startsWith("https://")) {
          _records.avatar.value = _avatarRaw;
          _records.avatar.source = _avatarRaw;
          setRecords(_records);
        } else {
          _avatar = _resolver ? await getAvatar(ENS, records) : "";
          _records.avatar.source = _avatar;
        }
        if (_resolver) {
          await getAddr(ENS, records);
          await getText(_resolver, "url", records);
          await getText(_resolver, "description", records);
          await getText(_resolver, "com.twitter", records);
          await getText(_resolver, "com.discord", records);
          await getText(_resolver, "com.github", records);
        }
        const getENSRecords = async () => {
          if (resolver && ENS) {
            if (resolver !== ccip2Contract) {
              if (C.ensContracts.includes(resolver)) {
                let _records =
                  Object.keys(cache).length > 0 ? { ...cache } : { ...records };
                _records.addr.ens = _records.addr.value;
                _records.avatar.ens = _records.avatar.value;
                _records.contenthash.ens = _records.contenthash.value;
                _records.url.ens = _records.url.value;
                _records.description.ens = _records.description.value;
                _records["com.github"].ens = _records["com.github"].value;
                _records["com.twitter"].ens = _records["com.twitter"].value;
                _records["com.discord"].ens = _records["com.discord"].value;
                setRecords(_records);
              }
            } else {
              if (_Recordhash_ || _Ownerhash_) {
                if (
                  String(_Recordhash_).length > 2 &&
                  _Recordhash_ !== _Ownerhash_
                ) {
                  let _String: string = "";
                  if (String(_Recordhash_).startsWith(C.ipnsPrefix)) {
                    let _this = ensContent.decodeContentHash(
                      `0x${String(_Recordhash_)}`
                    );
                    _String = _this ? `ipns://${_this.decoded}` : ``;
                  } else {
                    _String = ethers.toUtf8String(String(_Recordhash_));
                  }
                  if (
                    _String.startsWith("https://") &&
                    _String === C.defaultGateway
                  ) {
                    setCanUse(true);
                  }
                } else if (
                  String(_Recordhash_).length > 2 &&
                  _Recordhash_ === _Ownerhash_
                ) {
                  if (resolver === ccip2Contract) {
                    let _String: string = "";
                    if (String(_Ownerhash_).startsWith(C.ipnsPrefix)) {
                      let _this = ensContent.decodeContentHash(
                        `0x${String(_Ownerhash_)}`
                      );
                      _String = _this ? `ipns://${_this.decoded}` : ``;
                    } else {
                      _String = ethers.toUtf8String(String(_Ownerhash_));
                    }
                    if (
                      _String.startsWith("https://") &&
                      _String === C.defaultGateway
                    ) {
                      setCanUse(true);
                    }
                  }
                } else {
                  setCanUse(true);
                }
              }
            }
          }
        };
        getENSRecords();
      }
    };
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolver, ENS, cache]);

  // Trigger reset
  React.useEffect(() => {
    if (triggerRefresh) {
      // Reset records
      let _records = resetKeys({ ...records });
      setCache(_records);
      setRecords(_records);
      // Reset metadata
      let _meta = { ...meta };
      _meta.signer = "";
      _meta.signature = "";
      setMeta(_meta);
      setTriggerRefresh(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRefresh]);

  // Sets new ENS Resolver
  const {
    data: response1of1,
    write: migrate,
    isLoading: isMigrateLoading,
    isSuccess: isMigrateSuccess,
    isError: isMigrateError,
  } = useContractWrite({
    address: `0x${
      !meta.wrapped
        ? C.ensConfig[0].addressOrName.slice(2)
        : C.ensConfig[chain === "1" ? 7 : 3].addressOrName.slice(2)
    }`,
    abi: !meta.wrapped
      ? C.ensConfig[0].contractInterface
      : C.ensConfig[chain === "1" ? 7 : 3].contractInterface,
    functionName: "setResolver",
    args: [ENS ? ethers.namehash(ENS) : "", ccip2Contract],
  });
  // Wagmi hook for awaiting transaction processing
  const {
    isSuccess: txSuccess,
    isError: txError,
    isLoading: txLoading,
  } = useWaitForTransaction({
    hash: response1of1?.hash,
  });
  // Sets migration state to true upon successful Transaction 1 receipt (for Ownerhash)
  React.useEffect(() => {
    if (isMigrateSuccess && txSuccess) {
      setSuccess(
        '<div style="font-weight: 800"><span style="color: lime; font-size: 22px">Resolver Migrated!</span></div>'
      );
      setSuccessModal(true);
      setMessage("Transaction Confirmed");
      setTimeout(() => {
        let _meta = { ...meta };
        _meta.oldResolver = resolver;
        _meta.resolver = ccip2Contract;
        setMeta(_meta);
        setResolver(ccip2Contract);
        setJustMigrated(true);
        setLoading(false);
      }, 2000);
    }
    if (txLoading) {
      setMessage("Waiting for Confirmation");
    }
    if (txError) {
      setMessage("Transaction Failed");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMigrateSuccess, txSuccess, txLoading, txError]);

  // Handles Transaction 1 wait for Resolver
  React.useEffect(() => {
    if (isMigrateLoading && !isMigrateError) {
      setLoading(true);
      setMessage("Waiting for Transaction");
    } else if (isMigrateError && !isMigrateLoading) {
      setMessage("Transaction Declined by User");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMigrateLoading, isMigrateError]);

  // Handle recent migration & import
  React.useEffect(() => {
    if (justMigrated) {
      setCanUse(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justMigrated]);

  // Get Resolver for ENS domain
  async function getResolver(_ENS: string) {
    try {
      const _response = await provider.getResolver(_ENS);
      if (_response?.address) {
        return _response.address;
      } else {
        return C.zeroAddress;
      }
    } catch {
      return C.zeroAddress;
    }
  }

  // Get Contenhash
  async function getContenthash(
    resolver: ethers.EnsResolver,
    _records: C.RecordsType
  ) {
    const _records_ = { ..._records };
    try {
      const _contenthash = await resolver.getContentHash();
      if (_contenthash) {
        _records_.contenthash.value = _contenthash;
        _records_.contenthash.loading = false;
        setRecords(_records_);
        return _contenthash;
      } else {
        _records_.contenthash.value = "";
        _records_.contenthash.loading = false;
        setRecords(_records_);
        return "";
      }
    } catch {
      _records_.contenthash.value = "";
      _records_.contenthash.loading = false;
      setRecords(_records_);
      return "";
    }
  }

  // Get Avatar
  async function getAvatar(_ENS: string, _records: C.RecordsType) {
    const _records_ = { ..._records };
    try {
      const _avatar = await provider.getAvatar(_ENS);
      if (_avatar) {
        _records_.avatar.value = _avatar;
        _records_.avatar.loading = false;
        setRecords(_records_);
        return _avatar;
      } else {
        _records_.avatar.value = "";
        _records_.avatar.loading = false;
        setRecords(_records_);
        return "";
      }
    } catch (error) {
      _records_.avatar.value = "";
      _records_.avatar.loading = false;
      setRecords(_records_);
      return "";
    }
  }

  // Get Address for ENS domain
  async function getAddr(_ENS: string, _records: C.RecordsType) {
    const _records_ = { ..._records };
    try {
      const _addr = await provider.resolveName(_ENS);
      if (_addr) {
        _records_.addr.value = _addr;
        _records_.addr.loading = false;
        setRecords(_records_);
        return _addr;
      } else {
        _records_.addr.value = "";
        _records_.addr.loading = false;
        setRecords(_records_);
        return "";
      }
    } catch (error) {
      _records_.addr.value = "";
      _records_.addr.loading = false;
      setRecords(_records_);
      return "";
    }
  }

  // Get Text records for ENS domain
  async function getText(
    resolver: ethers.EnsResolver,
    _key: string,
    _records: C.RecordsType
  ) {
    const _records_ = { ..._records };
    try {
      const _record = await resolver.getText(_key);
      if (_record) {
        _records_[_key].value = _record;
        _records_[_key].loading = false;
        setRecords(_records_);
        return _record;
      } else {
        _records_[_key].value = "";
        _records_[_key].loading = false;
        setRecords(_records_);
        return "";
      }
    } catch (error) {
      _records_[_key].value = "";
      _records_[_key].loading = false;
      setRecords(_records_);
      return "";
    }
  }

  /// ENS Domain Metadata
  // Read Legacy ENS Registry for ENS domain Owner
  const {
    data: _OwnerLegacy_,
    isLoading: legacyOwnerLoading,
    isError: legacyOwnerError,
  } = useContractRead({
    address: `0x${C.ensConfig[1].addressOrName.slice(2)}`,
    abi: C.ensConfig[1].contractInterface,
    functionName: "ownerOf",
    args: [tokenIDLegacy],
  });
  // Read Legacy ENS Registry for ENS domain Manager
  const {
    data: _ManagerLegacy_,
    isLoading: legacyManagerLoading,
    isError: legacyManagerError,
  } = useContractRead({
    address: `0x${C.ensConfig[0].addressOrName.slice(2)}`,
    abi: C.ensConfig[0].contractInterface,
    functionName: "owner",
    args: [namehashLegacy],
  });
  // Read ownership of a domain from ENS Wrapper
  const {
    data: _OwnerWrapped_,
    isLoading: wrapperOwnerLoading,
    isError: wrapperOwnerError,
  } = useContractRead({
    address: `0x${C.ensConfig[chain === "1" ? 7 : 3].addressOrName.slice(2)}`,
    abi: C.ensConfig[chain === "1" ? 7 : 3].contractInterface,
    functionName: "ownerOf",
    args: [tokenIDWrapper],
  });
  // Read Ownerhash from CCIP2 Resolver
  const { data: _Ownerhash_ } = useContractRead({
    address: `0x${ccip2Config.addressOrName.slice(2)}`,
    abi: ccip2Config.contractInterface,
    functionName: "getRecordhash",
    args: [ethers.zeroPadValue(getRecordEditor(), 32)],
  });
  // Read Recordhash from CCIP2 Resolver
  const { data: _Recordhash_ } = useContractRead({
    address: `0x${ccip2Config.addressOrName.slice(2)}`,
    abi: ccip2Config.contractInterface,
    functionName: "getRecordhash",
    args: [ENS ? ethers.namehash(ENS) : ""],
  });

  // Sets Metadata
  React.useEffect(() => {
    if (_OwnerLegacy_ && String(_OwnerLegacy_) !== C.zeroAddress) {
      let _meta = { ...meta };
      _meta.owner = String(_OwnerLegacy_);
      _meta.manager = getManager();
      _meta.wrapped =
        C.ensContracts[chain === "1" ? 7 : 3] === String(_OwnerLegacy_);
      let _resolver: string;
      const loadResolver = async () => {
        _resolver = await getResolver(ENS);
        _meta.resolver = _resolver;
        setMeta(_meta);
        setResolver(_resolver);
      };
      loadResolver();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_OwnerLegacy_, _ManagerLegacy_, _OwnerWrapped_]);

  // Signature S_SIGNER statement; S_SIGNER(K_WALLET) [Signer Keygen]
  // S_SIGNER is not recovered on-chain; no need for buffer prepend and hashing of message required to sign
  function statementSignerKey(extradata: string) {
    let _toSign = `Requesting Signature To Generate ENS Records Signer\n\nOrigin: ${ENS}\nKey Type: secp256k1\nExtradata: ${extradata}\nSigned By: ${caip10}`;
    let _digest = _toSign;
    return _digest;
  }

  // Signature S_APPROVE statement; S_APPROVE(K_WALLET) [Approved Signature]
  // S_APPROVE is recovered on-chain; requires buffer prepend, hashing of message and arrayifying it
  function statementManager(signer: string) {
    let _signer = "eip155:" + chain + ":" + signer; // Convert secp256k1 pubkey to ETH address
    let _toSign = `Requesting Signature To Approve ENS Records Signer\n\nOrigin: ${ENS}\nApproved Signer: ${_signer}\nApproved By: ${caip10}`;
    return _toSign;
  }

  // Signature S_RECORDS statement; S_RECORDS(K_SIGNER) [Record Signature]
  // S_RECORDS is recovered on-chain; requires buffer prepend, hashing of message and arrayifying it
  function statementRecords(
    recordType: string,
    extradata: string,
    signer: string
  ) {
    let _signer = "eip155:" + chain + ":" + signer;
    let _toSign = `Requesting Signature To Update ENS Record\n\nOrigin: ${ENS}\nRecord Type: ${recordType}\nExtradata: ${extradata}\nSigned By: ${_signer}`;
    return _toSign;
  }

  // Wagmi Signature hook
  const {
    data: signature,
    error: signError,
    isLoading: signLoading,
    signMessage,
  } = useSignMessage({
    onSuccess(data, variables) {
      const address = ethers.verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  // Trigger Signer generation
  React.useEffect(() => {
    if (saltModalState.trigger) {
      setSigCount(1);
      const SIGN_SIGNER = async () => {
        signMessage({
          message: statementSignerKey(
            ethers.keccak256(
              ethers.solidityPacked(
                ["bytes32", "address"],
                [
                  ethers.keccak256(
                    ethers.solidityPacked(
                      ["string"],
                      [saltModalState.modalData]
                    )
                  ),
                  _Wallet_,
                ]
              )
            )
          ),
        });
      };
      SIGN_SIGNER();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saltModalState]);

  // Set Records to write
  React.useEffect(() => {
    if (recordsState.trigger && recordsState.modalData) {
      let _allRecords = JSON.parse(recordsState.modalData);
      let _records: C.RecordsType = { ...records };
      for (var i = 0; i < _allRecords.length; i++) {
        _records[_allRecords[i].id] = _allRecords[i];
      }
      setRecords(_records);
      setSaltModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordsState]);

  // Sets signature from Wagmi signMessage() as S_SIGNER(K_WALLET)
  React.useEffect(() => {
    if (signature) {
      if (sigCount === 1 && !signer[0]) {
        setMessage("Generating Signer");
        const keygen = async () => {
          const _origin = origin;
          const __keypair = await KEYGEN(
            _origin,
            caip10,
            signature,
            saltModalState.modalData
          );
          setSigner(__keypair);
          let _meta = { ...meta };
          _meta.signer = ethers.computeAddress(`0x${__keypair[0]}`);
          setMeta(_meta);
          setMessage("Signer Generated");
        };
        keygen();
      } else if (sigCount === 2) {
        setMessage("Signer Approved");
        let _meta = { ...meta };
        _meta.signature = signature;
        setMeta(_meta);
        // Sign Records
        setMessage("Signing Records");
        const _signer = new ethers.Wallet("0x" + signer[0], provider);
        let _records = { ...records };
        const _signRecords = async () => {
          await signRecord(_records, _signer, "addr").then(async (sig) => {
            _records.addr.signature = sig;
            await signRecord(_records, _signer, "contenthash").then(
              async (sig) => {
                _records.contenthash.signature = sig;
                await signRecord(_records, _signer, "avatar").then(
                  async (sig) => {
                    _records.avatar.signature = sig;
                    await signRecord(_records, _signer, "url").then(
                      async (sig) => {
                        _records.url.signature = sig;
                        await signRecord(_records, _signer, "description").then(
                          async (sig) => {
                            _records.description.signature = sig;
                            await signRecord(
                              _records,
                              _signer,
                              "com.twitter"
                            ).then(async (sig) => {
                              _records["com.twitter"].signature = sig;
                              await signRecord(
                                _records,
                                _signer,
                                "com.discord"
                              ).then(async (sig) => {
                                _records["com.discord"].signature = sig;
                                await signRecord(
                                  _records,
                                  _signer,
                                  "com.github"
                                ).then(async (sig) => {
                                  _records["com.github"].signature = sig;
                                  setRecords(_records);
                                  setSigCount(0);
                                  setLoading(false);
                                  setSigner(["", ""]);
                                  setWrite(true);
                                });
                              });
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          });
        };
        _signRecords();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, sigCount, signer]);

  // Sets signature from Wagmi signMessage() as S_SIGNER(K_WALLET)
  React.useEffect(() => {
    if (signer[0]) {
      setMessage("Approving Signer");
      setSigCount(2);
      const approval = async () => {
        signMessage({
          message: statementManager(meta.signer),
        });
      };
      approval();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);

  // Sets signature status
  React.useEffect(() => {
    if (signLoading) {
      setLoading(true);
      setMessage(
        sigCount === 1
          ? "Waiting for Signer Signature"
          : "Waiting for Approval Signature"
      );
    }
    if (signError) {
      setMessage("Signature Failed");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signLoading, signError, sigCount]);

  /* HANDLE WRITING RECORDS */
  // Handles writing records to the NameSys backend
  React.useEffect(() => {
    let _records = { ...records };
    let count = countVal(_records);
    if (write && count > 0) {
      setLoading(true);
      let encodedValues: any = {};
      let newValues: any = {};
      let newKeys: string[] = [];
      let signatures: any = {};
      for (const key in _records) {
        if (_records.hasOwnProperty(key) && _records[key].new !== "") {
          newValues[key] = _records[key].new;
          encodedValues[key] = encodeValue(
            key,
            _records[key].new,
            _records[key].signature,
            meta.signature,
            meta.signer
          );
          signatures[key] = _records[key].signature;
          newKeys.push(key);
        }
      }
      // Generate POST request for writing records
      const request = {
        signatures: signatures,
        manager: meta.signer || C.zeroAddress,
        managerSignature: meta.signature,
        ens: ENS,
        controller: _Wallet_ || C.zeroAddress,
        ipns: "",
        recordsTypes: newKeys,
        recordsValues: encodedValues,
        recordsRaw: newValues,
        revision: "",
        chain: chain,
        hashType: "gateway",
      };
      const editRecord = async () => {
        setMessage("Writing Records");
        try {
          await fetch(`${SERVER}:${PORT}/write`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          })
            .then((response) => response.json())
            .then(async (data) => {
              if (data.response) {
                // Get gas consumption estimate
                let gas: any = {};
                newKeys.map(async (item: string) => {
                  if (data.response.meta[item]) {
                    // Get gas for each record separately
                    let _gas = getGas(item, data.response[item]);
                    const _promise = async () => {
                      await Promise.all([_gas]);
                    };
                    await _promise();
                    _gas.then((value: number) => {
                      let _gasData =
                        gasData &&
                        gasData.formatted &&
                        gasData.formatted.gasPrice
                          ? Number(gasData.formatted.gasPrice)
                          : 0;
                      gas[item] = value * _gasData * 0.000000001;
                    });
                    _records.contenthash.value = data.response.contenthash;
                    _records.addr.value = data.response.addr;
                    _records.avatar.value = data.response.avatar;
                    _records.url.value = data.response.url;
                    _records.description.value = data.response.description;
                    _records["com.twitter"].value =
                      data.response["com.twitter"];
                    _records["com.discord"].value =
                      data.response["com.discord"];
                    _records["com.github"].value = data.response["com.github"];
                  }
                });
                // Wait for gas to be estimated
                await new Promise<void>((resolve) => {
                  const checkGas = () => {
                    if (Object.keys(gas).length > 0) {
                      resolve();
                    } else {
                      setTimeout(checkGas, 100);
                    }
                  };
                  checkGas();
                });
                const gateway = async () => {
                  if (gas) {
                    // Write revision to database
                    await writeRevision(
                      undefined,
                      gas,
                      data.response.timestamp,
                      ""
                    );
                    setGas(gas);
                    setGasModal(true);
                    setLoading(false);
                    setSigCount(0);
                    setSaltModalState({
                      modalData: undefined,
                      trigger: false,
                    });
                    setSuccess(
                      '<div style="font-weight: 800"><span style="color: lime; font-size: 22px">Records Updated!</span></div>'
                    );
                  }
                };
                gateway();
              }
            });
        } catch (error) {
          console.error("ERROR:", "Failed to write to CCIP2 backend");
          setMessage("Record Update Failed");
          setCrash(true);
          setLoading(false);
          setColor("orangered");
        }
      };
      editRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [write, meta]);

  return (
    <>
      <Head>
        <title>{`${ENS ? `NameSys Lite - ${ENS}` : "NameSys Lite"}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex-column">
        <div style={{ fontFamily: "Rajdhani" }}></div>
        <div style={{ fontFamily: "SF Mono" }}></div>
        <div style={{ fontFamily: "Spotnik" }}></div>
        {loading && (
          <>
            <div style={{ marginTop: mobile ? "300px" : "350px" }}>
              <Loading height={50} width={50} />
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  color: "#fc6603",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                {message}
              </span>
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "700",
                  fontFamily: "SF Mono",
                }}
              >
                {sigCount > 0 ? `${sigCount}/2` : ""}
              </span>
            </div>
          </>
        )}
        {!loading && (
          <>
            <div style={{ marginTop: "20px", marginRight: "-61.5%" }}>
              <div>
                <ConnectButton label="wallet" />
              </div>
            </div>
            <div
              className="flex-column"
              style={{ opacity: 0.35, marginTop: "-2%" }}
            >
              <img
                alt="namesys-logo"
                src="logo.png"
                width={"50px"}
                style={{ marginBottom: "-15px" }}
              />
              <div className="flex-column" style={{ marginTop: "-4%" }}>
                <h4 style={{ color: "#ff2600" }}>NameSys</h4>
                <h6 style={{ color: "#fc4e14", marginTop: "-25px" }}>Lite</h6>
              </div>
            </div>
            <div
              className={!mobile ? "flex-column-sans-align" : "flex-column"}
              style={{ margin: "10px 0 0 0" }}
            >
              <div
                className={!mobile ? "flex-column-sans-align" : "flex-column"}
                style={{ margin: "10px 0 0 20px" }}
              >
                <img
                  alt="logo"
                  src={records.avatar.source || "profile.png"}
                  onError={(event) => {
                    (event.target as any).onerror = null;
                    (event.target as any).src = "profile.png";
                  }}
                  width={"120px"}
                  style={{
                    margin: !mobile ? "0 15px -3px 0" : "-30px 15px 15px 0",
                  }}
                />
                <div
                  className={!mobile ? "flex-row" : "flex-column"}
                  style={{
                    alignItems: "flex-start",
                    margin: mobile ? "5px 0 0 0" : "0 0 0 0",
                  }}
                >
                  <div
                    className={!mobile ? "flex-row" : "flex-row"}
                    style={{
                      margin: !mobile ? "-9.375% 0 0 -41%" : "0 0 0 0",
                      color: "#ff2600",
                    }}
                  >
                    <div
                      className="flex-column"
                      style={{
                        alignItems: "flex-end",
                        lineHeight: "20px",
                        marginTop: "-5px",
                      }}
                    >
                      <div>
                        <span>{"Migrated"}</span>
                      </div>
                      <div>
                        <span>{"Resolver"}</span>
                      </div>
                      <div>
                        <span>{"Owner"}</span>
                      </div>
                      <div>
                        <span>{"Manager"}</span>
                      </div>
                      <div>
                        <span>{"Wrapped"}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "5px",
                        lineHeight: "23.5px",
                      }}
                    >
                      {/* Migated Flag */}
                      <div
                        className="flex-column"
                        style={{
                          alignItems: "flex-start",
                          margin:
                            meta.resolver === ccip2Contract
                              ? canUse
                                ? "1px 0 0 0"
                                : "1px 0 0 0"
                              : "2px 0 -4px 0",
                        }}
                      >
                        <button
                          className="button-tiny"
                          style={{
                            marginBottom: "-2px",
                          }}
                          data-tooltip={
                            meta.resolver === ccip2Contract
                              ? canUse
                                ? `Resolver is migrated`
                                : `Using NameSys with IPFS. Please use pro client`
                              : `Resolver is not migrated`
                          }
                        >
                          <div
                            className="material-icons-round smoller"
                            style={{
                              color:
                                meta.resolver === ccip2Contract
                                  ? canUse
                                    ? "lime"
                                    : "orange"
                                  : "orange",
                              fontSize: "22px",
                            }}
                          >
                            {meta.resolver === ccip2Contract ? "done" : "close"}
                          </div>
                        </button>
                      </div>
                      {/* Resolver Bar*/}
                      <div
                        style={{
                          margin: meta.wrapped
                            ? "-3px 0 2px 0"
                            : "-3px 0 3px 0",
                        }}
                      >
                        <span
                          className="mono"
                          id="metaResolver"
                          onClick={() =>
                            C.copyToClipboard(
                              meta.resolver,
                              "none",
                              "metaResolver"
                            )
                          }
                        >
                          {mobile
                            ? C.truncateHexString(meta.resolver)
                            : meta.resolver}
                        </span>
                        <button
                          className="button-empty"
                          style={{
                            margin: `-6px 0 -5px 7px`,
                          }}
                          data-tooltip={
                            C.ensContracts.includes(resolver)
                              ? "Using ENS Official Resolver"
                              : resolver === ccip2Contract
                              ? !canUse
                                ? "Using NameSys Resolver with IPFS"
                                : "Using NameSys Resolver"
                              : "Using Custom Resolver"
                          }
                        >
                          <img
                            alt="logo-2"
                            src={
                              C.ensContracts.includes(resolver)
                                ? "ens.png"
                                : resolver === ccip2Contract
                                ? !canUse
                                  ? "shadow.png"
                                  : "logo.png"
                                : ""
                            }
                            width={
                              C.ensContracts.includes(resolver)
                                ? "15.5px"
                                : resolver === ccip2Contract
                                ? !canUse
                                  ? "15px"
                                  : "17px"
                                : "17px"
                            }
                            style={{
                              margin: C.ensContracts.includes(resolver)
                                ? `0 0 -2px 0`
                                : resolver === ccip2Contract
                                ? !canUse
                                  ? `0 0 0 0`
                                  : `0 0 -2px 0`
                                : `0 0 -2px 0`,
                            }}
                          />
                        </button>
                      </div>
                      {/* Owner Bar*/}
                      <div
                        style={{
                          margin: meta.wrapped
                            ? "-14px 0 6px 0"
                            : "-15px 0 4px 0",
                        }}
                      >
                        <span
                          className="mono"
                          id="metaOwner"
                          onClick={() =>
                            C.copyToClipboard(meta.owner, "none", "metaOwner")
                          }
                          color=""
                        >
                          {mobile
                            ? C.truncateHexString(meta.owner)
                            : meta.owner}
                        </span>
                        {(meta.wrapped && (
                          <button
                            className="button-empty"
                            data-tooltip="This Name is Wrapped"
                          >
                            <img
                              alt="logo-3"
                              src="ens-red.png"
                              width={"15.5px"}
                              style={{ margin: `0 0 -2px 7px` }}
                            />
                          </button>
                        )) || (
                          <button
                            className="button-empty"
                            data-tooltip="This Address Can Edit Records"
                            style={{ margin: `0 0 0 5px` }}
                          >
                            <img
                              alt="logo-3"
                              src="logo.png"
                              width={"17px"}
                              style={{ margin: `0 0 -2px 1px` }}
                            />
                          </button>
                        )}
                      </div>
                      {/* Manager Bar*/}
                      <div
                        style={{
                          margin: meta.wrapped
                            ? "-23px 0 -6px 0"
                            : "-13px 0 -2px 0",
                        }}
                      >
                        <span
                          className="mono"
                          id="metaManager"
                          onClick={() =>
                            C.copyToClipboard(
                              meta.manager,
                              "none",
                              "metaManager"
                            )
                          }
                        >
                          {mobile
                            ? C.truncateHexString(meta.manager)
                            : meta.manager}
                        </span>
                        {meta.wrapped && (
                          <button
                            className="button-empty"
                            data-tooltip="This Address Can Edit Records"
                          >
                            <img
                              alt="logo-3"
                              src="logo.png"
                              width={"17px"}
                              style={{ margin: `0 0 -2px 7px` }}
                            />
                          </button>
                        )}
                      </div>
                      {/* Wrapped Bar*/}
                      <div
                        style={{
                          margin: meta.wrapped
                            ? "0px 0 -1px 0"
                            : "2px 0 -1px 0",
                        }}
                      >
                        <span
                          className="material-icons"
                          style={{
                            color: "white",
                            fontSize: "21px",
                          }}
                        >
                          {meta.wrapped ? "done" : "close"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={!mobile ? "flex-column-sans-align" : "flex-column"}
              >
                <h2
                  style={{
                    color: "#ff2600",
                    fontFamily: "SF Mono",
                    fontSize: "36px",
                    paddingLeft: "20px",
                  }}
                >
                  <img
                    alt="ens"
                    src="ens.png"
                    width={"30px"}
                    style={{ margin: "0 15px -3px 0" }}
                  />
                  {ENS ? ENS.slice(0, -4) : ""}
                  <span
                    style={{
                      opacity: "0.50",
                      fontSize: "26px",
                      color: "white",
                    }}
                  >
                    {".eth"}
                  </span>
                </h2>
                {/* MIGRATE */}
                <div
                  className="flex-column"
                  style={{
                    margin: !mobile ? "-10% 0 0 90.75%" : "0 0 0 90.75%",
                  }}
                >
                  <button
                    className="button-tiny"
                    data-tooltip={
                      meta.resolver === ccip2Contract
                        ? !canUse
                          ? `Please use pro client`
                          : `Resolver is migrated`
                        : `Resolver is not migrated`
                    }
                    style={{
                      marginLeft: !mobile ? "0" : "-90%",
                    }}
                  >
                    <div
                      className="material-icons-round smoller"
                      style={{
                        color:
                          meta.resolver === ccip2Contract && canUse
                            ? "lightgreen"
                            : "orange",
                        fontSize: "22px",
                        margin: "0",
                      }}
                      hidden={mobile}
                    >
                      {"info_outline"}
                    </div>
                  </button>
                  <button
                    className={
                      !justMigrated &&
                      resolver !== ccip2Contract &&
                      !unauthorised()
                        ? "button blink"
                        : "button"
                    }
                    style={{
                      width: "50px",
                      margin: !mobile ? "-7% 0 0 52%" : "-3% 0 0 0",
                    }}
                    onClick={() => migrate()}
                    data-tooltip="Migrate Resolver"
                    disabled={
                      !_Wallet_ ||
                      (!meta.wrapped && _Wallet_ !== meta.owner) ||
                      (meta.wrapped && _Wallet_ !== meta.manager) ||
                      meta.resolver === ccip2Contract
                    }
                  >
                    <span className="material-icons-round micon bright">
                      shopping_cart
                    </span>
                  </button>
                </div>
                {/* IMPORT */}
                <div
                  className={!mobile ? "flex-column" : "flex-row"}
                  style={{
                    margin: !mobile ? "0 0 0 90.75%" : "-9.5% 0 0 60.75%",
                  }}
                >
                  <button
                    className="button-tiny"
                    data-tooltip={
                      meta.resolver === ccip2Contract
                        ? canUse && !canEdit()
                          ? `Import ENS records`
                          : canEdit()
                          ? `Not Authorised`
                          : `Please use pro client`
                        : `Resolver is not migrated`
                    }
                    style={{
                      margin: !mobile ? "0" : "-90% 0 0 -90%",
                    }}
                    hidden={mobile}
                  >
                    <div
                      className="material-icons-round smoller"
                      style={{
                        color:
                          meta.resolver === ccip2Contract
                            ? !canUse || canEdit()
                              ? "orange"
                              : "lightgreen"
                            : "orange",
                        fontSize: "22px",
                        margin: "1px 0 0 0",
                      }}
                    >
                      {"info_outline"}
                    </div>
                  </button>
                  <button
                    className={justMigrated ? "button blink" : "button"}
                    style={{
                      width: "50px",
                      margin: !mobile ? "-5% 0 0 50%" : "-3% 0 0 0",
                    }}
                    onClick={() =>
                      justMigrated
                        ? setResolverModalState((prevState) => ({
                            ...prevState,
                            modalData: meta.oldResolver,
                            trigger: true,
                          }))
                        : setResolverModal(true)
                    }
                    data-tooltip={"Import ENS Records"}
                    disabled={!canUse || canEdit()}
                  >
                    <span className="material-icons-round micon bright">
                      download
                    </span>
                  </button>
                </div>
                <div>
                  <Records
                    meta={meta}
                    handleModalData={handleRecordsData}
                    handleTrigger={handleRecordsTrigger}
                    records={Object.values(records)}
                    canUse={canUse}
                    hue={
                      !_Wallet_ ||
                      (!meta.wrapped &&
                        _Wallet_ !== meta.owner &&
                        meta.wrapped &&
                        _Wallet_ !== meta.manager)
                        ? "white"
                        : "orange"
                    }
                  />
                  <Salt
                    handleTrigger={handleSaltTrigger}
                    handleModalData={handleSaltModalData}
                    onClose={() => {
                      setSaltModal(false);
                    }}
                    show={saltModal}
                  >
                    {[ENS, "gateway"]}
                  </Salt>
                  <GasSavings
                    color={"lime"}
                    icon={"free_breakfast"}
                    onClose={() => {
                      setGasModal(false);
                      setLoading(true);
                      setMessage("Refreshing");
                      setWrite(false);
                      setTriggerRefresh(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 2000);
                    }}
                    show={gasModal}
                  >
                    {gas}
                  </GasSavings>
                  <Success
                    color={color}
                    icon={"check_circle_outline"}
                    onClose={() => setSuccessModal(false)}
                    show={successModal}
                    handleTrigger={handleSuccessTrigger}
                    handleModalData={handleSuccessModalData}
                  >
                    {success}
                  </Success>
                  <Error
                    onClose={() => {
                      setCrash(false);
                      setLoading(true);
                      setMessage("Refreshing");
                      setWrite(false);
                      setTriggerRefresh(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 2000);
                    }}
                    color={color}
                    show={crash && !loading}
                    title={"cancel"}
                  >
                    {message}
                  </Error>
                </div>
              </div>
            </div>
            <div id="modal">
              <ResolverModal
                onClose={() => setResolverModal(false)}
                show={resolverModal}
                handleTrigger={handleResolverTrigger}
                handleModalData={handleResolverModalData}
              >
                {resolver === ccip2Contract ? "" : resolver}
              </ResolverModal>
            </div>
            <div className={styles.grid} style={{ margin: "120px 0 0 0" }}>
              <a
                href="https://app.namesys.xyz"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ff2600" }}
              >
                <h1 style={{ fontSize: "20px" }}>
                  NAMESYS APP{" "}
                  <span className="material-icons micon">settings</span>
                </h1>
                <p>NameSys Advanced Client</p>
              </a>

              <a
                href="https://namesys.xyz/readme/readme.htm?src=https://namesys-eth.github.io/ccip2-eth-resources/GUIDE.md"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 style={{ fontSize: "20px" }}>
                  DOCS{" "}
                  <span className="material-icons micon">library_books</span>
                </h1>
                <p>Learn More</p>
              </a>

              <a
                href="https://github.com/namesys-eth"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 style={{ fontSize: "20px" }}>
                  CODE{" "}
                  <span className="material-icons micon">developer_mode</span>
                </h1>
                <p>Source Codes</p>
              </a>
            </div>
            <div
              className="flex-column"
              style={{
                paddingTop: "30px",
              }}
            >
              <span
                style={{
                  color: "grey",
                  fontWeight: "700",
                  fontSize: mobile ? "10px" : "14px",
                  paddingBottom: "5px",
                }}
              >
                {"Funded By"}
              </span>
              <span
                style={{
                  color: "skyblue",
                  fontWeight: "700",
                  fontSize: mobile ? "12px" : "16px",
                }}
              >
                {"ENS DAO"}
              </span>
            </div>
            <div id="none" style={{ marginTop: "2.5%" }}></div>
          </>
        )}
      </main>
    </>
  );
}
