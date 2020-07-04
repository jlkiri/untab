export const Input = (
  props: JSX.IntrinsicElements["input"] & { isValid: boolean }
) => {
  return (
    <input
      className={`${
        !props.isValid ? "border-red-600" : ""
      } rounded-lg border border-gray-400 flex-1 bg-gray-100 focus:outline-none focus:shadow-outline p-2`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};
