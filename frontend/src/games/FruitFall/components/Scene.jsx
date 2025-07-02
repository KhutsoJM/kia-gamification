import Prop from "./Prop";

// ASSETS
import forestGround from "../../../assets/FruitFall/environment/background/forest-ground.png";

const Scene = () => {
    return (
        <>
            <Prop img={forestGround} x="0%" y="-40%" scale={1} zIndex={0} />
            {/* <Prop img={forestGround} x="0%" y="-40%" scale={1} zIndex={0} /> */}
        </>
    );
}

export default Scene;
