function Heading({ textGray, textBlack, fontSize }) {
  return (
    <h2 className={`my-6 sm:my-8 flex items-center font-semibold ${fontSize}`}>
      <span className="text-gray-500">{textGray}</span>&nbsp;
      <span>{textBlack}</span>&nbsp;
      <hr className="w-10 sm:w-[20%] border-t-2 border-black" />
    </h2>
  );
}

export default Heading;