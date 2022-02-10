const MainCard = ({ img, onHeartClick, alredyFavorite }) => {
  // 삼항연산자 사용
  const heartIcon = alredyFavorite ? "💖" : "🤍";
  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;