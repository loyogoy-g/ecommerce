import React from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { Button, ButtonProps } from "@chakra-ui/react";

interface PostcodeProps {
  buttonProps?: ButtonProps;
  handle: (data: Address) => void;
}

const Postcode: React.FC<PostcodeProps> = ({ buttonProps, handle }) => {
  const open = useDaumPostcodePopup();

  const handleClick = () => {
    open({ onComplete: handle, alwaysShowEngAddr: true });
  };

  return (
    <Button {...buttonProps} type="button" onClick={handleClick}>
      {buttonProps?.children}
    </Button>
  );
};

export default Postcode;
