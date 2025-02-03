import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({DrawerList}:any) => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const toggleDrawer = (newOpen: any)=>() => {
    setOpen(newOpen);
    
  };

  return (
    <div className='h-[10vh] flex items-center px-5 border-b'>
      <div className='flex items-center gap-3 '>
       {!isLarge && 
        <IconButton onClick={toggleDrawer(true)} color='primary'>
        <MenuIcon color='primary' />
      </IconButton>

       }
        <h1 onClick={() => navigate("/")} className={!isLarge ? `logo text-xl cursor-pointer` : `logo text-xl ml-[4rem] cursor-pointer`}>Beau</h1>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

    </div>
  )
}

export default Navbar