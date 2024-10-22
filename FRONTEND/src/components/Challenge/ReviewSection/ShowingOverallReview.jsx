import styled from "styled-components";
import { Rate } from "antd";
import { useState } from "react";
import ShowingEachStarRating from "./ShowingEachStarRating";

const ShowingOverallReview = ({ setWritingReviewPopup }) => {
  const [overallRating, setOverrallRating] = useState(4.6);

  return (
    <Container>
      <div className="div_for_the_overall_stars">
        {overallRating}
        <Rate disabled allowHalf defaultValue={overallRating} />
        <span>46 reviews</span>
      </div>
      <div className="div_to_display_each_star_rating">
        <ShowingEachStarRating star={5} percentage={40} />
        <ShowingEachStarRating star={4} percentage={20} />
        <ShowingEachStarRating star={3} percentage={10} />
        <ShowingEachStarRating star={2} percentage={5} />
        <ShowingEachStarRating star={1} percentage={25} />
      </div>
      <div className="div_to_display_button_for_user_to_review">
        <div
          onClick={() => setWritingReviewPopup(true)}
          className="button_for_user_to_write_review"
        >
          Write a review
        </div>
        <div className="button_for_user_to_see_all_the_review">
          See all reviews
        </div>
      </div>
    </Container>
  );
};

export default ShowingOverallReview;
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  .div_for_the_overall_stars {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .div_to_display_each_star_rating {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .div_to_display_star {
      display: flex;
      justify-content: space-around;
      gap: 5px;
      .div_to_display_chart_of_each_star {
        width: 80%;
        background-color: #e0e0e0;
        border-radius: 30px;
        .div_to_display_length_of_each_star {
        }
      }
    }
  }
  .div_to_display_button_for_user_to_review {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .button_for_user_to_write_review {
      background-color: #3a7ff9;
      border: solid #3a7ff9;
      color: white;
      padding: 12px;
      font-size: 15px;
      font-weight: 500;
      border-radius: 30px;
      width: max-content;
      cursor: pointer;
    }
    .button_for_user_to_see_all_the_review {
      font-size: 15px;
      padding: 12px;
      font-weight: 500;
      border-radius: 30px;
      width: max-content;
      border: solid black;
      cursor: pointer;
    }
  }
`;
