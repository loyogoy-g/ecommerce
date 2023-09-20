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
          <Tab>Pending</Tab>
          <Tab>Processing</Tab>
          <Tab>Completed</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Pending data={data ? data : []} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
