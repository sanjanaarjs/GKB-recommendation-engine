import { gql } from "@apollo/client";

// =========================
// Interfaces
// =========================

export interface BookAppointmentResponseData {
    appointmentId: string;
    message: string;
    success: boolean;
}

export interface BookAppointmentResponse {
    bookAppointment: BookAppointmentResponseData;
}

export interface BookAppointmentVariables {
    gkbStoreId: string;
    appointmentDate: string;
    slotTime: string;
    mobileNumber: string;
    type: string;
    email?: string;
    name?: string;
}

// =========================
// GraphQL Mutation
// =========================

export const BOOK_APPOINTMENT = gql`
    mutation BookAppointment(
        $gkbStoreId: String!
        $appointmentDate: String!
        $slotTime: String!
        $mobileNumber: String!
        $type: String!
        $email: String
        $name: String
    ) {
        bookAppointment(
            gkbStoreId: $gkbStoreId
            appointmentDate: $appointmentDate
            slotTime: $slotTime
            mobileNumber: $mobileNumber
            type: $type
            email: $email
            name: $name
        ) {
            appointmentId
            message
            success
        }
    }
`;
