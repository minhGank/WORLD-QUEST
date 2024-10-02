import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ChallengeShortcut = ({ challenge }) => {
  const descriptionLimitLength = challenge.description.slice(0, 400);
  return (
    <Container>
      <Link to={`/adventure/${challenge?._id}`} className="wrapper_div">
        <div className="div_for_img">
          <img src={challenge.imgThumbnail} />
        </div>

        <div className="div_for_challenge_info">
          <div className="div_for_challenge_title_and_overview">
            <div className="div_for_challenge_title">
              <h2>{challenge.title}</h2>
            </div>

            <div className="div_for_challenge_overview">
              <p className="p_inside_div_for_challenge_overview">
                Point: {challenge.point}
              </p>
              <p className="p_inside_div_for_challenge_overview">
                Review:{" "}
                {challenge?.averageReviewStar?.length > 0
                  ? challenge.averageReviewStar.length
                  : "0"}
              </p>
              <p className="p_inside_div_for_challenge_overview">
                Completion:{" "}
                {challenge.completion.length > 0
                  ? challenge.completion.length
                  : "0"}
              </p>
            </div>
          </div>
          <p>
            {descriptionLimitLength}
            <span>...</span>
          </p>
        </div>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 22px 0;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border: solid #d3d3d3;
  transition: 0.3s ease;
  &:hover {
    border-color: grey;
    img {
      opacity: 0.8;
    }
  }
  .wrapper_div {
    width: 98%;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .div_for_img {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 270px;
        border-radius: 7px;
        transition: 0.2s ease;
      }
    }
    .div_for_challenge_info {
      display: flex;
      align-items: start;
      justify-content: center;
      flex-direction: column;

      p {
        margin: 0 0;
      }
      .div_for_challenge_title_and_overview {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 20px;
      }
      .div_for_challenge_overview {
        display: flex;
        gap: 10px;
      }
    }
  }
`;

export default ChallengeShortcut;
