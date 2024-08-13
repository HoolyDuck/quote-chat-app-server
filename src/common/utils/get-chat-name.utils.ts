import { CreateChatDto } from "../types/chat/create-chat.dto";

const firstNames = [
  "John",
  "Jane",
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
];

const lastNames = [
  "Doe",
  "Smith",
  "Johnson",
  "Brown",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
];

export const getChatName = (): CreateChatDto => {
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return { firstName: randomFirstName, lastName: randomLastName };
};
