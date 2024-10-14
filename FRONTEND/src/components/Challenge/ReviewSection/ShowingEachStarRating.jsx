import styled from "styled-components";
const ShowingEachStarRating = ({ star, percentage }) => {
  return (
    <Container>
      {star}
      <div className="div_to_display_chart_of_each_star">
        <div
          className="div_to_display_length_of_each_star"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 5px;
  width: 60%;
  .div_to_display_chart_of_each_star {
    width: 80%;
    background-color: #e0e0e0;
    border-radius: 30px;
    height: 80%;
    .div_to_display_length_of_each_star {
      background-color: #3a7ff9;
      border-radius: 30px;
      width: 30%;
      height: 100%;
    }
  }
`;

export default ShowingEachStarRating;
