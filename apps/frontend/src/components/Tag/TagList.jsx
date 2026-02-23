import Tag from "./Tag";
import classes from "./Tag.module.css";

const TagList = ({ list, ...props }) => {
  return (
    <ul className={classes.tags}>
      {list.map((item, index) => (
        <Tag key={index} name={item} {...props}/>
      ))}
    </ul>
  );
};

export default TagList;
