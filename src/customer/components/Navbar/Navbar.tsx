import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, {  useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { FavoriteBorder, LogoutOutlined } from "@mui/icons-material";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";



const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

 const dispatch = useAppDispatch();
 const location = useLocation();
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);
  const sellers = useAppSelector((state) => state.sellers);
  const navigate = useNavigate();
  

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };



  const becomeSellerClick = () => {
    if (sellers) { 
      navigate("/seller")
    } else navigate("/become-seller")
  }

  const handleLogout = () => {
          dispatch(performLogout())
          navigate("/")
      }
 

  return (
    <Box
      sx={{ zIndex: 2 }}
      className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80 "
    >
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={() => toggleDrawer(true)()}>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className="logo cursor-pointer text-lg md:text-2xl  text-[#00927c]"
            >
              Beau
            </h1>
          </div>

          {isLarge && (
            <ul
              className="flex it
          ems-center font-medium text-gray-800 "
            >
              {mainCategory.map((item) => (
                <li
                  onMouseLeave={() => {
                    // setSelectedCategory("")
                    setShowSheet(false);
                  }}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  className="mainCategory hover:text-[#00927c] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={()=>navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {!user.user ? (
            location.pathname === "/login" ? ( // Added condition to check if on the login page
              <Button
                variant="contained"
                startIcon={<StorefrontIcon sx={{ fontSize: "12px" }} />}
                onClick={becomeSellerClick}
              >
                Become a Seller
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )) : (
            <Button
              
               onClick={() => user.user && user.user.role === "ROLE_ADMIN" ? navigate("/admin") : navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
                // src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwc0abe627/homepage/ShopByGender/Woman.jpg"
              />
              <h1 className="font-semibold hidden lg:block">
                {user?.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          )  }

          <IconButton onClick={()=>navigate("/wishlist")}>
            <FavoriteBorder sx={{ fontSize: 29 }}
                className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart?.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon
                sx={{ fontSize: 29 }}
                className="text-gray-700"
              />
            </Badge>
          </IconButton>
          {
            user.user && (
              <IconButton onClick={() => navigate("/")}>
            <Badge badgeContent={cart?.cart?.cartItems.length} color="primary">
              <LogoutOutlined
                sx={{ fontSize: 29 }}
                className="text-gray-700"
                onClick={handleLogout}
              />
            </Badge>
          </IconButton>

            )
          }
          {isLarge && user?.user?.role !== "ROLE_ADMIN" && !sellers && (
  <Button
    onClick={becomeSellerClick}
    startIcon={<StorefrontIcon />}
    variant="outlined"
  >
    Become a Seller
  </Button>
)}

        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>
      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[4.41rem] left-20 right-20 "
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
