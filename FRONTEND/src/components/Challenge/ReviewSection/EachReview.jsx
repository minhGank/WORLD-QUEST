import styled from "styled-components";
import { Rate } from "antd";
const EachReview = () => {
  return (
    <Container>
      <div className="review_top_div">
        <div className="review_user_info">
          <img src="user_img" />
          <span>{"Username"}</span>
          <span>{"Months ago"}</span>
        </div>
        <div className="review_star">
          {"5.0"} <Rate defaultValue={5} disabled />
        </div>
      </div>

      <div className="review_description_div">{"Review Description..."}</div>
      <div className="review_img_div">{/* <img src="img" /> */}</div>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin-top: 30px;
  border-bottom: solid #dedede 1px;
  padding-bottom: 20px;
  .review_top_div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .review_user_info {
      img {
        border-radius: 50%;
        width: 25px;
      }
      display: flex;
      justify-content: center;
      justify-content: center;
      gap: 10px;
    }
    .review_star {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }
  }
`;

export default EachReview;
