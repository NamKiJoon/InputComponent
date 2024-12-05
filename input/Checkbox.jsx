export const Checkbox = ({
  id,
  filter,
  isChecked,
  onChange,
  label,
  className,
  isRadio,
  isButton,
  name,
  value,
  defaultCursor, // readonly) 포인터 커서가 필요 없을 경우
  readOnly,
}) => (
  <div
    className={`${filter ? 'checkbox-filter' : ''} ${
      isRadio ? 'checkbox-radio' : ''
    } ${isButton ? 'checkbox-button' : ''} ${
      !filter && !isRadio
        ? `checkbox-wrapper ${defaultCursor ? 'auto-cursor' : ''}`
        : ''
    } ${readOnly ? 'auto-cursor' : ''}`}
  >
    {/* <label htmlFor={id}></label> */}
    <input
      title="체크박스"
      type={isRadio ? 'radio' : 'checkbox'}
      id={id}
      value={value && value}
      checked={isChecked}
      name={name && name}
      onChange={(e) => {
        if (readOnly) return false;
        else onChange && onChange(e);
      }}
    />
    {!filter && <label htmlFor={id}></label>}
    <label
      htmlFor={id}
      className={className}
      style={{ color: readOnly && !isChecked && '#a4a6ab' }}
    >
      {label}
    </label>
  </div>
);
