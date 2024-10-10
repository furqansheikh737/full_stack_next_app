import { Massage } from "@/models/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMassages?: boolean;
    massages?: Array<Massage>
}