import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";
import { toastFunction } from "../../../utils/helperFunction";
import axios from "axios";

const SearchBar = ({ setResultFunction }) => {
  const [input, setInput] = useState("");

  const findQuest = async (searchTerm) => {
    if (searchTerm == "") {
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/user/findQuest/${searchTerm}`
      );
      console.log(searchTerm);
      console.log(
        "this is the console log inside SearchBAr showing result of quest list",
        res.data
      );
      setResultFunction(res.data);
    } catch (error) {
      toastFunction("error", error.message);
    }
  };

  const typingInputFunction = (e) => {
    const value = e.target.value;
    setInput(value);
    findQuest(value);
  };
  return (
    <Container>
      <IoSearch id="search_icon" />
      <Input
        onChange={typingInputFunction}
        value={input}
        placeholder="Type in the destination that you want to visit..."
      />
      <div className="search_button">Search</div>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  background-color: white;
  width: 35%;
  border-radius: 16px;
  height: 3.5rem;
  padding: 0 7px 0 15px;
  box-shadow: 0px 0px 8px #ddd;
  display: flex;
  align-items: center;

  #search_icon {
    font-size: 30px;
  }

  .search_button {
    background-color: #3a7ff9;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    width: 20%;
    color: white;
    cursor: pointer;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  height: 100%;
  font-size: 1rem;
  width: 100%;
  margin-left: 5px;

  &:focus {
    outline: none;
  }
`;
