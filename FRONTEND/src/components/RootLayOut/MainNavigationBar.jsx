import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import LanguageIcon from "@mui/icons-material/Language";
import Option from "./Option";
import axios from "axios";
import { toastFunction } from "../../../utils/helperFunction";
const MainNavigationBar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentQuestFromRedux } = useSelector((state) => state.quest);
  const { allTheQuest } = useSelector((state) => state.quest);
  console.log(
    "this is the currentQuestFromRedux log inside navigation",
    currentQuestFromRedux
  );
  console.log("this is the all the quest log inside navigation", allTheQuest);

  const chooseCurrentQuestFunction = async (e) => {
    console.log("Hello");
    const questId = e.target.value;
    if (currentQuestFromRedux?._id == questId) {
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/quest/chooseCurrentQuest/${questId}`,
        {
          withCredentials: true,
        }
      );
      if (!res.data.success) {
        return toastFunction("error", res.data.msg);
      }
      console.log(
        "this is console.log inside option that show the result of chosen quest function",
        res.data
      );
      dispatch(questActions.chooseCurrentQuest(res.data.currentQuest));
    } catch (error) {
      toastFunction("error", error.messgage);
    }
  };
  return (
    //left nav bar
    <NavigationBar>
      <Link to="/" className="div_for_logo">
        <img src="/Icons/logo.png" />
        <h3>WorldQuest</h3>
      </Link>

      {/* main nav bar */}
      <div className="div_for_main_activities">
        {/* <label>Your current city:</label>
        <select
          name="location"
          onChange={chooseCurrentQuestFunction}
          value={currentQuestFromRedux || ""}
        >
          {!currentQuestFromRedux ? (
            <Option value="" text="Choose location" />
          ) : (
            <Option
              value={currentQuestFromRedux?._id}
              text={`${currentQuestFromRedux?.city}, ${currentQuestFromRedux?.province}, ${currentQuestFromRedux?.country}`}
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
        </select> */}
      </div>

      {/* right nav bar */}
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
      font-size: 23px;
      color: black;
      font-weight: 800;
      margin-left: -8px;
    }
    img {
      width: 45px;
      height: 45px;
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
