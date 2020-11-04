import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeFromSaved } from "../../../actions/cartActions";
import { getUserDetails } from "../../../actions/userActions";
import Loader from "../../../Components/Loader";
import Button from "../../../Components/UI/Button/Button";

import classes from "./UserSavedItems.module.css";

const UserSavedItems = () => {
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: deleteLoading, success } = useSelector(
    (state) => state.deleteFavoriteItem
  );

  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className={`container ${classes.Saved_items_cont}`}>
          <h2>Saved items ({user.favorites.length})</h2>
          <div className={classes.Saved_item}>
            {user.favorites.map((item) => (
              <div key={item._id} className={classes.Product_container}>
                <div className={classes.Product_image}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={classes.Product_details}>
                  <h2>{item.name}</h2>
                  <p>
                    <strong>Price: $</strong>
                    {item.price}
                  </p>
                </div>

                <div className={classes.Product_action}>
                  <Button color="primary" href={`/product/${item._id}`}>
                    DETAILS
                  </Button>
                  <Button
                    onClick={() => dispatch(removeFromSaved(item._id))}
                    color="danger"
                    loading={deleteLoading}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserSavedItems;
