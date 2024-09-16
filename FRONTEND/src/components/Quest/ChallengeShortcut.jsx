import styled from "styled-components";

const ChallengeShortcut = ({ challenge }) => {
  return (
    <Container>
      <div className="wrapper_div">
        <div className="div_for_img">
          <img src={challenge.img} />
        </div>
        <div className="div_for_challenge_info">
          <h2>{challenge.title}</h2>
          <p>{challenge.point}</p>
          <p>{challenge.description}</p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div``;
