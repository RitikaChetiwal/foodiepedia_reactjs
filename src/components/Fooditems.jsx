import Styles from '../modular_css/Fooditems.module.css';

export const Fooditems = (props) => {
  // console.log(props);
  // console.log(props.item.food.label);

  return (
    <>
      <div className={Styles.itemsCont}>
        <div className={Styles.recipe}>
          <img src={props.item.food.image} className={Styles.image} alt="" />
          <h3>{props.item.food.label}</h3>

          <ul>
            <span>Nutritional Values:</span>
            <li>CHOCDF : {props.item.food.nutrients.CHOCDF}</li>
            <li>ENERC_KCAL : {props.item.food.nutrients.ENERC_KCAL}</li>
            <li>FAT : {props.item.food.nutrients.FAT}</li>
            <li>FIBTG : {props.item.food.nutrients.FIBTG}</li>
            <li>PROCNT : {props.item.food.nutrients.PROCNT}</li>
          </ul>

        </div>
      </div>

    </>
  )
}
