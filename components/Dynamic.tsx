import React from "react";
import { isMobile } from "react-device-detect";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Help from "./Help";
import * as C from "../utils/constants";

interface ModalProps {
  mobile: boolean;
  show: boolean;
  onClose: any;
  dynamic: typeof C.dynamicRoster;
  handleModalData: (data: string) => void;
  handleTrigger: (data: boolean) => void;
}

const DynamicAvatar: React.FC<ModalProps> = ({
  mobile,
  show,
  onClose,
  dynamic,
  handleModalData,
  handleTrigger,
}) => {
  const [roster, setRoster] = React.useState(dynamic);
  const [browser, setBrowser] = React.useState(false);
  const [helpModal, setHelpModal] = React.useState(false);
  const [help, setHelp] = React.useState("");
  const currentTime = Math.floor(Date.now() / 1000);

  React.useLayoutEffect(() => {
    setBrowser(true);
  }, []);

  // Get the latest time in roster
  const maxTick = roster.reduce((max, item) => {
    return item.tick > max ? item.tick : max;
  }, roster[0].tick);

  // isValids if roster is full
  const isValidValuesAndTicks = (): boolean => {
    return roster.every(
      (item) => C.isUrl(item.newVal) && item.tick > maxTick + C.coolingPeriod
    );
  };

  // Add new item to roster
  const addNewItemToRoster = (
    index: number,
    tick: number,
    time: string,
    value: string,
    newVal: string,
    signature: string
  ): void => {
    setRoster((prevRoster) => {
      const newItem: C.DynamicRosterItem = {
        index,
        tick,
        time,
        value,
        newVal,
        signature,
      };
      let newRoster = [...prevRoster];
      newRoster.push(newItem);
      return newRoster;
    });
  };

  // Add new item to roster
  const deleteItemFromRoster = (indexToDelete: number): void => {
    setRoster((prevRoster) => {
      let newRoster = [...prevRoster];
      const indexToRemove = newRoster.findIndex(
        (item) => item.index === indexToDelete
      );
      if (indexToRemove !== -1) {
        newRoster.splice(indexToRemove, 1);
        // Reset indices of remaining items
        newRoster.forEach((item, idx) => {
          item.index = idx;
        });
      }
      return newRoster;
    });
  };

  // Resets the entire roster
  function resetRoster() {
    let _reset = C.dynamicRoster.map((item) => ({ ...item }));
    setRoster(_reset);
  }

  // Resets a row of roster
  function resetRow(index: number) {
    setRoster((prevRoster) => {
      let newRoster = [...prevRoster];
      newRoster[index].tick = index;
      newRoster[index].newVal = "";
      newRoster[index].time = "";
      return newRoster;
    });
  }

  // Updates timestamp for a roster item
  function updateRosterTick(index: number, value: string) {
    setRoster((prevRoster) => {
      const newRoster = [...prevRoster];
      const _unix = new Date(value);
      if (_unix) {
        let _unixTime = Math.floor(_unix.getTime() / 1000);
        if (_unixTime > currentTime && _unixTime > maxTick + C.coolingPeriod) {
          newRoster[index].tick = _unixTime;
        } else {
          newRoster[index].tick = 0;
        }
      }
      newRoster[index].time = value;
      return newRoster;
    });
  }

  // Updates value of a roster item
  function updateRosterValue(index: number, value: string) {
    setRoster((prevRoster) => {
      const newRoster = [...prevRoster];
      newRoster[index].newVal = value;
      return newRoster;
    });
  }

  const handleCloseClick = (e: { preventDefault: () => void }) => {
    resetRoster();
    handleModalData("");
    handleTrigger(false);
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    handleModalData(JSON.stringify(roster));
    handleTrigger(true);
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            <span className="material-icons">close</span>
          </a>
        </StyledModalHeader>
        {show && (
          <StyledModalTitle>
            <div
              className="material-icons-round"
              style={{
                marginTop: "4px",
                fontSize: "80px",
              }}
            >
              dynamic_feed
            </div>
            <div
              style={{
                marginTop: "25px",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                Dynamic Avatar
              </span>
              <button
                className="button-tiny"
                style={{
                  marginBottom: "-7.5px",
                }}
                onClick={() => {
                  setHelpModal(true),
                    setHelp(
                      '<span><span style="color: cyan">Dynamic</span> avatars are capable of auto-updating according to a preset schedule</span>'
                    );
                }}
                data-tooltip={"Enlighten Me"}
              >
                <div
                  className="material-icons smol"
                  style={{
                    color: "cyan",
                    marginLeft: "5px",
                  }}
                >
                  info_outline
                </div>
              </button>
            </div>
          </StyledModalTitle>
        )}
        <StyledModalBody>
          <div className={!mobile ? "grid" : "grid"}>
            <div
              className="flex-row"
              style={{
                justifyContent: "space-evenly",
                color: "cyan",
              }}
            >
              <div
                className="flex-row"
                style={{ margin: mobile ? "0" : "0 50px 0 -10px" }}
              >
                <span style={{ fontSize: "16px" }}>Time</span>
                <button
                  className="button-tiny"
                  onClick={() => {
                    setHelpModal(true),
                      setHelp(
                        '<span>Please enter <span style="color: cyan">times</span> when avatars should be updated. Please separate ticks by <span style="color: orangered">at least one hour</span>.</span>'
                      );
                  }}
                  data-tooltip={"Enlighten Me"}
                >
                  <div
                    className="material-icons smol"
                    style={{
                      color: "cyan",
                      marginLeft: "5px",
                    }}
                  >
                    info_outline
                  </div>
                </button>
              </div>

              <div className="flex-row">
                <span style={{ fontSize: "16px" }}>Image</span>
                <button
                  className="button-tiny"
                  onClick={() => {
                    setHelpModal(true),
                      setHelp(
                        '<span>Please enter corresponding <span style="color: cyan">URLs</span> for new avatars</span>'
                      );
                  }}
                  data-tooltip={"Enlighten Me"}
                >
                  <div
                    className="material-icons smol"
                    style={{
                      color: "cyan",
                      marginLeft: "5px",
                    }}
                  >
                    info_outline
                  </div>
                </button>
              </div>
            </div>
            <div
              className="scrollable-div"
              style={{
                maxHeight: "300px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {Object.values(roster).map((instance) => (
                <div
                  key={instance.index}
                  className={!mobile ? "flex-column" : "flex-column"}
                  style={{
                    margin: !mobile ? "10px" : "10px",
                  }}
                >
                  <div className="flex-sans-align">
                    <div
                      className="flex-row-sans-justify"
                      style={{
                        justifyContent: "space-between",
                        marginBottom: "-10px",
                      }}
                    >
                      <button
                        className="button-tiny shift-right"
                        data-tooltip={"delete"}
                        onClick={() => deleteItemFromRoster(instance.index)}
                        disabled={Object.values(roster).length < 2}
                        hidden={Object.values(roster).length < 2}
                        style={{
                          marginTop: mobile ? "-45px" : "0",
                        }}
                      >
                        <div
                          className="material-icons-round"
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "orangered",
                          }}
                        >
                          {"delete_outline"}
                        </div>
                      </button>
                      <div className={mobile ? "flex-column" : "flex-row"}>
                        <div className="flex-row">
                          <input
                            className="inputgeneric"
                            id={`left-${instance.index}`}
                            key={`left-${instance.index}`}
                            name={`left-${instance.index}`}
                            placeholder={instance.time}
                            type="datetime-local"
                            value={instance.time}
                            onChange={(e) => {
                              updateRosterTick(instance.index, e.target.value);
                            }}
                            style={{
                              background: "black",
                              outline: "none",
                              height: "2.3rem",
                              border: "none",
                              padding: "5px",
                              borderRadius: "3px",
                              fontFamily: "SF Mono",
                              letterSpacing: "-0.5px",
                              fontWeight: "400",
                              fontSize: "14px",
                              width: "100%",
                              wordWrap: "break-word",
                              textAlign: "left",
                              color:
                                instance.tick > 0
                                  ? "lime"
                                  : "rgb(255, 255, 255, 1)",
                              cursor: "copy",
                              margin: mobile
                                ? instance.time
                                  ? "0 0 -7.5px 0"
                                  : "0 0 -7.5px 16.5px"
                                : "10px",
                            }}
                          />
                          <span
                            className="material-icons-round"
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              color: "#ffffff88",
                              margin: mobile
                                ? "0 33px -10px -33px"
                                : "0 33px 0 -33px",
                              pointerEvents: "none",
                            }}
                            hidden={mobile && instance.time !== ""}
                          >
                            {"calendar_month"}
                          </span>
                        </div>
                        <input
                          className="inputgeneric"
                          id={`right-${instance.index}`}
                          key={`right-${instance.index}`}
                          placeholder={"image URL"}
                          type="text"
                          value={instance.newVal || instance.value}
                          onChange={(e) => {
                            updateRosterValue(instance.index, e.target.value);
                          }}
                          style={{
                            background: "black",
                            outline: "none",
                            border: "none",
                            padding: "5px",
                            borderRadius: "3px",
                            fontFamily: "SF Mono",
                            letterSpacing: "-0.5px",
                            fontWeight: "400",
                            fontSize: "14px",
                            width: "100%",
                            wordWrap: "break-word",
                            textAlign: "left",
                            color: C.isUrl(instance.newVal)
                              ? "lime"
                              : "rgb(255, 255, 255, 1)",
                            cursor: "copy",
                            margin: "10px",
                          }}
                        />
                      </div>
                      <button
                        className="button-tiny shift-left"
                        data-tooltip={"reset"}
                        onClick={() => resetRow(instance.index)}
                        style={{
                          marginTop: mobile ? "-45px" : "0",
                        }}
                      >
                        <div
                          className="material-icons-round"
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "lightgreen",
                          }}
                        >
                          {"refresh"}
                        </div>
                      </button>
                    </div>
                  </div>
                  {mobile && <hr style={{ borderColor: "white" }} />}
                </div>
              ))}
            </div>
            <button
              className="extra-button"
              style={{
                margin: mobile ? "30px 0 0 40%" : "30px 0 0 32%",
                width: mobile ? "20%" : "36%",
              }}
              data-tooltip={"add more"}
              onClick={() =>
                addNewItemToRoster(
                  Object.values(roster).length,
                  0,
                  "",
                  "",
                  "",
                  ""
                )
              }
              hidden={Object.values(roster).length > 100}
              disabled={Object.values(roster).length > 100}
            >
              <div className="flex-row">
                <span
                  style={{
                    fontSize: "16px",
                    paddingRight: mobile ? "0" : "5px",
                  }}
                >
                  {mobile ? "" : "Add More"}
                </span>
                <span className="material-icons-round">{"add"}</span>
              </div>
            </button>
            <button
              className="button"
              style={{
                margin: mobile ? "30px 0 0 25%" : "30px 0 0 35%",
                width: mobile ? "50%" : "30%",
              }}
              data-tooltip={"Update Dynamic Avatar Record"}
              onClick={handleSubmit}
              disabled={!isValidValuesAndTicks()}
            >
              <div className="flex-row">
                <span style={{ fontSize: "16px" }}>Update</span>&nbsp;
                <span className="material-icons-round">{"update"}</span>
              </div>
            </button>
          </div>
        </StyledModalBody>
      </StyledModal>
      <div id="modal-inner">
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
      </div>
    </StyledModalOverlay>
  ) : null;

  if (browser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal")!
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  overflow-y: auto;
  color: white;
  font-size: 14px;
  font-weight: 700;
`;

const StyledModalTitle = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 700;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  color: cyan;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledModal = styled.div`
  background: rgba(66,46,40,1);
  background-size: 400% 400%;
  width: 600px;
  max-width: ${isMobile ? "90%" : "60%"};
  height: auto;
  border-radius: 6px;
  overflow-y: initial !important
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 3px;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  top: ${isMobile ? "0" : "-60px"};
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
`;

export default DynamicAvatar;
