const Nutrition = (props) => {
    return (
        <div>
            <p><b>{props.label}</b> - {props.quantity.toFixed()} {props.unit}</p>
        </div>
    )
}
export default Nutrition;