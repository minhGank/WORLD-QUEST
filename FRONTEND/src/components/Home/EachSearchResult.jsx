import styled from "styled-components";
import { toastFunction } from "../../../utils/helperFunction";
import { useNavigate } from "react-router-dom";

const EachSearchResult = ({ res }) => {
  const navigate = useNavigate();
  const clickOnQuestResultFunction = async (questId) => {
    if (questId) {
      navigate(`/quest_location/${questId}`);
    }
  };

  console.log(
    "this is console from EachSearchResult showing each quest result from search bar",
    res
  );

  return (
    <>
      {res ? (
        <Container onClick={() => clickOnQuestResultFunction(res._id)}>
          <div className="div_for_result_img">
            <img src={res?.img} />
          </div>
          <div className="div_for_result_info">
            <span>{res?.city}</span>
            <p>
              {res?.province}, {res?.country}
            </p>
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default EachSearchResult;

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
  padding: 10px 0px;
  .div_for_result_img {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
  }
  .div_for_result_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-weight: 600;
    }
    p {
      margin: 0px;
      font-size: 13px;
    }
  }
`;
