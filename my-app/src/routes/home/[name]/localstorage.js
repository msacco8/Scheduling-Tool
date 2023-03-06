import { writable } from "svelte/store";

// Note that localstorage can only take in strings as values so use JSON.stringify and JSON.parse when 
// Updating and retrieving from local storage
export const availabilitiesStore = writable(localStorage.getItem("availabilitiesStore") || "");
export const timeStore = writable(localStorage.getItem("timeStore") || "");

availabilitiesStore.subscribe(val => localStorage.setItem("availabilitiesStore", val));
timeStore.subscribe(val => localStorage.setItem("timeStore", val));
