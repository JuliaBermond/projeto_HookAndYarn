import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";

  const { register, handleSubmit } = useForm({
    defaultValues: { search }
  });

  function onSubmit(data) {
    if (!data.search) {
      navigate("/app/posts"); // volta para todos
      return;
    }

    navigate(`/app/posts?search=${data.search}`);
  }

  return (
    <div className={`${classes.searchWrapper} ${classes.searchForm}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search..."
          {...register("search")}
        />

        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default SearchBar;
