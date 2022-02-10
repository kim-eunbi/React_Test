import logo from './logo.svg';
import React from "react";
import './App.css';
import Title from "./components/Title"
import jsonLocalStorage from './components/JsonLocalStorage';
import fetchCat from './components/FetchCat';
import MainCard from './components/MainCard';
import Form from './components/Form'

//1. test
function CatItem(props) {
  return (
    <li>
      <img src={props.img} style={{ width: "150px" }} />
    </li>
  );
}

function Favorites({ favorites }) {
  // 고양이 데이터가 없으면 내가 적은 텍스트를 보여줘(조건부렌더링)
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>
  }


  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>

  );
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
const App = () => {
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 =
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  // 초기값을 리턴해준다
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });

  const [mainCat, setMainCat] = React.useState(CAT1);


  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });

  // 메인캣에 나온 고양이가 favorites에 있을때
  const alredyFavorite = favorites.includes(mainCat)





  // 앱진입시 바로 api콜을 해서 api데이터를 메인캣으로 받아오는것
  async function setInitialCat() {
    const newCat = await fetchCat('First cat');
    setMainCat(newCat);
  }
  // useEffect-> 원할때만 불릴수 있도록 설정할 수 있다. 
  //두번째 인자로 배열을 넣고 그 안에 내가 부르고 싶은순간을 넣으면 되고 
  // 맨 처음에만 호출하고 싶다 하면은 빈배열로 넣으면 된다
  React.useEffect(() => {
    setInitialCat();
  }, []);



  // 비동기처리
  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })

  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites)
  }

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title>{counterTitle}고양이</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alredyFavorite={alredyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
