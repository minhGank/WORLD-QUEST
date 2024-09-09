import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { toastFunction } from "../../utils/helperFunction";
import { questActions } from "../../redux/questSlice";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentQuestOfUser = currentUser.currentQuest;

  if (currentQuestOfUser) {
    useEffect(() => {
      const fetchQuest = async () => {
        try {
          dispatch(questActions.fetchStart());
          const res = await axios.post(
            `http://localhost:8000/quest/findQuest/${currentQuestOfUser}`
          );
          if (!res.data.success) {
            toastFunction("error", res.data.msg);
          }
          dispatch(
            questActions.fetchSuccess({
              currentQuest: res.data.quest,
              allTheQuest: res.data.allTheQuest,
            })
          );
        } catch (error) {
          dispatch(questActions.fetchFail());
          toastFunction("error", error.message);
        }
      };
      fetchQuest();
    }, [currentQuestOfUser]);
  }

  return <Container></Container>;
};

const Container = styled.div``;
export default Home;
