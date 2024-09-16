import styled from "styled-components";

const EachSearchResult = ({ res }) => {
  console.log(
    "this is console from EachSearchResult showing each quest result from search bar",
    res
  );
  return (
    <Container>
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
  );
};

export default EachSearchResult;

const Container = styled.div``;
