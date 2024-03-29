import React from "react";
import styles from "../pages/page.module.css";
import { isMobile } from "react-device-detect";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import * as C from "../utils/constants";
import Help from "../components/Help";
import DynamicAvatar from "./Dynamic";
import { useAccount } from "wagmi";

export interface Record extends C.recordType {}

interface RecordsContainerProps {
  meta: any;
  records: Record[];
  hue: string;
  canUse: boolean;
  handleModalData: (data: string) => void;
  handleTrigger: (data: boolean) => void;
}

const Records: React.FC<RecordsContainerProps> = ({
  meta,
  records,
  hue,
  canUse,
  handleModalData,
  handleTrigger,
}) => {
  const { address: _Wallet_ } = useAccount();
  const [helpModal, setHelpModal] = React.useState(false);
  const [help, setHelp] = React.useState("");
  const [inputValue, setInputValue] = React.useState(records);
  const [roster, setRoster] = React.useState(
    C.dynamicRoster.map((item) => ({ ...item }))
  );
  const [mobile, setMobile] = React.useState(false); // Set mobile or dekstop environment
  const { width, height } = useWindowDimensions(); // Get window dimensions
  const [avatarModalState, setAvatarModalState] =
    React.useState<C.MainBodyState>(C.modalTemplate); // Avatar modal state
  const [avatarModal, setAvatarModal] = React.useState(false); // Avatar modal

  // Handle Avatar modal data return
  const handleAvatarModalData = (data: string) => {
    setAvatarModalState((prevState) => ({ ...prevState, modalData: data }));
  };
  // Handle Avatar modal trigger
  const handleAvatarTrigger = (trigger: boolean) => {
    setAvatarModalState((prevState) => ({ ...prevState, trigger: trigger }));
  };

  // Whether connector is authorised to write
  function unauthorised() {
    return (
      !_Wallet_ ||
      (!meta.wrapped && _Wallet_ !== meta.owner) ||
      (meta.wrapped && _Wallet_ !== meta.manager) ||
      meta.resolver !== C.ccip2[meta.chainId === 5 ? 0 : 1]
    );
  }

  // Gets live value of update
  function getVal(id: string) {
    return inputValue[inputValue.findIndex((_record) => _record.id === id)].new;
  }

  // Counts live values of update
  function countVal() {
    return inputValue.filter((_record) =>
      C.isGoodValue(_record.id, _record.new)
    ).length;
  }

  // Whether connector can manage
  function canManage() {
    return (
      !_Wallet_ ||
      (!meta.wrapped && _Wallet_ !== meta.owner) ||
      (meta.wrapped && _Wallet_ !== meta.manager)
    );
  }

  // INIT
  React.useEffect(() => {
    if (isMobile || (width && width < 1300)) {
      setMobile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  React.useEffect(() => {
    if (avatarModalState.trigger) {
      setRoster(JSON.parse(avatarModalState.modalData));
    } else {
      setRoster(C.dynamicRoster.map((item) => ({ ...item })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarModalState]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    handleModalData(JSON.stringify(inputValue));
    handleTrigger(true);
    e.preventDefault();
  };

  // Update values
  async function update(type: string, value: string) {
    setInputValue((prevInputValue) => {
      const index = prevInputValue.findIndex((record) => record.id === type);
      if (index !== -1) {
        const updatedRecords = [...prevInputValue];
        updatedRecords[index] = { ...updatedRecords[index], new: value };
        return updatedRecords;
      }
      return prevInputValue;
    });
  }

  return (
    <div className="flex-column">
      <div>
        <button
          className="button flex-row emphasis"
          style={{
            alignSelf: "flex-end",
            height: "25px",
            width: "auto",
            marginBottom: "6px",
            marginTop: "-31px",
          }}
          disabled={countVal() < 2}
          hidden={countVal() < 2}
          onClick={handleSubmit}
          data-tooltip={"Write Record"}
        >
          <div>{"Edit All"}</div>
          <div
            className="material-icons-round smol"
            style={{
              color: "white",
            }}
          >
            edit
          </div>
        </button>
      </div>
      <div className={!mobile ? styles.grid : "flex-column"}>
        {records.map((record) => (
          <div
            key={record.path}
            className={!mobile ? styles.arrange : "flex-column"}
            style={{
              marginTop: !mobile ? "10px" : "10px",
            }}
          >
            <div className="flex-sans-align">
              <div
                className="flex-row-sans-justify"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div className="flex-row-sans-justify">
                  <span
                    className="material-icons-round smol"
                    style={{
                      fontSize: "20px",
                      display: "inline-block",
                      color: "cyan",
                      marginRight: "5px",
                      marginLeft: "-2px",
                    }}
                  >
                    {record.id === "storage"
                      ? "cloud_circle"
                      : record.id === "resolver"
                      ? "gavel"
                      : record.id === "avatar"
                      ? "portrait"
                      : record.id === "addr"
                      ? "account_balance_wallet"
                      : record.id === "contenthash"
                      ? "public"
                      : record.id === "com.github"
                      ? "code"
                      : record.id === "url"
                      ? "share"
                      : record.id === "email"
                      ? "email"
                      : record.id === "pubkey"
                      ? "key"
                      : record.id === "com.twitter"
                      ? "groups"
                      : record.id === "com.discord"
                      ? "group_add"
                      : record.id === "xyz.farcaster"
                      ? "people_alt"
                      : record.id === "nostr"
                      ? "groups"
                      : record.id === "btc"
                      ? "currency_bitcoin"
                      : record.id === "ltc"
                      ? "currency_lira"
                      : record.id === "doge"
                      ? "pets"
                      : record.id === "sol"
                      ? "flash_on"
                      : record.id === "atom"
                      ? "font_download"
                      : record.id === "zonehash"
                      ? "tag"
                      : "circle_notifications"}
                  </span>
                  <h1
                    style={{
                      fontFamily: "Spotnik",
                      fontSize: "17px",
                      color: "cyan",
                      marginBottom: "5px",
                    }}
                  >
                    {record.header}
                  </h1>
                  <button
                    className="button-tiny"
                    onClick={() => {
                      setHelpModal(true);
                      setHelp(`<span>${record.help}</span>`);
                    }}
                    data-tooltip={"Enlighten Me"}
                  >
                    <div
                      className="material-icons-round smol"
                      style={{
                        color: "cyan",
                        marginLeft: "5px",
                      }}
                    >
                      info_outline
                    </div>
                  </button>
                  <button
                    className="button-tiny"
                    onClick={() => {}}
                    data-tooltip={
                      getVal(record.id) &&
                      C.isGoodValue(record.id, getVal(record.id))
                        ? "Legit Value"
                        : !getVal(record.id)
                        ? ""
                        : "Bad Value"
                    }
                  >
                    <div
                      className="material-icons-round smol"
                      style={{
                        color:
                          getVal(record.id) &&
                          C.isGoodValue(record.id, getVal(record.id))
                            ? "lime"
                            : !getVal(record.id)
                            ? "transparent"
                            : "orangered",
                        marginLeft: record.id === "avatar" ? "25px" : "5px",
                      }}
                    >
                      {getVal(record.id) &&
                      C.isGoodValue(record.id, getVal(record.id))
                        ? "check_circle_outline"
                        : "info_outline"}
                    </div>
                  </button>
                  {record.id === "avatar" &&
                    !unauthorised() &&
                    process.env.NODE_ENV === "development" && (
                      <button
                        className="button-dynamic emphasis-smol"
                        onClick={() => {
                          setAvatarModal(true);
                        }}
                        data-tooltip={"Dynamic Avatar"}
                      >
                        <div
                          className="material-icons-round smol"
                          style={{
                            color: "green",
                            marginLeft: "-63px",
                          }}
                        >
                          {"offline_bolt"}
                        </div>
                      </button>
                    )}
                </div>
                <div>
                  <button
                    className="button flex-row"
                    style={{
                      alignSelf: "flex-end",
                      height: "25px",
                      width: "auto",
                      marginBottom: "6px",
                    }}
                    disabled={!C.isGoodValue(record.id, getVal(record.id))}
                    hidden={
                      !C.isGoodValue(record.id, getVal(record.id)) ||
                      countVal() > 1
                    }
                    onClick={handleSubmit}
                    data-tooltip={"Write Record"}
                  >
                    <div>{"Edit"}</div>
                    <div
                      className="material-icons-round smol"
                      style={{
                        color: "white",
                      }}
                    >
                      edit
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex-row">
                <input
                  id={`${record.id}`}
                  key="0"
                  placeholder={record.value}
                  type="text"
                  value={
                    canManage() ||
                    meta.resolver === C.ccip2[meta.chainId === 5 ? 0 : 1]
                      ? getVal(record.id)
                      : record.value
                  }
                  onChange={(e) => {
                    update(record.id, e.target.value);
                  }}
                  disabled={unauthorised() || !canUse}
                  style={{
                    background:
                      meta.resolver === C.ccip2[meta.chainId === 5 ? 0 : 1]
                        ? "#082400"
                        : "#361a17",
                    outline: "none",
                    border: "none",
                    padding: "5px 30px 5px 5px",
                    borderRadius: "3px",
                    fontFamily: "SF Mono",
                    letterSpacing: "-0.5px",
                    fontWeight: "400",
                    fontSize: "14px",
                    width: "400px",
                    wordWrap: "break-word",
                    textAlign: "left",
                    color:
                      record.value !== "..." &&
                      C.isGoodValue(record.id, getVal(record.id))
                        ? "lime"
                        : hue,
                    cursor: "copy",
                  }}
                />
                <div
                  id={`${record.id}-${record.type}`}
                  className="material-icons-round"
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    margin: "0 0 0 -25px",
                    color:
                      !record.loading && record.value ? "lightgreen" : "white",
                    cursor: "copy",
                    opacity:
                      getVal(record.id) !== "" || !record.value ? "0" : "1",
                  }}
                  onClick={() =>
                    C.copyToClipboard(
                      `${record.value}`,
                      `${record.id}`,
                      `${record.id}-${record.type}`
                    )
                  }
                >
                  {!record.loading ? "content_copy" : "hourglass_top"}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div id="modal">
          <Help
            color={"cyan"}
            icon={"info"}
            onClose={() => setHelpModal(false)}
            show={helpModal}
            position={""}
            handleModalData={function (data: string | undefined): void {
              throw new Error();
            }}
            handleTrigger={function (data: boolean): void {
              throw new Error();
            }}
          >
            {help}
          </Help>
          <DynamicAvatar
            mobile={mobile}
            onClose={() => setAvatarModal(false)}
            show={avatarModal}
            dynamic={roster}
            handleTrigger={handleAvatarTrigger}
            handleModalData={handleAvatarModalData}
          />
        </div>
      </div>
    </div>
  );
};

export default Records;
