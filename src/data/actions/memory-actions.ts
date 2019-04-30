import { ADD_MEMORY, DELETE_MEMORY, GET_ALL_MEMORIES } from "../constants/memory-constants";
import { Memory } from "models/Post";

export interface IAddMemory {
  type: ADD_MEMORY;
}

export interface IDeleteMemory {
  type: DELETE_MEMORY;
  memoryId: number;
}

export interface IGetAllMemories {
  type: GET_ALL_MEMORIES;
  memories: Memory[];
}

export type MemoryActions = IAddMemory | IDeleteMemory | IGetAllMemories;

export async function addMemory(memory: Memory): Promise<IAddMemory> {
  await fetch("https://localhost:5001/api/memory", {
    method: "POST",
    body: JSON.stringify(memory),
    headers: {'Content-Type': 'application/json'}
  });

  return { type: ADD_MEMORY  }
}

export async function deleteMemory(id: number): Promise<IDeleteMemory> {
  await fetch(`https://localhost:5001/api/memory/${id}`, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}
  });

  return { type: DELETE_MEMORY, memoryId: id }
}

export async function getAllMemories(): Promise<IGetAllMemories> {
  const response = await fetch("https://localhost:5001/api/memory");
  const memories = await response.json() as Memory[];

  memories.forEach(memory => {
    memory.dateTime = new Date(Date.parse(memory.dateTime.toString()))
  });

  return {
    type: GET_ALL_MEMORIES,
    memories
  };
}