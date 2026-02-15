import { gql } from "@apollo/client";

// =========================
// Interfaces
// =========================

export interface Slot {
    isBooked: boolean;
    time: string;
}

export interface AvailableSlotResponse {
    appointmentDate: string;
    gkbStoreId: string;
    message: string;
    success: boolean;
    slots: Slot[];
}

export interface GetAvailableSlotsResponse {
    getAvailableSlots: AvailableSlotResponse;
}

// =========================
// GraphQL Query
// =========================

export const GET_AVAILABLE_SLOTS = gql`
    query GetAvailableSlots($gkbStoreId: String!, $appointmentDate: String!) {
        getAvailableSlots(
            gkbStoreId: $gkbStoreId
            appointmentDate: $appointmentDate
        ) {
            appointmentDate
            gkbStoreId
            message
            success
            slots {
                isBooked
                time
            }
        }
    }
`;
