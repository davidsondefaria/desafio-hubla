import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Flex } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import UploadModal from "@molecules/UploadModal";
import Table from "@molecules/Table";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    id: "header_id",
  }),
  columnHelper.accessor("type", {
    header: "Type",
  }),
  columnHelper.accessor("date", {
    header: "Date",
  }),
  columnHelper.accessor("product", {
    header: "Product",
  }),
  columnHelper.accessor("value", {
    header: "Value",
  }),
  columnHelper.accessor("vendor", {
    header: "Vendor",
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
  }),
];

const Transactions = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["transactions", currentPage, recordsPerPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/transactions?page=${currentPage}&limit=${recordsPerPage}`
      );
      return response.json();
    },
  });

  const closeModalAndRefetch = () => {
    setModalOpen(false);
    refetch();
  };

  return (
    <Box p={4} m={10}>
      <Flex mb={4} justifyContent="flex-end">
        <Button colorScheme="teal" onClick={() => setModalOpen(true)}>
          Insira o arquivo de Transações
        </Button>
      </Flex>
      <UploadModal isOpen={isModalOpen} onClose={closeModalAndRefetch} />
      {isError && "An error occurred fetching Transactions"}
      {isLoading
        ? "Loading..."
        : !isError && (
            <Table
              data={data.data || []}
              columns={columns}
              currentPage={currentPage}
              totalPages={data.totalPages}
              recordsPerPage={recordsPerPage}
              setCurrentPage={setCurrentPage}
              setRecordsPerPage={setRecordsPerPage}
            />
          )}
    </Box>
  );
};

export default Transactions;
