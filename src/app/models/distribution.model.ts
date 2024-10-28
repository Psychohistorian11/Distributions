export interface Distribution {
    name: string;
    image: string;
    type: string;
    description: string;
    parameters: {[key: string ]: string};
    densityFunction: string;
    applications: string;
    examples: string
    intervals: { [key: string]: string }
}