import React, { useContext, useRef, useState } from "react";
import "./Reservation.css";
import { ThemeContext } from "../../Contexts/ThemeContext";
import Invoice from "../Invoice/Invoice";
import ReactToPrint from "react-to-print";

const Reservation = () => {
  const { products } = useContext(ThemeContext);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collisionDamage, setCollisionDamage] = useState(false);
  const [liabilityInsurance, setLiabilityInsurance] = useState(false);
  const [rentalTax, setRentalTax] = useState(false);
  const invoiceRef = useRef();
  const getUniqueVehicleTypes = (vehicles) => {
    const types = vehicles?.map((vehicle) => vehicle.type);
    return [...new Set(types)]; // Get unique types
  };

  const uniqueVehicleTypes = getUniqueVehicleTypes(products?.data);

  const vehicleList = products?.data?.filter((car) => car.type === vehicleType);
  const reservationId = Math.floor(10000 + Math.random() * 90000);

  const selectedVehicle = products?.data?.find(
    (car) =>
      car.type === vehicleType &&
      car.model === vehicle.split(" ")[2] &&
      car.make === vehicle.split(" ")[1] &&
      car.year == vehicle.split(" ")[0]
  );

  const subtotal =
    week * selectedVehicle?.rates?.weekly +
    hour * selectedVehicle?.rates?.hourly +
    day * selectedVehicle?.rates?.daily;
  const total =
    subtotal +
    (rentalTax ? subtotal * 0.115 : 0) +
    (collisionDamage ? 9 : 0) +
    (liabilityInsurance ? 15 : 0) -
    subtotal * (discount / 100);

  const customerDetails = { first_name, last_name, email, phone };
  const reservationDetails = {
    reservationId,
    pickup,
    returnDate,
    week,
    day,
    hour,
    discount,
    collisionDamage,
    liabilityInsurance,
    rentalTax,
  };
  const charges = { subtotal, total };

  return (
    <div className="reservation-container w-[70%] mx-auto mb-[120px] mt-[60px]">
      <div className="mb-[60px] flex justify-between items-center">
        <p className="text-3xl font-bold">Reservation</p>
        <Invoice
          customerDetails={customerDetails}
          reservationId={reservationId}
          reservationDetails={reservationDetails}
          charges={charges}
          invoiceRef={invoiceRef}
          selectedVehicle={selectedVehicle}
        ></Invoice>
        <ReactToPrint
          trigger={() => (
            <button className="ml-2 px-4 py-2 bg-[#000] text-[#fff] rounded hover:bg-[#ff0000] ease-in-out duration-200">
              Print / Download
            </button>
          )}
          content={() => invoiceRef.current}
        ></ReactToPrint>
      </div>

      <form>
        <div className="flex gap-10 w-[100%]">
          <div className="w-[30%]">
            <p>Reservation Details</p>
            <hr className="mb-6 mt-2 border border-[#cccccc]"></hr>

            <p>Reservation Id</p>
            <input
              value={reservationId}
              readOnly
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />

            <p>Pickup Date</p>
            <input
              onChange={(e) => setPickup(e.target.value)}
              type="date"
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />

            <p>Return Date</p>
            <input
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />

            <div className="flex w-[100%] gap-4 my-4 items-center">
              <p>Duration</p>
              <input
                onChange={(e) => setWeek(e.target.value)}
                type="number"
                min="0"
                placeholder="Week"
                className="border p-2 w-[30%] border-[#cccccc]"
              />
              <input
                onChange={(e) => setDay(e.target.value)}
                type="number"
                min="0"
                placeholder="Day"
                className="border p-2 w-[30%] border-[#cccccc]"
              />
              <input
                onChange={(e) => setHour(e.target.value)}
                type="number"
                min="0"
                placeholder="Hour"
                className="border p-2 w-[30%] border-[#cccccc]"
              />
            </div>

            <p>Discount (%)</p>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />
          </div>
          <div className="w-[30%]">
            <p>Customer Information</p>
            <hr className="mb-6 mt-2 border border-[#cccccc]"></hr>

            <p>First Name</p>
            <input
              onChange={(e) => setFirst_Name(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />

            <p>Last Name</p>
            <input
              onChange={(e) => setLast_Name(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />

            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />

            <p>Phone</p>
            <input
              type="number"
              min="0"
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            />
          </div>
          <div className="w-[30%]">
            <p>Charges Summary </p>
            <hr className="mb-6 mt-2 border border-[#cccccc]"></hr>
            <div className="bg-[#bcbcbc] p-4">
              <div className="flex justify-between">
                <p className="w-[50px]">Charge</p>
                <p>Unit</p>
                <p>Rate</p>
                <p className="w-[50px]">Total</p>
              </div>
              {week > 0 && (
                <div className="flex justify-between">
                  <p className="w-[50px]">Weekly</p>
                  <p>{week}</p>
                  <p>$ {selectedVehicle?.rates?.weekly || 0}</p>
                  <p className="w-[50px]">$ {selectedVehicle?.rates?.weekly * week || 0}</p>
                </div>
              )}

              {hour > 0 && (
                <div className="flex justify-between">
                  <p className="w-[50px]">Hourly</p>
                  <p>{hour}</p>
                  <p>$ {selectedVehicle?.rates?.hourly || 0}</p>
                  <p className="w-[50px]">$ {selectedVehicle?.rates?.hourly * hour || 0}</p>
                </div>
              )}

              {day > 0 && (
                <div className="flex justify-between">
                  <p className="w-[50px]">Daily</p>
                  <p>{day}</p>
                  <p>$ {selectedVehicle?.rates?.daily || 0}</p>
                  <p className="w-[50px]">$ {selectedVehicle?.rates?.daily * day || 0}</p>
                </div>
              )}

              <div className="flex justify-between">
                <p className="w-[150px]">Discount</p>
                <p className="w-[50px]">{discount||0}%</p>
              </div>
              <div className="flex justify-between mb-10">
                <p className="w-[150px]">Subtotal</p>
                <p className="w-[50px]">$ {subtotal - subtotal * (discount / 100) || 0}</p>
              </div>

              {collisionDamage > 0 && (
                <div className="flex justify-between">
                  <p className="w-[150px]">Collision Damage Waiver</p>
                  <p className="w-[50px]">$ 9.0</p>
                </div>
              )}
              {liabilityInsurance > 0 && (
                <div className="flex justify-between">
                  <p className="w-[150px]">Liability Insurance</p>
                  <p className="w-[50px]">$ 15.0</p>
                </div>
              )}

              {rentalTax > 0 && (
                <div className="flex justify-between">
                  <p className="w-[150px]">Rental Tax</p>
                  <p className="w-[50px]">11.5%</p>
                </div>
              )}
              <div className="flex justify-between ">
                <p className="w-[150px]">Total</p>
                <p className="w-[50px]">$ {Math.floor(total) || 0}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 w-[100%] mt-10">
          <div className="w-[30%]">
            <p>Reservation Details</p>
            <hr className="mb-6 mt-2 border border-[#cccccc]"></hr>

            <p>Vehicle Type</p>
            <select
              onChange={(e) => setVehicleType(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            >
              <option>Choose vehicle type </option>
              {uniqueVehicleTypes?.map((type) => (
                <option>{type}</option>
              ))}
            </select>

            <p>Vehicle</p>
            <select
              onChange={(e) => setVehicle(e.target.value)}
              className="border border-[#cccccc] w-[100%] p-2 my-2"
            >
              {vehicleList?.length > 0 ? (
                <option>Please select vehicle</option>
              ) : (
                <option>Please select vehicle type first</option>
              )}
              {vehicleList?.map((car) => (
                <option>
                  {car.year} {car.make} {car.model}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[30%]">
            <p>Additional Charges </p>
            <hr className="mb-6 mt-2 border border-[#cccccc]"></hr>
            <div className="w-[100%]">
              <div className="flex">
                <input
                  onClick={() => setCollisionDamage(!collisionDamage)}
                  type="checkbox"
                  className="mr-2"
                />{" "}
                Collision Damage waiver
                <p className="ms-auto">$9.00</p>
              </div>
              <div className="flex">
                <input
                  onClick={() => setLiabilityInsurance(!liabilityInsurance)}
                  type="checkbox"
                  className="mr-2"
                />{" "}
                Liability Insurance $15.00
                <p className="ms-auto">$15.00</p>
              </div>
              <div className="flex">
                <input
                  onClick={() => setRentalTax(!rentalTax)}
                  type="checkbox"
                  className="mr-2"
                />{" "}
                Rental Tax
                <p className="ms-auto">11.5%</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
