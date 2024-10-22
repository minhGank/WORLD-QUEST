import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Rate } from "antd";
import { DatePicker } from "antd";
import { useState } from "react";
import { toastFunction } from "../../../utils/helperFunction";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const ReviewPopup = ({ setWritingReviewPopup }) => {
  const [textReview, setTextReview] = useState("");
  const [titleReview, setTitleReview] = useState("");
  const [starRating, setStarRating] = useState(0);
  // const [whenDidYouGo, setWhenDidYouGo] = useState();

  const submitReviewFunction = async () => {
    try {
      if (!textReview || !titleReview || starRating) {
        return toastFunction("error", "Please fill in all the information.");
      }
      const res = await axios.post(
        `http://localhost:8000/challenge/findChallenge/${challengeId}`
      );
    } catch (error) {
      toastFunction("error", error.message);
      throw new Error(error);
    }
  };

  return (
    <Container>
      <div className="popup_div">
        <div className="exit_button">
          <IoIosCloseCircleOutline
            className="exit_button_official"
            onClick={() => setWritingReviewPopup(false)}
          />
        </div>
        <div className="header_popup_div">
          <h3>Tell us, how was your visit?</h3>
          <p>Your review will be public to anyone in the platform.</p>
        </div>
        <div className="rating_of_review_div">
          <h4>How would you rate your experience?</h4>
          <Rate autoFocus={true} value={starRating} onChange={setStarRating} />
        </div>
        {/* <div className="when_did_you_go_div">
          <h4>When did you go?</h4>
          <DatePicker />
        </div> */}
        <div className="popup_div_review_details">
          <h4>Write your review</h4>
          <textarea
            onChange={(e) => {
              setTextReview(e.target.value);
            }}
            placeholder="Everything was fanstastic, one of the best spot in the city..."
            value={textReview}
          />
        </div>
        <div className="popup_div_review_title">
          <h4>Title your review</h4>
          <textarea
            onChange={(e) => {
              setTitleReview(e.target.value);
            }}
            value={titleReview}
            placeholder="Give us the gist of your experience."
          />
        </div>
        <div className="popup_div_upload_pic_button">
          <div className="upload_pic_button">Upload images/videos</div>
        </div>
        <div className="submit_review_button">Post Review</div>
      </div>
      <ToastContainer />
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
    width: 40%;
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
        margin-bottom: 10px;
        font-size: 12px;
      }
      h3 {
        margin: 0;
        font-size: 24px;
      }
    }
    .popup_div_review_details {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h4 {
        margin: 10px 0px;
      }
      textarea {
        resize: none;
        border-radius: 5px;
        width: 50%;
        height: 70px;
        padding: 5px;
      }
    }
    .popup_div_review_title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h4 {
        margin: 10px 0px;
      }
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
      flex-direction: column;
      margin-top: 20px;
      margin-bottom: 20px;
      p {
        margin: 10px 0 0 0;
        font-size: 11px;
        width: 30%;
      }
      .upload_pic_button {
        border: #3a7ff9 solid;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        color: #3a7ff9;
      }
    }
    .rating_of_review_div {
      h4 {
        margin: 10px 0px;
      }
    }
    .when_did_you_go_div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h4 {
        margin: 10px 0px;
      }
    }
    .submit_review_button {
      width: 100%;
      background-color: black;
      color: white;
      border-radius: 0 0px 10px 10px;
      padding: 8px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      &:hover {
        background-color: #333333;
      }
    }
  }
`;

export default ReviewPopup;
