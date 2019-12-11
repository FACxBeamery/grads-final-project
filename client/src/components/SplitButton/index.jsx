import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core/';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const SplitButton = () => {
  const { openSplitButton, selectedIndex, options } = useSelector((state) => ({
    selectedIndex: state.dashboardReducer.selectedIndex,
    openSplitButton: state.dashboardReducer.openSplitButton,
    options: state.dashboardReducer.options,
  }));

  const dispatch = useDispatch();
  const anchorRef = useRef(null);

  //   const [open, setOpen] = React.useState(false);
  //   const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = (e) => {
    console.log(e);

    // console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    dispatch({ type: 'SET_ACTIVE_INDEX', payload: index });
    dispatch({ type: 'TOGGLE_SPLIT_BUTTON' });
  };

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_SPLIT_BUTTON' });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    dispatch({ type: 'TOGGLE_SPLIT_BUTTON' });
  };
  return (
    <Box>
      <ButtonGroup
        variant='contained'
        color='secondary'
        ref={anchorRef}
        aria-label='split button'
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          color='secondary'
          size='small'
          aria-controls={openSplitButton ? 'split-button-menu' : undefined}
          aria-expanded={openSplitButton ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={openSplitButton}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default SplitButton;
