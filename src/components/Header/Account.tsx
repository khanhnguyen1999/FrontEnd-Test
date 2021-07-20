import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

// material core
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// material icon
import AccountCircle from '@material-ui/icons/AccountCircle';

// actions
import { actLogoutSuccess } from 'actions/auth.action'

// state
import { currentUserSelector } from 'selectors/user.selector'

function Account({ ...classes }) {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user: any = useSelector(currentUserSelector)

  const _handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleLogout = () => {
    setAnchorEl(null);
    dispatch(actLogoutSuccess())
    localStorage.removeItem("accessToken")
    history.push("/login")
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={_handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={_handleClose}
      >
        {user && <MenuItem className={classes.menuProfile}>{`${user.lastname} ${user.firstname}`}</MenuItem>}
        <MenuItem className={classes.menuProfile} onClick={_handleLogout}>
          {translate('LOGOUT')}
        </MenuItem>
      </Menu>
    </>
  );
}

export default memo(Account);
