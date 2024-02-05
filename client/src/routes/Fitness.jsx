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
  useColorModeValue,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import strength from "../data/strength.json";
import flexibility from "../data/flexibility.json";
import { increaseFitnessScore } from "../dbFunctions";

const Fitness = () => {
  const { userData, exercisesDone, setExercisesDone, username } =
    useContext(AppContext);
  const fitnessPlan = userData.fitnessPlan;
  const dayAsNumber = new Date().getDay().toString();
  const isDarkMode = useColorModeValue(false, true);
  const [errorMessage, setErrorMessage] = useState("");

  const sRoutine = strength[dayAsNumber];
  const sExercises = sRoutine.exercises;

  const fRoutine = flexibility[dayAsNumber];
  const fExercises = fRoutine.exercises;

  const numExercises =
    fitnessPlan == "Strength" ? sExercises.length : fExercises.length;

  const handleLogWorkout = () => {
    console.log("Handling workout!");
    increaseFitnessScore(username)
      .then((res) => {
        console.log("Increased fitness score!", res);
      })
      .catch((err) => {
        console.log("Error increasing fitness score!", err);
        if (err.data.message == "User already worked out today") {
          setErrorMessage("You've already logged your workout for today.");
          // TODO: improve this alert
        }
      });
  };

  useEffect(() => {
    setExercisesDone(0); // Reset exercisesDone to 0 when the page is loaded
  }, []);

  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      {fitnessPlan && (
        <>
          <Heading textAlign={"center"}>
            Today's {fitnessPlan && <>{fitnessPlan}</>} Workout:{" "}
            {fitnessPlan == "Strength" && <>{sRoutine.day}</>}
            {fitnessPlan == "Flexibility" && <>{fRoutine.day}</>}
          </Heading>
          {errorMessage && (
            <Alert status="error" mt={5}>
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          <Progress
            mt={30}
            value={(exercisesDone * 100) / numExercises}
            hasStripe
            size="lg"
          />
          {/* If fitnessPlan is strength then show button when exercisesDone is sExercises.length */}
          {/* If fitnessPlan is flexibility then show button when exercisesDone is fExercises.length */}

          {exercisesDone == numExercises && (
            <Card bg={isDarkMode ? "green.800" : "green.100"} p={15} m={5}>
              <VStack mt={5}>
                <Heading size="lg">
                  Great job! You've completed your workout for today!
                </Heading>
                <Text>Would you like to log your workout?</Text>
                <Button size="lg" onClick={handleLogWorkout}>
                  Log Workout
                </Button>
              </VStack>
            </Card>
          )}

          <Card mt={5}>
            <Box p={5}>
              <HStack divider={<StackDivider />} justify={"space-evenly"}>
                {fitnessPlan == "Strength" &&
                  sExercises.map((exercise, index) => (
                    <VStack key={index}>
                      <Text fontSize={"xl"}>{exercise.name}</Text>
                      {exercise.sets && (
                        <Text fontSize={"sm"}>Sets: {exercise.sets}</Text>
                      )}
                      {exercise.reps && (
                        <Text fontSize={"sm"}>Reps: {exercise.reps}</Text>
                      )}
                      {exercise.rest && (
                        <Text fontSize={"sm"}>Rest: {exercise.rest}</Text>
                      )}
                      {exercise.description && (
                        <Text fontSize={"sm"}>{exercise.description}</Text>
                      )}
                      {/* <Image src={exercise.image} alt={exercise.name} /> */}
                      {index <= exercisesDone && (
                        <Checkbox
                          size="lg"
                          onChange={(event) => {
                            console.log(
                              "Setting exercisesDone to",
                              exercisesDone + (event.target.checked ? 1 : -1)
                            );
                            setExercisesDone(
                              exercisesDone + (event.target.checked ? 1 : -1)
                            );
                          }}
                        />
                      )}
                    </VStack>
                  ))}
                {fitnessPlan == "Flexibility" &&
                  fExercises.map((exercise, index) => (
                    <VStack key={index}>
                      <Text fontSize={"xl"}>{exercise.name}</Text>
                      {exercise.description && (
                        <Text fontSize={"sm"}>{exercise.description}</Text>
                      )}
                      {exercise.duration && (
                        <Text fontSize={"sm"}>
                          Duration: {exercise.duration}
                        </Text>
                      )}
                      {exercise.rest && (
                        <Text fontSize={"sm"}>Rest: {exercise.rest}</Text>
                      )}
                      {/* <Image src={exercise.image} alt={exercise.name} /> */}
                      {index <= exercisesDone && (
                        <Checkbox
                          size="lg"
                          onChange={(event) => {
                            console.log(
                              "Setting exercisesDone to",
                              exercisesDone + (event.target.checked ? 1 : -1)
                            );
                            setExercisesDone(
                              exercisesDone + (event.target.checked ? 1 : -1)
                            );
                          }}
                        />
                      )}
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
