export interface IAttendee {
    willAttend: "Yes" | "No" | "Still unsure"
    firstName: string
    lastName: string
    email: string
    companion?: ICompanion
}

export interface ICompanion {
    firstName?: string
    lastName?: string
    requireBabysitter?: "Yes" | "We will arrange/travel with our own" | "No, we don't require childcare"
}