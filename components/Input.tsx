export const Input = (
  props: JSX.IntrinsicElements["input"] & { isValid: boolean; class?: string }
) => {
  return (
    <input
      disabled={props.disabled}
      className={`${
        !props.isValid ? "border-red-600" : "border-gray-400"
      } rounded-lg border flex-1 bg-gray-100 focus:outline-none focus:shadow-outline p-2 ${
        props.class
      }`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};
