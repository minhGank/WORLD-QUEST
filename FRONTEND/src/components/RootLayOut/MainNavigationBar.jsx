import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LanguageIcon from "@mui/icons-material/Language";
import Option from "./Option";

const MainNavigationBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentQuest } = useSelector((state) => state.quest);
  const { allTheQuest } = useSelector((state) => state.quest);
  console.log(currentQuest);
  return (
    <NavigationBar>
      <Link to="/" className="div_for_logo">
        <img src="/Icons/logo.png" />
        <h3>World Quest</h3>
      </Link>
      <div className="div_for_main_activities">
        <label>Your current city:</label>
        <select name="location">
          {!currentQuest ? (
            <Option value="" text="Choose location" />
          ) : (
            <Option
              value={currentQuest?._id}
              text={`${currentQuest?.city}, ${currentQuest?.province}, ${currentQuest?.country}`}
            />
          )}
          {allTheQuest?.map((quest, i) => {
            return (
              <Option
                key={i}
                value={quest?._id}
                text={`${quest?.city}, ${quest?.province}, ${quest?.country}`}
              />
            );
          })}
        </select>
      </div>
      <div className="div_for_user_shortcut">
        <div className="div_for_using_region_and_languages">
          <LanguageIcon className="div_for_language_icon" />
        </div>
        <img src={currentUser?.img} />
      </div>
    </NavigationBar>
  );
};

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: -20px;
  .div_for_logo {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 30px;
      color: black;
    }
    img {
      width: 70px;
    }
  }

  .div_for_main_activities {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    label {
      font-weight: 500;
    }
    select {
      padding: 2px;
    }
  }
  .div_for_user_shortcut {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 30px;
    .div_for_using_region_and_languages {
      .div_for_language_icon {
        cursor: pointer;
        margin-top: 7px;
        border-radius: 30%;
        width: 30px;
        height: 30px;
        ${"" /* padding: 10px; */}
        &:hover {
          background-color: #d6d6d6;
        }
      }
    }
    img {
      cursor: pointer;
      border-radius: 30%;
      width: 20px;
      ${"" /* padding: 10px; */}
      &:hover {
        background-color: #d6d6d6;
      }
    }
  }
`;
export default MainNavigationBar;
