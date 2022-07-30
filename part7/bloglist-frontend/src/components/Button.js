const Button = ({ children, type, primary }) => (
  <button
    className={`p-1 rounded font-semibold text-sm border border-slate-300 focus:ring-2 ring-slate-200 ${
      !primary && 'text-slate-600'
    } ${primary && 'bg-slate-500 text-slate-50'}`}
    type={type ?? 'submit'}
  >
    {children}
  </button>
);

export default Button;
