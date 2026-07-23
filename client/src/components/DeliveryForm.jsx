import { useForm } from "react-hook-form";
import { DeliveryAddressSchema } from "../schemas/AddressSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../api/orderApi.js";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";
import { createOrder, verifyPayment } from "../api/paymentApi.js";

function DeliveryForm({
  paymentMethod,
  amount,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DeliveryAddressSchema),
  });

  async function formData(data) {
    const orderAddress = {
      ...data,
      paymentMethod,
    };

    // Stripe
    if (paymentMethod === "stripe") {
      toast.error("Payment option is currently unavailable");
      return;
    }

    // COD
    if (paymentMethod === "cod") {
      try {
        setLoading(true);

        await addOrder(orderAddress);

        toast.success("Order placed successfully");

        await getUser();

        navigate("/trendora/orders");
      } catch (err) {
        console.log(err);

        const message =
          err?.response?.data?.message ||
          "Something went wrong";

        toast.error(message);
      } finally {
        setLoading(false);
      }

      return;
    }

    // Razorpay
    if (paymentMethod === "razorpay") {
      try {
        // Loader while creating Razorpay order
        setLoading(true);

        const res = await createOrder(Number(amount));
        const { order } = res.data;

        if (!window.Razorpay) {
          setLoading(false);
          toast.error("Razorpay SDK failed to load");
          return;
        }

        // Hide loader before opening Razorpay popup
        setLoading(false);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,

          amount: order.amount,

          currency: order.currency,

          name: "Trendora",

          description: "Order Payment",

          order_id: order.id,

          handler: async function (response) {
            try {
              // Loader while verifying payment
              setLoading(true);

              const verify = await verifyPayment(response);

              if (!verify.data.success) {
                toast.error("Payment verification failed");
                return;
              }

              await addOrder(orderAddress);

              toast.success("Order placed successfully");

              await getUser();

              navigate("/trendora/orders");
            } catch (err) {
              console.log(err);

              const message =
                err?.response?.data?.message ||
                "Payment verification failed";

              toast.error(message);
            } finally {
              setLoading(false);
            }
          },

          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },

          theme: {
            color: "#3399cc",
          },

          modal: {
            ondismiss() {
              setLoading(false);
              toast.info("Payment cancelled");
            },
          },
        };

        const razor = new window.Razorpay(options);

        razor.on("payment.failed", function (response) {
          setLoading(false);

          toast.error(
            response.error.description || "Payment failed"
          );
        });

        razor.open();
      } catch (err) {
        console.log(err);

        setLoading(false);

        const message =
          err?.response?.data?.message ||
          "Something went wrong";

        toast.error(message);
      }
    }
  }

  return (
    <form
      id="deliveryAddressForm"
      onSubmit={handleSubmit(formData)}
    >
      {/* FIRST NAME & LAST NAME */}
      <div className="flex justify-between gap-4 mb-6">
        <div>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("firstName")}
          />

          {errors.firstName && (
            <p className="text-red-500 text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("lastName")}
          />

          {errors.lastName && (
            <p className="text-red-500 text-sm">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* EMAIL */}
      <div className="mb-6">
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-sm px-2 py-2"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* STREET */}
      <div className="mb-6">
        <input
          id="street"
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 rounded-sm px-2 py-2"
          {...register("street")}
        />

        {errors.street && (
          <p className="text-red-500 text-sm">
            {errors.street.message}
          </p>
        )}
      </div>

      {/* CITY & STATE */}
      <div className="flex justify-between gap-4 mb-6">
        <div>
          <input
            id="city"
            type="text"
            placeholder="City"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("city")}
          />

          {errors.city && (
            <p className="text-red-500 text-sm">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="state"
            type="text"
            placeholder="State"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("state")}
          />

          {errors.state && (
            <p className="text-red-500 text-sm">
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      {/* ZIPCODE & COUNTRY */}
      <div className="flex justify-between gap-4 mb-6">
        <div>
          <input
            id="zipcode"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Zip Code"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("zipcode")}
          />

          {errors.zipcode && (
            <p className="text-red-500 text-sm">
              {errors.zipcode.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="country"
            type="text"
            placeholder="Country"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("country")}
          />

          {errors.country && (
            <p className="text-red-500 text-sm">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      {/* PHONE */}
      <div className="mb-6">
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-sm px-2 py-2"
          {...register("phone")}
        />

        {errors.phone && (
          <p className="text-red-500 text-sm">
            {errors.phone.message}
          </p>
        )}
      </div>
    </form>
  );
}

export default DeliveryForm;