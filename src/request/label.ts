export enum HelpType {
    MATERIAL = "MATERIAL",
    PHYSICAL= "PHYSICAL"
}

export function getType(typeName: string): HelpType {
    switch (typeName.toUpperCase()) {
        case "MATERIAL":
            return HelpType.MATERIAL;
        case "PHYSICAL":
            return HelpType.PHYSICAL;
        default:
            throw new Error("Unknown type '" + typeName + "'");
    }
}

export function getListOfType(typeNames: string[]): HelpType[] {
    const result: HelpType[] = [];
    typeNames.forEach(type => result.push(getType(type)))
    return result;
}