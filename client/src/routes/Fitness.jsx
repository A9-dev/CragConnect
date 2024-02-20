import {
  Box,
  Heading,
  Card,
  HStack,
  StackDivider,
  VStack,
  Text,
  Progress,
  Table,
  Tbody,
  Tr,
  Thead,
  Th,
  Td,
  Checkbox,
  TableContainer,
  useColorModeValue,
  Button,
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import strength from "../data/strength.json";
import flexibility from "../data/flexibility.json";
import {
  increaseFitnessScore,
  getTopTenFitnessScores,
  setExercisesDoneDB,
  resetExercisesDone,
} from "../dbFunctions";

const Fitness = () => {
  const { userData, loggedIn, setUserData } = useContext(AppContext);
  const fitnessPlan = userData.fitnessPlan;
  const dayAsNumber = new Date().getDay().toString();

  const [showFollowing, setShowFollowing] = useState(false);

  const bgColor = useColorModeValue("green.200", "green.800");

  const [errorMessage, setErrorMessage] = useState("");

  const sRoutine = strength[dayAsNumber];
  const sExercises = sRoutine.exercises;

  const fRoutine = flexibility[dayAsNumber];
  const fExercises = fRoutine.exercises;
  const [scores, setScores] = useState({});

  const doneForToday =
    userData.lastWorkedOutDate === new Date().toISOString().split("T")[0];

  const numExercises =
    fitnessPlan == "Strength" ? sExercises.length : fExercises.length;

  const handleSetExercisesDone = (exercisesDone) => {
    setExercisesDoneDB(userData.username, exercisesDone)
      .then(() => {
        setUserData({ ...userData, exercisesDone });
      })
      .catch((err) => {
        console.error("Error setting exercises done:", err);
      });
  };

  const handleLogWorkout = () => {
    resetExercisesDone(userData.username);
    increaseFitnessScore(userData.username)
      .then(() => {
        setUserData({
          ...userData,
          lastWorkedOutDate: new Date().toISOString().split("T")[0],
        });
        // Get the updated fitness score
        getTopTenFitnessScores().then((data) => {
          setScores(data.data);
        });
      })
      .catch((err) => {
        if (err.data.message == "User already worked out today") {
          setErrorMessage("You've already logged your workout for today.");
        }
      });
  };

  useEffect(() => {
    getTopTenFitnessScores().then((data) => {
      setScores(data.data);
    });
  }, []);

  return (
    <Box width={"75%"} m={"auto"} mt={"15"}>
      {!fitnessPlan && (
        <Card bg={bgColor} p={15} m={5}>
          <VStack>
            <Heading size="lg" textAlign={"center"}>
              You haven't got a fitness plan yet.
            </Heading>
            <Text>
              Please sign in and select a fitness plan in the settings.
            </Text>
          </VStack>
        </Card>
      )}

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

          {/* If fitnessPlan is strength then show button when exercisesDone is sExercises.length */}
          {/* If fitnessPlan is flexibility then show button when exercisesDone is fExercises.length */}

          {userData.exercisesDone == numExercises && !doneForToday && (
            <Card bg={bgColor} p={15} m={5}>
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

          {doneForToday && (
            <Card bg={bgColor} p={15} m={5}>
              <Center>
                <Heading size="lg">
                  You've logged your workout for today!
                </Heading>
              </Center>
            </Card>
          )}

          {!doneForToday && (
            <>
              <Progress
                mt={30}
                value={(userData.exercisesDone * 100) / numExercises}
                hasStripe
                size="lg"
              />
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
                          {index <= userData.exercisesDone && (
                            <Checkbox
                              size="lg"
                              isChecked={index < userData.exercisesDone}
                              onChange={(e) => {
                                e.target.checked
                                  ? handleSetExercisesDone(index + 1)
                                  : handleSetExercisesDone(index);
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
                          {index <= userData.exercisesDone && (
                            <Checkbox
                              size="lg"
                              isChecked={index < userData.exercisesDone}
                              onChange={(e) => {
                                e.target.checked
                                  ? handleSetExercisesDone(index + 1)
                                  : handleSetExercisesDone(index);
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
        </>
      )}

      <VStack mt={5}>
        <Heading>Leaderboard</Heading>
        {loggedIn && (
          <Checkbox
            onChange={(event) => {
              setShowFollowing(event.target.checked);
            }}
          >
            Only show following
          </Checkbox>
        )}
        <TableContainer w={"35%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th isNumeric>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(scores).map((key, index) => {
                const username = scores[key].username;
                const isSubscribed =
                  showFollowing && userData.subscribingTo.includes(username);
                const isCurrentUser = username === userData.username;

                if (!showFollowing || isSubscribed || isCurrentUser) {
                  return (
                    <Tr key={index}>
                      <Td>{username}</Td>
                      <Td isNumeric>{scores[key].fitnessScore}</Td>
                    </Tr>
                  );
                }

                return null;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
};

export default Fitness;
