import * as React from "react";
import { Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@molecules/Header";
import Transactions from "@organisms/Transactions";

const queryClient = new QueryClient();

const IndexPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Header />
        <Transactions />
      </Box>
    </QueryClientProvider>
  );
};

export default IndexPage;
