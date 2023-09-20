import Postcode from "@/components/PostCode/Postcode";
import React from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

const Data = () => {
  return (
    <Postcode
      buttonProps={{ colorScheme: "blue" }}
      handle={(data) => console.log(data)}
    />
  );
};

export default Data;
