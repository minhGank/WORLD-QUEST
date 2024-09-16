// import axios from "axios";
import styled from "styled-components";
// import { toastFunction } from "../../../utils/helperFunction";
// import { questActions } from "../../../redux/questSlice";
// import { useDispatch, useSelector } from "react-redux";
const Option = ({ value, text }) => {
  return <OptionCss value={value}>{text}</OptionCss>;
};

export default Option;

const OptionCss = styled.option``;
