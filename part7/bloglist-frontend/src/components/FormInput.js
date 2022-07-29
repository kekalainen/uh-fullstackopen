import PropTypes from 'prop-types';

const FormInput = ({ label, value, placeholder, required, onChange }) => (
  <label>
    {label}{' '}
    <input
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    ></input>
  </label>
);

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default FormInput;
