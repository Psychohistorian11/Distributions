export interface Distribution {
    name: string;
    image: string;
    type: string;
    description: string;
    parameters: string[];
    densityFunction: string;
    applications: string;
    examples: string
    intervals: { [key: string]: string }
}