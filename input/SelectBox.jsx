// https://github.com/JedWatson/react-select

import { selectDown, selectUp } from '@/assets/img';
import { useState } from 'react';
import Select from 'react-select';

export const SelectBox = ({
  state,
  setState,
  options,
  placeholder,
  width,
  height,
  listHeight,
  isSearchBox,
  isSearchBorder,
  isFocus,
  isSearchable,
  isInnerBox,
}) => {
  const selectBoxStyles = {
    container: () => ({
      position: 'relative',
    }),
    control: (
      _,
      {
        menuIsOpen,
        isFocused,
        selectProps: { width, height, isSearchBox, isSearchBorder, isFocus },
      }
    ) => ({
      width: width || '100%',
      height: height || '40px',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      border:
        isFocused || isFocus
          ? '1px solid #000033'
          : isSearchBorder
          ? '1px solid #E0E0E0'
          : '1px solid #BDBDBD',
      // border: isFocus
      //   ? '1px solid #000033'
      //   : isSearchBorder
      //   ? '1px solid #E0E0E0'
      //   : '1px solid #BDBDBD',
      borderRight:
        (isSearchBorder && isFocus) || isFocused
          ? '1px solid #000033'
          : '1px solid #BDBDBD',
      cursor: 'pointer',
      overflow: 'hidden',
      background: '#fff',
      borderRadius: menuIsOpen
        ? isSearchBox
          ? '4px 0 0 0'
          : '4px 4px 0 0'
        : isSearchBox
        ? '4px 0 0 4px'
        : '4px',
      borderBottom: menuIsOpen && '1px solid #fff',
      background: `url(${menuIsOpen ? selectUp : selectDown}) ${
        width - 24
      }px no-repeat`,
    }),
    singleValue: () => ({
      fontSize: '14px',
      lineHeight: '22px',
      color: '#222222',
      gridArea: '1/1/2/3',
      marginLeft: '',
      marginRight: '2px',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#9E9E9E',
      fontSize: '14px',
      marginLeft: 0,
    }),
    valueContainer: (defaultStyles) => ({
      ...defaultStyles,
      padding: '0',
    }),
    indicatorsContainer: () => ({
      // background: `url(${selectDown}) center no-repeat`,
      // width: '20px',
      // height: '20px',
      // position: 'relative',
      // right: '14px',
      // background: isFocused && '#000',
    }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      '& svg': { display: 'none' },
    }),
    menu: (_, { selectProps: { width } }) => ({
      zIndex: 1,
      position: 'absolute',
      width: width || '100%',
      overflow: 'auto',
      borderRadius: '0 0 4px 4px',
      cursor: 'pointer',
      overflow: 'hidden',
    }),
    menuList: (_, { selectProps: { listHeight } }) => ({
      background: '#fff',
      // border: isSearchBorder
      //   ? '1px solid #E0E0E0'
      //   : isFocused
      //   ? '1px solid #000033'
      //   : '1px solid #BDBDBD',
      border: '1px solid #000033',
      borderTop: 'none',
      overflow: 'auto',
      borderRadius: '0 0 4px 4px',
      padding: '0',
      height: listHeight,
      '::-webkit-scrollbar': {
        width: '3px',
        opacity: '0',
        paddingLeft: '14px',
        left: '-14px',
        position: 'absolute',
        background: 'none',
      },
      '::-webkit-scrollbar-thumb': {
        boxShadow: 'inset 0 0 4px 4px #A0A0A0',
        background: '#fff',
        borderRadius: '100px',
      },
      '::-webkit-scrollbar-button': {
        display: 'none',
      },
      '::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 14px 14px transparent',
        border: 'solid 4px transparent',
      },
    }),

    option: (base, state) => ({
      ...base,
      background: state.isFocused ? '#ECEFF2' : '#fff',
      fontSize: '14px',
      lineHeight: '22px',
      padding: '9px 12px',
      transition: 'background 0.1s',
      color: '#222222',
      cursor: 'pointer',
      overflow: 'auto',
      '&:hover': {
        backgroundColor: '#ECEFF2',
      },
    }),
  };

  const selectBoxInnerStyles = {
    container: () => ({
      position: 'relative',
      zIndex: 1,
    }),
    control: (
      _,
      {
        menuIsOpen,
        isFocused,
        selectProps: { width, height, isSearchBox, isSearchBorder, isFocus },
      }
    ) => ({
      width: 'fit-content',
      height: height || '35px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      overflow: 'hidden',
      background: '#fff',
      borderBottom: isFocused ? '1px solid #BDBDBD' : '1px solid #fff',
      background: `url(${menuIsOpen ? selectUp : selectDown}) no-repeat`,
      backgroundSize: '10px',
      backgroundPosition: 'right center',
    }),
    singleValue: () => ({
      fontSize: '12px',
      lineHeight: '22px',
      color: '#222222',
      gridArea: '1/1/2/3',
      marginLeft: '',
      marginRight: '8px',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#9E9E9E',
      fontSize: '12px',
      marginLeft: 0,
    }),
    valueContainer: (defaultStyles) => ({
      ...defaultStyles,
      padding: '0',
    }),
    indicatorsContainer: () => ({
      // background: `url(${selectDown}) center no-repeat`,
      // width: '20px',
      // height: '20px',
      // position: 'relative',
      // right: '14px',
      // background: isFocused && '#000',
    }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      '& svg': { display: 'none' },
    }),
    menu: (_, { selectProps: { width } }) => ({
      position: 'absolute',
      width: width || '100%',
      overflow: 'auto',
      borderRadius: '0 0 4px 4px',
      cursor: 'pointer',
      overflow: 'hidden',
      boxShadow: '0px 4px 4px 0px #00003314',
    }),
    menuList: (_, { selectProps: { listHeight } }) => ({
      background: '#fff',
      border: '1px solid #E0E0E0',
      overflow: 'auto',
      borderRadius: '4px',
      marginTop: '8px',
      padding: '0',
      height: listHeight,
      '::-webkit-scrollbar': {
        width: '3px',
        opacity: '0',
        paddingLeft: '14px',
        left: '-14px',
        position: 'absolute',
        background: 'none',
      },
      '::-webkit-scrollbar-thumb': {
        boxShadow: 'inset 0 0 4px 4px #A0A0A0',
        background: '#fff',
        borderRadius: '100px',
      },
      '::-webkit-scrollbar-button': {
        display: 'none',
      },
      '::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 14px 14px transparent',
        border: 'solid 4px transparent',
      },
      '.css-nhbbvo-NoOptionsMessage2': {
        color: '#fff',
      },
    }),

    option: (base, state) => ({
      ...base,
      color: state.isFocused ? '#2B76E7' : '#9E9E9E',
      background: state.isFocused ? '#ECEFF2' : '#fff',
      fontSize: '12px',
      lineHeight: '18px',
      padding: '9px 12px',
      transition: 'background 0.1s',
      // overflow: 'auto',
      '&:hover': {
        backgroundColor: '#ECEFF2',
        color: '#2B76E7',
      },
    }),
  };
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <label>
        <Select
          maxMenuHeight={162}
          styles={isInnerBox ? selectBoxInnerStyles : selectBoxStyles}
          width={width}
          height={height}
          listHeight={listHeight}
          className="select-box"
          title={state}
          value={state}
          onChange={setState}
          options={options}
          placeholder={placeholder || '선택해주세요'}
          isSearchable={isSearchable || false}
          isSearchBox={isSearchBox}
          isSearchBorder={isSearchBorder}
          isFocus={isFocus}
          menuIsOpen={isOpen}
          onMenuOpen={() => setOpen(true)}
          onMenuClose={() => setOpen(false)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setOpen(!isOpen);
            }
          }}
          noOptionsMessage={() => (
            <p style={{ textAlign: 'left' }}>일치하는 내용이 없습니다</p>
          )}
        />
      </label>
    </>
  );
};
