import styles from './FormControls.css';
import classnames from 'classnames';

function FormControl({ label, required, children }) {
  const className = classnames(styles.FormControl, styles.LabelText);
  return (
    <label className={className}>
      <LabelText text={label} required={required} />
      {children}
    </label>
  );
}

export function LabelText({ text, required }) {
  const className = classnames(styles.LabelText, {
    [styles.Required]: required,
  });
  return <span className={className}>{text}</span>;
}

export function InputControl({ label, required, ...rest }) {
  return (
    <FormControl label={label} required={required}>
      <input {...rest} required={required} />
    </FormControl>
  );
}

export function TextAreaControl({ label, required, ...rest }) {
  return (
    <FormControl label={label} required={required}>
      <textarea {...rest} required={required} />
    </FormControl>
  );
}

export function SelectControl({
  label,
  required,
  children,
  placeholder,
  ...rest
}) {
  return (
    <FormControl label={label} required={required}>
      <select {...rest} required={required}>
        {placeholder && <option disabled>{placeholder}</option>}
        {children}
      </select>
    </FormControl>
  );
}

export function CheckboxControl({
  legend,
  required,
  label,
  ...rest
}) {
  return (
    <fieldset className={styles.CheckboxControl}>
      <legend>
        <LabelText text={legend} required={required} />
      </legend>
      <label>
        <input type="checkbox" {...rest} required={required} />
        {label}
      </label>
    </fieldset>
  );
}

export function FormButton({ children, icon, ...rest }) {
  const className = classnames(styles.FormButton, {
    [styles.Icon]: icon,
  });

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
