import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import * as Crypto from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
    const STORAGE_KEY = "people_data"; // Changed storage key to be more descriptive
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const storedPeople = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedPeople) {
                    setPeople(JSON.parse(storedPeople));
                }
            } catch (error) {
                console.error("Failed to load people from storage", error);
            }
        };

        fetchPeople();
    }, []);

    const addPerson = async (name, dob) => {
        const newPerson = {
            id: Crypto.randomUUID(),
            name,
            dob,
            ideas: [],
        };
        const updatedPeopleList = [...people, newPerson];
        updatedPeopleList.sort((a, b) => new Date(a.dob) - new Date(b.dob));
        setPeople(updatedPeopleList);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeopleList));
    };

    const deletePerson = async (id) => {
        const filteredPeople = people.filter((person) => person.id !== id);
        setPeople(filteredPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPeople));
    };

    const getIdeas = (personId) => {
        const person = people.find((person) => person.id === personId);
        return person ? person.ideas : [];
    };

    const updateIdeas = async (personId, updatedIdeas) => {
        const modifiedPeople = people.map((person) => {
            if (person.id === personId) {
                return { ...person, ideas: updatedIdeas };
            }
            return person;
        });
        setPeople(modifiedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(modifiedPeople));
    };

    const saveIdea = async (personId, text, photoPath, width, height) => {
        const newIdea = {
            id: Crypto.randomUUID(),
            text,
            img: photoPath,
            width,
            height,
        };
        const allIdeas = [...getIdeas(personId), newIdea];
        await updateIdeas(personId, allIdeas);
    };

    const deleteIdea = async (personId, ideaId) => {
        const remainingIdeas = getIdeas(personId).filter((idea) => idea.id !== ideaId);
        await updateIdeas(personId, remainingIdeas);
    };

    return (
        <PeopleContext.Provider value={{ people, addPerson, deletePerson, getIdeas, saveIdea, deleteIdea }}>
            {children}
        </PeopleContext.Provider>
    );
};

export default PeopleContext;
