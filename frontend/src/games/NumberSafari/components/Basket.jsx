import { useDroppable } from "@dnd-kit/core"
import basket from '../../../assets/numberSafari/wooden-bucket.png'

const Basket = ({ acceptType, onDrop }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: acceptType,
        data: { acceptType },
    })

    // console.log(`Basket accepts: ${acceptType}`);

    return (
        <div ref={setNodeRef}>
            <img src={basket} alt="Basket" style={{
                height: '40px',
                width: 'auto',
                transition: 'transform 0.3s',
                transform: isOver ? 'scale(1.25)' : 'scale(1)',
                filter: isOver ? 'drop-shadow(0 0 6px limegreen)' : 'none',
            }} />
        </div>
    )

}

export default Basket