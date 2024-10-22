import styled from "styled-components";
import ShowingOverallReview from "./ReviewSection/ShowingOverallReview";
import ShowingAllTheReview from "./ReviewSection/ShowingAllTheReview";

const ReviewSection = ({ setWritingReviewPopup }) => {
  return (
    <Container>
      <h3>User reviews & ratings</h3>
      <ShowingOverallReview setWritingReviewPopup={setWritingReviewPopup} />
      <hr></hr>
      <ShowingAllTheReview />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin-top: 50px;
  hr {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 100%;
    border: 0;
    background-color: #fff;
    border-top: 2px dashed gray;
  }
`;

export default ReviewSection;
