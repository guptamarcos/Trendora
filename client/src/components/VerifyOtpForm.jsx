import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useRef, useState } from "react";

// STYLES

const styles = {
  form: `
    w-full max-w-[440px]
    bg-white
    border border-gray-200
    shadow-2xl
    rounded-2xl
    px-8 py-10
  `,

  otpInput: `
    w-full h-14
    text-center
    text-xl font-semibold
    border-2 border-gray-300
    rounded-xl
    outline-none
    transition
    focus:border-amber-400
    focus:shadow-md
  `,

  button: `
    w-full
    text-base
    bg-amber-400
    hover:bg-amber-500
    active:scale-[0.98]
    transition
    cursor-pointer
    py-3
    rounded-xl
    font-semibold
    shadow-md
  `,

  secondaryBtn: `
    w-full
    text-base
    border border-gray-300
    hover:bg-gray-100
    transition
    cursor-pointer
    py-3
    rounded-xl
    font-semibold
  `,
};

function BackBtn() {
  return (
    <Link
      to="/trendora"
      className="
        absolute top-8 left-8
        px-4 py-2
        rounded-xl
        border border-gray-300
        flex items-center gap-2
        bg-white
        shadow-sm
        hover:bg-gray-100
        transition
      "
    >
      <FaArrowLeft />
      Back
    </Link>
  );
}

function VerifyOtpForm() {
  const [otp, setOtp] = useState(
    new Array(6).fill("")
  );
  
  const inputRefs = useRef([]);

  // HANDLE INPUT CHANGE
  function handleChange(value, index) {
    // allow only numbers
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // move to next input
    if (
      value &&
      index < inputRefs.current.length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // HANDLE BACKSPACE
  function handleKeyDown(e, index) {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  // HANDLE PASTE
  function handlePaste(e) {
    const pastedData = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData
      .slice(0, 6)
      .split("");

    const updatedOtp = [...otp];

    digits.forEach((digit, i) => {
      updatedOtp[i] = digit;
    });

    setOtp(updatedOtp);

    const focusIndex =
      digits.length >= 6
        ? 5
        : digits.length;

    inputRefs.current[focusIndex]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const finalOtp = otp.join("");

    console.log(finalOtp);
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {/* HEADING */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Verify OTP
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Enter the 6-digit code sent to
            your email
          </p>
        </div>

        {/* OTP INPUTS */}
        <div
          className="grid grid-cols-6 gap-3 mt-8"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) =>
                (inputRefs.current[index] =
                  el)
              }
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className={styles.otpInput}
            />
          ))}
        </div>

        {/* TIMER */}
        <p className="text-center text-sm text-gray-500 mt-5">
          OTP expires in{" "}
          <span className="font-semibold text-red-500">
            05:00
          </span>
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-7">
          <button
            type="submit"
            className={styles.button}
          >
            Verify OTP
          </button>

          <button
            type="button"
            className={styles.secondaryBtn}
          >
            Resend
          </button>
        </div>
      </form>

      <BackBtn />
    </main>
  );
}

export default VerifyOtpForm;