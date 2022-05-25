import * as React from "react";
import { FormattedMessage } from "react-intl";
import Rating from "@mui/material/Rating";
import { sendComment, getResturantsApi } from "../Functions/api";
import { ReactSession } from 'react-client-session';

const DishComment = ({ show, commentData, dishId, setDishes, userName}) => {
  const [addCommentModal, setAddCommentModal] = React.useState(false);
  const [rateFilter, setRateFilter] = React.useState([1, 2, 3, 4, 5]);
  const [ratingValue, setRatingValue] = React.useState(3);
  const [inputComment, setInputComment] = React.useState("");
  const [localCommentData, setLocalCommentData] = React.useState(commentData);

  const selectBadComment = () => {
    setRateFilter([1, 2, 3]);
  };
  const selectGoodComment = () => {
    setRateFilter([4, 5]);
  };
  const selectAllComment = () => {
    setRateFilter([1, 2, 3, 4, 5]);
  };

  const generateRandomNum = () => {
    var maxNumber = 15;
    var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
    return randomNumber;
  }

  const ratingIconBuilder = (rate) => {
    let starList = [];
    for (let i = 1; i <= 5; i++) {
      if (rate > 0)
        starList.push(<div key={i} className="star is-active"></div>);
      else starList.push(<div key={i} className="star"></div>);
      rate -= 1;
    }

    return <div className="ts-rating is-small is-yellow">{starList}</div>;
  };

  function setNewCommentToDishData(commentInfo) {

    var newComment = {
      content: commentInfo.content,
      id: commentInfo.time,//not sure what to use
      imgUrl: commentInfo.imgUrl,
      name: commentInfo.name,
      rate: commentInfo.rate,
      time: commentInfo.time,
    }
    const newComments = [...localCommentData, newComment];
    // console.log("new commentData", newComments);

    var dishData = ReactSession.get("dishData");

    for (var i = 0; i < dishData.length; i++) {
      if (dishData[i].id == dishId) {
        dishData[i].comments = newComments;
      }
    }

    setLocalCommentData(newComments);
    ReactSession.set("dishData", dishData);
    setDishes(dishData);

  }

  async function clickSendComment(content, rating) {
    // console.log('clickSendComment',{ content, rating }, ReactSession.get("username"));
    var commentInfo = {
      itemId: dishId,
      name: ReactSession.get("username"),
      // name: userName,
      content: content,
      rate: rating,
      imgUrl: ReactSession.get("image_URL"),
    }
    var sendData = await sendComment(commentInfo);
    setNewCommentToDishData(sendData);
  }

  const dateConverter = (isoDateString) => {
    const targetDate = new Date(isoDateString);

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    // var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - targetDate.getTime();

    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
      return "不久前";
    }

    // 计算差异时间的量级
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    // 数值补0方法
    var zero = function (value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    };

    // 使用
    if (monthC > 12) {
      // 超过1年，直接显示年月日
      return (function () {
        var date = new Date(isoDateString);
        return (
          date.getFullYear() +
          "年" +
          zero(date.getMonth() + 1) +
          "月" +
          zero(date.getDate()) +
          "日"
        );
      })();
    } else if (monthC >= 1) {
      return parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      return parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      return parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      return parseInt(hourC) + "小時前";
    } else if (minC >= 1) {
      return parseInt(minC) + "分鐘前";
    }
    return "剛剛";
  };

  // console.log(commentData);

  const commentSample = [
    {
      content: "裡面有蟑螂指甲....",
      id: "3333",
      imgUrl:
        "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
      name: "fathoward_chiman",
      rate: 1,
      time: "2022-04-11T14:02:18",
    },
  ];

  const fakeComment = [
    {
      name: "佐藤理人",
      userid: "--anonymous",
      content: "好吃",
      rate: 4,
      time: "2021-2-2",
      like_num: 21,
      dislike_num: 8,
    },
  ];

  return (
    <>
      {show ? (
        <>
          <div className="ts-space"></div>
          <div className="ts-row">
            {/* meta bar */}
            <div className="ts-selection">
              <label className="item" onClick={selectAllComment}>
                <input type="radio" name="comment_filter" defaultChecked />
                <div className="text">
                  <FormattedMessage
                    id="dishcomment.all"
                    defaultMessage="全部"
                  />
                </div>
              </label>
              <label className="item" onClick={selectGoodComment}>
                <input type="radio" name="comment_filter" />
                <div className="text">
                  <FormattedMessage
                    id="dishcomment.good"
                    defaultMessage="好評"
                  />
                </div>
              </label>
              <label className="item" onClick={selectBadComment}>
                <input type="radio" name="comment_filter" />
                <div className="text">
                  <FormattedMessage
                    id="dishcomment.bad"
                    defaultMessage="差評"
                  />
                </div>
              </label>
            </div>
            <div className="column is-fluid"></div>
            <button
              className="ts-button is-icon is-small"
              onClick={() => setAddCommentModal(!addCommentModal)}
            >
              <span className="ts-icon is-comment-icon"></span>
            </button>
          </div>
          {addCommentModal ? (
            <>
              <div className="ts-space "></div>
              <div className="ts-row">
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </div>

              <div className="ts-row">
                {" "}
                {/*input bar*/}
                <div className="column is-fluid">
                  <div className="ts-input is-fluid">
                    <input
                      type="text"
                      className="input"
                      placeholder={
                        <FormattedMessage
                          id="dishcomment.inputplaceholder"
                          defaultMessage="輸入評論…"
                        />
                      }
                      value={inputComment}
                      onChange={(event) => setInputComment(event.target.value)}
                    />
                  </div>
                </div>
                <div className="column">
                  {inputComment == "" ? (
                    <button className="ts-button is-disabled">
                      <FormattedMessage
                        id="dishcomment.send"
                        defaultMessage="送出"
                      />
                    </button>
                  ) : (
                    <button
                      className="ts-button"
                      onClick={() =>
                        clickSendComment(
                          inputComment,
                          ratingValue
                        )
                      }
                    >
                      <FormattedMessage
                        id="dishcomment.send"
                        defaultMessage="送出"
                      />
                    </button>
                  )}
                </div >
              </div >
            </>
          ) : null}

          <div className="ts-space is-large"></div>

          {/* 餐點頻論串 */}
          {
            localCommentData
              .filter((comment) => rateFilter.includes(comment.rate))
              .map((comment, i) => (
                // {console.log(commentData)}
                // {commentData.map((comment, i) => (
                <div key={i}>
                  <span>
                    <div className="ts-conversation">
                      {/* <span> */}

                      <div className="ts-avatar is-small is-not-minimal">
                        {comment.imgUrl == "" ? (
                          <img
                            src={process.env.PUBLIC_URL + "/user.png"}
                            alt="userAvatar"
                          />
                        ) : (
                          <img src={comment.imgUrl} alt="userAvatar" />
                        )}
                      </div>

                      <div className="content">
                        <div className="bubble ">
                          {/* first row of the bubble */}
                          <div className="ts-grid">
                            {/* <div className="ts-grid is-2-columns"> */}
                            <div className="column is-10-wide">
                              <div className="author">
                                <div className="ts-meta is-start-aligned">
                                  <div
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {comment.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="column is-6-wide">
                              <div className="ts-meta is-end-aligned">
                                {ratingIconBuilder(comment.rate)}
                              </div>
                            </div>
                          </div>
                          {/* second row of the bubble */}
                          <div className="ts-grid">
                            <div className="column is-10-wide">
                              <div className="ts-meta is-start-aligned">
                                {comment.content}
                              </div>
                            </div>
                            <div className="column is-6-wide">
                              <div className="meta">
                                <div className="item">
                                  {dateConverter(comment.time)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ts-space is-small"></div>
                        <div className="ts-wrap is-compact">
                          <label className="ts-chip is-toggle is-small is-dense is-secondary is-circular is-outlined">
                            <input type="checkbox" defaultChecked="" />
                            {/* <div className="content">👌 {comment.like_num}</div> */}
                            {/* <div className="content">👌 {generateRandomNum()}</div> */}
                            <div className="content">👌 999+</div>
                          </label>
                          <label className="ts-chip is-toggle is-small is-dense is-secondary is-circular is-outlined">
                            <input type="checkbox" />
                            {/* <div className="content">👀 {comment.dislike_num}</div> */}
                            {/* <div className="content">👀 {generateRandomNum()}</div> */}
                            <div className="content">👀 999+</div>
                          </label>
                        </div>
                      </div>
                      {/* </span> */}
                    </div>
                  </span>
                </div>
              ))
          }
        </>
      ) : null}
    </>
  );
};

export default DishComment;
