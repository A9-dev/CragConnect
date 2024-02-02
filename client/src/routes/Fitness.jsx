import {
  Box,
  Heading,
  Card,
  HStack,
  StackDivider,
  VStack,
  Text,
  Checkbox,
  Progress,
  Table,
  Tbody,
  Tr,
  Thead,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../App";
import strength from "../data/strength.json";
import flexibility from "../data/flexibility.json";

const Fitness = () => {
  const { userData } = useContext(AppContext);
  const fitnessPlan = userData.fitnessPlan;
  const dayAsNumber = new Date().getDay().toString();

  // Function to get the routine based on the day

  const sRoutine = strength[dayAsNumber];
  const sExercises = sRoutine.exercises;

  const fRoutine = flexibility[dayAsNumber];
  const fExercises = fRoutine.exercises;

  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      {fitnessPlan && (
        <>
          <Heading textAlign={"center"}>
            Today's {fitnessPlan && <>{fitnessPlan}</>} Workout:{" "}
            {fitnessPlan == "Strength" && <>{sRoutine.day}</>}
            {fitnessPlan == "Flexibility" && <>{fRoutine.day}</>}
          </Heading>
          <Progress mt={30} value={80} hasStripe size="lg" />
          <Card mt={5}>
            <Box p={5}>
              <HStack divider={<StackDivider />} justify={"space-evenly"}>
                {fitnessPlan == "Strength" &&
                  sExercises.map((exercise, index) => (
                    <VStack key={index}>
                      <Text fontSize={"xl"}>{exercise.name}</Text>
                      <Text fontSize={"sm"}>Sets: {exercise.sets}</Text>
                      <Text fontSize={"sm"}>Reps: {exercise.reps}</Text>
                      <Text fontSize={"sm"}>Rest: {exercise.rest}</Text>
                      {/* <Image src={exercise.image} alt={exercise.name} /> */}
                      <Checkbox size="lg" />
                    </VStack>
                  ))}
                {fitnessPlan == "Flexibility" &&
                  fExercises.map((exercise, index) => (
                    <VStack key={index}>
                      <Text fontSize={"xl"}>{exercise.name}</Text>
                      <Text fontSize={"sm"}>{exercise.description}</Text>
                      <Text fontSize={"sm"}>Duration: {exercise.duration}</Text>
                      <Text fontSize={"sm"}>Rest: {exercise.rest}</Text>
                      {/* <Image src={exercise.image} alt={exercise.name} /> */}
                      <Checkbox size="lg" />
                    </VStack>
                  ))}
              </HStack>
            </Box>
          </Card>
        </>
      )}

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
