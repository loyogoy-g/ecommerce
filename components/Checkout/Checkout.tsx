import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Text,
  Button,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
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
import { useStepperCart } from "@/storage";
import Billing from "./Billing";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout(props: CheckoutProps) {
  const { index, setIndex } = useStepperCart();
  const steps = [
    { title: "First", description: "Product Cart" },
    { title: "Second", description: "Shopping Information" },
    { title: "Third", description: "Complete Order" },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: index,
    count: steps.length,
  });
  const activeStepText = steps[index].description;
  const { isOpen, onClose } = props;
  const { isOpen: open, onClose: close, onOpen } = useDisclosure();

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
              Step {activeStep + 1}: <b>{activeStepText}</b>
            </Text>
            <Flex mt={2} flexDir={"column"} w={"100%"}>
              {index === 0 && <ProductsOnCart onOpen={onOpen} />}
              {index === 1 && <Billing />}
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
