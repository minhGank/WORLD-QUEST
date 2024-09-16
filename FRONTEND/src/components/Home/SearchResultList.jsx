import styled from "styled-components";
import EachSearchResult from "./EachSearchResult";
const SearchResultList = ({ result }) => {
  return (
    <Container>
      {Array.isArray(result) ? (
        result?.map((res) => {
          return <EachSearchResult res={res} />;
        })
      ) : (
        <EachSearchResult />
      )}
    </Container>
  );
};

export default SearchResultList;

const Container = styled.div`
  min-width: 35%;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 8px #ddd;
`;
