export interface AttendeeFormValues {
    willAttend: "Yes" | "No" | "Still unsure"
    firstName: string
    lastName: string
    email: string
    companion?: CompanionFormValues
}

export interface CompanionFormValues {
    firstName?: string
    lastName?: string
    requireBabysitter?: "Yes" | "We will arrange/travel with our own" | "No, we don't require childcare"
}