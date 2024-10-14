import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { toastFunction } from "../../utils/helperFunction";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BarLoader from "react-spinners/BarLoader";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FiShare } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useState } from "react";
import CompletionDetailPopup from "../components/Challenge/CompletionDetailPopup";
import ReviewSection from "../components/Challenge/ReviewSection";

const ChallengePage = () => {
  const { currentUser } = useSelector((state) => (state = state.user));
  const { challengeId } = useParams();
  const [completionDetailPopup, setCompletionDetailPopup] = useState(false);
  const [writingReviewPopup, setWritingReviewPopup] = useState(false);
  //create fetch challenge function
  const fetchChallengeFunction = async (challengeId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/challenge/findChallenge/${challengeId}`
      );
      if (!res.data.success) {
        toastFunction("error", res.data.msg);
        throw new Error(res.data.msg);
      }
      return res.data.challenge;
    } catch (error) {
      toastFunction("error", error.message);
      throw new Error(error);
    }
  };
  //create react-query for fetching challenge data
  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchingChallenge", challengeId],
    queryFn: () => fetchChallengeFunction(challengeId),
    staleTime: 5000,
  });
  if (isLoading) {
    return (
      <Container>
        <BarLoader
          color="#3a7ff9"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Container>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <Container>
        <div className="div_for_showing_error">
          <h1>There's error, please come back later</h1>
        </div>
      </Container>
    );
  }
  console.log(
    "this is the console.log inside the challenge page to show the challenge data",
    challenge
  );

  let imagesForGalleryArray;
  if (challenge?.imgs && Array.isArray(challenge.imgs)) {
    imagesForGalleryArray = challenge.imgs.map((img) => ({
      original: img,
    }));
    // console.log(imagesForGalleryArray);
  }
  return (
    <Container>
      <div className="div_for_top_part_of_quest_page">
        <p className="p_for_location_of_quest">
          {challenge?.questId.country} {`>`} {challenge.questId?.province}{" "}
          {`> `}
          {challenge.questId?.city} {`> `} {challenge?.title}
        </p>
      </div>

      <div className="div_for_challenge_overview">
        <div className="challenge_title_and_share_save_button">
          <h1>{challenge?.title}</h1>
          <div className="challenge_share_save_div">
            <FiShare className="button_inside_challenge_share_save_div" />
            <FaRegHeart className="button_inside_challenge_share_save_div" />
          </div>
        </div>
        <div className="challenge_info_div">
          {challenge.reviewCount > 0 ? (
            <p className="p_inside_challenge_info_div">
              <FaStar />
              {challenge?.averageReviewStar} • {challenge.reviewCount} reviews
            </p>
          ) : (
            <p className="challenge_info_div">0 review •</p>
          )}
          <a href={challenge?.address} className="challenge_info_div">
            Address
          </a>
          <p className="challenge_info_div">
            • #1 adventure in {challenge?.questId.city}
          </p>
        </div>
      </div>

      <div className="div_for_imgsArray_of_challenge">
        <div className="div_for_challenge_info_next_to_imgs">
          <h2>Overview</h2>
          <h4>Point: {challenge.point}</h4>
          <p>{challenge.description}</p>
          <div className="div_for_details_info_inside_div_for_challenge_info_next_to_imgs">
            <p className="p_inside_div_for_details_info_inside_div_for_challenge_info_next_to_imgs">
              {challenge.openHour
                ? challenge.openHour
                : "Open hours: 8:00am - 19:00pm"}
            </p>
            <p className="p_inside_div_for_details_info_inside_div_for_challenge_info_next_to_imgs"></p>
          </div>
          <div className="button_inside_div_for_challenge_info_next_to_imgs">
            Save
          </div>
        </div>
        {challenge?.imgs && Array.isArray(challenge.imgs) ? (
          <ImageGallery items={imagesForGalleryArray} />
        ) : (
          ""
        )}
      </div>
      <div className="div_for_challenge_full_details">
        <h3>Adventure Details</h3>
        <div className="div_for_side_info_inside_div_for_challenge_full_details">
          <a href="">Website</a>
          <a href="">
            {challenge.address.actualAdress
              ? challenge.address.actualAdress
              : "Address"}
          </a>
          <a>Share</a>
        </div>
      </div>
      <div className="div_for_completion">
        <p>Have you completed this adventure?</p>
        <div className="buttons_for_choosing_completion">
          <div
            onClick={() => {
              setCompletionDetailPopup(true);
            }}
            className="button_inside_div_buttons_for_choosing_completion yes_button"
          >
            Yes
          </div>
          <div className="button_inside_div_buttons_for_choosing_completion no_button">
            No
          </div>
        </div>
      </div>
      {/* <div className="user_review_div">
        <h4>Your Review</h4>
        <div className="button_to_write_review">Write your review</div>
      </div> */}
      <ReviewSection />
      {completionDetailPopup && (
        <CompletionDetailPopup
          setCompletionDetailPopup={setCompletionDetailPopup}
          challenge={challenge}
        />
      )}
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .div_for_top_part_of_quest_page {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    p {
      width: 100%;
      padding: 0;
      margin: 0 0 30px 0px;
      font-size: 13px;
    }
  }
  .div_for_challenge_overview {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 80%;
    .challenge_title_and_share_save_button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .challenge_share_save_div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        margin-right: 30px;
        .button_inside_challenge_share_save_div {
          font-size: 20px;
          margin-top: 20px;
        }
      }
    }
    .challenge_info_div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      p {
        margin: -10px 0px 30px 0px;
      }
      a {
        margin: -10px 0px 30px 0px;
      }
    }
  }
  .div_for_imgsArray_of_challenge {
    width: 80%;
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 50px;
    margin-bottom: 20px;
    align-items: start;
    .div_for_challenge_info_next_to_imgs {
      width: 100%;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 20px;
      height: auto;
      border: 1px solid rgba(200, 200, 200, 0.4); /* Light border to highlight the card */

      h2 {
        margin: 0;
      }
      p {
        margin: 10px 15px 22px 0;
      }
      h4 {
        margin: -5px 0 0 0;
        font-size: 13px;
        font-weight: 600;
      }
      .button_inside_div_for_challenge_info_next_to_imgs {
        background-color: #3a7ff9;
        color: white;
        padding: 10px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-align: center;
        font-size: 17px;
        width: 70%;
        margin-left: auto; /* This centers the button horizontally */
        margin-right: auto;
        margin-bottom: 10px;
        &:hover {
          background-color: #5e97ff;
        }
      }
    }
    ${"" /* css for img casourel: */}
    .image-gallery-slide {
      height: 450px; /* Adjust based on your desired height */
    }
    .image-gallery-left-nav .image-gallery-svg,
    .image-gallery-right-nav .image-gallery-svg {
      height: 50px; /* Adjust the height of the arrow */
      width: 30px; /* Adjust the width of the arrow */
    }
    .image-gallery-slide .image-gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 28 / 9; /* Keep the aspect ratio consistent */
      border-radius: 14px;
    }
    .image-gallery-fullscreen-button {
      display: none;
    }
  }
  .div_for_challenge_full_details {
    width: 80%;
    .div_for_side_info_inside_div_for_challenge_full_details {
      display: flex;
      gap: 10px;

      a {
        font-style: italic;
        text-decoration: none;
        color: #3a7ff9;
      }
    }
  }
  .div_for_completion {
    margin-top: 40px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(200, 200, 200, 0.4); /* Light border to highlight the card */
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    padding-bottom: 15px;

    p {
      font-size: 20px;
      font-weight: 600;
    }
    .buttons_for_choosing_completion {
      display: flex;
      width: 80%;
      justify-content: center;
      gap: 25px;
      align-items: center;
      .button_inside_div_buttons_for_choosing_completion {
        padding: 10px 30px;
        color: white;
        border-radius: 30px;
        cursor: pointer;
      }
      .yes_button {
        background-color: #3a7ff9;
        &:hover {
          background-color: #5e97ff;
        }
      }
      .no_button {
        background-color: #808080;
        &:hover {
          background-color: #a0a0a0;
        }
      }
    }
  }
  .user_review_div {
    width: 80%;
    h4 {
      font-size: 23px;
      margin: 50px 0 10px 5px;
    }
    .button_to_write_review {
      padding: 15px;
      border-radius: 30px;
      border: solid black;
      width: max-content;
      cursor: pointer;
    }
  }
`;

export default ChallengePage;
