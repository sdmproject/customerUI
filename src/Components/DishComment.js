import Divider from "@mui/material/Divider";
import * as React from "react";

const DishComment = ({ show }) => {
  const [addCommentModal, setAddCommentModal] = React.useState(false);

  const fakeComment = [
    {
      author: "佐藤理人",
      userid: "--anonymous",
      comment: "好吃",
      rate: 4,
      comments_date: "2021-2-2",
      like_num: 21,
      dislike_num: 8,
    },
    {
      author: "佐藤不理人",
      userid: "--anonymous",
      comment: "裡面有蟑螂腳....",
      rate: 1,
      comments_date: "2021-2-3",
      like_num: 1,
      dislike_num: 25,
    },
    {
      author: "翔哥",
      userid: "evan123@ntu.edu.tw",
      comment: "好吃，有媽媽的味道",
      rate: 5,
      comments_date: "2021-2-4",
      like_num: 32,
      dislike_num: 3,
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
              <label className="item">
                <input type="radio" name="comment_filter" defaultChecked />
                <div className="text">全部</div>
              </label>
              <label className="item">
                <input type="radio" name="comment_filter" />
                <div className="text">好評</div>
              </label>
              <label className="item">
                <input type="radio" name="comment_filter" />
                <div className="text">差評</div>
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
                {" "}
                {/*input bar*/}
                <div className="column is-fluid">
                  <div className="ts-input is-fluid">
                    <input
                      type="text"
                      className="input"
                      placeholder="輸入評論…"
                    />
                  </div>
                </div>
                <div className="column">
                  <button className="ts-button">送出</button>
                </div>
              </div>
            </>
          ) : null}

          <div className="ts-space is-large"></div>

          {fakeComment.map((comment, i) => (
            <div key={i}>
              <div className="ts-conversation">
                <div className="avatar">
                  <img
                    src={process.env.PUBLIC_URL + "/user.png"}
                    alt="userAvatar"
                  />
                  {/* <div className="author">{comment.author}</div> */}
                </div>
                <div className="content">
                  <div className="bubble">
                    <div className="author">{comment.author}</div>
                    <div className="text">{comment.comment}</div>
                  </div>
                  <div className="ts-space is-small"></div>
                  <div className="ts-wrap is-compact">
                    <label className="ts-chip is-toggle is-small is-dense is-secondary is-circular is-outlined">
                      <input type="checkbox" defaultChecked="" />
                      <div className="content">👌 {comment.like_num}</div>
                    </label>
                    <label className="ts-chip is-toggle is-small is-dense is-secondary is-circular is-outlined">
                      <input type="checkbox" />
                      <div className="content">👀 {comment.dislike_num}</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default DishComment;
