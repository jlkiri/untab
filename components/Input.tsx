export const Input = (props: JSX.IntrinsicElements["input"]) => {
  return (
    <input
      className="rounded-lg border border-gray-500 focus:outline-none focus:shadow-outline p-2"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></input>
  );
};
