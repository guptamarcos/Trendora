function SizeBox({ text, selectedSize, setSelectedSize }) {
  function handleSelectSize({ text }) {
    const newSelectedSize = Object.keys(selectedSize).reduce((acc, val) => {
      {
        val === text ? (acc[val] = true) : (acc[val] = false);
      }
      return acc;
    }, {});

    setSelectedSize(newSelectedSize);
  }

  return (
    <>
      {!selectedSize[text] && (
        <span
          onClick={() => handleSelectSize({ text })}
          className="flex justify-center items-center cursor-pointer px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
        >
          {text}
        </span>
      )}

      {selectedSize[text] && (
        <span className="flex justify-center items-center cursor-pointer px-4 py-2 rounded-md border border-gray-300 text-white bg-black ">
          {text}
        </span>
      )}
    </>
  );
}

export default SizeBox;