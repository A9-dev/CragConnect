import {
  Box,
  Heading,
  Card,
  HStack,
  StackDivider,
  VStack,
  Text,
  Image,
  Checkbox,
  Progress,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Table,
  Tbody,
  Tr,
  Thead,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

const Fitness = () => {
  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      <Heading textAlign={"center"}>Today's Workout</Heading>
      <Progress mt={30} value={80} hasStripe size="lg" />
      <Card mt={5}>
        <Box p={5}>
          <HStack divider={<StackDivider />} justify={"space-evenly"}>
            <VStack>
              <Text fontSize={"xl"}>Exercise 1</Text>
              <Text fontSize={"sm"}>3 sets of 8-12 reps</Text>
              <Text fontSize={"sm"}>Rest: 2 minutes</Text>
              <Image
                src="https://via.placeholder.com/150"
                alt="Placeholder Image"
              />
              <Checkbox size="lg" />
            </VStack>
            <VStack>
              <Text>Exercise 2</Text>
              <Text fontSize={"sm"}>3 sets of 8-12 reps</Text>
              <Text fontSize={"sm"}>Rest: 2 minutes</Text>
              <Image
                src="https://via.placeholder.com/150"
                alt="Placeholder Image"
              />
              <Checkbox size="lg" />
            </VStack>
            <VStack>
              <Text>Exercise 3</Text>
              <Text fontSize={"sm"}>3 sets of 8-12 reps</Text>
              <Text fontSize={"sm"}>Rest: 2 minutes</Text>
              <Image
                src="https://via.placeholder.com/150"
                alt="Placeholder Image"
              />
              <Checkbox size="lg" />
            </VStack>
            <VStack>
              <Text>Exercise 4</Text>
              <Text fontSize={"sm"}>3 sets of 8-12 reps</Text>
              <Text fontSize={"sm"}>Rest: 2 minutes</Text>
              <Image
                src="https://via.placeholder.com/150"
                alt="Placeholder Image"
              />
              <Checkbox size="lg" />
            </VStack>
            <VStack>
              <Text>Exercise 5</Text>
              <Text fontSize={"sm"}>3 sets of 8-12 reps</Text>
              <Text fontSize={"sm"}>Rest: 2 minutes</Text>
              <Image
                src="https://via.placeholder.com/150"
                alt="Placeholder Image"
              />
              <Checkbox size="lg" />
            </VStack>
          </HStack>
        </Box>
      </Card>

      <VStack mt={5}>
        <Heading>Leaderboard</Heading>
        <TableContainer w={"35%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th isNumeric>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>John Doe</Td>
                <Td isNumeric>5</Td>
              </Tr>
              <Tr>
                <Td>Jane Doe</Td>
                <Td isNumeric>4</Td>
              </Tr>
              <Tr>
                <Td>Joe Schmoe</Td>
                <Td isNumeric>2</Td>
              </Tr>
              <Tr>
                <Td>Jill Schmill</Td>
                <Td isNumeric>1</Td>
              </Tr>
              <Tr>
                <Td>Jack Black</Td>
                <Td isNumeric>0</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
};

export default Fitness;
