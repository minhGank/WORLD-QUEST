import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toastFunction } from "../../utils/helperFunction";
import { questActions } from "../../redux/questSlice";
import { ToastContainer } from "react-toastify";
import SearchBar from "../components/Home/SearchBar";
import SearchResultList from "../components/Home/SearchResultList";

const Home = () => {
  // const dispatch = useDispatch();
  // //fetching user data from redux store
  // const { currentUser } = useSelector((state) => state.user);

  // //fetching current quest full data from redux store
  // const { currentQuestFromRedux } = useSelector((state) => state.quest);

  // //fetching all the quest data from redux store
  // const { allTheQuest } = useSelector((state) => state.quest);

  // //cosnt currentQuestId from user data
  // const currentQuestOfUserId = currentUser?.currentQuest;

  // //store the challenges of the current quest
  // const [challengesOfCurrentQuest, setChallengesOfCurrentQuest] = useState("");

  // if (!currentQuestFromRedux) {
  //   //if there're no currentQuestFromRedux, we start fetching from user.currentQuest (id)
  //   if (currentQuestOfUserId) {
  //     //if there's currentQuestId, we start fetching the data
  //     useEffect(() => {
  //       const fetchUserQuestFunction = async () => {
  //         try {
  //           dispatch(questActions.fetchStart());
  //           const res = await axios.get(
  //             `http://localhost:8000/quest/findQuest/${currentQuestOfUserId}`
  //           );
  //           //if fetching fail
  //           if (!res.data.success) {
  //             toastFunction("error", res.data.msg);
  //           }
  //           //fetching succeed, store the full data current quest into the redux store
  //           dispatch(
  //             questActions.fetchUserQuestSuccess({
  //               currentQuestFromRedux: res.data.quest,
  //               allTheQuest: res.data.allTheQuest,
  //             })
  //           );
  //           //store all the challenges inside the useState

  //           setChallengesOfCurrentQuest(res.data.quest.challenges);
  //           console.log(
  //             "this is the console log from Home component that show the whole data of the current quest",
  //             res.data.quest.challenges
  //           );
  //         } catch (error) {
  //           dispatch(questActions.fetchFail());
  //           toastFunction("error", error.message);
  //         }
  //       };
  //       fetchUserQuestFunction();
  //     }, [currentQuestOfUserId]);
  //   } else {
  //     //if there's no currentQuestID == user haven't choose any quest, we will show them the interface that they could select a quest
  //     if (!allTheQuest) {
  //       //if there's no data for all the quest in redux store, we start fetching from back end
  //       useEffect(() => {
  //         const fetchAllQuestFunction = async () => {
  //           try {
  //             dispatch(questActions.fetchStart());
  //             const res = await axios.get(
  //               `http://localhost:8000/quest/getAllQuest`
  //             );
  //             //if fetch fail
  //             if (!res.data.success) {
  //               dispatch(questActions.fetchFail());
  //               return toastFunction("error", res.data.msg);
  //             }

  //             //if fetch succeed, store that data inside redux quest store
  //             dispatch(questActions.fetchAllQuestSuccess(res.data.allQuest));
  //           } catch (error) {
  //             console.log(error);
  //             dispatch(questActions.fetchFail());
  //             toastFunction("error", error.message);
  //           }
  //         };
  //         fetchAllQuestFunction();
  //       }, [currentQuestOfUserId]);
  //     }
  //   }
  // }

  const [result, setResult] = useState("");
  console.log("this is result", result);
  const setResultFunction = (value) => {
    console.log("setResultFunction is running");
    console.log("this is value", value);
    setResult(value);
  };
  return (
    <>
      <Container>
        <div className="title">
          <h2>Where to?</h2>
        </div>
        <div className="search_bar">
          <SearchBar setResultFunction={setResultFunction} />
          <SearchResultList result={result} />
        </div>
      </Container>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
  }
  .search_bar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
export default Home;
