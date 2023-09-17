import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Searchbar from "./Searchbar";
import logo from "../../../assets/images/logo.png";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";
import SecondaryDropDownMenu from "./SecondaryDropDownMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  return (
    <header className='bg-primary-darkBlue fixed top-0 py-2.5 w-full z-10'>
      {/* <!-- navbar container --> */}
      <div className='w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative'>
        {/* <!-- logo & search container --> */}
        <div className='flex flex-1 items-center mr-5'>
          <Link className='h-14 mr-1 sm:mr-5' to='/'>
            <img
              draggable='false'
              className='h-full w-full object-contain'
              src='data:image/png;base64,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'
              alt='ecommerce-app Logo'
            />
          </Link>
        </div>

        {/* <!-- logo & search container --> */}
        <div className='flex flex-1 justify-between items-center mr-10'>
          <Searchbar />
        </div>
        {/* <!-- logo & search container --> */}

        {/* <!-- right navs --> */}
        <div className='flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative bg-red-5'>
          {togglePrimaryDropDown && (
            <PrimaryDropDownMenu
              setTogglePrimaryDropDown={setTogglePrimaryDropDown}
              user={user}
            />
          )}

          {/* <span
            className='moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer'
            onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}
          >
            More
            <span>
              {toggleSecondaryDropDown ? (
                <ExpandLessIcon sx={{ fontSize: "16px" }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: "16px" }} />
              )}
            </span>
          </span> */}

          {/* {toggleSecondaryDropDown && <SecondaryDropDownMenu />} */}

          <Link
            to='/cart'
            className='flex items-center text-white font-medium gap-2 relative'
          >
            <span>
              <ShoppingCartIcon />
            </span>
            {cartItems.length > 0 && (
              <div className='w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border'>
                {cartItems.length}
              </div>
            )}
            Cart
          </Link>

          {isAuthenticated === false ? (
            <Link
              to='/login'
              className='px-3 sm:px-9 py-0.5 text-white border font-medium rounded-sm cursor-pointer'
            >
              Login
            </Link>
          ) : (
            <span
              className='userDropDown flex items-center text-white font-medium gap-1 cursor-pointer'
              onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
            >
              {user.name && user.name.split(" ", 1)}
              <span>
                {togglePrimaryDropDown ? (
                  <ExpandLessIcon sx={{ fontSize: "16px" }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                )}
              </span>
            </span>
          )}
        </div>
        {/* <!-- right navs --> */}
      </div>
      {/* <!-- navbar container --> */}
    </header>
  );
};

export default Header;
