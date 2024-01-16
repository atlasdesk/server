import {  } from '/home/moritz/Documents/tickety/server/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';



export function fakeUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    name: undefined,
    avatar_url: undefined,
    bio: undefined,
    website: undefined,
    location: undefined,
    surname: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    createdAt: new Date(),
    name: undefined,
    avatar_url: undefined,
    bio: undefined,
    website: undefined,
    location: undefined,
    surname: undefined,
  };
}
export function fakeTicket() {
  return {
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
  };
}
export function fakeTicketComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    statusId: undefined,
    priorityId: undefined,
    createdAt: new Date(),
    createdById: faker.number.int(),
  };
}
export function fakeComment() {
  return {
    content: faker.lorem.words(5),
  };
}
export function fakeCommentComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    content: faker.lorem.words(5),
    createdAt: new Date(),
    createdById: faker.number.int(),
    ticketId: faker.number.int(),
  };
}
export function fakeTicketStatus() {
  return {
    name: faker.person.fullName(),
    color: faker.lorem.words(5),
  };
}
export function fakeTicketStatusComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    name: faker.person.fullName(),
    color: faker.lorem.words(5),
  };
}
export function fakeTicketPriority() {
  return {
    name: faker.person.fullName(),
    color: faker.lorem.words(5),
  };
}
export function fakeTicketPriorityComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    name: faker.person.fullName(),
    color: faker.lorem.words(5),
  };
}
export function fakeTags() {
  return {
    name: faker.person.fullName(),
    color: faker.lorem.words(5),
  };
}
export function fakeTagsComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    name: faker.person.fullName(),
    color: faker.lorem.words(5),
  };
}
