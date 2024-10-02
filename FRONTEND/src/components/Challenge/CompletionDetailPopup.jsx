import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";

const CompletionDetailPopup = ({ setCompletionDetailPopup, challenge }) => {
  return (
    <Container>
      <div className="popup_div">
        <div className="exit_button">
          <IoIosCloseCircleOutline
            className="exit_button_official"
            onClick={() => setCompletionDetailPopup(false)}
          />
        </div>
        <div className="header_popup_div">
          <h3>Let's save your memory at {challenge.title} </h3>
          <p>
            This information will be private unless you want to share this
            memories to others.
          </p>
        </div>
        <div className="popup_div_details">
          <textarea placeholder="What impression did the place give you? (optional)" />
        </div>
        <div className="popup_div_upload_pic_button">
          <div className="upload_pic_button">Upload images/videos</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(255, 255, 255, 0.768);
  z-index: 99;

  .popup_div {
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 55%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    .exit_button {
      position: absolute;
      right: -9px;
      top: -9px;
      .exit_button_official {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .header_popup_div {
      margin-top: 20px;
      font-size: 22px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      p {
        margin-top: -1px;
        margin-bottom: 20px;
        font-size: 12px;
      }
      h3 {
        margin: 0;
        font-size: 24px;
      }
    }
    .popup_div_details {
      display: flex;
      align-items: center;
      justify-content: center;
      textarea {
        resize: none;
        border-radius: 5px;
        width: 50%;
        height: 50px;
        padding: 5px;
      }
    }
    .popup_div_upload_pic_button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 30px;
      .upload_pic_button {
        border: #3a7ff9 solid;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        color: #3a7ff9;
      }
    }
  }
`;
export default CompletionDetailPopup;
