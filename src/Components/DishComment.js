import * as React from "react";



const DishComment = ({ show, commentData }) => {

    const [addCommentModal, setAddCommentModal] = React.useState(false);
    const [rateFilter, setRateFilter] = React.useState([1, 2, 3, 4, 5]);

    const selectBadComment = () => { setRateFilter([1, 2, 3]) };
    const selectGoodComment = () => { setRateFilter([4, 5]) };
    const selectAllComment = () => { setRateFilter([1, 2, 3, 4, 5]) };

    const ratingIconBuilder = (rate) => {
        let starList = [];
        for (let i = 1; i <= 5; i++) {
            if (rate > 0)
                starList.push(<div key={i} className="star is-active"></div>);
            else
                starList.push(<div key={i} className="star"></div>);
            rate -= 1;
        }

        return (
            <div className="ts-rating is-small is-yellow">
                {starList}
            </div>
        );

    }

    // console.log(commentData);


    const fakeComment = [
        {
            "name": "佐藤理人",
            "userid": "--anonymous",
            "content": "好吃",
            "rate": 4,
            "time": "2021-2-2",
            "like_num": 21,
            "dislike_num": 8,

        },
        {
            "name": "佐藤不理人",
            "userid": "--anonymous",
            "content": "裡面有蟑螂腳....",
            "rate": 1,
            "time": "2021-2-3",
            "like_num": 1,
            "dislike_num": 25,
        },
        {
            "name": "翔哥",
            "userid": "evan123@ntu.edu.tw",
            "content": "好吃，有媽媽的味道",
            "rate": 5,
            "time": "2021-2-4",
            "like_num": 32,
            "dislike_num": 3,

        },

    ];

    return (
        <>
            {
                show ?
                    (<>
                        <div className="ts-space"></div>
                        <div className="ts-row">{/* meta bar */}
                            <div className="ts-selection">
                                <label className="item" onClick={selectAllComment}>
                                    <input type="radio" name="comment_filter" defaultChecked />
                                    <div className="text">全部</div>
                                </label>
                                <label className="item" onClick={selectGoodComment}>
                                    <input type="radio" name="comment_filter" />
                                    <div className="text">好評</div>
                                </label>
                                <label className="item" onClick={selectBadComment}>
                                    <input type="radio" name="comment_filter" />
                                    <div className="text">差評</div>
                                </label>
                            </div>
                            <div className="column is-fluid"></div>
                            <button className="ts-button is-icon is-small" onClick={() => setAddCommentModal(!addCommentModal)}>
                                <span className="ts-icon is-comment-icon"></span>
                            </button>
                        </div>
                        {
                            addCommentModal ?
                                <>
                                    <div className="ts-space "></div>
                                    <div className="ts-row"> {/*input bar*/}
                                        <div className="column is-fluid">
                                            <div className="ts-input is-fluid">
                                                <input type="text" className="input" placeholder="輸入評論…" />
                                            </div>
                                        </div>
                                        <div className="column">
                                            <button className="ts-button">送出</button>
                                        </div>
                                    </div>
                                </>
                                : null
                        }

                        <div className="ts-space is-large"></div>

                        {/* 餐點頻論串 */}
                        {commentData.filter(comment => rateFilter.includes(comment.rate)).map((comment, i) => (
                            // {console.log(commentData)}
                            // {commentData.map((comment, i) => (
                            <div key={i}>
                                < div className="ts-conversation">
                                    <div className="avatar">
                                        <img src={process.env.PUBLIC_URL + "/user.png"} alt="userAvatar" />
                                    </div>

                                    <div className="content">
                                        <div className="bubble ">
                                            {/* first row of the bubble */}
                                            <div className="ts-grid">
                                                {/* <div className="ts-grid is-2-columns"> */}
                                                <div className="column is-10-wide">
                                                    <div className="author">
                                                        <div className="ts-meta is-start-aligned" >
                                                            <div style={{ "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap" }}>
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
                                                        <div className="item">下午 11:58</div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="ts-space is-small"></div>
                                        <div className="ts-wrap is-compact">
                                            <label className="ts-chip is-toggle is-small is-dense is-secondary is-circular is-outlined">
                                                <input type="checkbox" defaultChecked="" />
                                                {/* <div className="content">👌 {comment.like_num}</div> */}
                                                <div className="content">👌 95</div>
                                            </label>
                                            <label className="ts-chip is-toggle is-small is-dense is-secondary is-circular is-outlined">
                                                <input type="checkbox" />
                                                {/* <div className="content">👀 {comment.dislike_num}</div> */}
                                                <div className="content">👀 27</div>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                        )}

                    </>
                    )

                    : null
            }
        </>
    )
};

export default DishComment;
