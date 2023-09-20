import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import useSWR from "swr";
import { fetcher } from "../HelperFunction";
import { OrderDataTracking } from "../interface/Globalnterface";
import Pending from "./Pending";
import EmptyResult from "../LottieAnimation/EmptyResult";
import Completed from "./Completed";
import Processing from "./Processing";
import ProductTable from "./ProductTable";

export interface IMyOrderProps {}

export default function MyOrder(props: IMyOrderProps) {
  const { data, isLoading } = useSWR<Array<OrderDataTracking>>(
    "/api/myorders",
    fetcher
  );

  return (
    <Flex w={"90%"}>
      <Tabs isFitted w={"full"}>
        <TabList>
          <Tab>My Orders</Tab>
          <Tab>My Completed Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel w={"full"}>
            <ProductTable data={data ? data : []} />
          </TabPanel>
          <TabPanel w={"full"}>
            <Processing data={data ? data : []} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
