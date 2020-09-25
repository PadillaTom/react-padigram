import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { auth } from '../firebase';

export default function SimpleMenu({ username }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Avatar
        id='header-avatar'
        className='post-avatar'
        src='/static/images/avatar/1.jpg'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      ></Avatar>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
