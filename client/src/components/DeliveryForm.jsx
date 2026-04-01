import { useForm } from "react-hook-form";
import { DeliveryAddressSchema } from "../schemas/AddressSchema.js";
import { zodResolver } from "@hookform/resolvers/zod";

function DeliveryForm({paymentMethod}) {
  const { register, handleSubmit,formState: { errors }} = useForm({ resolver: zodResolver(DeliveryAddressSchema) });
  
  function formData(data) {
    console.log(data);
  }

  return (
    <form id="deliveryAddressForm" onSubmit={handleSubmit(formData)}>

      {/* FIRST NAME AND LAST NAME */}
      <div className="flex justify-between gap-4 mb-6">
        <div>
          {/* FIRST NAME INPUT */}
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className=" flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("firstName")}
          />
          {errors.firstName && ( <p className="text-red-500 text-sm">{errors.firstName.message}</p>)}
        </div>

        <div>
          {/* LAST NAME INPUT */}
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className=" flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("lastName")}
          />
          {errors.lastName && ( <p className="text-red-500 text-sm">{errors.lastName.message}</p>)}
        </div>
      </div>

      {/* EMAIL ADDRESS */}
      <div className="mb-6">
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-sm px-2 py-2"
          {...register("email")}
        />
        {errors.email && ( <p className="text-red-500 text-sm">{errors.email.message}</p>)}
      </div>

      {/* STREET ADDRESS */}
      <div className="mb-6">
        <input
          id="street"
          type="text"
          placeholder="Street"
          className="w-full border border-gray-300 rounded-sm px-2 py-2"
          {...register("street")}
        />
        {errors.street && ( <p className="text-red-500 text-sm">{errors.street.message}</p>)}
      </div>

      {/* CITY AND STATE */}
      <div className="flex justify-between gap-4 mb-6">
        <div>
          {/* CITY INPUT */}
          <input
            id="city"
            type="text"
            placeholder="City"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("city")}
          />
          {errors.city && ( <p className="text-red-500 text-sm">{errors.city.message}</p>)}
        </div>

        <div>
          {/* STATE INPUT */}
          <input
            id="state"
            type="text"
            placeholder="State"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("state")}
          />
          {errors.state && ( <p className="text-red-500 text-sm">{errors.state.message}</p>)}
        </div>
      </div>

      {/* ZIP CODE AND COUNTRY */}
      <div className="flex justify-between gap-4 mb-6">
        <div>
          {/* ZIP CODE INPUT */}
          <input
            id="zipcode"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="6"
            placeholder="Zip Code"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("zipcode")}
          />
          {errors.zipcode && ( <p className="text-red-500 text-sm">{errors.zipcode.message}</p>)}
        </div>

        <div>
          {/* COUNTRY INPUT */}
          <input
            id="country"
            type="text"
            placeholder="Country"
            className="flex-1 border border-gray-300 rounded-sm px-2 py-2"
            {...register("country")}
          />
          {errors.country && ( <p className="text-red-500 text-sm">{errors.country.message}</p>)}
        </div>
      </div>

      {/* PHONE NUMBER */}
      <div className="mb-6">
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="10"
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-sm px-2 py-2"
          {...register("phone")}
        />
        {errors.phone && ( <p className="text-red-500 text-sm">{errors.phone.message}</p>)}
      </div>

    </form>
  );
}

export default DeliveryForm;