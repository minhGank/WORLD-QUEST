import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toastFunction } from "../../utils/helperFunction";
import { questActions } from "../../redux/questSlice";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BarLoader from "react-spinners/BarLoader";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { IoIosArrowDown } from "react-icons/io";

const Quest = () => {
  ////////////////////////////////////////////////////
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
  // const dispatch = useDispatch();

  //////////////////////////////////////////////////////////////
  const { questId } = useParams();

  const [adventureType, setAdventureType] = useState(1);
  //create function to find the quest
  const fetchQuestDataFunction = async (questId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/quest/findQuest/${questId}`
      );
      if (!res.data.success) {
        toastFunction("error", res.data.msg);
        throw new Error(res.data.msg);
      }
      return res.data.quest;
    } catch (error) {
      toastFunction("error", error.message);
      throw new Error(error.message);
    }
  };

  //react query
  const {
    data: quest,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchingQuestData", questId],
    queryFn: () => fetchQuestDataFunction(questId),
    staleTime: 5000,
  });
  //if react query finds
  if (isLoading) {
    return (
      <Container>
        <BarLoader
          color="#3a7ff9"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Container>
    );
  }

  if (isError) {
    <Container>
      <div className="div_for_showing_error">
        <h1>There's error, please come back later</h1>
      </div>
    </Container>;
  }
  let imagesForGalleryArray;
  if (quest?.arrayOfImg && Array.isArray(quest.arrayOfImg)) {
    imagesForGalleryArray = quest.arrayOfImg.map((img) => ({
      original: img,
    }));

    console.log(imagesForGalleryArray);
  }

  return (
    <>
      <Container>
        <div className="div_for_top_part_of_quest_page">
          <p className="p_for_location_of_quest">
            {quest?.country} {`>`} {quest?.province} {`>`} {quest?.city}
          </p>
        </div>
        <div className="div_for_imgsArray_of_quest">
          <ImageGallery items={imagesForGalleryArray} />
        </div>
        <div className="div_for_quest_info">
          <h1>
            {quest?.city} {` City`}
          </h1>
          <p>{quest?.description}</p>
        </div>
        <div className="challenges_div">
          <div className="title_for_challange_div">
            <h3>Top Adventures:</h3>
          </div>
          <div className="div_for_choosing_types_of_adventures">
            <div
              className={`adventure_type ${adventureType == 1 ? "active" : ""}`}
              onClick={() => setAdventureType(1)}
            >
              All
            </div>
            <div
              className={`adventure_type ${adventureType == 2 ? "active" : ""}`}
              onClick={() => setAdventureType(2)}
            >
              Places
            </div>
            <div
              className={`adventure_type ${adventureType == 3 ? "active" : ""}`}
              onClick={() => setAdventureType(3)}
            >
              Food
            </div>
          </div>
          <div className="div_for_filter_button">
            <div className="filter_button">Filter</div>
            <IoIosArrowDown className="arrow_down_icon_for_filter_button" />
          </div>
          <div className="div_for_challenges"></div>
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
  .div_for_top_part_of_quest_page {
    width: 82%;
    display: flex;
    justify-content: flex-start;
    margin-left: 150px;
    p {
      width: 100%;
      padding: 0;
      margin: 0 0 30px 0px;
      font-size: 13px;
    }
  }
  .div_for_imgsArray_of_quest {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${"" /* css for img casourel: */}
    .image-gallery-slide {
      height: 450px; /* Adjust based on your desired height */
    }
    .image-gallery-left-nav .image-gallery-svg,
    .image-gallery-right-nav .image-gallery-svg {
      height: 50px; /* Adjust the height of the arrow */
      width: 30px; /* Adjust the width of the arrow */
    }
    .image-gallery-slide .image-gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 28 / 9; /* Keep the aspect ratio consistent */
      border-radius: 14px;
    }
    .image-gallery-fullscreen-button {
      display: none;
    }
  }
  .div_for_quest_info {
    width: 80%;
    margin-top: 25px;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    h1 {
      margin: 0 0 5px 0;
    }
  }
  .challenges_div {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    .title_for_challange_div {
      h3 {
      }
    }
    .div_for_choosing_types_of_adventures {
      display: flex;
      justify-content: center;
      align-items: start;
      gap: 5px;
      .adventure_type {
        background-color: #f0f0f0;
        padding: 1px 15px;
        border-radius: 6px;
        cursor: pointer;
        ${"" /* font-size: 16px; */}
        &:hover {
          background-color: #dcdcdc;
        }
      }
      .active {
        background-color: #3a7ff9;
        color: white;
        &:hover {
          background-color: #3a7ff9;
          color: white;
        }
      }
    }
    .div_for_filter_button {
      display: flex;
      margin-top: 10px;
      margin-left: 3px;
      justify-content: center;
      align-items: center;
      gap: 3px;
      .filter_button {
        cursor: pointer;
      }
      .arrow_down_icon_for_filter_button {
        margin-top: 3.5px;
      }
    }
  }
`;
export default Quest;
