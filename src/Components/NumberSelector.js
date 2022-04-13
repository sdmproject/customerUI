import { useEffect } from "react";
const NumberSelector = ({ dishNum, setDishNum, Size }) => {
  const onClick_add = () => {
    setDishNum(dishNum + 1);
  };

  const onClick_min = () => {
    if (dishNum > 0) setDishNum(dishNum - 1);
  };
  useEffect(() => {
    // console.log(dishNum);
  }, []);
  return (
    <>
      {Size !== "small" ? (
        <div className="inline-block space-x-4 pt-3 pb-2">
          {dishNum <= 0 ? (
            <span className="pl-1.5 pr-1.5 text-xl font-serif text-slate-300 no-select">
              -
            </span>
          ) : (
            <span
              onClick={onClick_min}
              className="pl-1.5 pr-1.5  text-xl font-serif hover:bg-zinc-200 no-select"
            >
              -
            </span>
          )}
          <span className="border-b-2 border-b-purple-900 p-1">
            &nbsp;&nbsp;{dishNum}&nbsp;&nbsp;
          </span>
          <span
            onClick={onClick_add}
            className="pl-1.5 pr-1.5  text-xl font-serif hover:bg-zinc-200 no-select"
          >
            +
          </span>
        </div>
      ) : (
        <div className="inline-block space-x-4 pt-3 pb-2">
          {dishNum <= 0 ? (
            <span className="pl-px pr-px text-sm font-serif text-slate-300 no-select">
              -
            </span>
          ) : (
            <span
              onClick={onClick_min}
              className="pl-px pr-px text-sm font-serif hover:bg-zinc-200 no-select"
            >
              -
            </span>
          )}
          <span className="border-b-2 border-b-purple-900 p-px">
            &nbsp;{dishNum}&nbsp;
          </span>
          <span
            onClick={onClick_add}
            className="pl-px pr-px  text-sm font-serif hover:bg-zinc-200 no-select"
          >
            +
          </span>
        </div>
      )}
    </>
  );
};

export default NumberSelector;
