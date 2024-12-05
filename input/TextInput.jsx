import { forwardRef, useEffect, useState } from 'react';
import { onChangeHypen, onChangePhone } from '@/common/form/checkValidateForm';
import { Icon } from '../Icon';
import { color } from 'chart.js/helpers';
export const TextInput = forwardRef(
  (
    {
      id,
      name,
      title,
      onClick,
      onFocus,
      onBlur,
      onChange,
      onKeyUp,
      onKeyDown,
      onInput,
      className,
      disabled,
      readOnly,
      defaultValue,
      value,
      placeholder,
      isPasswordType,
      isNumberType,
      isPhoneType,
      isHypenType,
      isEngKoNumType,
      maxLength,
      width,
      height,
      pattern,
      backgroundColor,
      isError,
      isErrorBorder,
      isSuccess,
      endText,
      isSearchIcon,
      isNextIcon,
      form,
      setForm,
      isCheckErr,
      setCheckErr,
      subText,
      regExpType,
    },
    ref
  ) => {
    const [isCount, setCount] = useState(0);
    const [isTyping, setTyping] = useState(false);

    useEffect(() => {
      maxLength && value && setCount(value.length);
    }, [value]);

    return (
      <div className="input-box" style={width && { width: width + 'px' }}>
        <label htmlFor={id}></label>
        <input
          spellCheck={false}
          ref={ref}
          id={id}
          name={name}
          title={title}
          onClick={onClick}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setTyping(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setTyping(false);
          }}
          onChange={(e) => {
            if (!disabled) {
              onChange && onChange(e);
              maxLength && setCount(e.target.value.length);
              setForm &&
                (isPhoneType || isHypenType
                  ? (isPhoneType && onChangePhone(e.target.value, form, setForm),
                    isHypenType &&
                    onChangeHypen(e.target.value, id, form, setForm))
                  : isNumberType
                    ? setForm({ ...form, [id]: Number(e.target.value) || '' })
                    : setForm({
                      ...form,
                      [id]: regExpType
                        ? e.target.value.replace(regExpType, '')
                        : e.target.value || '',
                    }));
              if (isCheckErr?.[id]?.state) {
                let list = isCheckErr;
                list[id].state = false;
                setCheckErr(list);
              }
            }
          }
          }
          onKeyUp={(e) => {
            onKeyUp && onKeyUp(e);
          }}
          onKeyDown={(e) => {
            onKeyDown && onKeyDown(e);
          }}
          onInput={(e) => {
            onInput && onInput(e);
          }}
          readOnly={readOnly || disabled}
          value={
            !ref
              ? form?.[id]
                ? form[id]
                : value || value === 0
                  ? value
                  : ''
              : value
          }
          defaultValue={defaultValue}
          className={`input-text ${className ? className : ''} ${isError || isErrorBorder || isCheckErr?.[id]?.state
            ? 'input--error'
            : ''
            } ${!readOnly && isTyping ? 'input--focus' : ''}`}
          type={isPasswordType ? 'password' : isNumberType ? 'number' : 'text'}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern && pattern}
          style={{
            width: width && `${width}px`,
            height: height && `${height}px`,
            backgroundColor: disabled ? "#f0f0f0" : backgroundColor && backgroundColor,
            paddingRight: endText && '30px',
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          autoComplete="off"
        />
        {isSearchIcon && (
          <Icon className="xi-search input-box__icon" onClick={onClick} />
        )}
        {isNextIcon && (
          <Icon
            className="xi-angle-right-min input-box__next-icon"
            size="20"
            onClick={onClick}
          />
        )}
        {maxLength && (
          <p className="input__count">
            {isCount}/{maxLength}
          </p>
        )}
        {isError?.length > 0 || isCheckErr?.[id]?.state ? (
          <p className="input__under input__under--error">
            {isCheckErr?.[id]?.state && isCheckErr[id]?.text}
            {isError?.length > 0 && isError}
          </p>
        ) : (
          subText && (
            <p className="input__under input__under--text">{subText}</p>
          )
        )}
        {isSuccess?.length > 0 && (
          <p className="input__under input__under--success">{isSuccess}</p>
        )}
        {endText && <span className="input__end">{endText}</span>}
      </div>
    );
  }
);
