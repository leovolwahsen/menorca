export interface IAttendeeFormValues {
    willAttend: "Yes" | "No" | "Still unsure"
    firstName: string
    lastName: string
    email: string
    companion?: ICompanionFormValues
}

export interface ICompanionFormValues {
    firstName?: string
    lastName?: string
    requireBabysitter?: "Yes" | "We will arrange/travel with our own" | "No, we don't require childcare"
}

export interface IAttendeesTableRow {
    key: string
    willAttend: "Yes" | "No" | "Still unsure"
    firstName: string
    lastName: string
    email: string
    companionFirstName?: string 
    companionLastName?: string
    companionRequireBabysitter?: "Yes" | "We will arrange/travel with our own" | "No, we don't require childcare" 
}