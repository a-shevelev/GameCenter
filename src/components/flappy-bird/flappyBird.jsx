import "./flappyBird.css";
import Game from "./components/Game";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function FlappyBird() {
  return (
    <div className="flappy_bird">
      <Provider store={store}>
        <Game></Game>
      </Provider>
    </div>
  );
}

export default FlappyBird;
