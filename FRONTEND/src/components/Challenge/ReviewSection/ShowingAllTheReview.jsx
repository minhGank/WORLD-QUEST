import styled from "styled-components";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const ShowingAllTheReview = () => {
  const [filterType, setFilterType] = useState(2);
  const [filterTypePopUp, setFilterTypePopUp] = useState(true);
  return (
    <Container>
      <div
        className="review_filter_type"
        onClick={() => setFilterTypePopUp((prev) => (prev = !prev))}
      >
        {filterType == 1
          ? "Most Recent"
          : filterType == 2
          ? "Most Helpful"
          : filterType == 3
          ? "Highest"
          : "Lowest"}
        {filterTypePopUp ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {filterTypePopUp && (
        <div className="filter_type_popup">
          <span
            onClick={() => {
              setFilterType(2);
              setFilterTypePopUp(false);
            }}
          >
            Most Helpful
          </span>
          <span
            onClick={() => {
              setFilterType(1);
              setFilterTypePopUp(false);
            }}
          >
            Most Recent
          </span>
          <span
            onClick={() => {
              setFilterType(3);
              setFilterTypePopUp(false);
            }}
          >
            Highest
          </span>
          <span
            onClick={() => {
              setFilterType(4);
              setFilterTypePopUp(false);
            }}
          >
            Lowest
          </span>
        </div>
      )}
    </Container>
  );
};

export default ShowingAllTheReview;
const Container = styled.div`
  .review_filter_type {
    border: solid 1px gray;
    width: max-content;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: ease 0.5s;
    cursor: pointer;
  }
  .filter_type_popup {
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 10px;
    position: stick;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(200, 200, 200, 0.4);
    width: max-content;
    padding: 5px 0 5px 0;
    gap: 3px;
    margin-top: 5px;
    span {
      padding: 5px 35px 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      width: 100%;
      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
`;
