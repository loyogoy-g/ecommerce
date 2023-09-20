import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import ProductSummary from "./ProductSummary";
import ProductsOnCart from "./ProductsOnCart";
import ModalLogin from "./ModalLogin";
import { useCustomerData, useStepperCart } from "@/storage";
import Billing from "./Billing";
import { useSession } from "next-auth/react";
import BillingLogged, { Ing } from "./BillingLogged";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "../HelperFunction";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout(props: CheckoutProps) {
  const { index, setIndex } = useStepperCart();
  const { data, status } = useSession();
  const steps = [
    { title: "First", description: "Product Cart" },
    { title: "Second", description: "Shopping Information" },
    //{ title: "Third", description: "Complete Order" },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: index,
    count: steps.length,
  });
  const activeStepText = steps[index].description;
  const { isOpen, onClose } = props;
  const { isOpen: open, onClose: close, onOpen } = useDisclosure();

  const { data: customerData, isLoading } = useSWR<{
    result: { billing: Ing };
  }>("/api/customer", fetcher, {
    refreshInterval: 3000,
  });

  const billing: Ing = customerData?.result.billing as Ing;

  const { setcustomer_data } = useCustomerData();

  useEffect(() => {
    !isLoading &&
      setcustomer_data({
        billing: {
          ...billing,
        },
        payment_method: "",
        payment_method_title: "",
        shipping: {
          ...billing,
        },
        line_items: [],
      });
  }, [isLoading]);

  return (
    <Drawer isOpen={isOpen} placement="right" size={"lg"} onClose={onClose}>
      <ModalLogin isOpen={open} onClose={close} />
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Checkout Cart
          </Text>
        </DrawerHeader>

        <DrawerBody>
          <Flex flexDir={"column"} w={"100%"}>
            <Stepper size="xs" index={index} gap="0">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus complete={<StepIcon />} />
                  </StepIndicator>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Text>
              Step {index + 1}: <b>{activeStepText}</b>
            </Text>
            <Flex mt={2} flexDir={"column"} w={"100%"}>
              {index === 0 && <ProductsOnCart onOpen={onOpen} />}
              {index === 1 && <BillingLogged mainOnclose={onClose} />}
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
