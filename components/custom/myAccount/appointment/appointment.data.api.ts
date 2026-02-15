import { gql } from "@apollo/client";

export const GET_MY_APPOINTMENTS = gql`
    query GetMyAppointments {
        getMyAppointments {
            message
            success
            data {
                appointmentDate
                appointmentId
                type
                customerId
                gkbStore
                slotTime
                status
            }
            allStatus {
                key
                label
            }
        }
    }
`;

export const CANCEL_APPOINTMENT = gql`
    mutation CancelAppointment($appointmentId: Int!) {
        cancelAppointment(appointmentId: $appointmentId) {
            message
            success
        }
    }
`;

export interface Appointment {
    appointmentDate: string;
    appointmentId: string;
    type: string;
    customerId: string;
    gkbStore: string;
    slotTime: string;
    status: string;
    allStatus?: {
        key: string;
        label: string;
    }[];
}

export interface GetMyAppointmentsResponse {
    getMyAppointments: {
        message: string;
        success: boolean;
        data: Appointment[];
    };
}
