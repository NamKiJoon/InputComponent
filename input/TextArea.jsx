import { forwardRef, useEffect, useRef, useState } from 'react';

export const TextArea = forwardRef(
  (
    {
      id,
      placeholder,
      width,
      height,
      fontSize,
      className,
      readOnly,
      value,
      defaultValue,
      onChange,
      maxLength,
      backgroundColor,
      isAutoResize,
    },
    ref
  ) => {
    const autoRef = useRef(null);
    const [isCount, setCount] = useState(0);

    const handleResizeHeight = () => {
      if (ref) {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
      } else if (autoRef) {
        autoRef.current.style.height = 'auto';
        autoRef.current.style.height =
          autoRef.current.scrollHeight === 60
            ? 62 + 'px'
            : autoRef.current.scrollHeight + 'px';
      }
    };

    useEffect(() => {
      isAutoResize && handleResizeHeight(); // 컴포넌트 마운트 시 초기 높이 설정
    }, [ref, autoRef, value]);

    useEffect(() => {
      if (isAutoResize) {
        if (autoRef?.current) {
          handleResizeHeight(); // autoRef가 변경될 때 높이 다시 조절
        }
      }
    }, [autoRef]);

    useEffect(() => {
      maxLength && value && setCount(value.length);
    }, [value]);

    return (
      <div
        style={{
          width: width && width + 'px',
          height: height && (maxLength ? height + 22 + 'px' : height + 'px'),
          position: 'relative',
        }}
      >
        <label>
          <textarea
            spellCheck="false"
            id={id}
            ref={isAutoResize ? (ref ? ref : autoRef) : ref}
            readOnly={readOnly}
            value={value}
            defaultValue={defaultValue}
            className={`textarea ${className ? className : ''}`}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => {
              onChange && onChange(e);
              maxLength && setCount(e.target.value.length);
              isAutoResize && handleResizeHeight();
            }}
            tabIndex={0}
            rows={1}
            style={{
              width: width && `${width}px`,
              height: height && `${height}px`,
              fontSize: fontSize && `${fontSize}px`,
              backgroundColor: backgroundColor && backgroundColor,
            }}
          ></textarea>
        </label>
        {maxLength && (
          <p className="input__count">
            {isCount}/{maxLength}
          </p>
        )}
      </div>
    );
  }
);
