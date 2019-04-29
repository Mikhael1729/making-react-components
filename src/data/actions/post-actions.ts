import { ADD_MEMORY, DELETE_MEMORY } from "../constants/post-constants";
import { Memory } from "models/Post";

export interface IAddMemory {
  type: ADD_MEMORY;
  post: Memory;
}

export interface IDeleteMemory {
  type: DELETE_MEMORY;
  memoryId: number;
}

export type MemoryActions = IAddMemory | IDeleteMemory;

export function addMemory(post: Memory): IAddMemory {
  return { type: ADD_MEMORY, post }
}

export function deleteMemory(memoryId: number): IDeleteMemory {
  return { type: DELETE_MEMORY, memoryId }
}