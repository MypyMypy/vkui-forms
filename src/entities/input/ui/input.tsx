export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const classes = [
    'vkuiText',
    'vkuiText--sizeY-none',
    'vkuiInput__el',
    'vkuiInput--sizeY-none',
  ];
  if (props.className) classes.push(props.className);

  return <input className={classes.join(' ')} {...props} />;
};
