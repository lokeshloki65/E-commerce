import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value }) => {
  const getStar = (index, value) => {
    if (value >= index) {
      return <FaStar />;
    } else if (value >= index - 0.5) {
      return <FaStarHalfAlt />;
    } else {
      return <FaRegStar />;
    }
  };
  return (
    <div className="flex items-center gap-x-3 ">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>{getStar(index, value)}</span>
      ))}
    </div>
  );
};

export default Rating;
