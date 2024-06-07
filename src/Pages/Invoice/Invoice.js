import React, { useContext } from "react";
import "./Invoice.css";
import { ThemeContext } from "../../Contexts/ThemeContext";

const Invoice = ({
  invoiceRef,
  reservationId,
  customerDetails,
  reservationDetails,
  charges,
  selectedVehicle,
}) => {
  return (
    <div className="hidden">
      <div ref={invoiceRef} className="invoice mt-[40px]">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between">
            <div className="w-1/2">
              <h1 className="text-xl font-bold">CH Car Place Inc</h1>
              <p className="text-sm">162 Bergen st</p>
              <p className="text-sm">Brooklyn, NY 11213</p>
              <p className="text-sm">Ph: 01232123122    </p>
            </div>
            <div className="w-1/2 text-right">
              <p className="text-base font-bold">#{reservationId}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-4">
            <div className="w-1/2">
              <h2 className="text-lg font-bold">RENTER INFO</h2>
              <p className="text-sm">{customerDetails?.first_name+" "+customerDetails?.last_name}</p>
              <p className="text-sm">{customerDetails?.email}</p>
              <p className="text-sm">PH: {customerDetails?.phone}</p>
            </div>
            <div className="w-12/2 text-right">
              <div className="grid grid-cols-2">
                <p className="text-sm">Date In:</p>
                <p className="text-sm"> {reservationDetails?.pickup}</p>
                <p className="text-sm">Date Out:</p>
                <p className="text-sm "> {reservationDetails?.returnDate}</p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="w-full mb-4">
            <h2 className="text-lg font-bold">UNIT DETAILS</h2>
            <p className="text-sm">
              Unit: {selectedVehicle?.make} {selectedVehicle?.model}{" "}
              {selectedVehicle?.year}
            </p>
            <p className="text-sm">
              Make & Model: {selectedVehicle?.make} {selectedVehicle?.model}
            </p>
            <p>Features:</p>
            <ul>
            {selectedVehicle?.features.map((feature,i)=><li>
                {i+1}. {feature}
            </li>)}
            </ul>
          </div>
          <hr className="my-4" />
          <div className="w-full mb-4">
            <h2 className="text-lg font-bold">CHARGE SUMMARY</h2>
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {reservationDetails?.hour > 0 && (
                  <tr>
                    <td className="px-4 py-2">Hourly x{reservationDetails?.hour}</td>
                    <td className="px-4 py-2">
                      $ {selectedVehicle?.rates?.hourly*reservationDetails?.hour}
                    </td>
                  </tr>
                )}
                {reservationDetails?.day > 0 && (
                  <tr>
                    <td className="px-4 py-2">Daily x{reservationDetails?.day}</td>
                    <td className="px-4 py-2">
                      $ {selectedVehicle?.rates?.daily*reservationDetails?.day}
                    </td>
                  </tr>
                )}
                {reservationDetails?.week > 0 && (
                  <tr>
                    <td className="px-4 py-2">Weekly x{reservationDetails?.week}</td>
                    <td className="px-4 py-2">
                      $ {selectedVehicle?.rates?.weekly*reservationDetails?.week}
                    </td>
                  </tr>
                )}

                <tr>
                  <td className="px-4 py-2">Discount</td>
                  <td className="px-4 py-2">
                    -{reservationDetails?.discount||0}%
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">EST TOTAL TIME & MILAGE</td>
                  <td className="px-4 py-2">
                    ${" "}
                    {charges?.subtotal -
                      charges?.subtotal *
                        (reservationDetails?.discount / 100) || 0}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2">Damages</td>
                  <td className="px-4 py-2">
                    ${" "}
                    {(reservationDetails?.collisionDamage ? 9 : 0) +
                      (reservationDetails?.liabilityInsurance ? 15 : 0)}
                  </td>
                </tr>
                {reservationDetails?.rentalTax > 0 && (
                  <tr>
                    <td className="px-4 py-2">NYS State Tax</td>
                    <td className="px-4 py-2">11.5%</td>
                  </tr>
                )}
                <tr>
                  <td className="px-4 py-2">Traffic tickets</td>
                  <td className="px-4 py-2">$0.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">TOTAL ESTIMATED CHARGES</td>
                  <td className="px-4 py-2">$ {charges?.total}</td>
                </tr>
                {/* Add rows for renter payments here */}
              </tbody>
            </table>
          </div>
          Your rental agreement offers, for an additional charge, an optional
          waiver to cover all or a part of your responsibility for damage to or
          loss of the vehicle: Before deciding whether to purchase the walver,
          you may wish to determine whether your own automobile insurance or
          credit card agreement o provides you coverage for rental vehicle
          damage or loss and determine the amount of the deductible under your
          own insurance coverage. The purchase of the waiver is not mandatory.
          The waiver is not Insurance. I acknowledge that I have received and
          read a copy of this.<br/><br/><br/><hr className="w-[200px]"/> Renters Signature <br/><br/><br/><hr className="w-[200px]"/> Additional Driver 1
        </div>
      </div>
    </div>
  );
};

export default Invoice;
