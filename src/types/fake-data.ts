import {  } from '/home/moritz/Documents/tickety/server/node_modules/@prisma/client';
import { faker } from '@faker-js/faker';



export function fakeUser() {
  return {
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    name: undefined,
    surname: undefined,
    avatar_url: undefined,
    bio: undefined,
    website: undefined,
    location: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    uid: '[object Object]',
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    createdAt: new Date(),
    name: undefined,
    surname: undefined,
    avatar_url: undefined,
    bio: undefined,
    website: undefined,
    location: undefined,
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
export function fakeRefreshTokens() {
  return {
    token: faker.lorem.words(5),
    ip: faker.lorem.words(5),
    expiry: faker.date.anytime(),
  };
}
export function fakeRefreshTokensComplete() {
  return {
    id: faker.number.int(),
    token: faker.lorem.words(5),
    userId: faker.number.int(),
    ip: faker.lorem.words(5),
    expiry: faker.date.anytime(),
  };
}
export function fakeApiRequest() {
  return {
    ipAddress: faker.lorem.words(5),
    userAgent: undefined,
    endpoint: faker.lorem.words(5),
    method: faker.lorem.words(5),
    responseCode: faker.number.int(),
  };
}
export function fakeApiRequestComplete() {
  return {
    id: faker.number.int(),
    createdAt: new Date(),
    ipAddress: faker.lorem.words(5),
    userAgent: undefined,
    endpoint: faker.lorem.words(5),
    method: faker.lorem.words(5),
    responseCode: faker.number.int(),
  };
}
