import React from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Button,
  Select,
} from "@chakra-ui/react";

const Table = ({
  data,
  columns,
  currentPage,
  totalPages,
  recordsPerPage,
  setCurrentPage,
  setRecordsPerPage,
}) => {
  console.log(currentPage, totalPages, recordsPerPage);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageSizeChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Box>
      <ChakraTable variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
      <Flex mt={4} justifyContent="space-between">
        <Button
          colorScheme="teal"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Select
          maxW={"200px"}
          onChange={handlePageSizeChange}
          value={recordsPerPage}
        >
          <option value={5}>5 items por página</option>
          <option value={10}>10 items por página</option>
          <option value={15}>15 items por página</option>
          <option value={20}>20 items por página</option>
        </Select>
        <Button
          colorScheme="teal"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          isDisabled={currentPage >= totalPages}
        >
          Próximo
        </Button>
      </Flex>
    </Box>
  );
};

export default Table;
