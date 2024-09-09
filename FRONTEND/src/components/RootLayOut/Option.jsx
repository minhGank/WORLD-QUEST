import styled from "styled-components";

const Option = ({ value, text }) => {
  return <OptionCss value={value}>{text}</OptionCss>;
};

export default Option;

const OptionCss = styled.option``;
